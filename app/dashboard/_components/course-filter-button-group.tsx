"use client";

import { useFormContext } from "react-hook-form";

import FormSelectInput from "@/components/form-input-elements/form-select-dropdown";
import { DashboardFormInputType } from "../providers/dashboard-form-provider";

export default function CourseFilterBtnGroup() {
  const { control } = useFormContext<DashboardFormInputType>();
  return (
    <div>
      <FormSelectInput
        name="sortBy"
        control={control}
        inputProps={{
          selectItems: [
            { label: "Recently Accessed", value: "recentlyAccessed" },
            { label: "Recently Created", value: "recentlyCreated" },
            { label: "Title:(A-Z)", value: "AscendingOrder" },
            { label: "Title:(Z-A)", value: "DescendingOrder" },
          ],
          labelPlaceholder: "Sort By",
        }}
      />
    </div>
  );
}
