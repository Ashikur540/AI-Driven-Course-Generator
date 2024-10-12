"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useState } from "react";

import { CreateCourseOnboardHeader } from "./_components/Create-course-onboard-header";
import { Button } from "@/components/ui/button";
import { CreateCourseOnboardBodyHeader } from "./_components/course-onboard-body-header";
import { StepSelectCourseCategory } from "./_components/onboarding-steps/select-course-category";
import { onboardingStepsData } from "@/constants/onboarding.const";
import { StepCourseTitleAndDescription } from "./_components/onboarding-steps/course-title-description";
import {
  CourseDuration,
  CourseOptions,
  OnboardingInputs,
} from "@/types/onboarding.types";
import { StepSelectCourseOptions } from "./_components/onboarding-steps/course-options";
import { createCourseValidationSchema } from "@/lib/validationSchema";

function CreateCourse() {
  const [onboardingSteps, setOnboardingSteps] = useState(onboardingStepsData);
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingInputs, setOnboardingInputs] = useState<OnboardingInputs>({
    courseCategory: "",
    courseTitle: "",
    courseDescription: "",
    courseOptions: {
      difficultyLevel: "beginner",
      duration: {
        time: 1,
        unit: "hour",
      },
      chaptersNo: 0,
      includeVideo: true,
    },
  });

  // handlers
  const handleCourseInputs = useCallback(
    (
      key: keyof OnboardingInputs | keyof CourseOptions | keyof CourseDuration,
      value: string | number | CourseDuration
    ) => {
      setOnboardingInputs((prev) => {
        if (key === "duration") {
          return {
            ...prev,
            courseOptions: {
              ...prev.courseOptions,
              duration: value as CourseDuration,
            },
          };
        } else if (key in prev.courseOptions) {
          return {
            ...prev,
            courseOptions: {
              ...prev.courseOptions,
              [key]: value,
            },
          };
        }
        return { ...prev, [key]: value };
      });
    },
    []
  );

  console.log("onboardingInputs", onboardingInputs);

  const handleSubmitCreateCourse = useCallback(() => {
    const result = createCourseValidationSchema.safeParse(onboardingInputs);
    console.log("result", result);
    if (!result.success) {
      console.log("result not success", result.error.flatten().fieldErrors);
    }
  }, [onboardingInputs]);
  const handleNextStep = useCallback(() => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep((prev) => prev + 1);
      setOnboardingSteps((prev) => {
        return prev.map((step, index) => {
          if (index + 1 <= currentStep) {
            return { ...step, isCompleted: true };
          }
          return step;
        });
      });
    }
    if (currentStep === onboardingSteps.length) {
      handleSubmitCreateCourse();
    }
  }, [currentStep, onboardingSteps.length, handleSubmitCreateCourse]);

  // console.log(
  //   "✨ ~ file: page.tsx:64 ~ CreateCourse ~ onboardingSteps",
  //   onboardingSteps
  // );

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setOnboardingSteps((prev) => {
        return prev.map((step, index) => {
          return index + 1 >= currentStep
            ? { ...step, isCompleted: false }
            : step;
        });
      });
    }
  }, [currentStep]);

  const handleDisableNext = (currentStep: number) => {
    let disabled = true;
    switch (currentStep) {
      case 1:
        if (onboardingInputs?.courseCategory !== "") {
          disabled = false;
        }
        break;
      case 2:
        if (onboardingInputs?.courseTitle !== "") {
          disabled = false;
        }
        break;
      case 3:
        if (
          onboardingInputs?.courseOptions.duration.time > 0 ||
          onboardingInputs?.courseOptions.chaptersNo > 0
        ) {
          disabled = false;
        }
        break;

      default:
        break;
    }
    return disabled;
  };

  return (
    <div className="flex justify-center items-center p-6 sm:p-10 lg:p-20">
      {/* <!-- Stepper --> */}
      <div className="max-w-screen-md w-full">
        <CreateCourseOnboardHeader />

        {/* <!-- Stepper Content --> */}
        <div className="mt-5 sm:mt-8">
          <CreateCourseOnboardBodyHeader
            title={onboardingSteps[currentStep - 1]?.title}
            description={onboardingSteps[currentStep - 1]?.description}
            current={currentStep}
            total={onboardingSteps.length}
          />
          {/* <!-- First Content --> */}
          <>
            <div className="p-4  bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl min-h-[24vh]">
              {currentStep === 1 && (
                <StepSelectCourseCategory
                  handleSelectCategory={handleCourseInputs}
                  selectedCategory={onboardingInputs?.courseCategory}
                />
              )}
              {currentStep === 2 && (
                <StepCourseTitleAndDescription
                  handleChangeCourseInputs={handleCourseInputs}
                  onboardingInputs={onboardingInputs}
                />
              )}
              {currentStep === 3 && (
                <StepSelectCourseOptions
                  handleChangeCourseInputs={handleCourseInputs}
                  onboardingInputs={onboardingInputs}
                />
              )}
            </div>
          </>
          {/* <!-- End First Content --> */}
          <div className="mt-5 flex justify-between items-center gap-x-2">
            <Button
              variant="outline"
              disabled={currentStep === 1}
              onClick={handlePreviousStep}
            >
              <ChevronLeft className="h-4 w-4 me-1" />
              Previous
            </Button>
            <Button
              variant="default"
              onClick={handleNextStep}
              disabled={handleDisableNext(currentStep)}
            >
              {currentStep === onboardingSteps.length ? "Finish" : "Next"}
              <ChevronRight className="h-4 w-4 me-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
