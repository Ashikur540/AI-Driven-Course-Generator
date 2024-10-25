import { Schema, model, models } from "mongoose";
import { z } from "zod";

import { courseSchema } from "@/lib/validationSchemas";
import { ObjectId } from "mongoose";

export type CourseType = {
  title: z.infer<typeof courseSchema>["courseTitle"];
  description: z.infer<typeof courseSchema>["courseDescription"];
  category: z.infer<typeof courseSchema>["courseCategory"];
  duration: string;
  level: z.infer<typeof courseSchema>["courseOptions"]["difficultyLevel"];
  chaptersNo: z.infer<typeof courseSchema>["courseOptions"]["chaptersNo"];
  videoIncluded: boolean;
  courseCreator: ObjectId;
  learningOutcomes: string[];
  requirements: string[];
  thumbnailImage?: string;
};

const CourseSchema = new Schema<CourseType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    chaptersNo: { type: Number, required: true },
    learningOutcomes: { type: [String], required: true },
    videoIncluded: { type: Boolean, required: true },
    requirements: { type: [String], required: true },
    courseCreator: { type: Schema.Types.ObjectId, ref: "User" },
    thumbnailImage: { type: String, default: "" },
  },
  { timestamps: true }
);

const Course = models?.Course || model<CourseType>("Course", CourseSchema);

export default Course;
