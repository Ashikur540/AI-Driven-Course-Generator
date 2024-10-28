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
  The course must be ${duration} long and should have ${chaptersNo} chapters in JSON format. This json should include CourseTitle, CourseDescription, CourseCategory,CourseDuration,CourseLevel, requirementList as a form of array, learningOutcomes array and a chapters array which should an array of object with following properties: title, description, duration, ytSearchQuery (this will be the search query for searching that topic on youtube). You should paraphrase the course title and description and make it more engaging and interesting. Keep in mind always give same format of json response and use camel case for all the fields. `;
}
// export function getChapterContentAIPrompt({
//   topicName,
//   chapterName,
//   topicDescription,
// }: {
//   topicName: string;
//   chapterName: string;
//   topicDescription: string;
// }) {
//   return `Explain the concept on topic: "${topicName}", chapter: "${chapterName}" with detailed explanation on given chapter and return a json response with list of array field as topicName and content where content. Also include code example or diagram example if applicable (code field in <precode> format). Don't include the chapterName or the topicName into the markdown response. Just provide the actual content. For more context on the topic you can follow this description: "${topicDescription}" to improve the content quality`;
// }
export function getChapterContentAIPrompt({
  topicName,
  chapterName,
  topicDescription,
}: {
  topicName: string;
  chapterName: string;
  topicDescription: string;
}) {
  return `Explain the concept on topic: "${topicName}", chapter: "${chapterName}" with detailed explanation on given chapter and return a json response with an object field content where content is string type but written in markdown style. Also include code example or diagram example if applicable. Don't include the chapterName or the topicName into the markdown response. Just provide the actual content. For more context on the topic you can follow this description: "${topicDescription}" to improve the content quality`;
}

export function copyToClipboard(text: string) {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in older browsers
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      console.log("Fallback: Text copied to clipboard");
    } catch (err) {
      console.error("Fallback: Unable to copy", err);
    }

    document.body.removeChild(textArea);
    return;
  }

  // Modern clipboard API
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Text successfully copied to clipboard");
    },
    (err) => {
      console.error("Error in copying text: ", err);
    }
  );
}
