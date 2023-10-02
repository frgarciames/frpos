import { MissingParamsError } from "@/domain/errors/missing-params";
import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { NewProduct } from "@/entities";
import { ProductsRepository } from "@/repositories/products";

type ProductsRepositoryProps = {
  productsRepository: ProductsRepository;
};
type CreateProductInput = InputUsecase<NewProduct>;
export const createProductUsecase =
  ({ productsRepository }: ProductsRepositoryProps) =>
  async ({ organization, name, categoryId, user }: CreateProductInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!categoryId || !name) throw MissingParamsError({ categoryId, name });
    const existingProduct = await productsRepository.getBy({
      categoryId,
      name,
    });
    if (existingProduct.length > 0) {
      throw AlreadyExistsError("Product", name);
    }

    await productsRepository.create({
      categoryId,
      name,
      createdBy: user.id,
    });
    return productsRepository.getBy({
      categoryId,
    });
  };
