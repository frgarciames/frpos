import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Product } from "@frpos/server";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { NewProduct } from "../settings/new-product";

const NewProductOnCategoryPage = ({ categoryId }: { categoryId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center space-y-4 flex-1 h-full">
      <h1>No hay productos</h1>
      <NewProduct onSuccess={() => void 0} defaultCategoryId={categoryId}>
        <Button>Crear producto</Button>
      </NewProduct>
    </div>
  );
};

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const products = useLoaderData() as Product[];
  if (!products || products.length === 0) {
    return <NewProductOnCategoryPage categoryId={categoryId as string} />;
  }
  return (
    <div className="w-full gap-4 flex flex-wrap">
      {products.map((product) => {
        return (
          <Card
            key={product.id}
            className="flex flex-col justify-center items-center h-[10rem] p-2 cursor-pointer w-[10rem]"
          >
            <CardTitle>{product.name}</CardTitle>
          </Card>
        );
      })}
    </div>
  );
};
