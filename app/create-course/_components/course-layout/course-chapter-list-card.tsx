import { Clock } from "lucide-react";
import React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { EditChapterInfoModal } from "./edit-chapter-info-modal";
import { ChapterRes } from "@/hooks/query/useChaptersQuery";

export const CourseChapterListCard = ({
  chapter,
  index,
}: {
  chapter: ChapterRes; // its the response type form mongodb database
  index: number;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-4">
        <div className="bg-black text-white w-10 h-10 rounded-md flex items-center justify-center">
          <p className="text-sm">{index + 1}</p>
        </div>
        <div className="flex flex-col gap-2 justify-start">
          <CardTitle>
            {chapter.title}{" "}
            <EditChapterInfoModal chapterId={String(chapter?._id)} />
          </CardTitle>
          <CardDescription className="text-sm text-zinc-500 mb-2">
            <p> {chapter.description}</p>
            <p className="text-sm text-zinc-500 flex items-center gap-2 mt-2">
              <Clock size={18} /> {chapter.duration}
            </p>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};
