export const classes = [
  {
    text: "Math",
    id: "1",
    color: "#00af2c",
  },
  {
    text: "Eng",
    id: "2",
    color: "#56ca85",
  },
  {
    text: "DLD",
    id: "3",
    color: "#8ecd3c",
  },
];

export const getClassName = (id) => {
  const name = classes.find((cls) => cls.id == id)?.text;
  return name;
};

export const getClassColor = (id) => {
  const name = classes.find((cls) => cls.id == id)?.color;
  return name;
};
