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
  courseLayoutData: object;
  videoIncluded: boolean;
  courseCreator: ObjectId;
};

const CourseSchema = new Schema<CourseType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    chaptersNo: { type: Number, required: true },
    courseLayoutData: { type: Object, required: true },
    videoIncluded: { type: Boolean, required: true },
    courseCreator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Course = models?.Course || model<CourseType>("Course", CourseSchema);

export default Course;
