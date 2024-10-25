"use client";

import { Button } from "@/components/ui/button";
import { CourseImgData } from "../providers/course-Image-form-provider";
import { useFormContext } from "react-hook-form";
import { getImageUrl } from "@/server/actions/upload-image";
import { useChaptersQuery } from "@/hooks/query/useChaptersQuery";
import { getChapterContentAIPrompt } from "@/lib/utils";
import useCourseQuery from "@/hooks/query/useCourseQuery";
import { courseImgFormSchema } from "@/lib/validationSchemas";
import toast from "react-hot-toast";

export function GenerateCourseButton({ courseId }: { courseId: string }) {
  const { data: courseData } = useCourseQuery(courseId);
  const { data: allChapters } = useChaptersQuery(courseId);

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<CourseImgData>();

  const onSubmit = async (data: CourseImgData) => {
    try {
      // if user uploads a thumbnail
      if (data.thumbnail !== undefined) {
        const { error, success } = courseImgFormSchema.safeParse(
          data?.thumbnail
        );
        //    validation for file upload
        if (!success || errors.thumbnail) {
          console.log("error occured", error);
          toast.error(
            errors?.thumbnail?.message ?? "Please upload a valid image"
          );
          return;
        }
        const formData = new FormData();
        formData.append("image", data.thumbnail);

        //   upload the image to imgbb and get the image URL
        const imageUrl = await getImageUrl(formData);
        console.log("Course data with image URL:", { ...data, imageUrl });
      }
      //   generate AI prompts for each chapters
      allChapters?.forEach((chapter) => {
        const chapterContentGenPrompt = getChapterContentAIPrompt({
          chapterName: chapter.title,
          topicDescription: chapter.description,
          topicName: courseData?.title ?? "",
        });
        console.log("chapterContentGenPrompt:", chapterContentGenPrompt);
      });

      // TODO: Save course data with imageUrl to your database
    } catch (error) {
      console.error("Error generating course:", error);
    }
  };

  return (
    <Button onClick={handleSubmit(onSubmit)} className="flex justify-center">
      Generate Course Content
    </Button>
  );
}
