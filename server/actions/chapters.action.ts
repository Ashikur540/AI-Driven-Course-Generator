"use server";

import connectToDB from "@/lib/dbconnect";
import Chapter from "../model/chapter.model";
import { CourseChapter } from "@/types/courses.types";
import { ChapterRes } from "@/hooks/query/useChaptersQuery";
import { auth } from "@clerk/nextjs/server";

export async function getChaptersById(
  courseId: string
): Promise<CourseChapter[]> {
  await connectToDB();
  const { userId, redirectToSignIn } = auth();
  if (!userId) {
    redirectToSignIn();
    // throw new Error("Unauthorized");
  }
  const chapters = await Chapter.find({ courseId });
  return JSON.parse(JSON.stringify(chapters));
}

export async function getChapterById(
  chapterId: string
): Promise<CourseChapter> {
  await connectToDB();
  const { userId, redirectToSignIn } = auth();
  if (!userId) {
    redirectToSignIn();
    // throw new Error("Unauthorized");
  }
  const chapter = await Chapter.findOne({ _id: chapterId });
  return JSON.parse(JSON.stringify(chapter));
}

// this function updates the course info like title description or even chapters details like chapter title description etc
export async function updateChapterInfo(
  chapterId: string,
  chapterInfo: Partial<ChapterRes>
) {
  try {
    await connectToDB();
    //  check if logged in or not
    const { userId, redirectToSignIn } = auth();
    if (!userId) {
      redirectToSignIn();
      // throw new Error("Unauthorized");
    }

    //  check if chapter exists
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) throw new Error("Chapter not found!");

    // update the chapter info
    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      chapterInfo,
      {
        new: true,
      }
    );
    return JSON.parse(JSON.stringify(updatedChapter));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
