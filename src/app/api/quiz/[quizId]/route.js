import dbConnect from "@/lib/db/db";
import quizItem from "@/model/quizItem";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    await dbConnect();

    const body = await request.json();
    const quizItemsData = body.formData;

    const createdQuizItems = [];

    for (const itemData of quizItemsData) {
      const id = params.quizId;
      const { question, answer, questionNumber, quizID } = itemData;

      if (!quizID) request.body.quizID = id;

      const createdItem = await quizItem.create({
        question,
        answer,
        questionNumber,
        quizID: request.body.quizID,
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
    console.log(error);

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
