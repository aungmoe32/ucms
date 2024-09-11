"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { FormContext } from "../context/FormContext";

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
    >
      Create Teacher
    </Button>
  );
}
