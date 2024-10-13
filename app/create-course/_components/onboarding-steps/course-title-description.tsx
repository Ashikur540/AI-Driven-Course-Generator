import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingInputs } from "@/types/onboarding.types";

import React from "react";
import { useFormContext } from "react-hook-form";

export const StepCourseTitleAndDescription = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<OnboardingInputs>();

  const descriptionLen = watch("courseDescription")?.length;
  console.log(errors);
  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-[20px]">
        <div className="flex flex-col gap-[5px] w-full ">
          <div className=" w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">
              Write the course topic name you want to learn{" "}
              <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              id="course_topic"
              placeholder="e.g.Javascript course or Yoga or Design"
              className={`w-full mt-1 ${
                errors.courseTitle ? "focus:!ring-red-500" : ""
              }`}
              {...register("courseTitle")}
            />
            {errors.courseTitle && (
              <p className="text-red-500 text-sm">
                {errors.courseTitle.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[8px] w-full mt-[20px] ">
        <Label htmlFor="course_additional_details">
          Tell us more about what you want to learn. You can mention such topics
          <span
            className={`${
              descriptionLen && (descriptionLen < 50 || descriptionLen > 460)
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            ({descriptionLen}/460)
          </span>
        </Label>
        <Textarea
          placeholder="Type more instructions about your course for better result"
          className={`${
            errors.courseDescription ? "focus:!ring-red-500" : ""
          } min-h-40`}
          onChange={(e) =>
            setValue("courseDescription", e.target.value, {
              shouldValidate: true,
            })
          }

          // {...register("courseDescription")}
        />
        {errors.courseDescription && (
          <p className="text-red-500 text-sm">
            {errors.courseDescription.message}
          </p>
        )}
      </div>
    </section>
  );
};
