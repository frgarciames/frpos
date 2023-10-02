import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { TablesRepository } from "@/repositories/tables";

type TablesRepositoryProps = {
  tablesRepository: TablesRepository;
};
type GetTableInput = InputUsecase<{ id: string }>;
export const getTableUsecase =
  ({ tablesRepository }: TablesRepositoryProps) =>
  async ({ organization, id }: GetTableInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Table", id);
    const table = await tablesRepository.getBy({
      id: Number(id),
    });
    if (table.length === 0) {
      throw NotFoundError("Table", id);
    }
    return table[0];
  };
