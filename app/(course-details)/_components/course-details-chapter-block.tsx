import { Clock } from "lucide-react";
import React from "react";
import { ChapterRes } from "../../../hooks/query/useChaptersQuery";
import Link from "next/link";
import { useParams } from "next/navigation";

type ChapterProps = {
  chapter: ChapterRes;
  index: number;
  courseId: string;
};

export const CourseDetailsChapterBlock = ({
  chapter,
  index,
  courseId,
}: ChapterProps) => {
  const urlParams = useParams();
  const { chapterId } = urlParams ?? {};

  const isActive = (chapterId as string) === String(chapter._id);
  return (
    <Link
      href={`/dashboard/courses/${courseId}/chapter/${chapter._id}`}
      replace
      className={`flex flex-col items-start gap-3 rounded-lg px-3 lg:px-5 py-2  transition-all hover:text-blue-700  border-b  cursor-pointer hover:bg-white ${
        isActive ? "text-blue-700 bg-slate-100" : "text-muted-foreground"
      }`}
    >
      <div className={`flex justify-start items-start gap-2 `}>
        <div className="bg-black text-white w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0">
          <p className="text-sm">{index + 1}</p>
        </div>
        <div className="flex-col justify-start items-start gap-2">
          <p className="text-lg font-semibold">{chapter.title}</p>
          <p className="text-sm text-zinc-500 flex items-center gap-2 mt-2">
            <Clock size={18} /> {chapter.duration}
          </p>
        </div>
      </div>
    </Link>
  );
};
