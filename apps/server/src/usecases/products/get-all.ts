import { MissingParamsError } from "@/domain/errors/missing-params";
import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { ProductsRepository } from "@/repositories/products";

type ProductsRepositoryProps = {
  productsRepository: ProductsRepository;
};
type GetProductsInput = InputUsecase<{
  categoryId: number;
}>;
export const getProductsUsecase =
  ({ productsRepository }: ProductsRepositoryProps) =>
  async ({ organization, categoryId }: GetProductsInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!categoryId) throw MissingParamsError({ categoryId });
    return productsRepository.getBy({
      categoryId,
    });
  };
