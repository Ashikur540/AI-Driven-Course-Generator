import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

type TextInputProps<T extends FieldValues> = UseControllerProps<T> & {
  inputProps: {
    label: string;
    labelHidden: boolean;
    placeholder?: string;
    helpText?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  };
};

export default function TextInput<T extends FieldValues>(
  props: TextInputProps<T>
) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController(props);

  return (
    <>
      {!props.inputProps.labelHidden && (
        <Label htmlFor="title">
          {props.inputProps.label}
          <span className="text-red-600">*</span>
        </Label>
      )}
      <Input
        type={props.inputProps.type}
        id={props.inputProps.id}
        placeholder={props.inputProps.placeholder}
        className={`w-full mt-1 ${invalid ? "focus:!ring-red-500" : ""}`}
        {...field}
      />
      <div className="flex flex-col gap-y-2">
        <p className="text-sm text-zinc-500">
          This will help us generate a course that is tailored to your skill
          level.
        </p>
        {error?.message && (
          <p className="text-red-500 text-sm">{error.message}</p>
        )}
      </div>
    </>
  );
}
