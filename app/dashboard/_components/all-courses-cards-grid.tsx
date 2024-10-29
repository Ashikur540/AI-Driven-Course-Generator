"use client";
import React from "react";

import { useCoursesOfUserQuery } from "@/hooks/query/useCourseQuery";
import { CourseCard } from "./course-card";
import { useFormContext } from "react-hook-form";
import { DashboardFormInputType } from "../providers/dashboard-form-provider";
import { SkeletonCard } from "./skeletons/course-card-skeleton";

export default function AllCoursesCardsGrid() {
  const { data: courses, isLoading } = useCoursesOfUserQuery();
  const { watch } = useFormContext<DashboardFormInputType>();
  const searchQuery = watch("searchText");
  console.log(searchQuery);
  return (
    <div className="mt-10 lg:mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {isLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </>
        ) : (
          courses?.map((course) => (
            <CourseCard key={String(course?._id)} course={course} />
          ))
        )}
      </div>
    </div>
  );
}
