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
  The course must be ${duration} long and should have ${chaptersNo} chapters in JSON format. This json should include CourseTitle, CourseDescription, CourseCategory,CourseDuration,CourseLevel, requirementList as a form of array, learningOutcomes array and a chapters array which should an array of object with following properties: title, description, duration. You should paraphrase the course title and description and make it more engaging and interesting. Keep in mind always give same format of json response and use camel case for all the fields. `;
}
