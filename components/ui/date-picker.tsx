"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ field }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full placeholder-gray-500 h-[54px] border-[2px] border-gray-200 rounded-md justify-start text-left font-normal",
            !field.value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-4 h-5 w-5" />
          {field.value ? (
            format(field.value, "PPP")
          ) : (
            <span className="text-base text-gray-500">Pick Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
