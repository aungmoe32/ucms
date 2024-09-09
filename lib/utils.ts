import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function getTextColorBasedOnBackground(bgColor: string) {
  const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}

// Function to convert grades to numerical values
export const convertGrades = (grade: string) => {
  const gradeMapping: { [key: string]: number } = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  };
  return gradeMapping[grade];
};

// Function to convert numerical values back to grades
export const convertToGrades = (value: number) => {
  const valueMapping: { [key: number]: string } = {
    4: "A",
    3: "B",
    2: "C",
    1: "D",
    0: "F",
  };
  return valueMapping[value];
};
