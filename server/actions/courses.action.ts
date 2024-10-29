"use server";

import { courseSchema } from "@/lib/validationSchemas";
import { CourseInputs } from "@/types/onboarding.types";
import Course, { CourseType } from "../model/course.model";
import { auth } from "@clerk/nextjs/server";
import User from "../model/user.modal";
import connectToDB from "@/lib/dbconnect";
import Chapter from "../model/chapter.model";
import { CourseChapter, CourseLayoutData } from "@/types/courses.types";

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
    learningOutcomes,
    requirementList,
  } = courseLayoutData || {};
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
      videoIncluded: data.courseOptions.includeVideo,
      courseCreator: user?._id,
      learningOutcomes: learningOutcomes,
      requirements: requirementList,
      thumbnailImage: "",
    } as CourseType);

    //  also save the chapters separately
    if (chapters) {
      for (const chapter of chapters) {
        const chapterData: CourseChapter = {
          title: chapter.title,
          description: chapter.description,
          duration: chapter.duration,
          ytSearchQuery: chapter.ytSearchQuery,
          content: chapter.content,
          courseId: newCourse?._id,
        };
        await Chapter.create(chapterData);
      }
    }

    //  also save id the course to the users data for relation
    await User.findByIdAndUpdate(
      user._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCourseById(courseId: string) {
  await connectToDB();
  const course = await Course.findById(courseId).populate("courseCreator");
  return JSON.parse(JSON.stringify(course));
}

// this function updates the course info like title description or even chapters details like chapter title description etc
export async function updateCourseInfo(
  courseId: string,
  courseInfo: Partial<CourseType>
) {
  await connectToDB();
  //  check if logged in or not
  const { userId: clerkId } = auth();
  if (!clerkId) throw new Error("Unauthorized");

  //  check if course exists
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  // update the course info
  const updatedCourse = await Course.findByIdAndUpdate(courseId, courseInfo, {
    new: true,
  });
  return JSON.parse(JSON.stringify(updatedCourse));
}

// get users created all the courses
export async function getCoursesByUserId() {
  try {
    await connectToDB();
    const { userId: clerkId, redirectToSignIn } = auth();
    if (!clerkId) redirectToSignIn();
    // get userID from database
    const userId = await User.findOne({ clerkId }).select("_id");
    const course = await Course.find({ courseCreator: userId });
    return course;
  } catch (error) {
    throw error;
  }
}

// search API for courses

export async function searchCourses(searchQuery: string) {
  await connectToDB();
  // check if logged in or not
  const { userId: clerkId, redirectToSignIn } = auth();
  if (!clerkId) redirectToSignIn();

  const courses = await Course.find({
    $text: { $search: searchQuery },
  });
  return courses;
}
