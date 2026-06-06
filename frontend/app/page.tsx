"use client";

import { useRouter } from "next/navigation";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "AI-Powered Content",
    description: "Our AI analyzes your experience and crafts compelling bullet points tailored to the job description you're targeting.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Professional Templates",
    description: "Choose from a library of ATS-friendly templates designed by hiring experts and approved by top recruiters.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "ATS Score Analyzer",
    description: "Instantly see how well your resume performs against Applicant Tracking Systems before you hit submit.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Build in Minutes",
    description: "Stop spending hours on formatting. Fill in your details and get a polished, job-ready resume in under 5 minutes.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "One-Click Export",
    description: "Download your resume as a perfectly formatted PDF or Word document, ready to send to any employer.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "Tailor to Any Job",
    description: "Paste a job description and let our AI rewrite your resume to match the exact skills and keywords employers want.",
  },
];

const steps = [
  { step: "01", title: "Create your account", description: "Sign up for free and set up your profile in seconds." },
  { step: "02", title: "Enter your details", description: "Add your experience, education, and skills using our guided editor." },
  { step: "03", title: "Let AI do the work", description: "Our AI rewrites and optimises your content to impress both ATS and humans." },
  { step: "04", title: "Download & apply", description: "Export your polished resume and start landing interviews." },
];

const stats = [
  { value: "50K+", label: "Resumes created" },
  { value: "3×", label: "More interview callbacks" },
  { value: "5 min", label: "Average build time" },
  { value: "98%", label: "ATS pass rate" },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-slate-900 text-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm text-blue-400 font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Powered by Advanced AI
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Build a Resume That{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              Gets You Hired
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-10">
            ResumeAI uses cutting-edge artificial intelligence to craft tailored, ATS-optimised resumes in minutes — so you spend less time formatting and more time interviewing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/register")}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 transition-all duration-200 text-sm"
            >
              Build my resume — it&apos;s free
            </button>
            <button
              onClick={() => router.push("/login")}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-200 text-sm"
            >
              Sign in
            </button>
          </div>

          {/* social proof */}
          <p className="mt-8 text-xs text-slate-500">
            Trusted by <span className="text-slate-400 font-medium">50,000+</span> job seekers worldwide · No credit card required
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-slate-800 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to land the job</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            From AI content generation to ATS optimisation — every tool you need is built in.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600/60 rounded-2xl p-6 transition-all duration-200"
            >
              <div className="w-11 h-11 bg-blue-600/15 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600/25 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-slate-800/30 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">
              Four simple steps to a resume that opens doors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {/* connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-linear-to-r from-slate-600 to-transparent -translate-x-4 z-0" />
                )}
                <div className="relative z-10">
                  <div className="text-4xl font-extrabold text-blue-600/20 mb-3">{s.step}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your next job starts with a great resume
          </h2>
          <p className="text-slate-400 mb-10 text-base">
            Join thousands of professionals who landed their dream job using ResumeAI. Start for free — no credit card needed.
          </p>
          <button
            onClick={() => router.push("/register")}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-xl shadow-blue-600/25 hover:shadow-blue-500/30 transition-all duration-200 text-sm"
          >
            Get started for free
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">ResumeAI</span>
          </div>
          <p className="text-xs text-slate-500">© 2026 ResumeAI. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <button onClick={() => router.push("/privacy")} className="hover:text-slate-300 transition-colors">Privacy</button>
            <button onClick={() => router.push("/terms")} className="hover:text-slate-300 transition-colors">Terms</button>
            <button onClick={() => router.push("/contact")} className="hover:text-slate-300 transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
