import FormProvider from "@/components/context/FormProvider";
import React from "react";

export default function Layout({ children }) {
  return <FormProvider>{children}</FormProvider>;
}
