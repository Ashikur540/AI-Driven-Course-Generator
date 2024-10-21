"use client";

import React from "react";

import { CourseChapterListCard } from "./course-chapter-list-card";
import { CourseChapter } from "@/types/courses.types";
import useCourseQuery from "@/hooks/query/useCourse";

export const CourseLessonsList = ({ courseId }: { courseId: string }) => {
  const { data: courseData } = useCourseQuery(courseId);
  const { chapters } = courseData?.courseLayoutData ?? {};
  return (
    <div className="flex flex-col gap-5 justify-start">
      {chapters?.map((chapter: CourseChapter, index: number) => (
        <CourseChapterListCard key={index} chapter={chapter} index={index} />
      ))}
    </div>
  );
};
