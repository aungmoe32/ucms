import { createContext, Dispatch, SetStateAction } from "react";

export const FormContext = createContext({
  open: false,
  setOpen: (v) => {},
  defaultValues: {},
  setDefaultValues: (v) => {},
  edit: false,
  setEdit: (v) => {},
  isProfile: false,
  setIsProfile: (v) => {},
});
