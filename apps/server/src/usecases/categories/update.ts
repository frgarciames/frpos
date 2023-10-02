import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { Category } from "@/entities";
import { CategoriesRepository } from "@/repositories/categories";

type CategoriesRepositoryProps = {
  categoriesRepository: CategoriesRepository;
};
type UpdateCategoryInput = InputUsecase<Category>;
export const updateCategoryUsecase =
  ({ categoriesRepository }: CategoriesRepositoryProps) =>
  async ({ organization, name, user, id }: UpdateCategoryInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingCategory = await categoriesRepository.getBy({
      organization: organization.id,
      name,
    });
    if (existingCategory.length > 0) {
      throw AlreadyExistsError("Category", name);
    }
    await categoriesRepository.update({
      id: Number(id),
      name,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return categoriesRepository.getBy({
      organization: organization.id,
    });
  };
