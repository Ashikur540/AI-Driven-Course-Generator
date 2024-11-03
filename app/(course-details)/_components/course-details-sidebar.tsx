"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { CourseDetailsChapterBlock } from "./course-details-chapter-block";
import { useChaptersQuery } from "@/hooks/query/useChaptersQuery";

export const CourseDetailsSidebar = () => {
  const { courseId } = useParams() || {};

  const { data: courseChapters } = useChaptersQuery(courseId as string);

  return (
    <div className="hidden border-r bg-muted/40 md:block h-screen overflow-y-scroll">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 flex-shrink-0">
          <p className="flex justify-between items-center gap-4 font-semibold">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="">Course Chapters</span>
          </p>
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Course Progress</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start  text-sm font-medium ">
            {courseChapters?.map((chapter, index) => (
              <CourseDetailsChapterBlock
                key={String(chapter?._id)}
                chapter={chapter}
                courseId={String(courseId)}
                index={index}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
