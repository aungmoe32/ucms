import { createContext, Dispatch, SetStateAction } from "react";

export const FormContext = createContext({
  open: false,
  setOpen: (v) => {},
  defaultValues: {},
  setDefaultValues: () => {},
  edit: false,
  setEdit: (v) => {},
});
