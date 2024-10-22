import React from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { FormErrorMessageBlock } from "../ui/form-error-message-block";

type FormInputProps<T extends FieldValues> = UseControllerProps<T> & {
  inputProps: {
    label: string;
    labelHidden?: boolean;
    placeholder?: string;
    helpText?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    required?: boolean;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  };
};

export default function FormInput<T extends FieldValues>(
  props: FormInputProps<T>
) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  //  handle number input type because html input always return string
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (props.inputProps.type === "number") {
      field.onChange(value === "" ? 0 : Number(value));
    } else {
      field.onChange(value);
    }
  };

  return (
    <>
      {!props.inputProps.labelHidden && (
        <Label>
          {props.inputProps.label}
          {props.inputProps.required && <span className="text-red-600">*</span>}
        </Label>
      )}
      <Input
        type={props.inputProps.type}
        id={props.inputProps.id}
        required={props.inputProps.required}
        placeholder={props.inputProps.placeholder}
        className={twMerge(
          `w-full mt-1 ${error ? "focus:!ring-red-500" : ""}`,
          props.inputProps.className
        )}
        {...field}
        onChange={handleChange}
        value={field.value}
      />
      <div className="flex flex-col gap-y-2">
        {props.inputProps.helpText && (
          <p className="text-sm text-zinc-500">{props.inputProps.helpText}</p>
        )}
        {error && <FormErrorMessageBlock error={error} />}
      </div>
    </>
  );
}
