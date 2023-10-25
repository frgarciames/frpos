import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { ZonesRepository } from "@/repositories/zones";

type ZonesRepositoryProps = {
  zonesRepository: ZonesRepository;
};
type GetZonesInput = InputUsecase<{
  nested?: boolean;
}>;
export const getZonesUsecase =
  ({ zonesRepository }: ZonesRepositoryProps) =>
  async ({ organization, nested }: GetZonesInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!nested) {
      return zonesRepository.getBy({
        organization: organization.id,
      });
    }
    const response = await zonesRepository.getZonesWithTables(organization.id);
    return Object.values(response).map(({ zone, tables }) => ({
      ...zone,
      tables,
    }));
  };
