import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { Product } from "@/entities";
import { ProductsRepository } from "@/repositories/products";

type ProductsRepositoryProps = {
  productsRepository: ProductsRepository;
};
type UpdateProductInput = InputUsecase<Product>;
export const updateProductUsecase =
  ({ productsRepository }: ProductsRepositoryProps) =>
  async ({
    organization,
    name,
    user,
    id,
    categoryId,
    ...productProps
  }: UpdateProductInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingProduct = await productsRepository.getBy({
      categoryId,
      name,
    });
    if (existingProduct.length > 0) {
      throw AlreadyExistsError("Product", name);
    }
    await productsRepository.update({
      ...productProps,
      id: Number(id),
      name,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return productsRepository.getBy({
      categoryId,
    });
  };
