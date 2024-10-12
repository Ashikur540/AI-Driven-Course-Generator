import { Input } from "@/components/ui/input";
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
  CourseInputChangeHandler,
  OnboardingInputs,
} from "@/types/onboarding.types";

import React from "react";

export const StepSelectCourseOptions = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleChangeCourseInputs,
  onboardingInputs,
}: {
  handleChangeCourseInputs: CourseInputChangeHandler;
  onboardingInputs: OnboardingInputs;
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 w-full">
      <div className="w-full items-start flex  flex-col  gap-y-8">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="difficulty_level">Difficulty Level</Label>
          <Select
            onValueChange={(value) =>
              handleChangeCourseInputs("difficultyLevel", value)
            }
            value={onboardingInputs.courseOptions.difficultyLevel}
          >
            <SelectTrigger className="w-full ">
              <SelectValue
                placeholder="Select Difficulty Level"
                defaultValue={onboardingInputs.courseOptions.difficultyLevel}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="include_video">Include Video</Label>
          <RadioGroup
            defaultValue={`${
              onboardingInputs.courseOptions.includeVideo ? "yes" : "no"
            }`}
            className="flex justify-start items-start"
            onValueChange={(value) => {
              handleChangeCourseInputs("includeVideo", value);
            }}
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
        </div>
      </div>

      <div className="w-full items-start flex  flex-col  gap-y-8">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="course_duration">Course Duration</Label>
          <InputWithSelect
            selectInputs={["hour", "minute"]}
            inputFieldType="number"
            initialInputValue={onboardingInputs.courseOptions.duration.time}
            initialSelectValue={onboardingInputs.courseOptions.duration.unit}
            inputFieldPlaceholder={
              onboardingInputs.courseOptions.duration.unit === "hour"
                ? "1 hour"
                : "min 25 minutes"
            }
            onInputWithSelectChange={(value) => {
              const { inputFieldVal: durationTime, selectInputVal: timeUnit } =
                value;
              handleChangeCourseInputs("duration", {
                time: Number(durationTime),
                unit: timeUnit as CourseDuration["unit"],
              });
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="chapters_no">No of Chapters</Label>
          <Input
            type="number"
            placeholder="minimum 6"
            onChange={(e) =>
              handleChangeCourseInputs("chaptersNo", Number(e.target?.value))
            }
            value={onboardingInputs.courseOptions.chaptersNo}
          />
        </div>
      </div>
    </div>
  );
};
