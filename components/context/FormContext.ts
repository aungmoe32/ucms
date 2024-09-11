import { createContext, Dispatch, SetStateAction } from "react";

export const FormContext = createContext({
  open: false,
  setOpen: () => {},
  defaultValues: {},
  setDefaultValues: () => {},
  edit: false,
  setEdit: () => {},
});
