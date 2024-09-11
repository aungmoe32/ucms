"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { FormContext } from "../context/FormContext";

export default function CreateTeacherBtn() {
  const { open, setOpen } = useContext(FormContext);
  return (
    <Button
      onClick={() => {
        setOpen(true);
      }}
    >
      Create Teacher
    </Button>
  );
}
