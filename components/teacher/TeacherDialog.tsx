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
import TeacherCreateForm from "./TeacherCreateForm";

const TeacherDialog = ({ title, description }) => {
  const { open, setOpen } = useContext(FormContext);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className=" max-h-[700px] max-w-[700px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
          <TeacherCreateForm></TeacherCreateForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherDialog;
