import { getProjects } from "@/actions/projects";
import ProjectForm from "@/components/project-form";
import Link from "next/link";
import { FolderKanban, ArrowRight, FileCode } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
            Workspace
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
            Projects
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your codebases and track review history.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProjectForm />
        </div>

        <div className="lg:col-span-2">
          {projects.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0d121e]/40 text-slate-500">
              <FolderKanban className="h-10 w-10 text-slate-600" />
              <p className="mt-3 text-sm">No projects yet. Create your first one.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="group card-panel-hover h-full">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500/20">
                        <FileCode className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-600 transition group-hover:text-emerald-400 group-hover:translate-x-0.5" />
                    </div>
                    <h2 className="mt-4 text-base font-semibold text-white">{project.name}</h2>
                    <p className="mt-1.5 line-clamp-2 text-sm text-slate-400">
                      {project.description || "No description"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
