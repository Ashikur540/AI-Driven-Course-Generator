"use client";
import { outfit } from "@/app/fonts";
import FormInput from "@/components/form-input-elements/form-input";
import FormTextAreaInput from "@/components/form-input-elements/form-textarea-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCourseQuery from "@/hooks/query/useCourse";
import {
  courseBasicInfoSchema,
  courseDesCharLimit,
} from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { PenBoxIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

type EditCourseInfoInput = {
  courseTitle: string;
  courseDescription: string;
};

export function EditCourseInfoModal({ courseId }: { courseId: string }) {
  const { data: courseDetails } = useCourseQuery(courseId);
  const { control, handleSubmit, watch } = useForm<EditCourseInfoInput>({
    resolver: zodResolver(courseBasicInfoSchema),
    values: {
      courseTitle: courseDetails?.title || "",
      courseDescription: courseDetails?.description || "",
    },
    mode: "onChange",
  });

  // TODO: Load course data from backend
  const onSubmit = (data: EditCourseInfoInput) => {
    const { success } = courseBasicInfoSchema.safeParse(data);
    if (!success) {
      toast.error("Please fill all the fields correctly");
      return;
    }
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline" size="icon" className="inline"> */}
        <PenBoxIcon className="h-4 w-4 inline-block ml-2 cursor-pointer text-black" />
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] lg:max-w-[600px] ${outfit.className}`}
      >
        <DialogHeader>
          <DialogTitle>Edit Course Info</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col justify-start gap-1 lg:gap-2 py-4">
          {/* <div className="grid grid-cols-4 items-start gap-4"> */}
          <FormInput
            name="courseTitle"
            control={control}
            inputProps={{
              label: "Course Title",
              className: "col-span-3",
              type: "text",
            }}
          />
          {/* </div> */}
          {/* <div className="grid grid-cols-4 items-start gap-4"> */}
          <div className="w-full">
            <FormTextAreaInput
              name="courseDescription"
              control={control}
              inputProps={{
                label: "Course Description",
                className: "col-span-3",
              }}
            />
            <p className="text-sm text-gray-500">
              {`${watch("courseDescription").length} / ${courseDesCharLimit}`}
            </p>
          </div>
          {/* </div> */}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
