import dbConnect from "../../../../lib/db/db";
import Quiz from "../../../../model/quiz";
import quizItem from "../../../../model/quizItem";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    await dbConnect();

    const body = await request.json();
    const quizItemsData = body.formData;
    const quizId = params.quizId;

    const createdQuizItems = [];

    for (const itemData of quizItemsData) {
      const { question, answers, correctAnswer } = itemData;

      const createdItem = await quizItem.create({
        question,
        answers,
        correctAnswer,
        quizID: quizId,
      });

      createdQuizItems.push(createdItem);
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Quiz items were created",
        data: createdQuizItems,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again later",
      },
      { status: 400 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const data = await quizItem.find({ id: params.quizId });

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

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const result = await Quiz.findByIdAndDelete(params.quizId);
    console.log("Deleted quiz:", result);
    return NextResponse.json({
      status: "success",
      result,
    });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to get quiz items",
      },
      { status: 400 }
    );
  }
}
