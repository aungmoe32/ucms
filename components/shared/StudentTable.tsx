import React from "react";
import StudentTableRow from "./StudentTableRow";
import { Table, TableBody, TableHead, TableRow } from "@/components/ui/table";

const StudentTable = () => {
  const data = [
    {
      image: "",
      name: "Madara",
      year: 6,
      major: "It",
      term: "Second",
      gender: "Male",
    },
    {
      image:
        "https://wallpapers.com/images/hd/naruto-profile-pictures-sa1tekghfajrr928.jpg",
      name: "Naruto",
      year: 4,
      major: "It",
      term: "First",
      gender: "Male",
    },
    {
      image: "",
      name: "Sasuke Uchiha",
      year: 4,
      major: "It",
      term: "First",
      gender: "Male",
    },
    {
      image: "",
      name: "Sakura",
      year: 4,
      major: "Ep",
      term: "Second",
      gender: "Female",
    },
    {
      image: "",
      name: "Hinata",
      year: 4,
      major: "Mc",
      term: "First",
      gender: "Female",
    },
    {
      image: "",
      name: "Kakashi",
      year: 6,
      major: "It",
      term: "First",
      gender: "Male",
    },
  ];

  const tableHeadStyle = "table-head text-base text-black font-semibold";

  return (
    <div className="">
      <Table className="w-full">
        <TableBody>
          <TableRow className="bg-blue-100 hover:bg-blue-100">
            <TableHead className={tableHeadStyle}>Roll No</TableHead>
            <TableHead className={tableHeadStyle}>Image</TableHead>
            <TableHead className={tableHeadStyle}>Name</TableHead>
            <TableHead className={tableHeadStyle}>Year</TableHead>
            <TableHead className={tableHeadStyle}>Major</TableHead>
            <TableHead className={tableHeadStyle}>Term</TableHead>
            <TableHead className={tableHeadStyle}>Gender</TableHead>
          </TableRow>
          {data.map((item, index) => (
            <StudentTableRow
              key={index}
              num={index + 1}
              image={item.image}
              name={item.name}
              year={item.year}
              major={item.major}
              term={item.term}
              gender={item.gender}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
