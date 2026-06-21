"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteReview } from "@/actions/reviews";

interface Props {
  reviewId: string;
}

export default function DeleteReviewButton({ reviewId }: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm("Delete this review?");

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
      className="rounded border px-4 py-2"
    >
      {pending ? "Deleting..." : "Delete Review"}
    </button>
  );
}
