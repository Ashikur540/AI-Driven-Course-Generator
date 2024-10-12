"use client";

import React, { ChangeEvent, useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type InputWithSelectVal<T> = {
  inputFieldVal: T;
  selectInputVal: string;
};

type InputWithSelectProps<T> = {
  selectInputs: string[];
  inputFieldType: React.InputHTMLAttributes<HTMLInputElement>["type"];
  inputFieldPlaceholder?: string;
  onInputWithSelectChange: (val: InputWithSelectVal<T>) => void;
  initialInputValue?: T;
  initialSelectValue?: string;
};

function InputWithSelect<T extends string | number>({
  selectInputs,
  inputFieldType,
  inputFieldPlaceholder,
  onInputWithSelectChange,
  initialInputValue = "" as T,
  initialSelectValue = "",
}: InputWithSelectProps<T>) {
  const [selectInputVal, setSelectInputVal] = useState(initialSelectValue);
  const [inputFieldVal, setInputFieldVal] = useState<T>(initialInputValue);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue =
        inputFieldType === "number"
          ? (Number(e.target.value) as T)
          : (e.target.value as T);
      setInputFieldVal(newValue);
      onInputWithSelectChange({ inputFieldVal: newValue, selectInputVal });
    },
    [inputFieldType, selectInputVal, onInputWithSelectChange]
  );

  const handleSelectChange = useCallback(
    (value: string) => {
      setSelectInputVal(value);
      onInputWithSelectChange({ inputFieldVal, selectInputVal: value });
    },
    [inputFieldVal, onInputWithSelectChange]
  );

  return (
    <div className="w-full relative">
      <Input
        type={inputFieldType}
        placeholder={inputFieldPlaceholder}
        className=""
        value={inputFieldVal}
        onChange={handleInputChange}
      />
      <div className="absolute top-0 right-0 h-full flex items-center justify-center cursor-pointer border-[#e5eaf2]">
        <Select onValueChange={handleSelectChange} value={selectInputVal}>
          <SelectTrigger className="min-w-[80px] shadow">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {selectInputs.map((input) => (
              <SelectItem key={input} value={input}>
                {input}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default InputWithSelect;
