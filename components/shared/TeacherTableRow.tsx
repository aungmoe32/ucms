import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import ProfileImage from "./ProfileImage";

type Props = {
  num: number;
  image: string;
  name: string;
  major: string;
  teachYear: number[];
  subjects: string[];
  experience: number;
  gender: string;
};

const TeacherTableRow = ({
  num,
  image,
  name,
  major,
  teachYear,
  subjects,
  experience,
  gender,
}: Props) => {
  return (
    <TableRow className="">
      <TableCell className="table-des">{num}.</TableCell>
      <TableCell className="table-des  ">
        <ProfileImage
          image={image}
          name={name}
          width={40}
          height={40}
          textSize="text-sm"
        />
      </TableCell>
      <TableCell className="table-des cursor-pointer min-w-[170px] hover:text-primary">
        {name}
      </TableCell>
      <TableCell className="table-des min-w-[100px]">{major}</TableCell>
      <TableCell className="table-des max-w-[150px] overflow-x-scroll no-scrollbar">
        {subjects.join(" , ")}
      </TableCell>
      <TableCell className="table-des min-w-[150px]">
        {teachYear.join(" , ")}
      </TableCell>
      <TableCell className="table-des">{experience} year(s)</TableCell>
      <TableCell className="table-des">{gender}</TableCell>
    </TableRow>
  );
};

export default TeacherTableRow;
