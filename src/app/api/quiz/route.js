import dbConnect from "@/lib/db/db";
import Quiz from "@/model/quiz";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const { numberOfItems, title } = body;

    const data = await Quiz.create({ numberOfItems, title });

    return NextResponse.json(
      {
        status: "success",
        message: "Quiz was created",
        data,
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
        message: "Something went wrong ! Please try again later",
      },
      { status: 400 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const data = await Quiz.find().sort({
      createdAt: -1,
    });

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
        message: "Failed to get quizzes",
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
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
}
