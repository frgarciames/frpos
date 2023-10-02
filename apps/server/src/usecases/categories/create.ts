import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { NewCategory } from "@/entities";
import { CategoriesRepository } from "@/repositories/categories";

type CategoriesRepositoryProps = {
  categoriesRepository: CategoriesRepository;
};
type CreateCategoryInput = InputUsecase<NewCategory>;
export const createCategoryUsecase =
  ({ categoriesRepository }: CategoriesRepositoryProps) =>
  async ({ organization, name, user }: CreateCategoryInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingCategory = await categoriesRepository.getBy({
      organization: organization.id,
      name,
    });
    if (existingCategory.length > 0) {
      throw AlreadyExistsError("Category", name);
    }
    await categoriesRepository.create({
      organization: organization.id,
      name,
      createdBy: user.id,
    });
    return categoriesRepository.getBy({
      organization: organization.id,
    });
  };
