import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCourseGenAIPrompt({
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
export function getChapterContentAIPrompt({
  topicName,
  chapterName,
  topicDescription,
}: {
  topicName: string;
  chapterName: string;
  topicDescription: string;
}) {
  return `Explain the concept in details on topic: "${topicName}", chapter: "${chapterName}" in json format with list of array with field as title , explanation on given chapter in details, code example if required (Code field in <precode> format) if applicable. For more context on the topic you can follow this description: "${topicDescription}" to improve the content quality`;
}
