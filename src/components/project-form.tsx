"use client";

import { useState } from "react";
import { createProject } from "@/actions/projects";
import { useRouter } from "next/navigation";
import { Plus, FolderPlus } from "lucide-react";

export default function ProjectForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    setLoading(true);

    try {
      await createProject(name, description);
      setName("");
      setDescription("");
      router.refresh();
    } catch {
      setError("Failed to create project");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/[0.06] bg-[#0d121e]/60 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          <FolderPlus className="h-4 w-4" />
        </div>
        <h2 className="text-base font-semibold text-white">New Project</h2>
      </div>

      <div className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          className="input-field"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
          className="input-field resize-none"
        />

        {error && (
          <p className="text-xs text-rose-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          {loading ? "Creating..." : "Create Project"}
        </button>
      </div>
    </form>
  );
}
