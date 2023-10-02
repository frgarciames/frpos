import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { Zone } from "@/entities";
import { ZonesRepository } from "@/repositories/zones";

type ZonesRepositoryProps = {
  zonesRepository: ZonesRepository;
};
type UpdateZoneInput = InputUsecase<Zone>;
export const updateZoneUsecase =
  ({ zonesRepository }: ZonesRepositoryProps) =>
  async ({ organization, name, user, id }: UpdateZoneInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingZone = await zonesRepository.getBy({
      organization: organization.id,
      name,
    });
    if (existingZone.length > 0) {
      throw AlreadyExistsError("Zone", name);
    }
    await zonesRepository.update({
      id: Number(id),
      name,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return zonesRepository.getZonesWithTables(organization.id);
  };
