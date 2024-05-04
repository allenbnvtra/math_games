import dbConnect from "@/lib/db/db";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      name,
      username,
      studentLRN,
      schoolName,
      password,
      confirmPassword,
    } = body;

    // Check if user already exist
    const isUserExist = await User.findOne({ username });

    if (isUserExist) {
      return NextResponse.json(
        {
          status: "fail",
          message: "User already exist. Please try to user other email.",
        },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      name,
      username,
      studentLRN,
      schoolName,
      password,
      confirmPassword,
    });

    newUser.password = undefined;

    return NextResponse.json(
      {
        status: "success",
        message: "New user created",
        data: newUser,
      },
      { status: 201 }
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
