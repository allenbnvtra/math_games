import dbConnect from "@/lib/db/db";
import quizItem from "@/model/quizItem";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    console.log(params.quizId);

    const data = await quizItem.find({ quizID: params.quizId });

    return NextResponse.json(
      {
        status: "success",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to get quiz items",
      },
      { status: 400 }
    );
  }
}
