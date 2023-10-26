import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Product } from "@frpos/server";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { NewProduct } from "../settings/new-product";
import { Edit, Edit2, Minus, X } from "lucide-react";
import clsx from "clsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreateOrEditProductView } from "@/components/views/create-edit-product";

const NewProductOnCategoryPage = ({ categoryId }: { categoryId: string }) => {
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { categoryId } = useParams();
  const products = useLoaderData() as Product[];
  if (!products || products.length === 0) {
    return <NewProductOnCategoryPage categoryId={categoryId as string} />;
  }
  return (
    <div className="p-4 w-full gap-4 flex flex-wrap max-h-[calc(100vh-9rem)] overflow-auto">
      {productToDelete && (
        <AlertDialog
          open
          onOpenChange={(open) => !open && setProductToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se podrá deshacer y se eliminará permanentemente{" "}
                <strong>{productToDelete.name}</strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {products.map((product) => {
        return (
          <Card
            key={product.id}
            className={clsx(
              "relative flex flex-col justify-center items-center h-[10rem] p-2 cursor-pointer w-[10rem]",
              {
                "animate-wiggle animate-infinite animate-duration-200 animate-ease-linear":
                  isEditing,
              }
            )}
          >
            {isEditing && (
              <CreateOrEditProductView
                product={product}
                onSuccess={() => setIsEditing(false)}
                defaultCategoryId={product.categoryId}
              >
                <div className="rounded-md flex justify-center items-center bg-secondary/50 w-full absolute h-full overflow-hidden">
                  <button className="rounded-lg p-4 bg-secondary/95">
                    <Edit2 />
                  </button>
                </div>
              </CreateOrEditProductView>
            )}
            {isEditing && (
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full absolute -top-2 -left-2"
                onClick={() => setProductToDelete(product)}
              >
                <Minus />
              </Button>
            )}
            <CardTitle>{product.name}</CardTitle>
          </Card>
        );
      })}
      <div className="absolute bottom-4 right-4">
        <Button
          size="icon"
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <X /> : <Edit />}
        </Button>
      </div>
    </div>
  );
};
