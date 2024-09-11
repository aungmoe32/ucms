import { createContext, Dispatch, SetStateAction } from "react";

interface StateContextType {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  major: string;
  setMajor: Dispatch<SetStateAction<string>>;
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<StateContextType>({
  search: "",
  setSearch: () => {},
  year: "",
  setYear: () => {},
  major: "",
  setMajor: () => {},
  term: "",
  setTerm: () => {},
});
