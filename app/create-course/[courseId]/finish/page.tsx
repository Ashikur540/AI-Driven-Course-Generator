"use client";

import { ClipboardCopy } from "lucide-react";
import Image from "next/image";
import React from "react";

import useCourseQuery from "@/hooks/query/useCourseQuery";
import { copyToClipboard } from "@/lib/utils";

export default function CourseCreationFinish({
  params,
}: {
  params: { courseId: string };
}) {
  const { data: courseData } = useCourseQuery(params.courseId);
  const { category, description, thumbnailImage, title } = courseData ?? {};
  const courseShareURL = `http://localhost:3000/course/view/${params.courseId}`;
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-50 p-8">
      <h1 className="text-2xl font-semibold text-blue-700 mb-8">
        Congrats!🎉 Your course is Ready
      </h1>

      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-screen-lg">
        {/* Course Details Section */}
        <div className="p-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>

          <p className="text-gray-600 mb-4">{description}</p>

          <div className="flex items-center space-x-2 mb-6">
            <span className="text-blue-600">🔒</span>
            <span className="text-blue-600 font-medium">{category}</span>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
            Start
          </button>
        </div>

        {/* Course Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src={thumbnailImage ?? ""}
            alt="Course Preview"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>

      {/* Course URL Section */}
      <div className="mt-6 w-full max-w-screen-lg">
        <label className="text-gray-600">Course URL:</label>
        <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-100">
          <input
            type="text"
            readOnly
            value={courseShareURL}
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
          <ClipboardCopy
            className="w-5 h-5 text-gray-600 cursor-pointer ml-2"
            onClick={() => copyToClipboard(courseShareURL)}
          />
        </div>
      </div>
    </div>
  );
}
