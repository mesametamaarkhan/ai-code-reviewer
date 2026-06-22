"use client";

import { useState } from "react";
import { createProject } from "@/actions/projects";
import { useRouter } from "next/navigation";

export default function ProjectForm() {
  const router = useRouter();
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    try {
      await createProject(name, description);

      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-lg shadow-slate-950/10">
      <h2 className="text-xl font-semibold text-white">New Project</h2>
      <div className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
          className="input-field"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="input-field min-h-[120px] resize-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </div>
    </div>
  );
}
