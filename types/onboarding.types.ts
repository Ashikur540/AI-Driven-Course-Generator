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

// export type CourseInputChangeHandler = (
//   key: keyof OnboardingInputs | keyof CourseOptions,
//   value: string | number | CourseDuration
// ) => void;
