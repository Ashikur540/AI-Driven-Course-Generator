import React from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormErrorMessageBlock } from "../ui/form-error-message-block";

type FormSelectInputProps<T extends FieldValues> = UseControllerProps<T> & {
  inputProps: {
    labelPlaceholder?: string;
    helpText?: string;
    disabled?: boolean;
    className?: string;
    selectItems: Array<{
      value: string;
      label: string;
    }>;
  };
};

export default function FormSelectInput<T extends FieldValues>(
  props: FormSelectInputProps<T>
) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <>
      <Select
        disabled={props.inputProps.disabled}
        {...field}
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={props.inputProps.labelPlaceholder ?? ""} />
        </SelectTrigger>
        <SelectContent>
          {props.inputProps.selectItems.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-col gap-y-2">
        {props.inputProps.helpText && (
          <p className="text-sm text-zinc-500">{props.inputProps.helpText}</p>
        )}
        {error && <FormErrorMessageBlock error={error} />}
      </div>
    </>
  );
}
