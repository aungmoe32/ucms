import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function SubjectColorPicker({ onChange }) {
  const [color, setColor] = useState("#b32aa9");

  return (
    <div className="flex space-x-3">
      <HexColorPicker
        color={color}
        onChange={(clr) => {
          setColor(clr);
          onChange(clr);
        }}
      />

      <div className="flex space-x-2 items-center mt-3">
        <div className="w-10 aspect-square" style={{ background: color }}></div>
        <span>Current color is {color}</span>
      </div>
    </div>
  );
}
