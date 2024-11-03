"use client";

import { useChapterQuery } from "@/hooks/query/useChaptersQuery";
import { ObjectId } from "mongoose";
import React from "react";

export default function ChapterDetailsPage({
  params,
}: {
  params: { chapterId: ObjectId };
}) {
  const { data: chapterData } = useChapterQuery(String(params?.chapterId));
  const { title, description } = chapterData ?? {};

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black/80 mb-2">{title}</h1>
      <p className="text-gray-600 mb-4 test-sm">{description}</p>
    </div>
  );
}
