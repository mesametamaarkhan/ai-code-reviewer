import ReviewForm from "@/components/review-form";

import { getProjects } from "@/actions/projects";

export default async function NewReviewPage({
  searchParams,
}: {
  searchParams: Promise<{
    projectId?: string;
  }>;
}) {
  const projects = await getProjects();

  const { projectId } = await searchParams;

  return <ReviewForm projects={projects} initialProjectId={projectId} />;
}
