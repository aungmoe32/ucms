import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import ProfileImage from "./ProfileImage";

type Props = {
  num: number;
  image: string;
  name: string;
  year: number;
  major: string;
  term: string;
  gender: string;
};

const StudentTableRow = ({
  num,
  image,
  name,
  year,
  major,
  term,
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
      <TableCell className="table-des min-w-[100px]">{year} Year</TableCell>
      <TableCell className="table-des">{major}</TableCell>
      <TableCell className="table-des min-w-[150px]">{term} Term</TableCell>
      <TableCell className="table-des">{gender}</TableCell>
    </TableRow>
  );
};

export default StudentTableRow;
