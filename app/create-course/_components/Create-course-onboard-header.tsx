import { ChevronsRight } from "lucide-react";
import React from "react";

import { Progress } from "@/components/ui/progress";
import { onboardingStepsData } from "@/constants/onboarding.const";

export const CreateCourseOnboardHeader = () => {
  return (
    <div>
      <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white   rounded-lg dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 ">
        {onboardingStepsData.map((step, index) => (
          <li
            className={`flex items-center text-zinc-500 justify-center`}
            key={index}
          >
            <span
              className={`flex items-center shadow text-white justify-center w-8 h-8 me-2 text-xs border  rounded-md shrink-0 dark:border-blue-500 ${
                index === 0 ? "bg-zinc-800" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {index + 1}
            </span>
            {step.title}
            <ChevronsRight />
          </li>
        ))}
      </ol>
      <Progress className="shadow-sm" value={20} />
    </div>
  );
};
