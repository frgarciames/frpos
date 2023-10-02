import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { ProductsRepository } from "@/repositories/products";

type ProductsRepositoryProps = {
  productsRepository: ProductsRepository;
};
type GetProductInput = InputUsecase<{ id: string }>;
export const getProductUsecase =
  ({ productsRepository }: ProductsRepositoryProps) =>
  async ({ organization, id }: GetProductInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Product", id);
    const product = await productsRepository.getBy({
      id: Number(id),
    });
    if (product.length === 0) {
      throw NotFoundError("Product", id);
    }
    return product[0];
  };
