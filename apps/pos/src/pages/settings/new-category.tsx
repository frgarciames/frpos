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
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

type NewCategoryProps = {
  onSuccess: () => void;
};
export const NewCategory = ({ onSuccess }: NewCategoryProps) => {
  const { toast } = useToast();
  const { Form, data, state } = useFetcher();
  console.log(data);
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
      <DialogTrigger asChild>
        <Button>Nueva categoría</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form action="/" method="POST" className="grid gap-4">
          <DialogTitle>Nueva categoría</DialogTitle>
          <DialogDescription>
            <Input type="text" name="name" />
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button
              disabled={state === "submitting"}
              name="action"
              type="submit"
              value="create_category"
            >
              {state === "submitting" ? "Creando..." : "Crear"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
