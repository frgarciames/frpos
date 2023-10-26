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
  async ({ organization, user, payload: product }: UpdateProductInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingProduct = await productsRepository.getBy({
      categoryId: Number(product.categoryId),
      name: product.name,
    });
    if (
      existingProduct.length > 0 &&
      existingProduct[0].id !== Number(product.id)
    ) {
      throw AlreadyExistsError("Product", product.name);
    }
    await productsRepository.update({
      ...product,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return productsRepository.getBy({
      categoryId: Number(product.categoryId),
    });
  };
