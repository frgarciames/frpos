import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { CategoriesRepository } from "@/repositories/categories";

type CategoriesRepositoryProps = {
  categoriesRepository: CategoriesRepository;
};
type GetCategoriesInput = InputUsecase<{}>;
export const getCategoriesUsecase =
  ({ categoriesRepository }: CategoriesRepositoryProps) =>
  async ({ organization }: GetCategoriesInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const categories = await categoriesRepository.getBy({
      organization: organization.id,
    });
    return categories;
  };
