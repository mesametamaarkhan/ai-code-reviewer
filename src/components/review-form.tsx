"use client";

import { ReviewResult } from "@/lib/ai/types";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
}

interface ReviewFormProps {
  projects: Project[];
}

export default function ReviewForm({
  projects,
}: ReviewFormProps) {
  const [code, setCode] =
    useState("");

  const [language, setLanguage] =
    useState("typescript");

    const [projectId, setProjectId] =
  useState(
    projects[0]?.id ?? ""
  );

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<ReviewResult | null>(null);

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

      setResult(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
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

      <textarea
        value={code}
        onChange={(e) =>
          setCode(
            e.target.value
          )
        }
        className="w-full h-96 border p-4 rounded"
      />

      <button
        onClick={
          handleReview
        }
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading
          ? "Reviewing..."
          : "Review Code"}
      </button>

      {result && (
        <pre className="border rounded p-4 overflow-auto">
          {JSON.stringify(
            result,
            null,
            2
          )}
        </pre>
      )}
    </div>
  );
}