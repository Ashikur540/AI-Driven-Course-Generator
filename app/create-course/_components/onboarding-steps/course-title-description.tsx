import React from "react";
import { useFormContext } from "react-hook-form";

import FormInput from "@/components/form-input-elements/form-input";
import FormTextAreaInput from "@/components/form-input-elements/form-textarea-input";
import { Label } from "@/components/ui/label";
import { OnboardingInputs } from "@/types/onboarding.types";

export const StepCourseTitleAndDescription = () => {
  const { control, watch } = useFormContext<OnboardingInputs>();

  const descriptionLen = watch("courseDescription")?.length;

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-[20px]">
        <div className="flex flex-col gap-[5px] w-full ">
          <div className=" w-full max-w-sm items-center">
            <FormInput
              inputProps={{
                label: "Write the course topic name you want to learn",
                required: true,
                placeholder: "e.g.Javascript course or Yoga or Design",
                type: "text",
              }}
              name="courseTitle"
              control={control}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col  w-full mt-[20px] ">
        <Label htmlFor="course_additional_details">
          Tell us more about what you want to learn. You can mention such topics
          <span className="text-red-600">*</span>
          <span
            className={`${
              descriptionLen && (descriptionLen < 40 || descriptionLen > 460)
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            ({descriptionLen}/460)
          </span>
        </Label>
        <FormTextAreaInput
          inputProps={{
            label: "Tell us more about what you want to learn",
            required: true,
            labelHidden: true,
            placeholder:
              "Type more instructions about your course for better result",
          }}
          name="courseDescription"
          control={control}
        />
      </div>
    </section>
  );
};
