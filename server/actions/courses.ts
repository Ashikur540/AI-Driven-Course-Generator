"use server";

import { courseSchema } from "@/lib/validationSchemas";
import { CourseInputs } from "@/types/onboarding.types";
import Course, { CourseType } from "../model/course.model";
import { auth } from "@clerk/nextjs/server";
import User from "../model/user.modal";
import connectToDB from "@/lib/dbconnect";
import { CourseLayoutData } from "@/types/courses.types";

export async function saveCourseToDB(
  courseInputs: CourseInputs,
  courseLayoutData: CourseLayoutData
) {
  const {
    courseTitle,
    courseCategory,
    courseDescription,
    chapters,
    courseDuration,
    courseLevel,
  } = courseLayoutData;
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
    //  here we are saving the AI generated course layout data to the database
    const newCourse = await Course.create({
      title: courseTitle,
      category: courseCategory,
      chaptersNo: chapters?.length,
      duration: courseDuration,
      difficultyLevel: courseLevel,
      description: courseDescription,
      level: courseLevel,
      courseLayoutData: courseLayoutData,
      videoIncluded: data.courseOptions.includeVideo,
      courseCreator: user?._id,
    } as CourseType);
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    console.log(error);
  }
}

export async function getCourseById(courseId: string) {
  await connectToDB();
  const course = await Course.findById(courseId);
  return JSON.parse(JSON.stringify(course));
}
