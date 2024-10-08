"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useState } from "react";

import { CreateCourseOnboardHeader } from "./_components/Create-course-onboard-header";
import { Button } from "@/components/ui/button";
import { CreateCourseOnboardBodyHeader } from "./_components/course-onboard-body-header";
import { StepSelectCourseCategory } from "./_components/onboarding-steps/select-course-category";
import { onboardingStepsData } from "@/constants/onboarding.const";
import { StepCourseTitleAndDescription } from "./_components/onboarding-steps/course-title-description";
import { CourseOptions, OnboardingInputs } from "@/types/onboarding.types";
import { StepSelectCourseOptions } from "./_components/onboarding-steps/course-options";

function CreateCourse() {
  const [onboardingSteps, setOnboardingSteps] = useState(onboardingStepsData);
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingInputs, setOnboardingInputs] = useState<OnboardingInputs>({
    courseCategory: "",
    courseTitle: "",
    courseDescription: "",
    courseOptions: {
      difficultyLevel: "Beginner",
      duration: "",
      chaptersNo: 0,
      includeVideo: true,
    },
  });

  // handlers
  const handleCourseInputs = (
    key: keyof OnboardingInputs | keyof CourseOptions,
    value: string | number
  ) => {
    setOnboardingInputs((prev) => {
      if (key in prev.courseOptions) {
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
  };

  console.log("onboardingInputs", onboardingInputs);

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
  }, [currentStep, onboardingSteps.length]);

  console.log(
    "✨ ~ file: page.tsx:64 ~ CreateCourse ~ onboardingSteps",
    onboardingSteps
  );

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
          onboardingInputs?.courseOptions.duration !== "" ||
          onboardingInputs?.courseOptions.chaptersNo
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
            <div className="p-4  bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl min-h-[40vh]">
              {currentStep === 1 && (
                <StepSelectCourseCategory
                  handleSelectCategory={handleCourseInputs}
                  selectedCategory={onboardingInputs?.courseCategory}
                />
              )}
              {currentStep === 2 && (
                <StepCourseTitleAndDescription
                  handleChangeCourseInputs={handleCourseInputs}
                />
              )}
              {currentStep === 3 && (
                <StepSelectCourseOptions
                  handleChangeCourseInputs={handleCourseInputs}
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
