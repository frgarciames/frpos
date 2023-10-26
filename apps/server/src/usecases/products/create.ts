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
  async ({ organization, payload, user }: CreateProductInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const { categoryId, name, price } = payload;
    if (!categoryId || !name) throw MissingParamsError({ categoryId, name });
    const existingProduct = await productsRepository.getBy({
      categoryId: Number(categoryId),
      name,
    });
    if (existingProduct.length > 0) {
      throw AlreadyExistsError("Product", name);
    }

    await productsRepository.create({
      categoryId: Number(categoryId),
      name,
      price: Number(price),
      createdBy: user.id,
    });
    return productsRepository.getBy({
      categoryId: Number(categoryId),
    });
  };
