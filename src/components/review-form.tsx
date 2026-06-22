"use client";

import { ReviewResult } from "@/lib/ai/types";
import { useState, useEffect, useMemo } from "react";
import Editor from "@monaco-editor/react";
import ReviewResultCard from "./review-result";
import { detectLanguage } from "@/lib/language-detection";

interface Project {
  id: string;
  name: string;
}

interface ReviewFormProps {
  projects: Project[];
  initialProjectId?: string;
}

export default function ReviewForm({
  projects,
  initialProjectId,
}: ReviewFormProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [projectId, setProjectId] = useState(
    initialProjectId ?? projects[0]?.id ?? "",
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);

  const loadingMessages = useMemo(
    () => [
      "Analyzing code...",
      "Checking for bugs...",
      "Reviewing security issues...",
      "Inspecting performance...",
      "Generating suggestions...",
    ],
    [],
  );

  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[index]);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading, loadingMessages]);

  async function handleReview() {
    if (!projectId) {
      alert("Please select a project");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          projectId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setResult(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const text = await file.text();
    setCode(text);

    const detectedLanguage = detectLanguage(file.name);
    setLanguage(detectedLanguage);
  }

  return (
    <div className="space-y-8">
      <section className="surface">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">New Review</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Paste code, upload a file, and get fast AI-driven review feedback.
            </p>
          </div>
          <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-slate-300">Project</span>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="input-field mt-2"
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-field mt-2"
              >
                <option>typescript</option>
                <option>javascript</option>
                <option>python</option>
                <option>java</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300">Upload Source File</label>
            <input
              type="file"
              accept=".ts,.tsx,.js,.jsx,.py,.java,.go,.rs,.cpp,.c"
              onChange={handleFileUpload}
              className="mt-3 w-full rounded-2xl border border-slate-700/70 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
          <div className="rounded-[1.75rem] overflow-hidden border border-white/10 bg-slate-950/85 shadow-lg shadow-slate-950/20">
            <Editor
              height="520px"
              language={language}
              value={code}
              onChange={(value) => setCode(value ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={handleReview}
              disabled={loading}
              className="btn-primary w-full sm:w-auto"
            >
              {loading ? loadingMessage : "Review Code"}
            </button>
            {loading && (
              <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-4 text-slate-200">
                <p className="font-medium">{loadingMessage}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-2/3 animate-pulse bg-cyan-400" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {result && <ReviewResultCard review={result} />}
    </div>
  );
}
