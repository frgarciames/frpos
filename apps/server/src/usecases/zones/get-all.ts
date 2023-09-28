import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "../../domain/errors/organization";
import { ZonesRepository } from "../../repositories/zones";

type ZonesRepositoryProps = {
  zonesRepository: ZonesRepository;
};
type GetZonesInput = InputUsecase<{}>;
export const getZonesUsecase =
  ({ zonesRepository }: ZonesRepositoryProps) =>
  async ({ organization }: GetZonesInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const zones = await zonesRepository.getBy({
      organization: organization.id,
    });
    return zones;
  };
