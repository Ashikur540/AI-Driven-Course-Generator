import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CourseInputChangeHandler } from "@/types/onboarding.types";
import React from "react";

export const StepCourseTitleAndDescription = ({
  handleChangeCourseInputs,
}: {
  handleChangeCourseInputs: CourseInputChangeHandler;
}) => {
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
              className="w-full mt-1"
              onChange={(e) =>
                handleChangeCourseInputs("courseTitle", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[5px] w-full mt-[20px]">
        <Label htmlFor="course_additional_details">
          Tell us more about what you want to learn. You can mention such
          topics(optional)
        </Label>
        <Textarea
          placeholder="Type more instructions about your course for better result"
          className="min-h-40"
          onChange={(e) =>
            handleChangeCourseInputs("courseDescription", e.target.value)
          }
        />
      </div>
    </section>
  );
};
