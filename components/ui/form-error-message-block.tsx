import { AlertCircle } from "lucide-react";
import React from "react";
import { FieldError } from "react-hook-form";

export const FormErrorMessageBlock = ({ error }: { error?: FieldError }) => {
  return (
    <p className="text-red-500 text-sm flex items-center gap-x-2">
      <AlertCircle className="h-4 w-4 text-red-500" />
      {error?.message}
    </p>
  );
};
