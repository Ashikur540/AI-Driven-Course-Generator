"use client";

import React from "react";

type CourseInfoBlockWithIconProps = {
  icon: React.ReactNode;
  text: string;
  value: string;
};

export const CourseInfoBlockWithIcon = ({
  icon,
  text,
  value,
}: CourseInfoBlockWithIconProps) => {
  return (
    <div className="flex justify-between text-sm text-zinc-700  items-center gap-5 border-b pb-3">
      <div className="flex justify-start gap-2">
        {icon}
        <span>{text}</span>
      </div>
      <p className="text-zinc-500">{value}</p>
    </div>
  );
};
