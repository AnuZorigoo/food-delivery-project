"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  { value: "All Dishes", label: "All Dishes" },
  { value: "Appetizers", label: "Appetizers" },
  { value: "Salads", label: "Salads" },
  { value: "Pizzas", label: "Pizzas" },
  { value: "Lunch favorites", label: "Lunch favorites" },
  { value: "Main dishes", label: "Main dishes" },
  { value: "Fish & Sea foods", label: "Fish & Sea foods" },
];

export function CategoryCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Appetizers");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-50 justify-between border")}
        >
          {frameworks.find((framework) => framework.value === value)?.label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
