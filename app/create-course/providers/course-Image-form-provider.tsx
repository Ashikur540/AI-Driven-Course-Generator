"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseImgFormSchema } from "@/lib/validationSchemas";

export type CourseImgData = z.infer<typeof courseImgFormSchema>;

export function CourseImgFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm<CourseImgData>({
    resolver: zodResolver(courseImgFormSchema),
  });

  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
}
