import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCourseGenAIPrompt({
  courseCategory,
  courseTitle,
  courseDescription,
  duration,
  chaptersNo,
  level,
}: {
  courseCategory: string;
  courseTitle: string;
  courseDescription: string;
  duration: string;
  chaptersNo: number;
  level: string;
}) {
  return `
  Create a comprehensive course tutorial on "${courseCategory}" category on topic: "${courseTitle}" for ${level} level learners.
  ${
    courseDescription &&
    `This is some description or some context about the course: ${courseDescription}`
  }.
  The course must be ${duration} long and should have ${chaptersNo} chapters in JSON format. Also include course title, description, category,duration,level and requirement list as a form of array and learning outcomes array as fields in that JSON format.`;
}
