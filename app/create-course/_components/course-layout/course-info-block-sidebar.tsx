"use client";

import React from "react";
import { Book, ChartBar, Clock, Globe, Share2, Video } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CourseInfoBlockWithIcon } from "./course-info-block-with-icon";
import useCourseQuery from "@/hooks/query/useCourse";

export const CourseInfoBlockSidebar = ({ courseId }: { courseId: string }) => {
  const { data: courseData } = useCourseQuery(courseId);
  const { chapters, courseDuration, courseLevel } =
    courseData?.courseLayoutData ?? {};

  return (
    <Card className="bg-gray-50 p-4 rounded-md max-w-sm w-full">
      {/* <div className="bg-zinc-50 p-4 rounded-md max-w-sm w-full"> */}
      <h5 className="text-lg font-bold">Course Includes</h5>

      <div className="flex flex-col gap-2 mt-5">
        <CourseInfoBlockWithIcon
          icon={<Book size={18} />}
          text="Chapters"
          value={`${chapters?.length ?? ""}`}
        />
        <CourseInfoBlockWithIcon
          icon={<Clock size={18} />}
          text="Duration"
          value={courseDuration ?? ""}
        />
        <CourseInfoBlockWithIcon
          icon={<ChartBar size={18} />}
          text="Level"
          value={courseLevel ?? ""}
        />
        <CourseInfoBlockWithIcon
          icon={<Video size={18} />}
          text="Video Included"
          value={courseData?.videoIncluded ? "Yes" : "No"}
        />
        <CourseInfoBlockWithIcon
          icon={<Globe size={18} />}
          text="Language"
          value={"English"}
        />

        <p className="text-sm text-blue-800 flex items-center gap-2">
          <Share2 size={18} /> Share this course
        </p>
      </div>
      {/* </div> */}
    </Card>
  );
};
