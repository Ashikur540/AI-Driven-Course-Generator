import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type InputWithSelectProps = {
  selectInputs: string[];
};

const InputWithSelect = ({ selectInputs }: InputWithSelectProps) => {
  // price dropdown actions
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  //   const [selectedCurrencyType, setSelectedCurrencyType] = useState("USD");

  //   const handlePriceDropdownClick = (currency: string) => {
  //     setSelectedCurrencyType(currency);
  //     setPriceDropdownOpen(false);
  //   };

  return (
    <div className="w-full relative">
      <Input type="number" placeholder="0" className="" />
      <div
        onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
        className="absolute top-0 right-0 h-full flex items-center justify-center cursor-pointer  border-[#e5eaf2] "
      >
        <Select>
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
};

export default InputWithSelect;
