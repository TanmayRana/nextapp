import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextResponse) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();
    console.log(name, email, password);

    const exsitUser = await User.findOne({ email: email });
    console.log(exsitUser);

    if (exsitUser) {
      return NextResponse.json({ status: 401, message: "user already exsit" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    return NextResponse.json({
      newUser,
      message: "Account Created SuccessFully. Please signIn to your account",
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Error Registering user",
      status: 500,
    });
  }
}
