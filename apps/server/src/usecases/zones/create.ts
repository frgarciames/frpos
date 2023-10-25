import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { NewZone } from "@/entities";
import { ZonesRepository } from "@/repositories/zones";
import { getZonesUsecase } from "./get-all";

type ZonesRepositoryProps = {
  zonesRepository: ZonesRepository;
};
type CreateZoneInput = InputUsecase<NewZone>;
export const createZoneUsecase =
  ({ zonesRepository }: ZonesRepositoryProps) =>
  async ({ organization, name, user }: CreateZoneInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingZone = await zonesRepository.getBy({
      organization: organization.id,
      name,
    });
    if (existingZone.length > 0) {
      throw AlreadyExistsError("Zone", name);
    }
    await zonesRepository.create({
      organization: organization.id,
      name,
      createdBy: user.id,
    });
    return getZonesUsecase({ zonesRepository })({
      organization,
      user,
      nested: true,
    });
  };
