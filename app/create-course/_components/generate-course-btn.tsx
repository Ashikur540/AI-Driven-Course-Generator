"use client";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { CourseImgData } from "../providers/course-Image-form-provider";
import { getImageUrl } from "@/server/actions/upload-image";
import { useChaptersQuery } from "@/hooks/query/useChaptersQuery";
import { getChapterContentAIPrompt } from "@/lib/utils";
import useCourseQuery from "@/hooks/query/useCourseQuery";
import { courseImgFormSchema } from "@/lib/validationSchemas";
import { chapterContentGenSession } from "@/configs/geminiAiConfig";
import { CourseGenLoadingModal } from "./course-gen-loading-modal";
import { updateChapterInfo } from "@/server/actions/chapters.action";
import { getVideoContentID } from "@/configs/youtubeApiReq";
import { updateCourseInfo } from "@/server/actions/courses.action";
export function GenerateCourseButton({ courseId }: { courseId: string }) {
  const { data: courseData } = useCourseQuery(courseId);
  const { data: allChapters } = useChaptersQuery(courseId);
  const [isLoadingCourseGen, setIsLoadingCourseGen] = useState(false);

  useEffect(() => {
    console.log(isLoadingCourseGen);
  }, [isLoadingCourseGen]);

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<CourseImgData>();
  const onSubmit = async (data: CourseImgData) => {
    setIsLoadingCourseGen(true); // Start loading state here
    let imageUrl = "";
    try {
      console.log("Course data:", data);

      if (data.thumbnail) {
        // Only validate if a thumbnail is present
        const parseResult = courseImgFormSchema.safeParse(data);

        if (!parseResult.success) {
          console.log("Error occurred during validation", parseResult.error);
          toast.error(
            errors?.thumbnail?.message ?? "Please upload a valid image"
          );
          return;
        }

        const formData = new FormData();
        formData.append("image", data.thumbnail);
        imageUrl = await getImageUrl(formData);
        console.log("Course data with image URL:", { ...data, imageUrl });
      }

      // Proceed with generating content for each chapter
      for (const chapter of allChapters ?? []) {
        const chapterContentGenPrompt = getChapterContentAIPrompt({
          chapterName: chapter.title,
          topicDescription: chapter.description,
          topicName: courseData?.title ?? "",
        });
        // generate chapter text content
        const content = await handleGenerateChapterContent(
          chapterContentGenPrompt
        );

        // generate video Content
        const youtubeVideoId = await getVideoContentID(chapter.title);
        console.log(youtubeVideoId);

        //  update chapter info with content and video
        updateChapterInfo(String(chapter?._id), {
          content,
          ytVideoId: youtubeVideoId,
        });

        //  if user upload thumbnail then save it
        if (imageUrl.length > 0) {
          updateCourseInfo(courseId, { thumbnailImage: imageUrl });
        }
        console.log("Chapter content:", content);
      }
    } catch (error) {
      console.error("Error generating course:", error);
      toast.error("Error generating content! Please try again");
    } finally {
      setIsLoadingCourseGen(false); // End loading state here
    }
  };

  const handleGenerateChapterContent = async (prompt: string) => {
    try {
      const result = await chapterContentGenSession.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Button onClick={handleSubmit(onSubmit)} className="flex justify-center">
        Generate Course Content
      </Button>
      <CourseGenLoadingModal isLoadingCourseGen={isLoadingCourseGen} />
    </>
  );
}
