"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useCourseQuery from "@/hooks/query/useCourse";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EditCourseInfoModal } from "./edit-course-info-modal";

type CourseLayoutHeroProps = {
  courseId: string;
};

export const CourseLayoutHero = ({ courseId }: CourseLayoutHeroProps) => {
  const { data: courseData } = useCourseQuery(courseId);
  console.log(courseData);
  const { courseTitle, courseDescription, courseCategory } =
    courseData?.courseLayoutData ?? {};
  return (
    <div className="bg-zinc-100 md:max-w-screen-lg xl:max-w-screen-2xl mx-auto p-6 md:p-8 xl:p-12 mb-10">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 xl:gap-16">
        <div className="w-full md:w-1/2 space-y-4">
          {/* TODO: Make course dynamic page */}
          <Link href={`/courses/${courseCategory}`}>
            <Badge variant={"outline"}>{courseCategory}</Badge>
          </Link>
          <h2 className="text-2xl font-bold">
            {courseTitle} <EditCourseInfoModal courseId={courseId} />
          </h2>
          <p className="text-sm text-zinc-500">
            {courseDescription}
            <EditCourseInfoModal courseId={courseId} />
          </p>
          <Button>Start Course</Button>
        </div>
        <Image src="/placeholder.png" alt="course" width={400} height={320} />
      </div>
    </div>
  );
};
