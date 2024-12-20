import { ObjectId } from "mongoose";
import { CourseOptions } from "./onboarding.types";
import { CourseType } from "@/server/model/course.model";
import { z } from "zod";
import { dashboardFormSchema } from "@/app/dashboard/providers/dashboard-form-provider";

export type CourseLayoutData = {
  courseTitle: string;
  courseDescription: string;
  courseCategory: string;
  courseDuration: string;
  courseLevel: CourseOptions["difficultyLevel"];
  requirementList: string[];
  learningOutcomes: string[];
  chapters: CourseChapter[];
};

export type CourseChapter = {
  courseId: ObjectId; // reference to the course
  title: string;
  description: string;
  duration: string;
  content: string;
  ytSearchQuery: string;
  ytVideoId?: string;
};

export type CourseRes = CourseType & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type GetCourseByUserIDParams = {
  queryText: z.infer<typeof dashboardFormSchema>["queryText"];
  sortBy: z.infer<typeof dashboardFormSchema>["sortBy"];
};
