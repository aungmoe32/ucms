"use client";
import { SearchContext } from "@/components/context/SearchContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Majors } from "@/lib/constants";
import React, { useContext } from "react";

const SelectBox = ({ value, setValue, label, items }) => {
  return (
    <div className="flex">
      <Select
        defaultValue="all"
        onValueChange={(value) => {
          if (value == "all") value = "";
          setValue(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Teaching {label}</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            {items.map((item) => (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectBox;
