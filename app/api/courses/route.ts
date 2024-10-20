import connectToDB from "@/lib/dbconnect";
import { courseSchema } from "@/lib/validationSchemas";
import Course from "@/server/model/course.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const users = await Course.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const bodyData = await req.json();
  const { error } = courseSchema.safeParse(bodyData);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({
    message: "Course created successfully",
    user: bodyData,
  });
}
