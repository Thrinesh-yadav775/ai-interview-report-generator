"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, { withCredentials: true });
    } catch {
      // proceed regardless
    }
      router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-5xl mx-auto bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-5 h-14 flex items-center justify-between shadow-lg shadow-black/20">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:bg-blue-500 transition-colors duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-sm tracking-tight">ResumeAI</span>
          </button>

          {/* 3 Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/login")}
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-1.5 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-1.5 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
            >
              Register
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/25 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
