"use client";
import React from "react";
import { ListItemWithCheckIcon } from "./list-item-with-check-icon";
import useCourseQuery from "@/hooks/query/useCourseQuery";

export const CourseLearnings = ({ courseId }: { courseId: string }) => {
  const { data: courseData } = useCourseQuery(courseId);
  const { learningOutcomes } = courseData ?? {};
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">What you will learn</h2>
      <ul className="list-disc list-inside space-y-2">
        {learningOutcomes?.map((outcome: string) => (
          <ListItemWithCheckIcon key={outcome} text={outcome} />
        ))}
      </ul>
    </div>
  );
};
