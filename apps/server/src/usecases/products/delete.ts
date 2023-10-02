import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { ProductsRepository } from "@/repositories/products";

type ProductsRepositoryProps = {
  productsRepository: ProductsRepository;
};
type DeleteProductInput = InputUsecase<{ id: string }>;
export const deleteProductUsecase =
  ({ productsRepository }: ProductsRepositoryProps) =>
  async ({ organization, id }: DeleteProductInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Product", id);
    const product = await productsRepository.get(Number(id));
    await productsRepository.delete(Number(id));
    return productsRepository.getBy({
      categoryId: product.categoryId,
    });
  };
