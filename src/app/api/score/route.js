import dbConnect from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(options);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Unauthorized access",
        },
        { status: 401 }
      );
    }
    await dbConnect();
    const body = await req.json();
    const { score } = body;

    const user = await User.findById({ _id: session.user.id });

    const updatedScore = parseInt(score) + user.totalPoints;

    if (isNaN(updatedScore)) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Invalid score",
        },
        { status: 400 }
      );
    }

    const updateUser = await User.findOneAndUpdate(
      {
        _id: session.user.id,
      },
      { totalPoints: updatedScore },
      { new: true }
    );

    if (!updateUser) {
      return NextResponse.json(
        {
          status: "fail",
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Score updated successfully",
        data: updateUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating score:", error);
    return NextResponse.json(
      {
        status: "fail",
        message: "Something went wrong! Please try again later",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find({}, "name score")
      .sort({ score: -1 })
      .limit(5);

    const leaderboard = users.map((user) => ({
      name: user.name,
      score: user.score,
    }));

    return NextResponse.json({ status: "success", leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { status: "fail", message: "Error fetching leaderboard" },
      { status: 500 }
    );
  }
}
