import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { ZonesRepository } from "@/repositories/zones";

type ZonesRepositoryProps = {
  zonesRepository: ZonesRepository;
};
type GetZoneInput = InputUsecase<{ id: string }>;
export const getZoneUsecase =
  ({ zonesRepository }: ZonesRepositoryProps) =>
  async ({ organization, id }: GetZoneInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Zone", id);
    const zone = await zonesRepository.getBy({
      organization: organization.id,
      id: Number(id),
    });
    if (zone.length === 0) {
      throw NotFoundError("Zone", id);
    }
    return zone[0];
  };
