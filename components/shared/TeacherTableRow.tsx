import React, { useContext } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import ProfileImage from "./ProfileImage";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { FormContext } from "../context/FormContext";

type Props = {
  user: any;
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
  user,
  num,
  image,
  name,
  major,
  teachYear,
  subjects,
  experience,
  gender,
}: Props) => {
  const { edit, setEdit, setOpen, setDefaultValues } = useContext(FormContext);
  return (
    <TableRow className="">
      <TableCell>{num}.</TableCell>
      <TableCell>
        <ProfileImage
          image={image}
          name={name}
          width={40}
          height={40}
          textSize="text-sm"
        />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{major}</TableCell>
      <TableCell>{subjects.join(" , ")}</TableCell>
      {/* <TableCell>{teachYear.join(" , ")}</TableCell> */}
      <TableCell>{experience} year(s)</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>
        <div className="flex items-center ">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              const info = {
                teacher: user.teacher,
                name: user.name,
                email: user.email,
                experience: user.teacher.experience,
                major: user.major,
                gender: user.gender,
                subjects: user.subjects.map((s) => ({
                  subject_id: s.id,
                  year: s.semester.year,
                  major: s.semester.major,
                  term: s.semester.term,
                })),
              };

              // console.log(user);
              console.log(info);
              setDefaultValues(info);
              setEdit(true);
              setOpen(true);
            }}
          >
            <Pencil />
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TeacherTableRow;
