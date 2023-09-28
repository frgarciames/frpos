import { NewCategory } from "../../entities";
import { CategoriesRepository } from "../../repositories/categories";

type CategoriesUsecasesProps = {
  categoriesRepository: CategoriesRepository;
};
type CreateCategoryInput = NewCategory;
export const createCategoryUsecase =
  ({ categoriesRepository }: CategoriesUsecasesProps) =>
  async ({ organization, name, createdBy }: CreateCategoryInput) => {
    if (!organization || !name) throw new Error("Organization is required");
    const existingCategory = await categoriesRepository.getCategoryByName(
      organization,
      name
    );
    if (existingCategory) {
      throw new Error("There is already a category with this name");
    }
    const createdCategory = await categoriesRepository.create({
      organization,
      name,
      createdBy,
    });
    return createdCategory;
  };
