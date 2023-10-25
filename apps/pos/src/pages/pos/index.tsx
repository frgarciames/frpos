import { Button } from "@/components/ui/button";
import { store } from "@/lib/store";
import { observer } from "mobx-react-lite";
import { ReactNode, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const CategoriesList = observer(() => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories } = store;

  useEffect(() => {
    if (categoryId) return;
    const firstCategory = categories?.[0];
    if (!firstCategory) return;
    navigate(String(firstCategory.id));
  }, [categoryId, categories]);

  if (!categories || categories.length === 0) {
    return (
      <div className="flex justify-center items-center space-y-4">
        <h1>No hay categorías</h1>
        <Button>Crear categoría</Button>
      </div>
    );
  }
  return (
    <div className="flex space-x-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          size="lg"
          variant="secondary"
          className="flex space-x-2 bg-slate-100"
          asChild
        >
          <NavLink to={String(category.id)}>{category.name}</NavLink>
        </Button>
      ))}
    </div>
  );
});

export const POSPage = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="p-4 flex flex-col">
      <CategoriesList />
      {children}
    </div>
  );
};
