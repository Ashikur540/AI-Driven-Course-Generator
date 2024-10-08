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
import { CourseInputChangeHandler } from "@/types/onboarding.types";

import React from "react";

export const StepSelectCourseOptions = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleChangeCourseInputs,
}: {
  handleChangeCourseInputs: CourseInputChangeHandler;
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
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="include_video">Include Video</Label>
          <RadioGroup
            defaultValue="option-one"
            className="flex justify-start items-start"
            onChange={
              (e) => {
                console.log("✨ ~ file: course-options.tsx:48 ~ e:", e);
              }
              //   handleChangeCourseInputs("includeVideo", )
            }
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
          <InputWithSelect selectInputs={["Hour", "Minute"]} />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="course_duration">No fo Chapters</Label>
          <Input type="number" placeholder="5" />
        </div>
      </div>
    </div>
  );
};
