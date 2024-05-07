import dbConnect from "../../../../lib/db/db";
import quizItem from "../../../../model/quizItem";
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

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { quizId } = params;
    const body = await req.json();
    const { answers, question } = body;

    const updatedAnswers = Array.isArray(answers) ? answers : [answers];

    console.log(updatedAnswers);

    const updatedItem = await quizItem.findByIdAndUpdate(
      quizId,
      { answers: updatedAnswers, question },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Quiz item not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: updatedItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to update quiz item",
      },
      { status: 500 }
    );
  }
}
