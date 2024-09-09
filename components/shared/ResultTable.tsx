import React from "react";
import { Table, TableBody, TableHead, TableRow } from "@/components/ui/table";
import ResultTableRow from "./ResultTableRow";

const data = [
  {
    roll: 10,
    photo: "",
    name: "Madara",
    year: 2,
    major: "It",
    term: "Second",
    gender: "Male",
    result: [
      {
        subject: "English",
        marks: "A",
      },
      {
        subject: "Math",
        marks: "A",
      },
      {
        subject: "Web",
        marks: "A",
      },
      {
        subject: "C++",
        marks: "A",
      },
      {
        subject: "Be",
        marks: "A",
      },

      {
        subject: "Dc",
        marks: "A",
      },

      {
        subject: "Dld",
        marks: "A",
      },
    ],
  },
  {
    roll: 20,
    photo: "",
    name: "Sasuke",
    year: 2,
    major: "It",
    term: "Second",
    gender: "Male",
    result: [
      {
        subject: "English",
        marks: "A",
      },
      {
        subject: "Math",
        marks: "A",
      },
      {
        subject: "Web",
        marks: "C",
      },
      {
        subject: "C++",
        marks: "B",
      },
      {
        subject: "Be",
        marks: "B",
      },

      {
        subject: "Dc",
        marks: "A",
      },

      {
        subject: "Dld",
        marks: "A",
      },
    ],
  },
];

const ResultTable = () => {
  const tableHeadStyle = "table-head text-base text-black font-semibold";

  return (
    <div className="">
      <Table className="w-full">
        <TableBody>
          <TableRow className="bg-blue-100 hover:bg-blue-100">
            <TableHead className={tableHeadStyle}>S/N</TableHead>
            <TableHead className={tableHeadStyle}>Name</TableHead>
            <TableHead className={tableHeadStyle}>Roll No</TableHead>
            {data[0].result.map((item, index) => (
              <TableHead key={index} className={tableHeadStyle}>
                {item.subject}
              </TableHead>
            ))}
          </TableRow>
          {data.map((item, index) => (
            <ResultTableRow
              key={index}
              num={index + 1}
              name={item.name}
              roll={item.roll}
              result={item.result}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultTable;
