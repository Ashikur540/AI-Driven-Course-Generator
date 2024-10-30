"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const dashboardFormSchema = z.object({
  queryText: z.string().trim().optional(),
  sortBy: z
    .enum([
      // "recentlyAccessed",
      "recentlyCreated",
      "AscendingOrder",
      "DescendingOrder",
    ])
    .optional(),
});

export type DashboardFormInputType = z.infer<typeof dashboardFormSchema>;
export default function DashboardFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm<DashboardFormInputType>({
    resolver: zodResolver(dashboardFormSchema),
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
