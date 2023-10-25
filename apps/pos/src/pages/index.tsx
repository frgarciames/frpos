import { Layout } from "@/layout";
import { ReactNode } from "react";

export const RootPage = ({ children }: { children?: ReactNode }) => {
  return <Layout>{children}</Layout>;
};
