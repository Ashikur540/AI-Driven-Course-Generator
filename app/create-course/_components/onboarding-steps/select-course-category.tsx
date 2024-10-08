import React from "react";

import { Button } from "@/components/ui/button";
import { courseCategoryData } from "@/constants/onboarding.const";
import { CourseInputChangeHandler } from "@/types/onboarding.types";

export const StepSelectCourseCategory = ({
  handleSelectCategory,
  selectedCategory,
}: {
  handleSelectCategory: CourseInputChangeHandler;
  selectedCategory: string;
}) => {
  return (
    <div className="flex flex-wrap justify-start items-start gap-4 mb-4">
      {courseCategoryData.map((category, index) => (
        <Button
          variant="outline"
          key={index}
          onClick={() => handleSelectCategory("courseCategory", category.name)}
          className={`${
            selectedCategory === category.name
              ? "ring-1 ring-offset-2 ring-offset-slate-200 ring-zinc-900"
              : ""
          }`}
        >
          {category.icon}
          <span>{category.name}</span>
        </Button>
      ))}
    </div>
  );
};
