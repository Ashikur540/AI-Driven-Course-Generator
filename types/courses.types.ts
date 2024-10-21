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
  title: string;
  description: string;
  duration: string;
};
