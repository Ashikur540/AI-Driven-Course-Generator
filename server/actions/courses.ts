"use server";

import { courseSchema } from "@/lib/validationSchemas";
import { CourseInputs } from "@/types/onboarding.types";
import Course, { CourseType } from "../model/course.model";
import { auth } from "@clerk/nextjs/server";
import User from "../model/user.modal";
import connectToDB from "@/lib/dbconnect";

export async function createCourse(
  courseInputs: CourseInputs,
  courseLayoutData: object
) {
  try {
    await connectToDB();
    const { userId: clerkId } = auth();
    const { error, data } = courseSchema.safeParse(courseInputs);
    if (error) {
      throw new Error(error.message);
    }
    const user = await User.findOne({ clerkId }).select("_id");
    if (!user) {
      throw new Error("User not found");
    }
    const newCourse = await Course.create({
      title: data.courseTitle,
      category: data.courseCategory,
      chaptersNo: data.courseOptions.chaptersNo,
      duration: `${data.courseOptions.duration.time} ${data.courseOptions.duration.unit}`,
      difficultyLevel: data.courseOptions.difficultyLevel,
      description: data.courseDescription,
      level: data.courseOptions.difficultyLevel,
      courseLayoutData: courseLayoutData,
      videoIncluded: data.courseOptions.includeVideo,
      courseCreator: user?._id,
    } as CourseType);
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    console.log(error);
  }
}
