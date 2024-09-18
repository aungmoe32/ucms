"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormContext } from "../context/FormContext";
import StudentCreateForm from "../student/StudentCreateForm";

const StudentFormDialog = () => {
  const { open, setOpen } = useContext(FormContext);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" max-h-[700px] max-w-[700px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Student Form</DialogTitle>
          <DialogDescription>Create a student</DialogDescription>
          <StudentCreateForm></StudentCreateForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormDialog;
