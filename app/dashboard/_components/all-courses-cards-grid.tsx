"use client";
import React from "react";

import { useCoursesOfUserQuery } from "@/hooks/query/useCourseQuery";
import { CourseCard } from "./course-card";
import { useFormContext } from "react-hook-form";
import { DashboardFormInputType } from "../providers/dashboard-form-provider";
import { SkeletonCard } from "./skeletons/course-card-skeleton";

export default function AllCoursesCardsGrid() {
  const { watch } = useFormContext<DashboardFormInputType>();
  // const searchQuery = watch("searchText");
  // const sortBy = watch("sortBy");
  const { data: courses, isLoading } = useCoursesOfUserQuery({
    queryText: watch("queryText"),
    sortBy: watch("sortBy"),
  });

  return (
    <div className="mt-10 lg:mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {isLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </>
        ) : courses?.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-full mx-auto col-span-4 h-full">
            <img
              src="/no-courses-found.svg"
              className="mx-auto max-w-[200px] w-full mb-10 mt-20"
              alt="no-courses-found-image"
            />
            <h1 className="text-2xl text-gray-500">
              No courses found!. Try different keyword
            </h1>
          </div>
        ) : (
          courses?.map((course) => (
            <CourseCard key={String(course?._id)} course={course} />
          ))
        )}
      </div>
    </div>
  );
}
