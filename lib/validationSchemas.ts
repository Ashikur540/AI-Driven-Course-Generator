import { z } from "zod";

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
    .max(460, { message: "Course description must not exceed 260 characters" }),
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
