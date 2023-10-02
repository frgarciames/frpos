import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { ZonesRepository } from "@/repositories/zones";

type ZonesRepositoryProps = {
  zonesRepository: ZonesRepository;
};
type DeleteZoneInput = InputUsecase<{ id: string }>;
export const deleteZoneUsecase =
  ({ zonesRepository }: ZonesRepositoryProps) =>
  async ({ organization, user, id }: DeleteZoneInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Zone", id);
    await zonesRepository.delete(Number(id));
    return zonesRepository.getZonesWithTables(organization.id);
  };
