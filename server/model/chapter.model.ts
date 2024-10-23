import { CourseChapter } from "@/types/courses.types";
import { model, models } from "mongoose";
import { Schema } from "mongoose";

const ChapterSchema = new Schema<CourseChapter>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    courseId: { type: String, ref: "Course", required: true },
  },
  { timestamps: true }
);

const Chapter =
  models?.Chapter || model<CourseChapter>("Chapter", ChapterSchema);

export default Chapter;
