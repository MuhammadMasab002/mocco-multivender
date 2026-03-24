import axios from "axios";
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmailActivation = () => {
  const { activation_token } = useParams();
  const [status, setStatus] = useState(activation_token ? "idle" : "missing");

  const VITE_BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://mocco-mart-backend.vercel.app/api/v1";

  const maskedToken = useMemo(() => {
    if (!activation_token) return "No token found";
    if (activation_token.length <= 14) return activation_token;
    return `${activation_token.slice(0, 8)}...${activation_token.slice(-6)}`;
  }, [activation_token]);

  const statusStyles = {
    idle: {
      title: "Ready to activate",
      subtitle:
        "Your account is almost ready. Click below to finalize email verification.",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      badgeText: "Pending",
      buttonLabel: "Activate account",
    },
    processing: {
      title: "Verifying token",
      subtitle: "Please wait while we confirm your activation link.",
      badge: "bg-sky-100 text-sky-800 border-sky-200",
      badgeText: "Processing",
      buttonLabel: "Activating...",
    },
    success: {
      title: "Account activated",
      subtitle:
        "Your email has been verified successfully. You can now sign in and start shopping.",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      badgeText: "Success",
      buttonLabel: "Activated",
    },
    error: {
      title: "Activation failed",
      subtitle:
        "This link looks invalid or expired. Request a fresh activation email and try again.",
      badge: "bg-red-100 text-red-700 border-red-200",
      badgeText: "Failed",
      buttonLabel: "Try again",
    },
    missing: {
      title: "No activation token",
      subtitle:
        "This page needs a token from your email link. Open the latest activation email and try again.",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
      badgeText: "Missing",
      buttonLabel: "Activation unavailable",
    },
  };

  const currentState = statusStyles[status];

  const handleActivate = async () => {
    if (!activation_token || status === "processing") return;
    // activation api call will go here, for now we simulate with timeout
    if (!activation_token) {
      setStatus("missing");
      return;
    }

    const { data } = await axios.post(`${VITE_BACKEND_URL}/user/activate`, {
      token: activation_token,
    });

    if (data.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }

    setStatus("processing");

    // Temporary UI behavior until activation API wiring is added.
    setTimeout(() => {
      setStatus(activation_token.length > 20 ? "success" : "error");
    }, 1200);
  };

  const canActivate =
    activation_token && status !== "processing" && status !== "success";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_10%,#fde68a_0%,#fff7ed_32%,#fff_70%)] px-5 py-10 text-slate-900 sm:px-8 lg:px-14">
      <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-red-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-200/35 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-7 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-9">
          <p className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-amber-800 uppercase">
            Mocco account center
          </p>

          <h1 className="mt-5 text-3xl leading-tight font-black tracking-tight text-slate-900 sm:text-4xl">
            Email Activation
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-700 sm:text-base">
            Secure your account with one final confirmation. We verify your
            email before enabling sign-in and personalized shopping features.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-slate-600">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              1. Open your activation email from Mocco.
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              2. Click the activation link or paste the link in your browser.
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              3. Continue to sign in after verification completes.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_80px_rgba(15,23,42,0.1)] sm:p-9">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {currentState.title}
            </h2>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${currentState.badge}`}
            >
              {currentState.badgeText}
            </span>
          </div>

          <p className="text-sm leading-7 text-slate-600 sm:text-base">
            {currentState.subtitle}
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4">
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Activation token
            </p>
            <p className="mt-2 break-all font-mono text-sm text-slate-800">
              {maskedToken}
            </p>
          </div>

          <button
            type="button"
            onClick={handleActivate}
            disabled={!canActivate}
            className="mt-7 w-full rounded-xl bg-linear-to-r from-orange-500 to-red-500 px-4 py-3 text-sm font-semibold text-white cursor-pointer transition hover:from-orange-600 hover:to-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {currentState.buttonLabel}
          </button>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              to="/signup"
              className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Resend from signup
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Continue to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailActivation;
