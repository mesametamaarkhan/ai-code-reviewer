import ReviewForm from "@/components/review-form";
import { getProjects } from "@/actions/projects";

export default async function NewReviewPage() {
  const projects = await getProjects();

  return (
    <ReviewForm
      projects={projects}
    />
  );
}