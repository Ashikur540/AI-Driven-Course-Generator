import { CheckIcon } from "lucide-react";
import React from "react";

export const ListItemWithCheckIcon = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2">
      <CheckIcon className="w-4 h-4 text-green-500" />
      <p className="text-sm text-zinc-500">{text}</p>
    </div>
  );
};
