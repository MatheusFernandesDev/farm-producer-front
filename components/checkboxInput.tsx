"use client"

import { Checkbox } from "@/components/ui/checkbox"

interface ICheckBoxInput {
  id: string;
  name: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export function CheckboxInput({ id, name, checked, onChange }: ICheckBoxInput) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(checked) => onChange(id, !!checked)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {name}
        </label>
      </div>
    </div>
  );
}
