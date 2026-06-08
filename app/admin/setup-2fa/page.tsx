"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Shield, ShieldOff, RefreshCw, Monitor, Smartphone, LogOut } from "lucide-react";

// ── Device parser ──────────────────────────────────────────────────────────────

function parseDevice(ua: string): { label: string; isMobile: boolean } {
  const s = ua.toLowerCase();
  let browser = "Browser";
  let os = "Unknown OS";
  let isMobile = false;

  if (s.includes("edg/")) browser = "Edge";
  else if (s.includes("chrome/") && !s.includes("chromium")) browser = "Chrome";
  else if (s.includes("firefox/")) browser = "Firefox";
  else if (s.includes("safari/") && !s.includes("chrome")) browser = "Safari";
  else if (s.includes("opr/") || s.includes("opera")) browser = "Opera";

  if (s.includes("iphone")) { os = "iPhone"; isMobile = true; }
  else if (s.includes("ipad")) { os = "iPad"; isMobile = true; }
  else if (s.includes("android")) { os = "Android"; isMobile = true; }
  else if (s.includes("windows nt")) os = "Windows";
  else if (s.includes("macintosh") || s.includes("mac os x")) os = "macOS";
  else if (s.includes("linux")) os = "Linux";

  return { label: ua ? `${browser} on ${os}` : "Unknown device", isMobile };
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface DeviceSession {
  id: number;
  userAgent: string;
  ip: string;
  createdAt: string;
  lastSeenAt: string;
  isCurrent: boolean;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Setup2FAPage() {
  const [enabled, setEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [loadingQr, setLoadingQr] = useState(false);
  const [loadingActivate, setLoadingActivate] = useState(false);
  const [step, setStep] = useState<"status" | "setup">("status");

  const [devices, setDevices] = useState<DeviceSession[]>([]);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [revokingId, setRevokingId] = useState<number | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { checkStatus(); fetchDevices(); }, []);

  async function checkStatus() {
    const res = await fetch("/api/auth/totp-status");
    if (res.ok) {
      const data = await res.json();
      setEnabled(data.enabled);
    }
  }

  const fetchDevices = useCallback(async () => {
    setLoadingDevices(true);
    try {
      const res = await fetch("/api/auth/sessions");
      if (res.ok) setDevices(await res.json());
    } finally {
      setLoadingDevices(false);
    }
  }, []);

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
      setQrCode(""); setSecret(""); setToken("");
    } else {
      const err = await res.json();
      toast.error(err.error || "Activation failed.");
    }
    setLoadingActivate(false);
  }

  async function disableTotp() {
    if (!confirm("Disable 2FA? You will only need username + password to login.")) return;
    const res = await fetch("/api/auth/totp-status", { method: "DELETE" });
    if (res.ok) {
      toast.success("2FA disabled.");
      setEnabled(false);
      setStep("status");
    } else {
      toast.error("Failed to disable 2FA.");
    }
  }

  async function revokeDevice(id: number) {
    if (!confirm("Disconnect this device? It will lose access on its next request.")) return;
    setRevokingId(id);
    try {
      const res = await fetch(`/api/auth/sessions/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Device disconnected.");
        setDevices((prev) => prev.filter((d) => d.id !== id));
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to disconnect.");
      }
    } finally {
      setRevokingId(null);
    }
  }

  return (
    <div className="p-8 max-w-xl space-y-8">

      {/* ── Two-Factor Authentication ─────────────────────────────── */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Two-Factor Authentication</h2>
          <p className="text-white/40 text-sm mt-1">
            Protect your admin panel with Google Authenticator or any TOTP app.
          </p>
        </div>

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
          <div className={`w-3 h-3 rounded-full ${enabled ? "bg-green-400" : "bg-white/20"}`} />
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
              <h3 className="text-white font-medium mb-1">Step 1 — Scan QR Code</h3>
              <p className="text-white/40 text-sm mb-4">
                Open Google Authenticator (or Authy) and scan this QR code.
              </p>
              <div className="bg-white p-3 inline-block">
                <Image src={qrCode} alt="QR Code" width={180} height={180} />
              </div>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Can&apos;t scan? Enter this key manually:</p>
              <code className="text-xs text-white/60 bg-black/30 px-3 py-2 block font-mono tracking-wider break-all">
                {secret}
              </code>
            </div>
            <form onSubmit={activateTotp} className="space-y-3">
              <div>
                <h3 className="text-white font-medium mb-2">Step 2 — Verify Code</h3>
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
                  onClick={() => { setStep("status"); setQrCode(""); setSecret(""); setToken(""); }}
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

      {/* ── Connected Devices ─────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Connected Devices</h2>
            <p className="text-white/40 text-sm mt-0.5">
              Active sessions logged into this admin panel.
            </p>
          </div>
          <button
            onClick={fetchDevices}
            className="p-2 text-white/30 hover:text-white/70 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={14} className={loadingDevices ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="space-y-2">
          {loadingDevices ? (
            [0, 1].map((i) => (
              <div key={i} className="h-16 bg-white/5 animate-pulse" />
            ))
          ) : devices.length === 0 ? (
            <div className="text-center py-10 text-white/30 text-sm border border-white/5">
              No active sessions found.
            </div>
          ) : (
            devices.map((d) => {
              const { label, isMobile } = parseDevice(d.userAgent);
              return (
                <div
                  key={d.id}
                  className={`flex items-center gap-3 px-4 py-3 border transition-colors ${
                    d.isCurrent
                      ? "border-[#5A0E12]/40 bg-[#3B070A]/20"
                      : "border-white/8 bg-white/3 hover:bg-white/5"
                  }`}
                >
                  <div className="flex-shrink-0 text-white/30">
                    {isMobile ? <Smartphone size={18} /> : <Monitor size={18} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-white font-medium truncate">{label}</span>
                      {d.isCurrent && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#3B070A]/60 border border-[#5A0E12]/40 text-[#f4a8ac]">
                          This device
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      {d.ip && (
                        <span className="text-xs text-white/30 font-mono">{d.ip}</span>
                      )}
                      <span className="text-xs text-white/25">
                        Signed in {timeAgo(d.createdAt)} · Last seen {timeAgo(d.lastSeenAt)}
                      </span>
                    </div>
                  </div>

                  {!d.isCurrent && (
                    <button
                      onClick={() => revokeDevice(d.id)}
                      disabled={revokingId === d.id}
                      title="Disconnect this device"
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-red-400 border border-white/10 hover:border-red-500/30 hover:bg-red-900/10 transition-all disabled:opacity-40"
                    >
                      <LogOut size={12} />
                      {revokingId === d.id ? "…" : "Disconnect"}
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {devices.length > 1 && (
          <p className="text-white/20 text-xs mt-3">
            Disconnected devices lose API access immediately. Page access expires with their session (up to 8h).
          </p>
        )}
      </div>

    </div>
  );
}
