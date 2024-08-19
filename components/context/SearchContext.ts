import { createContext, Dispatch, SetStateAction } from "react";

interface StateContextType {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<StateContextType>({
  search: "",
  setSearch: () => {},
});
