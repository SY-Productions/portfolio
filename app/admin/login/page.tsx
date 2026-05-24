"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [totpToken, setTotpToken] = useState("");
  const [step, setStep] = useState<"credentials" | "totp">("credentials");
  const [totpRequired, setTotpRequired] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if TOTP is enabled (unauthenticated check via a public endpoint)
  useEffect(() => {
    fetch("/api/auth/totp-check")
      .then((r) => r.json())
      .then((d) => {
        setTotpRequired(!!d.enabled);
      })
      .catch(() => {});
  }, []);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    if (totpRequired) {
      setStep("totp");
      return;
    }
    await doSignIn();
  }

  async function handleTotp(e: React.FormEvent) {
    e.preventDefault();
    await doSignIn();
  }

  async function doSignIn() {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      totpToken: totpRequired ? totpToken : undefined,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(
        step === "totp" ? "Invalid 2FA code." : "Invalid username or password.",
      );
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-black/30 border border-white/10 focus:border-white/30 outline-none px-4 py-3 text-white placeholder:text-white/20 transition-colors";

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4"
      dir="ltr"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 bg-[#3B070A]/40 border border-[#5A0E12]/30 flex items-center justify-center">
            {step === "totp" ? (
              <Shield size={24} className="text-[#8B1E24]" />
            ) : (
              <Lock size={24} className="text-[#8B1E24]" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-white">
            {step === "totp" ? "Two-Factor Auth" : "Admin Login"}
          </h1>
          <p className="text-white/40 text-sm mt-2">
            {step === "totp"
              ? "Enter the code from your authenticator app"
              : "Portfolio Manager"}
          </p>
        </div>

        {step === "credentials" ? (
          <form
            onSubmit={handleCredentials}
            className="bg-[#0D0D0D] border border-white/10 p-8 space-y-5"
          >
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-white/60 text-sm mb-2 flex items-center gap-1.5">
                <User size={13} /> Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className={inputClass}
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2 flex items-center gap-1.5">
                <Lock size={13} /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white transition-all disabled:opacity-50 font-medium"
            >
              {totpRequired ? "Continue →" : "Sign In"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleTotp}
            className="bg-[#0D0D0D] border border-white/10 p-8 space-y-5"
          >
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-white/60 text-sm mb-2 flex items-center gap-1.5">
                <KeyRound size={13} /> Authenticator Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={totpToken}
                onChange={(e) =>
                  setTotpToken(e.target.value.replace(/\D/g, ""))
                }
                required
                autoFocus
                className={
                  inputClass +
                  " text-center text-2xl tracking-[0.5em] font-mono"
                }
                placeholder="000000"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("credentials");
                  setError("");
                  setTotpToken("");
                }}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || totpToken.length !== 6}
                className="flex-1 py-3 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white transition-all disabled:opacity-50 font-medium"
              >
                {loading ? "Verifying…" : "Verify"}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-white/20 text-xs mt-6">
          This page is only accessible to the site owner.
        </p>
      </div>
    </div>
  );
}
