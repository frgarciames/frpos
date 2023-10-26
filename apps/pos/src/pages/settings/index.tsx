import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings } from "lucide-react";
import { useState } from "react";
import { NewCategory } from "./new-category";
import { NewProduct } from "./new-product";

export const SettingsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => setIsOpen(false);
  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Acciones</SheetTitle>
          <NewCategory onSuccess={closeSheet} />
          <NewProduct onSuccess={closeSheet}>
            <Button>Nuevo producto</Button>
          </NewProduct>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
