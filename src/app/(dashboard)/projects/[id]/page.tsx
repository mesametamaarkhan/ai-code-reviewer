import { createClient } from "@/lib/supabase/server";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    return (
      <div className="p-10">
        Project not found
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        {project.name}
      </h1>

      <p className="mt-4">
        {project.description}
      </p>
    </div>
  );
}