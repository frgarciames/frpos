import { createZoneUsecase } from "./create";
import { deleteZoneUsecase } from "./delete";
import { getZoneUsecase } from "./get";
import { getZonesUsecase } from "./get-all";
import { updateZoneUsecase } from "./update";

export const GET_ZONES_USECASES = {
  get_zone: {
    fn: getZoneUsecase,
  },
  get_zones: {
    fn: getZonesUsecase,
  },
};
export const DELETE_ZONES_USECASES = {
  delete_zone: {
    fn: deleteZoneUsecase,
    needsToBroadcast: true,
  },
};
export const POST_ZONES_USECASES = {
  create_zone: {
    fn: createZoneUsecase,
    needsToBroadcast: true,
  },
};
export const PATCH_ZONES_USECASES = {
  update_zone: {
    fn: updateZoneUsecase,
    needsToBroadcast: true,
  },
};
