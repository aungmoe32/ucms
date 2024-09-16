"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { FormContext } from "../context/FormContext";
import { Plus } from "lucide-react";

export default function CreateTeacherBtn() {
  const { open, setOpen, setEdit, setDefaultValues } = useContext(FormContext);
  return (
    <Button
      onClick={() => {
        setEdit(false);
        setDefaultValues({
          subjects: [],
        });
        setOpen(true);
      }}
      className=" rounded-full md:rounded-md"
    >
      <Plus />
      <span className="pl-2 hidden md:block">Create Teacher</span>
    </Button>
  );
}
