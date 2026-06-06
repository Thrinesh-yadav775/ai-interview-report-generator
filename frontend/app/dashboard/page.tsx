"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();

  const [pdf, setPdf] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getme`, { withCredentials: true })
      .catch(() => router.replace("/"));

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/interview/latest`, { withCredentials: true })
      .then((res) => { if (res.data.report) setReport(res.data.report); })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setError(null);
    setReport(null);
    setIsLoading(true);
    try {
      const form = new FormData();
      if (pdf) form.append("pdf", pdf);
      form.append("jobdescription", jobDescription);
      form.append("selfdescription", selfDescription);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/interview/createpost`,
        form,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      setReport(res.data.interviewreport);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError("Something went wrong. Please try again later.");
    }
    setIsLoading(false);
  }

  const severityColor: Record<string, string> = {
    low: "text-green-400 bg-green-400/10 border-green-400/30",
    medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    high: "text-red-400 bg-red-400/10 border-red-400/30",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center p-6">
      {success && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-500/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-3 rounded-xl shadow-lg backdrop-blur-xl">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Report generated successfully!
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Form */}
      <div className="relative w-full max-w-md mt-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-600/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Generate Interview Report</h1>
          <p className="text-slate-400 mt-1 text-sm">Upload your resume and describe the role</p>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="pdf" className="block text-sm font-medium text-slate-300 mb-1.5">
                Resume <span className="text-slate-500 font-normal">(PDF only)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <input
                  id="pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-600/60 rounded-xl text-slate-300 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-all duration-200"
                />
              </div>
              {pdf && <p className="text-xs text-slate-500 mt-1 pl-1">{pdf.name}</p>}
            </div>

            <div>
              <label htmlFor="jobdesc" className="block text-sm font-medium text-slate-300 mb-1.5">
                Job Description
              </label>
              <textarea
                id="jobdesc"
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here…"
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-all duration-200 resize-none"
              />
            </div>

            <div>
              <label htmlFor="selfdesc" className="block text-sm font-medium text-slate-300 mb-1.5">
                About Yourself
              </label>
              <textarea
                id="selfdesc"
                rows={3}
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Briefly describe your background and strengths…"
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-all duration-200 resize-none"
              />
            </div>

            {error && <p className="text-sm text-center text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating report…
                </span>
              ) : "Generate Report"}
            </button>
          </form>
        </div>
      </div>

      {/* Report */}
      {report && (
        <div className="relative w-full max-w-2xl mt-10 mb-10 space-y-5">
          {/* Match Score */}
          <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Match Score</p>
              <p className="text-white text-3xl font-bold mt-1">{report.matchscore}<span className="text-slate-400 text-lg font-normal">/100</span></p>
            </div>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4 ${report.matchscore >= 70 ? "border-green-500 text-green-400" : report.matchscore >= 40 ? "border-yellow-500 text-yellow-400" : "border-red-500 text-red-400"}`}>
              {report.matchscore}
            </div>
          </div>

          {/* Technical Questions */}
          {report.technicalQuestions?.length > 0 && (
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-white font-semibold text-base mb-4">Technical Questions</h2>
              <div className="space-y-4">
                {report.technicalQuestions.map((q: any, i: number) => (
                  <div key={i} className="border border-slate-700/50 rounded-xl p-4 space-y-2">
                    <p className="text-white text-sm font-medium">Q{i + 1}. {q.question}</p>
                    <p className="text-slate-400 text-xs"><span className="text-blue-400 font-medium">Intent:</span> {q.intention}</p>
                    <p className="text-slate-300 text-xs"><span className="text-blue-400 font-medium">Answer:</span> {q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Behavioural Questions */}
          {report.behaviouralQuestions?.length > 0 && (
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-white font-semibold text-base mb-4">Behavioural Questions</h2>
              <div className="space-y-4">
                {report.behaviouralQuestions.map((q: any, i: number) => (
                  <div key={i} className="border border-slate-700/50 rounded-xl p-4 space-y-2">
                    <p className="text-white text-sm font-medium">Q{i + 1}. {q.question}</p>
                    <p className="text-slate-400 text-xs"><span className="text-blue-400 font-medium">Intent:</span> {q.intention}</p>
                    <p className="text-slate-300 text-xs"><span className="text-blue-400 font-medium">Answer:</span> {q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gaps */}
          {report.skillGaps?.length > 0 && (
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-white font-semibold text-base mb-4">Skill Gaps</h2>
              <div className="space-y-2">
                {report.skillGaps.map((s: any, i: number) => (
                  <div key={i} className="flex items-center justify-between border border-slate-700/50 rounded-xl px-4 py-3">
                    <p className="text-slate-300 text-sm">{s.skill}</p>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${severityColor[s.severity] ?? "text-slate-400 bg-slate-700/40 border-slate-600/40"}`}>
                      {s.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preparation Plan */}
          {report.preparationPlans?.length > 0 && (
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-white font-semibold text-base mb-4">Preparation Plan</h2>
              <div className="space-y-4">
                {report.preparationPlans.map((plan: any) => (
                  <div key={plan.day} className="border border-slate-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded-lg">Day {plan.day}</span>
                      <p className="text-white text-sm font-medium">{plan.focus}</p>
                    </div>
                    <ul className="space-y-1 pl-1">
                      {plan.tasks.map((task: string, i: number) => (
                        <li key={i} className="text-slate-400 text-xs flex gap-2">
                          <span className="text-blue-400 mt-0.5">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
