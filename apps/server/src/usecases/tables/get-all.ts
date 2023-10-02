import { MissingParamsError } from "@/domain/errors/missing-params";
import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { TablesRepository } from "@/repositories/tables";

type TablesRepositoryProps = {
  tablesRepository: TablesRepository;
};
type GetTablesInput = InputUsecase<{
  zoneId: number;
}>;
export const getTablesUsecase =
  ({ tablesRepository }: TablesRepositoryProps) =>
  async ({ organization, zoneId }: GetTablesInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!zoneId) throw MissingParamsError({ zoneId });
    return tablesRepository.getBy({
      zoneId,
    });
  };
