"use client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CourseImgData } from "../providers/course-Image-form-provider";
import { getImageUrl } from "@/server/actions/upload-image";
import { ChapterRes, useChaptersQuery } from "@/hooks/query/useChaptersQuery";
import { getChapterContentAIPrompt } from "@/lib/utils";
import useCourseQuery from "@/hooks/query/useCourseQuery";
import { courseImgFormSchema } from "@/lib/validationSchemas";
import { chapterContentGenSession } from "@/configs/geminiAiConfig";
import { CourseGenLoadingModal } from "./course-gen-loading-modal";
import { updateChapterInfo } from "@/server/actions/chapters.action";
import { getVideoContentID } from "@/configs/youtubeApiReq";
import { updateCourseInfo } from "@/server/actions/courses.action";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChapterGenerationProgress {
  total: number;
  completed: number;
  currentChapter: string;
  errors: Array<{ chapter: string; error: string }>;
  youtubeQuotaExceeded: boolean;
}

export function GenerateCourseButton({ courseId }: { courseId: string }) {
  const { data: courseData } = useCourseQuery(courseId);
  const { data: allChapters } = useChaptersQuery(courseId);
  const [isLoadingCourseGen, setIsLoadingCourseGen] = useState(false);
  const router = useRouter();
  const [progress, setProgress] = useState<ChapterGenerationProgress>({
    total: 0,
    completed: 0,
    currentChapter: "",
    errors: [],
    youtubeQuotaExceeded: false,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<CourseImgData>();

  const backgroundUpdate = (promise: Promise<any>) => {
    promise.catch((error) => {
      console.error("Background update failed:", error);
      toast.error("Some updates may need to be synced later", {
        duration: 3000,
      });
    });
  };

  const getYoutubeVideoWithQuotaCheck = async (
    query: string
  ): Promise<string> => {
    if (progress.youtubeQuotaExceeded) {
      return "";
    }

    try {
      const videoId = await getVideoContentID(query);
      return videoId;
    } catch (error: any) {
      const errorMessage = error?.message || "YouTube API error";

      // Check for quota exceeded
      if (
        errorMessage.includes("quota") ||
        errorMessage.includes("quotaExceeded") ||
        errorMessage.includes("403")
      ) {
        setProgress((prev) => ({
          ...prev,
          youtubeQuotaExceeded: true,
        }));

        // toast.error(
        //   "YouTube API quota exceeded. Continuing without video content.",
        //   { duration: 5000 }
        // );
        return "";
      }

      console.error("YouTube API error:", errorMessage);
      return "";
    }
  };

  const processChapter = async (chapter: ChapterRes, courseTitle: string) => {
    try {
      setProgress((prev) => ({
        ...prev,
        currentChapter: chapter.title,
      }));

      // Start content generation
      const contentPromise = chapterContentGenSession
        .sendMessage(
          getChapterContentAIPrompt({
            chapterName: chapter.title,
            topicDescription: chapter.description,
            topicName: courseTitle,
          })
        )
        .then((result) => result.response.text());

      // Get video ID if quota isn't exceeded
      const videoIdPromise = getYoutubeVideoWithQuotaCheck(chapter.title);

      // Wait for both operations
      const [content, videoId] = await Promise.all([
        contentPromise,
        videoIdPromise,
      ]);

      // Update chapter info in background
      backgroundUpdate(
        updateChapterInfo(String(chapter._id), {
          content,
          ytVideoId: videoId,
        })
      );

      setProgress((prev) => ({
        ...prev,
        completed: prev.completed + 1,
      }));

      return { success: true };
    } catch (error: any) {
      const errorMessage = error?.message || "Content generation failed";

      setProgress((prev) => ({
        ...prev,
        errors: [
          ...prev.errors,
          { chapter: chapter.title, error: errorMessage },
        ],
      }));

      return { success: false, error: errorMessage };
    }
  };

  const onSubmit = async (data: CourseImgData) => {
    if (!allChapters?.length) {
      toast.error("No chapters found to generate content for!");
      return;
    }

    setIsLoadingCourseGen(true);
    setProgress({
      total: allChapters.length,
      completed: 0,
      currentChapter: "",
      errors: [],
      youtubeQuotaExceeded: false,
    });

    try {
      // Handle image upload if present
      if (data.thumbnail) {
        const parseResult = courseImgFormSchema.safeParse(data);
        if (!parseResult.success) {
          toast.error(
            errors?.thumbnail?.message ?? "Please upload a valid image"
          );
          return;
        }

        const formData = new FormData();
        formData.append("image", data.thumbnail);
        getImageUrl(formData)
          .then((imageUrl) => {
            if (imageUrl) {
              backgroundUpdate(
                updateCourseInfo(courseId, { thumbnailImage: imageUrl })
              );
            }
          })
          .catch(() => {
            toast.error("Failed to upload image");
          });
      }

      // Process chapters in batches
      const batchSize = 2;
      const chapters = [...allChapters];
      const results = [];

      for (let i = 0; i < chapters.length; i += batchSize) {
        const batch = chapters.slice(i, i + batchSize);
        const batchPromises = batch.map((chapter) =>
          processChapter(chapter, courseData?.title ?? "")
        );

        const batchResults = await Promise.allSettled(batchPromises);
        results.push(...batchResults);

        if (i + batchSize < chapters.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      // Show completion status
      const failures = results.filter(
        (r) =>
          r.status === "rejected" ||
          (r.status === "fulfilled" && !r.value.success)
      );

      if (failures.length > 0) {
        toast.error(
          `${failures.length} chapters had generation issues. The course will update in the background.`,
          { duration: 5000 }
        );
      } else {
        toast.success("Course generated successfully!");
        router.push(`/create-course/${courseId}/finish`);
      }
    } catch (error) {
      console.error("Error generating course:", error);
      toast.error("Error generating content! Please try again");
    } finally {
      setIsLoadingCourseGen(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleSubmit(onSubmit)}
        className="flex justify-center"
        disabled={isLoadingCourseGen}
      >
        {isLoadingCourseGen ? (
          <div className="w-full flex justify-start items-center">
            <LoaderCircle className="animate-spin" />
            <span className="ml-2">Generating...</span>
          </div>
        ) : (
          "Generate Course Content"
        )}
      </Button>
      <CourseGenLoadingModal
        isLoadingCourseGen={isLoadingCourseGen}
        progress={progress}
      />
    </>
  );
}
