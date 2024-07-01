import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    const exsitUser = await User.findOne({ email: email });

    if (!exsitUser) {
      return NextResponse.json({ status: 401, message: "User not  exsit" });
    }

    const compearPassword = await bcrypt.compare(password, exsitUser.password);

    if (!compearPassword) {
      return NextResponse.json({ status: 401, message: "Password not match" });
    }

    return NextResponse.json({
      exsitUser,
      message: "User Login SuccessFully.",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error Login user",
      status: 500,
    });
  }
}
