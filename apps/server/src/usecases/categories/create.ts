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
  async ({ organization, payload, user }: CreateCategoryInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingCategory = await categoriesRepository.getBy({
      organization: organization.id,
      name: payload.name,
    });
    if (existingCategory.length > 0) {
      throw AlreadyExistsError("Category", payload.name);
    }
    await categoriesRepository.create({
      organization: organization.id,
      name: payload.name,
      createdBy: user.id,
    });
    return categoriesRepository.getBy({
      organization: organization.id,
    });
  };
