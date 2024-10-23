"use client";

import React from "react";

import { CourseChapterListCard } from "./course-chapter-list-card";
import { ChapterRes, useChaptersQuery } from "@/hooks/query/useChaptersQuery";

export const CourseLessonsList = ({ courseId }: { courseId: string }) => {
  const { data: chaptersData } = useChaptersQuery(courseId);

  return (
    <div className="flex flex-col gap-5 justify-start">
      {chaptersData?.map((chapter: ChapterRes, index: number) => (
        <CourseChapterListCard key={index} chapter={chapter} index={index} />
      ))}
    </div>
  );
};
