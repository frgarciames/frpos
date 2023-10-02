import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { CategoriesRepository } from "@/repositories/categories";

type CategoriesRepositoryProps = {
  categoriesRepository: CategoriesRepository;
};
type DeleteCategoryInput = InputUsecase<{ id: string }>;
export const deleteCategoryUsecase =
  ({ categoriesRepository }: CategoriesRepositoryProps) =>
  async ({ organization, id }: DeleteCategoryInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Category", id);
    await categoriesRepository.delete(Number(id));
    return categoriesRepository.getBy({
      organization: organization.id,
    });
  };
