// This provides hooks to get course data
// "use client";
import { getCourseById } from "@/server/actions/courses";
import { CourseType } from "@/server/model/course.model";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const COURSE_QUERY_KEY = "courses";

export default function useCourseQuery(
  courseId: string
): UseQueryResult<CourseType> {
  return useQuery({
    queryKey: [COURSE_QUERY_KEY, courseId],
    queryFn: () => getCourseById(courseId),
  });
}
