import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { CategoriesRepository } from "@/repositories/categories";

type CategoriesRepositoryProps = {
  categoriesRepository: CategoriesRepository;
};
type GetCategoriesInput = InputUsecase<{
  nested?: boolean;
}>;
export const getCategoriesUsecase =
  ({ categoriesRepository }: CategoriesRepositoryProps) =>
  async ({ organization, nested = false }: GetCategoriesInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!nested) {
      return await categoriesRepository.getBy({
        organization: organization.id,
      });
    }
    const response = await categoriesRepository.getCategoriesWithProducts(
      organization.id
    );
    return Object.values(response).map(({ category, products }) => ({
      ...category,
      products,
    }));
  };
