import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { store } from "@/lib/store";
import { observer } from "mobx-react-lite";
import { ReactNode, useEffect } from "react";
import { useFetcher } from "react-router-dom";

type NewCategoryProps = {
  onSuccess: () => void;
  defaultCategoryId?: string;
  children: ReactNode;
};
export const NewProduct = observer(
  ({ onSuccess, defaultCategoryId, children }: NewCategoryProps) => {
    console.log(defaultCategoryId);
    const { toast } = useToast();
    const { Form, data, state } = useFetcher();
    useEffect(() => {
      if (data?.state === "OK") {
        onSuccess();
      }
      if (data?.state === "ERROR") {
        toast({
          variant: "destructive",
          title: "Uh oh! Algo no ha ido bien",
          description: data?.error,
        });
      }
    }, [data]);
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <Form action="/" method="POST" className="grid gap-4">
            <DialogTitle>Nuevo producto</DialogTitle>
            <div>
              <Select name="categoryId" defaultValue={defaultCategoryId}>
                <DialogDescription className="mb-2">
                  Categoría
                </DialogDescription>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder="Categoría"
                    defaultValue={defaultCategoryId}
                  />
                </SelectTrigger>
                <SelectContent>
                  {store.categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogDescription>
              <Input type="number" name="price" placeholder="10.00" />
            </DialogDescription>
            <DialogDescription>
              <Input type="text" name="name" placeholder="Calamares" />
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                disabled={state === "submitting"}
                name="action"
                type="submit"
                value="product"
              >
                {state === "submitting" ? "Creando..." : "Crear"}
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);
