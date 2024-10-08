import React from "react";

type CreateCourseOnboardBodyHeader = {
  title: string;
  description: string;
  current: number;
  total: number;
};

export const CreateCourseOnboardBodyHeader = ({
  title,
  description,
  current,
  total,
}: CreateCourseOnboardBodyHeader) => {
  return (
    <div className="flex flex-col justify-start items-start gap-1 mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
        <span className="text-zinc-600  text-sm pl-2">
          ({current}/{total})
        </span>
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};
