"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const courseImgFormSchema = z.object({
  queryText: z.string().trim(),
});

export type DashboardFormInputType = {
  searchText: string;
};

export default function DashboardFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm<DashboardFormInputType>({
    resolver: zodResolver(courseImgFormSchema),
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
