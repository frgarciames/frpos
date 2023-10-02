import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { Table } from "@/entities";
import { TablesRepository } from "@/repositories/tables";

type TablesRepositoryProps = {
  tablesRepository: TablesRepository;
};
type UpdateTableInput = InputUsecase<Table>;
export const updateTableUsecase =
  ({ tablesRepository }: TablesRepositoryProps) =>
  async ({ organization, name, user, id, zoneId }: UpdateTableInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingTable = await tablesRepository.getBy({
      zoneId,
      name,
    });
    if (existingTable.length > 0) {
      throw AlreadyExistsError("Table", name);
    }
    await tablesRepository.update({
      id: Number(id),
      name,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return tablesRepository.getBy({
      zoneId,
    });
  };
