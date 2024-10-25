import toast from "react-hot-toast";
import { z } from "zod";

export const courseDesCharLimit = 460;

export const courseSchema = z.object({
  courseCategory: z
    .string()
    .trim()
    .min(4, { message: "Course category is required" }),
  courseTitle: z.string().min(4, { message: "Course title is required" }),
  courseDescription: z
    .string()
    .min(40, {
      message: "Course description must be at least 40 characters long",
    })
    .max(courseDesCharLimit, {
      message: `Course description must not exceed ${courseDesCharLimit} characters`,
    }),
  courseOptions: z.object({
    difficultyLevel: z.enum(["beginner", "intermediate", "advanced"]),
    duration: z
      .object({
        unit: z.enum(["hour", "minute"]),
        time: z.number(),
      })
      .superRefine((duration, ctx) => {
        if (duration.unit === "hour") {
          if (duration.time < 1 || duration.time > 12) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Course duration should within 1-12  hour",
            });
          }
        } else if (duration.unit === "minute") {
          if (duration.time < 30 || duration.time > 12 * 60) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Course duration should be at least 30 minutes",
            });
          }
        }
      }),
    chaptersNo: z
      .number()
      .max(100, { message: "No of chapters must be at most 100" })
      .min(6, { message: "No of chapters must be at least 6" }),

    includeVideo: z.boolean(),
  }),
});

export const userSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  imageURL: z.string().url(),
  role: z.enum(["user"]),
  courses: z.array(z.string()),
});

export const courseBasicInfoSchema = z.object({
  courseTitle: courseSchema.shape.courseTitle,
  courseDescription: courseSchema.shape.courseDescription,
});
export const chapterInfoSchema = z.object({
  chapterTitle: z
    .string()
    .trim()
    .min(8, { message: "Chapter title should be minimum 8 characters" }),
  chapterDescription: z.string().min(40, {
    message: "Chapter description should be minimum 40 characters",
  }),
});

export const courseImgFormSchema = z.object({
  thumbnail: z
    .any()
    .optional()
    .transform((val) => {
      if (val instanceof File) {
        if (val.size > 2 * 1024 * 1024) {
          toast.error("File size must be less than 2MB");
          return;
        }
        if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            val.type
          )
        ) {
          toast.error("Only .jpg, .jpeg, .png and .webp files are accepted");
          return;
        }
        return val;
      }
      return undefined;
    }),
});
// / either a file or undefined
