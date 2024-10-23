import FormInput from "@/components/form-input-elements/form-input";

import InputWithSelect from "@/components/ui/input-with-select-combined";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CourseDuration,
  CourseOptions,
  OnboardingInputs,
} from "@/types/onboarding.types";

import React from "react";
import { useFormContext } from "react-hook-form";

export const StepSelectCourseOptions = () => {
  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<OnboardingInputs>();
  const {
    courseOptions: { difficultyLevel, duration, includeVideo },
  } = watch();
  return (
    <div className="grid md:grid-cols-2 gap-8 w-full">
      <div className="w-full items-start flex  flex-col  gap-y-8">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="difficulty_level">Difficulty Level</Label>
          <Select
            value={difficultyLevel}
            onValueChange={(value: CourseOptions["difficultyLevel"]) =>
              setValue("courseOptions.difficultyLevel", value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Select Difficulty Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          {errors.courseOptions?.difficultyLevel && (
            <p className="text-red-500 text-sm">
              {errors.courseOptions.difficultyLevel.message}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="include_video">Include Video</Label>
          <RadioGroup
            value={`${includeVideo ? "yes" : "no"}`}
            onValueChange={(value) =>
              setValue("courseOptions.includeVideo", value === "yes", {
                shouldValidate: true,
              })
            }
            className="flex justify-start items-start"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
          {errors.courseOptions?.includeVideo && (
            <p className="text-red-500 text-sm">
              {errors.courseOptions.includeVideo.message}
            </p>
          )}
        </div>
      </div>

      <div className="w-full items-start flex  flex-col  gap-y-8">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="course_duration">Course Duration</Label>
          <InputWithSelect
            inputFieldClassName={`${
              errors.courseOptions?.duration ? "focus:!ring-red-500" : ""
            }`}
            selectInputs={["hour", "minute"]}
            inputFieldType="number"
            initialInputValue={duration.time}
            initialSelectValue={duration.unit}
            inputFieldPlaceholder={
              duration.unit === "hour" ? "1 hour" : "min 25 minutes"
            }
            onInputWithSelectChange={(value) => {
              const { inputFieldVal: durationTime, selectInputVal: timeUnit } =
                value;
              setValue(
                "courseOptions.duration",
                {
                  time: Number(durationTime),
                  unit: timeUnit as CourseDuration["unit"],
                },
                { shouldValidate: true }
              );
            }}
          />
          <div className="flex flex-col gap-1">
            <p className="text-zinc-500 text-sm">
              This will be an approximate estimate of the course time
            </p>
            {errors.courseOptions?.duration && (
              <p className="text-red-500 text-sm">
                {errors.courseOptions.duration.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col">
          <FormInput
            inputProps={{
              label: "No of Chapters",
              required: true,
              placeholder: "minimum 6",
              type: "number",
            }}
            name="courseOptions.chaptersNo"
            control={control}
          />
        </div>
      </div>
    </div>
  );
};
