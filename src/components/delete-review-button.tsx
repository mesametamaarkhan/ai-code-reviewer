"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteReview } from "@/actions/reviews";
import { Trash2 } from "lucide-react";

interface Props {
  reviewId: string;
}

export default function DeleteReviewButton({ reviewId }: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm("Delete this review? This cannot be undone.");

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await deleteReview(reviewId);

      router.push("/reviews");

      router.refresh();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="btn-danger gap-2"
    >
      <Trash2 className="h-4 w-4" />
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
