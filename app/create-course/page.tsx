"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { CreateCourseOnboardHeader } from "./_components/Create-course-onboard-header";
import { Button } from "@/components/ui/button";
import { CreateCourseOnboardBodyHeader } from "./_components/course-onboard-body-header";
import { StepSelectCourseCategory } from "./_components/onboarding-steps/select-course-category";
import { onboardingStepsData } from "@/constants/onboarding.const";
import { StepCourseTitleAndDescription } from "./_components/onboarding-steps/course-title-description";
import { OnboardingInputs } from "@/types/onboarding.types";
import { StepSelectCourseOptions } from "./_components/onboarding-steps/course-options";

import { generateCourseGenAIPrompt } from "@/lib/utils";
import { courseGenChatSession } from "@/configs/geminiAiConfig";
import { CourseGenLoadingModal } from "./_components/course-gen-loading-modal";
import { courseSchema } from "@/lib/validationSchemas";
import { saveCourseToDB } from "@/server/actions/courses";
import { useRouter } from "next/navigation";

const onboardingInputsDefaultValues: OnboardingInputs = {
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
};

function CreateCourse() {
  const router = useRouter();
  const [onboardingSteps, setOnboardingSteps] = useState(onboardingStepsData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoadingCourseGen, setIsLoadingCourseGen] = useState(false);

  const formMethods = useForm<OnboardingInputs>({
    resolver: zodResolver(courseSchema),
    defaultValues: onboardingInputsDefaultValues,
    mode: "onChange",
  });
  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const {
    courseCategory,
    courseTitle,
    courseDescription,
    courseOptions: { duration, chaptersNo },
  } = watch();

  const handleSubmitCreateCourse = handleSubmit(async (data) => {
    try {
      setIsLoadingCourseGen(true);

      const { success, data: courseData, error } = courseSchema.safeParse(data);
      console.log("this is submit fn");
      if (!success) {
        console.log("result not success", error.flatten().fieldErrors);

        // Show toast for validation error
        toast.error("Please check the form fields and try again.");
        return;
      }

      const prompt = generateCourseGenAIPrompt({
        chaptersNo: courseData.courseOptions.chaptersNo,
        courseCategory: courseData.courseCategory,
        courseDescription: courseData.courseDescription ?? "",
        courseTitle: courseData.courseTitle,
        duration: `${courseData.courseOptions.duration.time} ${
          courseData.courseOptions.duration.unit
        }${
          courseData.courseOptions.duration.unit === "hour" &&
          courseData.courseOptions.duration.time > 1
            ? "s"
            : ""
        }`,
        level: courseData.courseOptions.difficultyLevel,
      });

      const courseLayoutData = await handleGenerateCourseLayout(prompt);
      console.log("courseLayoutData", courseLayoutData);

      // save that course layout data to the database
      const savedCourse = await saveCourseToDB(courseData, courseLayoutData);
      console.log("savedCourse", savedCourse);

      // Navigate to the dynamic course page
      router.push(`/create-course/${savedCourse._id}`);
    } catch (error) {
      console.error("error", error);

      // Show toast for generic error
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoadingCourseGen(false);
    }
  });

  const handleGenerateCourseLayout = async (prompt: string) => {
    try {
      const result = await courseGenChatSession.sendMessage(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error("error", error);
    } finally {
    }
  };

  const handleNextStep = useCallback(() => {
    // Check for errors
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      console.log("hasErrors", hasErrors);
      toast.error("Please check the form fields and try again.", {
        position: "bottom-center",
      });
      return;
    }
    console.log("next fn", currentStep);

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
    } else if (currentStep === onboardingSteps.length) {
      handleSubmitCreateCourse();
    }
  }, [currentStep, onboardingSteps.length, handleSubmitCreateCourse, errors]);

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
        if (courseCategory !== "") {
          disabled = false;
        }
        break;
      case 2:
        if (courseTitle.trim() !== "" && courseDescription.trim() !== "") {
          disabled = false;
        }
        break;
      case 3:
        if (duration.time > 0 || chaptersNo > 0) {
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
        <CreateCourseOnboardHeader
          currentStep={currentStep}
          totalSteps={onboardingSteps.length}
        />

        {/* <!-- Stepper Content --> */}
        <div className="mt-5 sm:mt-8">
          <CreateCourseOnboardBodyHeader
            title={onboardingSteps[currentStep - 1]?.title}
            description={onboardingSteps[currentStep - 1]?.description}
            current={currentStep}
            total={onboardingSteps.length}
          />
          {/* <!-- First Content --> */}
          <FormProvider {...formMethods}>
            <div className="p-4  bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl min-h-[24vh]">
              {currentStep === 1 && <StepSelectCourseCategory />}
              {currentStep === 2 && <StepCourseTitleAndDescription />}
              {currentStep === 3 && <StepSelectCourseOptions />}
            </div>
          </FormProvider>
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
      <CourseGenLoadingModal isLoadingCourseGen={isLoadingCourseGen} />
    </div>
  );
}

export default CreateCourse;
