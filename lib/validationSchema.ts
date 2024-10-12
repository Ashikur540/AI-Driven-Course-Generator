import { z } from "zod";
/*
{
    courseCategory: "",
    courseTitle: "",
    courseDescription: "",
    courseOptions: {
      difficultyLevel: "beginner",
      duration: {
        time: 1,
        unit: "hour",
      },
      chaptersNo: 0,
      includeVideo: true,
    },
  }

*/

export const createCourseValidationSchema = z.object({
  courseCategory: z.string().min(4, { message: "Course category is required" }),
  courseTitle: z.string().min(5, { message: "Course title is required" }),
  courseDescription: z.string().optional(),
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
      .min(6, { message: "No of chapters must be at least 6" }),
    includeVideo: z.boolean(),
  }),
});
