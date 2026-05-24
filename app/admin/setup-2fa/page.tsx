"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Shield, ShieldOff, RefreshCw } from "lucide-react";

export default function Setup2FAPage() {
  const [enabled, setEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [loadingQr, setLoadingQr] = useState(false);
  const [loadingActivate, setLoadingActivate] = useState(false);
  const [step, setStep] = useState<"status" | "setup">("status");

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    const res = await fetch("/api/auth/totp-status");
    if (res.ok) {
      const data = await res.json();
      setEnabled(data.enabled);
    }
  }

  async function startSetup() {
    setLoadingQr(true);
    const res = await fetch("/api/auth/setup-totp");
    if (res.ok) {
      const data = await res.json();
      setQrCode(data.qrCode);
      setSecret(data.secret);
      setStep("setup");
    } else {
      toast.error("Failed to generate QR code.");
    }
    setLoadingQr(false);
  }

  async function activateTotp(e: React.FormEvent) {
    e.preventDefault();
    setLoadingActivate(true);

    const res = await fetch("/api/auth/activate-totp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, token }),
    });

    if (res.ok) {
      toast.success("Two-factor authentication enabled!");
      setEnabled(true);
      setStep("status");
      setQrCode("");
      setSecret("");
      setToken("");
    } else {
      const err = await res.json();
      toast.error(err.error || "Activation failed.");
    }
    setLoadingActivate(false);
  }

  async function disableTotp() {
    if (
      !confirm("Disable 2FA? You will only need username + password to login.")
    )
      return;

    const res = await fetch("/api/auth/totp-status", { method: "DELETE" });
    if (res.ok) {
      toast.success("2FA disabled.");
      setEnabled(false);
      setStep("status");
    } else {
      toast.error("Failed to disable 2FA.");
    }
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Two-Factor Authentication
        </h2>
        <p className="text-white/40 text-sm mt-1">
          Protect your admin panel with Google Authenticator or any TOTP app.
        </p>
      </div>

      {/* Status card */}
      <div className="border border-white/10 p-5 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {enabled ? (
            <Shield size={20} className="text-green-400" />
          ) : (
            <ShieldOff size={20} className="text-white/30" />
          )}
          <div>
            <p className="text-white font-medium">
              {enabled ? "2FA is enabled" : "2FA is disabled"}
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {enabled
                ? "Your account is protected with an authenticator app."
                : "Add an extra layer of security to your login."}
            </p>
          </div>
        </div>
        <div
          className={`w-3 h-3 rounded-full ${
            enabled ? "bg-green-400" : "bg-white/20"
          }`}
        />
      </div>

      {step === "status" && (
        <div className="flex gap-3">
          <button
            onClick={startSetup}
            disabled={loadingQr}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white text-sm transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={loadingQr ? "animate-spin" : ""} />
            {enabled ? "Re-configure 2FA" : "Enable 2FA"}
          </button>
          {enabled && (
            <button
              onClick={disableTotp}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-red-900/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 text-sm transition-all"
            >
              <ShieldOff size={14} /> Disable 2FA
            </button>
          )}
        </div>
      )}

      {step === "setup" && qrCode && (
        <div className="border border-white/10 p-6 space-y-5">
          <div>
            <h3 className="text-white font-medium mb-1">
              Step 1 — Scan QR Code
            </h3>
            <p className="text-white/40 text-sm mb-4">
              Open Google Authenticator (or Authy) and scan this QR code.
            </p>
            <div className="bg-white p-3 inline-block">
              <Image src={qrCode} alt="QR Code" width={180} height={180} />
            </div>
          </div>

          <div>
            <p className="text-white/40 text-xs mb-1">
              Can&apos;t scan? Enter this key manually:
            </p>
            <code className="text-xs text-white/60 bg-black/30 px-3 py-2 block font-mono tracking-wider break-all">
              {secret}
            </code>
          </div>

          <form onSubmit={activateTotp} className="space-y-3">
            <div>
              <h3 className="text-white font-medium mb-2">
                Step 2 — Verify Code
              </h3>
              <p className="text-white/40 text-sm mb-3">
                Enter the 6-digit code from the app to confirm setup.
              </p>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
                required
                autoFocus
                placeholder="000000"
                className="w-full bg-black/30 border border-white/10 focus:border-white/30 outline-none
                           px-4 py-3 text-white text-center text-2xl tracking-[0.5em] font-mono placeholder:text-white/20 transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("status");
                  setQrCode("");
                  setSecret("");
                  setToken("");
                }}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loadingActivate || token.length !== 6}
                className="flex-1 py-2.5 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white text-sm transition-all disabled:opacity-50"
              >
                {loadingActivate ? "Activating…" : "Activate 2FA"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
