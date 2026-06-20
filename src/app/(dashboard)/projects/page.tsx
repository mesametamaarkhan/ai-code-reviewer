import { getProjects } from "@/actions/projects";
import ProjectForm from "@/components/project-form";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-10">
        <ProjectForm />

      <h1 className="text-4xl font-bold mb-8">
        Projects
      </h1>

      <div className="space-y-4">
        {projects.map((project) => (
          <Link href={`projects/${project.id}`} key={project.id}>
            <div
              key={project.id}
              className="border rounded p-4"
            >
              <h2 className="font-bold">
                {project.name}
              </h2>

              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}