import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { TablesRepository } from "@/repositories/tables";

type TablesRepositoryProps = {
  tablesRepository: TablesRepository;
};
type DeleteTableInput = InputUsecase<{ id: string }>;
export const deleteTableUsecase =
  ({ tablesRepository }: TablesRepositoryProps) =>
  async ({ organization, id }: DeleteTableInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Table", id);
    const table = await tablesRepository.get(Number(id));
    await tablesRepository.delete(Number(id));
    return tablesRepository.getBy({
      zoneId: table.zoneId,
    });
  };
