import { Button } from "@/components/ui/button";
import { store } from "@/lib/store";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const CategoriesList = observer(() => {
  const { categories } = store;
  return (
    <div className="flex space-x-2">
      {categories.map((category) => (
        <Button
          size="lg"
          variant="secondary"
          className="flex space-x-2 "
          asChild
        >
          <NavLink to={String(category.id)}>{category.name}</NavLink>
        </Button>
      ))}
    </div>
  );
});

export const POS = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="p-4 flex flex-col">
      <CategoriesList />
      {children}
    </div>
  );
};
