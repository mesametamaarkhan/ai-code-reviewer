"use client";

import { ReviewResult } from "@/lib/ai/types";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import ReviewResultCard from "./review-result";
import { detectLanguage, } from "@/lib/language-detection";

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
  const [code, setCode] =
    useState("");

  const [language, setLanguage] =
    useState("typescript");

    const [projectId, setProjectId] =
      useState(
        initialProjectId ??
        projects[0]?.id ??
        ""
    );

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<ReviewResult | null>(null);

  const loadingMessages = [
    "Analyzing code...",
    "Checking for bugs...",
    "Reviewing security issues...",
    "Inspecting performance...",
    "Generating suggestions...",
  ];

  const [loadingMessage, setLoadingMessage] =
    useState(
      loadingMessages[0]
    );

    useEffect(() => {
      if (!loading) {
        return;
      }

      let index = 0;

      const interval =
        setInterval(() => {
          index =
            (index + 1) %
            loadingMessages.length;

          setLoadingMessage(
            loadingMessages[index]
          );
        }, 1200);

      return () =>
        clearInterval(
          interval
        );
    }, [loading]);

  async function handleReview() {
    if (!projectId) {
        alert(
            "Please select a project"
        );
        return;
    }
    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/review",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              code,
              language,
              projectId,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Something went wrong"
        );
      }

      setResult(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const text =
      await file.text();

    setCode(text);

    const detectedLanguage =
      detectLanguage(
        file.name
      );

    setLanguage(
      detectedLanguage
    );
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-4xl font-bold">
        New Review
      </h1>

      <select
        value={projectId}
        onChange={(e) =>
            setProjectId(
            e.target.value
            )
        }
        className="border p-2 rounded"
        >
        <option value="">
            Select Project
        </option>

        {projects.map(
            (project) => (
            <option
                key={project.id}
                value={project.id}
            >
                {project.name}
            </option>
            )
        )}
        </select>

      <select
        value={language}
        onChange={(e) =>
          setLanguage(
            e.target.value
          )
        }
        className="border p-2 rounded"
      >
        <option>
          typescript
        </option>

        <option>
          javascript
        </option>

        <option>python</option>

        <option>java</option>
      </select>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Upload Source File
        </label>

        <input
          type="file"
          accept="
            .ts,
            .tsx,
            .js,
            .jsx,
            .py,
            .java,
            .go,
            .rs,
            .cpp,
            .c
          "
          onChange={
            handleFileUpload
          }
          className="block w-full"
        />
      </div>

      <div className="border rounded overflow-hidden">
        <Editor
          height="500px"
          language={language}
          value={code}
          onChange={(value) =>
            setCode(value ?? "")
          }
          theme="vs-dark"
          options={{
            minimap: {
              enabled: false,
            },

            fontSize: 14,

            automaticLayout: true,

            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <button
        onClick={
          handleReview
        }
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading
          ? loadingMessage
          : "Review Code"}
      </button>

      {loading && (
        <div className="rounded-lg border p-4">
          <p className="font-medium">
            {loadingMessage}
          </p>

          <div className="mt-3 h-2 overflow-hidden rounded bg-muted">
            <div className="h-full animate-pulse bg-foreground w-2/3" />
          </div>
        </div>
      )}

      {result && (
        <ReviewResultCard
          review={result}
        />
      )}
    </div>
  );
}