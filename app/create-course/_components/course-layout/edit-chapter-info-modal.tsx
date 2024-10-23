"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2, PenBoxIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { outfit } from "@/app/fonts";
import FormInput from "@/components/form-input-elements/form-input";
import FormTextAreaInput from "@/components/form-input-elements/form-textarea-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CHAPTERS_QUERY_KEY,
  useChapterQuery,
} from "@/hooks/query/useChaptersQuery";

import { chapterInfoSchema, courseDesCharLimit } from "@/lib/validationSchemas";
import { updateChapterInfo } from "@/server/actions/chapters.action";
import { COURSE_QUERY_KEY } from "@/hooks/query/useCourseQuery";

type EditChapterInfoInput = {
  chapterTitle: string;
  chapterDescription: string;
};

export function EditChapterInfoModal({ chapterId }: { chapterId: string }) {
  const { data: chapterDetails, isLoading } = useChapterQuery(chapterId);
  const queryClient = useQueryClient();
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<EditChapterInfoInput>({
    resolver: zodResolver(chapterInfoSchema),
    values: {
      chapterTitle: chapterDetails?.title ?? "",
      chapterDescription: chapterDetails?.description ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: EditChapterInfoInput) => {
    setIsSaveLoading(true);
    const { success } = chapterInfoSchema.safeParse(data);
    if (!success) {
      toast.error("Please fill all the fields correctly");
      return;
    }
    console.log(data);
    // save course info to database
    try {
      const updatedCourseInfo = await updateChapterInfo(chapterId, {
        title: data.chapterTitle,
        description: data.chapterDescription,
      });
      console.log(updatedCourseInfo);
      toast.success("Course info updated successfully");
      await queryClient.invalidateQueries({
        queryKey: [CHAPTERS_QUERY_KEY, chapterId, COURSE_QUERY_KEY],
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update! Please try again");
    } finally {
      setIsSaveLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <PenBoxIcon className="h-4 w-4 inline-block ml-2 cursor-pointer text-black" />
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] lg:max-w-[600px] ${outfit.className}`}
      >
        <DialogHeader>
          <DialogTitle>Edit Chapter Info</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-start gap-1 lg:gap-2 py-4">
          <FormInput
            name="chapterTitle"
            control={control}
            inputProps={{
              label: "Chapter Title",
              className: "col-span-3",
              type: "text",
              disabled: isLoading,
            }}
          />
          <div className="w-full">
            <FormTextAreaInput
              name="chapterDescription"
              control={control}
              inputProps={{
                label: "Chapter Description",
                className: "col-span-3",
                disabled: isLoading,
              }}
            />
            <p className="text-sm text-gray-500">
              {`${watch("chapterDescription").length} / ${courseDesCharLimit}`}
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaveLoading || !isDirty}
          >
            {isSaveLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaveLoading ? "Saving Changes" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
