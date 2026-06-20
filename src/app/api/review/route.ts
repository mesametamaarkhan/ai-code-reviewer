import { NextResponse } from "next/server";

import { reviewCode }
  from "@/lib/ai/review-service";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      code,
      language,
    } = body;

    const review =
      await reviewCode(
        code,
        language
      );

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