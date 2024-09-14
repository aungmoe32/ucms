import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ViewSwitcher({ view, setView }) {
  const viewList = [
    { name: "agenda", text: "Simple" },
    { name: "workWeek", text: "Week" },
  ];
  return (
    <Select onValueChange={setView} value={view}>
      <SelectTrigger>
        <SelectValue placeholder="View" />
      </SelectTrigger>
      <SelectContent>
        {viewList.map((v) => (
          <SelectItem value={v.name} key={v.name}>
            {v.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
