import { courseSchema } from "@/lib/validationSchemas";
import { z } from "zod";

export type CourseDuration = {
  time: number;
  unit: "hour" | "minute";
};

export type CourseOptions = {
  difficultyLevel: "beginner" | "intermediate" | "advanced";
  duration: CourseDuration;
  chaptersNo: number;
  includeVideo: boolean;
};

export type OnboardingInputs = {
  courseCategory: string;
  courseTitle: string;
  courseDescription: string;
  courseOptions: CourseOptions;
};

export type CourseInputs = z.infer<typeof courseSchema>;

// export type CourseInputChangeHandler = (
//   key: keyof OnboardingInputs | keyof CourseOptions,
//   value: string | number | CourseDuration
// ) => void;
