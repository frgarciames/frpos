import { CreateOrEditProductView } from "@/components/views/create-edit-product";
import { ReactNode } from "react";

type NewCategoryProps = {
  onSuccess: () => void;
  defaultCategoryId?: string;
  children: ReactNode;
};
export const NewProduct = (props: NewCategoryProps) => (
  <CreateOrEditProductView {...props} />
);
