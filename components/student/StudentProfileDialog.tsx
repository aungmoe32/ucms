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
import StudentProfileForm from "./StudentProfileForm";

const StudentProfileDialog = ({ open, setOpen, defaultValues }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" max-h-[700px] max-w-[700px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-center">Profile</DialogTitle>
          <DialogDescription className="text-center">
            Edit profile
          </DialogDescription>
          <StudentProfileForm
            defaultValues={defaultValues}
          ></StudentProfileForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileDialog;
