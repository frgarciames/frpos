import { MissingParamsError } from "@/domain/errors/missing-params";
import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { NewTable } from "@/entities";
import { TablesRepository } from "@/repositories/tables";

type TablesRepositoryProps = {
  tablesRepository: TablesRepository;
};
type CreateTableInput = InputUsecase<NewTable>;
export const createTableUsecase =
  ({ tablesRepository }: TablesRepositoryProps) =>
  async ({ organization, name, zoneId, user }: CreateTableInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!zoneId) throw MissingParamsError({ zoneId });
    if (name) {
      const existingTable = await tablesRepository.getBy({
        zoneId,
        name,
      });
      if (existingTable.length > 0) {
        throw AlreadyExistsError("Table", name);
      }
    } else {
      const tablesInZone = await tablesRepository.getBy({
        zoneId,
      });
      const numberOfTablesInZone = tablesInZone.length;
      name = String(numberOfTablesInZone + 1);
    }

    await tablesRepository.create({
      zoneId,
      name,
      createdBy: user.id,
    });
    return tablesRepository.getBy({
      zoneId,
    });
  };
