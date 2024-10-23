// This provides hooks to get chapters data using that course ID
import {
  getChapterById,
  getChaptersById,
} from "@/server/actions/chapters.action";
import { CourseChapter } from "@/types/courses.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ObjectId } from "mongoose";

export const CHAPTERS_QUERY_KEY = "chapters";

export type ChapterRes = CourseChapter & { _id: ObjectId };

export function useChaptersQuery(
  courseId: string
): UseQueryResult<ChapterRes[]> {
  return useQuery({
    queryKey: [CHAPTERS_QUERY_KEY, courseId],
    queryFn: () => getChaptersById(courseId),
  });
}

export function useChapterQuery(
  chapterID: string
): UseQueryResult<CourseChapter> {
  return useQuery({
    queryKey: [CHAPTERS_QUERY_KEY, chapterID],
    queryFn: () => getChapterById(chapterID),
  });
}
