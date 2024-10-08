export type CourseOptions = {
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  chaptersNo: number;
  includeVideo: boolean;
};

export type OnboardingInputs = {
  courseCategory: string;
  courseTitle: string;
  courseDescription: string;
  courseOptions: CourseOptions;
};

export type CourseInputChangeHandler = (
  key: keyof OnboardingInputs | keyof CourseOptions,
  value: string
) => void;
