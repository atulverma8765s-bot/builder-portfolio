import React, { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../firebase';
import {
  Sparkles,
  Chrome,
  Phone,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap
} from 'lucide-react';

export function LoginPage() {
  const [mode, setMode] = useState('main');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible'
        }
      );
    }

    return window.recaptchaVerifier;
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError('');

      if (!phone.startsWith('+')) {
        setError('Please enter your number with country code, e.g. +919876543210');
        return;
      }

      const appVerifier = setupRecaptcha();

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );

      setConfirmationResult(result);
      setMode('otp');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to send OTP.');

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError('');

      if (!confirmationResult) {
        setError('Please request an OTP first.');
        return;
      }

      await confirmationResult.confirm(otp);
    } catch (err) {
      console.error(err);
      setError('Invalid OTP. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -top-48 -left-48 animate-pulse" />

        <div
          className="absolute w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[120px] -bottom-48 -right-48 animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div
          className="absolute w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[100px] top-1/2 left-1/2 animate-pulse"
          style={{ animationDelay: '2s' }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050816_75%)]" />
      </div>

      {/* Decorative particles */}
      <div className="absolute top-20 left-[15%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee] animate-ping" />
      <div className="absolute bottom-28 right-[18%] w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_20px_#818cf8] animate-ping" />
      <div className="absolute top-[30%] right-[12%] w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />

      {/* Login card */}
      <div className="relative w-full max-w-[440px]">

        {/* Glow behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/30 via-cyan-500/20 to-violet-600/30 rounded-[32px] blur-xl opacity-70" />

        <div className="relative bg-slate-900/65 backdrop-blur-2xl border border-white/10 rounded-[30px] p-7 sm:p-9 shadow-2xl">

          {/* Top branding */}
          <div className="text-center">

            <div className="relative inline-flex mb-6">
              <div className="absolute inset-0 rounded-2xl bg-indigo-500 blur-xl opacity-40 animate-pulse" />

              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-cyan-400 flex items-center justify-center shadow-xl shadow-indigo-500/30 animate-[float_4s_ease-in-out_infinite]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Folio<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Craft</span>
              </h1>

              <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold tracking-widest text-indigo-300">
                STUDIO
              </span>
            </div>

            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
              Build a stunning portfolio.
              <br />
              <span className="text-slate-300">Your next opportunity starts here.</span>
            </p>
          </div>

          {/* Main login */}
          {mode === 'main' && (
            <div className="mt-8 space-y-4">

              {/* Google */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="group w-full relative overflow-hidden flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white text-slate-900 font-bold shadow-lg hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <Chrome className="relative w-5 h-5" />

                <span className="relative">
                  {loading ? 'Connecting...' : 'Continue with Google'}
                </span>

                {!loading && (
                  <ArrowRight className="relative w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-xs text-slate-500 font-medium">
                  OR
                </span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              {/* Phone */}
              <button
                onClick={() => {
                  setMode('phone');
                  setError('');
                }}
                className="group w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/70 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-200 font-semibold transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                Continue with Mobile Number
              </button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 pt-5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Secure login
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Quick setup
                </div>
              </div>
            </div>
          )}

          {/* Phone number */}
          {mode === 'phone' && (
            <div className="mt-8">

              <button
                onClick={() => {
                  setMode('main');
                  setError('');
                }}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <h2 className="text-xl font-bold">
                Enter your mobile number
              </h2>

              <p className="text-sm text-slate-400 mt-2 mb-5">
                We'll send you a verification code.
              </p>

              <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-700 rounded-2xl px-4 focus-within:border-indigo-500 transition">
                <Phone className="w-5 h-5 text-cyan-400" />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full bg-transparent py-4 outline-none text-white placeholder:text-slate-600"
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading || !phone}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-bold transition-all disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send Verification Code'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* OTP */}
          {mode === 'otp' && (
            <div className="mt-8">

              <button
                onClick={() => {
                  setMode('phone');
                  setError('');
                }}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Change number
              </button>

              <h2 className="text-xl font-bold">
                Verify your number
              </h2>

              <p className="text-sm text-slate-400 mt-2 mb-5">
                Enter the OTP sent to{' '}
                <span className="text-cyan-400">{phone}</span>
              </p>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ''))
                }
                placeholder="••••••"
                className="w-full text-center tracking-[0.7em] text-2xl font-bold bg-slate-950/70 border border-slate-700 rounded-2xl py-4 outline-none focus:border-indigo-500 transition"
              />

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length < 6}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-bold transition-all disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* reCAPTCHA */}
          <div id="recaptcha-container" />

          {/* Error */}
          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs leading-relaxed">
              {error}
            </div>
          )}

          {/* Footer */}
          <p className="text-[11px] text-slate-600 text-center mt-7">
            Secure authentication powered by Firebase
          </p>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
