import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { Textarea } from "../ui/textarea";
import { FormErrorMessageBlock } from "../ui/form-error-message-block";

type FormTextAreaInputProps<T extends FieldValues> = UseControllerProps<T> & {
  inputProps: {
    label: string;
    labelHidden?: boolean;
    placeholder?: string;
    helpText?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    required?: boolean;
  };
};

export default function FormTextAreaInput<T extends FieldValues>(
  props: FormTextAreaInputProps<T>
) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController(props);

  return (
    <>
      {!props.inputProps.labelHidden && (
        <Label>
          {props.inputProps.label}
          {props.inputProps.required && <span className="text-red-600">*</span>}
        </Label>
      )}

      <Textarea
        placeholder={props.inputProps.placeholder}
        className={twMerge(
          `w-full min-h-40 mt-1 ${invalid ? "focus:!ring-red-500" : ""}`,
          props.inputProps.className
        )}
        {...field}
      />
      <div className="flex flex-col gap-y-2 mt-2">
        {props.inputProps.helpText && (
          <p className="text-sm text-zinc-500">{props.inputProps.helpText}</p>
        )}
        {invalid && <FormErrorMessageBlock error={error} />}
      </div>
    </>
  );
}
