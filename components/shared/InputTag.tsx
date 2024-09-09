"use client";
import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

interface InputTagProps {
  ref: React.RefCallback<HTMLInputElement>;
}

// Specifies which characters should terminate tags input. An array of character codes.
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const InputTag: React.FC<InputTagProps> = ({ ref }) => {
  const [tags, setTags] = React.useState<any[]>([]);

  // Method to delete tag from Array
  const handleDelete = (i: any) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  // Method to Add tag into Array
  const handleAddition = (tag: any) => {
    setTags([...tags, tag]);
  };
  return (
    <div id="tags">
      <ReactTags
        tags={tags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="bottom"
        placeholder="Enter your subjects"
        autocomplete
        allowDragDrop={false}
      />
    </div>
  );
};

export default InputTag;
