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
    return await categoriesRepository.getCategoriesWithProducts(
      organization.id
    );
  };
