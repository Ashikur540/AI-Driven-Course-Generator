import React from "react";

import { Button } from "@/components/ui/button";
import { courseCategoryData } from "@/constants/onboarding.const";

import { useFormContext } from "react-hook-form";

export const StepSelectCourseCategory = () => {
  const { setValue, getValues } = useFormContext();
  const selectedCourseCategory = getValues("courseCategory");

  return (
    <div className="flex flex-wrap justify-start items-start gap-4 mb-4">
      {courseCategoryData.map((category, index) => (
        <Button
          variant="outline"
          key={index}
          onClick={() =>
            setValue("courseCategory", category.name, { shouldDirty: true })
          }
          className={`${
            selectedCourseCategory === category.name
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
