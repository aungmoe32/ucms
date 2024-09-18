import React, { useContext, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { FormContext } from "../context/FormContext";
import { deleteTeacher } from "@/lib/api/teacher";
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
import { deleteStudent } from "@/lib/api/student";

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

const StudentTableRow = ({ user, num }: Props) => {
  const { edit, setEdit, setOpen, setDefaultValues } = useContext(FormContext);
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const queryClient = useQueryClient();
  return (
    <TableRow>
      <TableCell>{num}.</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.major}</TableCell>
      <TableCell>{user.year}</TableCell>
      <TableCell>{user.term}</TableCell>
      <TableCell>{user.gender}</TableCell>
      <TableCell>
        <div className="flex items-center ">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              //   const info = {
              //     studentId: user.studentId,
              //     name: user.name,
              //     email: user.email,
              //     major: user.major,
              //     year: user.year,
              //     term: user.term,
              //     gender: user.gender,
              //   };
              setDefaultValues(user);
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
                  await deleteStudent(user.studentId);
                  toast.remove(id);
                  toast.success("deleted");
                } catch (e) {
                  toast.remove(id);
                  toast.error("error");
                }
                queryClient.invalidateQueries(["students"], { exact: true });
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

export default StudentTableRow;
