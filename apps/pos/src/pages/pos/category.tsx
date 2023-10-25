import { Product } from "@frpos/server";
import { useLoaderData } from "react-router-dom";

export const Category = () => {
  const products = useLoaderData() as Product[];
  console.log(products);
  return (
    <div className="text-white">
      {products.map((product) => {
        return (
          <div key={product.id} className="flex space-x-2">
            <div>{product.name}</div>
            <div>{product.price}</div>
          </div>
        );
      })}
    </div>
  );
};
