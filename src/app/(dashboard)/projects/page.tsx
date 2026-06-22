import { getProjects } from "@/actions/projects";
import ProjectForm from "@/components/project-form";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-10">
      <section className="surface">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Projects</h1>
            <p className="mt-2 text-slate-400">
              Create and browse your tracked projects in a clear, polished workspace.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <ProjectForm />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`projects/${project.id}`}>
            <div className="group rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 transition hover:border-cyan-400/30 hover:bg-slate-900/90">
              <h2 className="text-xl font-semibold text-white group-hover:text-cyan-300">{project.name}</h2>
              <p className="mt-3 text-slate-300">{project.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
