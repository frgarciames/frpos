import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { store } from "@/lib/store";
import { Product } from "@frpos/server";
import { observer } from "mobx-react-lite";
import { ReactNode, useEffect, useState } from "react";
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
const Calculator = () => {
  const [items, setItems] = useState<Product[]>([
    {
      id: 1,
      image: null,
      name: "Test",
      price: 10,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      stock: 10,
      createdBy: "1",
      updatedBy: "",
    },
  ]);
  const [total, setTotal] = useState(0);
  const setNumber = (number: number) => {
    setTotal(number);
  };
  return (
    <Card className="w-full h-full">
      <CardContent className=" p-4 space-y-4 w-full h-full flex flex-col">
        <div className="border rounded-md p-4 flex-1 flex flex-col space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
        <div className="border rounded-lg p-2 text-right text-3xl">{total}</div>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" onClick={() => setNumber(1)}>
            1
          </Button>
          <Button variant="outline" onClick={() => setNumber(2)}>
            2
          </Button>
          <Button variant="outline" onClick={() => setNumber(3)}>
            3
          </Button>
          <Button variant="outline" onClick={() => setNumber(4)}>
            4
          </Button>
          <Button variant="outline" onClick={() => setNumber(5)}>
            5
          </Button>
          <Button variant="outline" onClick={() => setNumber(6)}>
            6
          </Button>
          <Button variant="outline" onClick={() => setNumber(7)}>
            7
          </Button>
          <Button variant="outline" onClick={() => setNumber(8)}>
            8
          </Button>
          <Button variant="outline" onClick={() => setNumber(9)}>
            9
          </Button>
          <Button variant="outline" onClick={() => setNumber(0)}>
            0
          </Button>
          <Button variant="outline">.</Button>
          <Button variant="destructive">C</Button>
        </div>
        <Button className="w-full" variant="secondary">
          =
        </Button>
      </CardContent>
    </Card>
  );
};

export const POSPage = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="p-4 flex flex-col flex-1">
      <CategoriesList />
      <div className="flex space-x-4 mt-4 flex-1">
        <div className="w-[75%]">{children}</div>
        <div className="w-[25%]">
          <Calculator />
        </div>
      </div>
    </div>
  );
};
