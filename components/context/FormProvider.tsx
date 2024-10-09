"use client";
import React, { useState } from "react";
import { FormContext } from "./FormContext";
const FormProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    subjects: [],
  });
  return (
    <FormContext.Provider
      value={{
        open,
        setOpen,
        defaultValues,
        setDefaultValues,
        edit,
        setEdit,
        isProfile,
        setIsProfile,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
