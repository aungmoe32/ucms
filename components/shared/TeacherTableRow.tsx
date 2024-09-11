import React, { useContext, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import ProfileImage from "./ProfileImage";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { FormContext } from "../context/FormContext";
import { deleteTeacher } from "@/lib/resources/teacher";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const queryClient = useQueryClient();
  return (
    <TableRow className="">
      <TableCell>{num}.</TableCell>
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
            <Pencil className=" text-primary" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpenDelDialog(true)}
          >
            <Trash2 className=" text-red-500" />
          </Button>
        </div>
      </TableCell>
      <AlertDialog open={openDelDialog} onOpenChange={setOpenDelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const id = toast.loading("deleting...");
                try {
                  await deleteTeacher(user.teacher.id);
                  toast.remove(id);
                  toast.success("deleted");
                } catch (e) {
                  toast.remove(id);
                  toast.error("error");
                }
                queryClient.invalidateQueries(["teachers"], { exact: true });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TableRow>
  );
};

export default TeacherTableRow;
