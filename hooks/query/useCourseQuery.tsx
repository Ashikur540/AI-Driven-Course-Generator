// This provides hooks to get course data
// "use client";

import {
  getCourseById,
  getCoursesByUserId,
} from "@/server/actions/courses.action";
import { CourseType } from "@/server/model/course.model";
import { CourseRes, GetCourseByUserIDParams } from "@/types/courses.types";
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

export function useCoursesOfUserQuery({
  queryText,
  sortBy,
}: GetCourseByUserIDParams): UseQueryResult<CourseRes[]> {
  return useQuery({
    queryKey: [COURSE_QUERY_KEY, queryText, sortBy],
    queryFn: () => getCoursesByUserId({ queryText, sortBy }),
  });
}
