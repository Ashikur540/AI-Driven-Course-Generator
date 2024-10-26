import { ObjectId } from "mongoose";
import { CourseOptions } from "./onboarding.types";

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
};
