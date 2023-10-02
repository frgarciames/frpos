import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { CategoriesRepository } from "@/repositories/categories";

type CategoriesRepositoryProps = {
  categoriesRepository: CategoriesRepository;
};
type GetCategoryInput = InputUsecase<{ id: string }>;
export const getCategoryUsecase =
  ({ categoriesRepository }: CategoriesRepositoryProps) =>
  async ({ organization, id }: GetCategoryInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Category", id);
    const category = await categoriesRepository.getBy({
      organization: organization.id,
      id: Number(id),
    });
    if (category.length === 0) {
      throw NotFoundError("Category", id);
    }
    return category[0];
  };
