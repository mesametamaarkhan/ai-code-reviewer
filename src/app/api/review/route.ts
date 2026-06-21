import { NextResponse } from "next/server";

import { reviewCode }
  from "@/lib/ai/review-service";

import { createReview }
  from "@/actions/reviews";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      code,
      language,
      projectId,
    } = body;

    const review =
      await reviewCode(
        code,
        language
      );

    await createReview({
      projectId,
      language,
      code,
      score: review.score,
      aiReview: review,
    });

    return NextResponse.json(
      review
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Review generation failed",
      },
      {
        status: 500,
      }
    );
  }
}