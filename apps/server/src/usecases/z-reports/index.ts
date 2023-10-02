import { closeZReportUsecase } from "./close";
import { getOpenZReportUsecase } from "./get-open";
import { openZReportUsecase } from "./open";

export const GET_Z_REPORTS_USECASES = {
  get_open_z_report: {
    fn: getOpenZReportUsecase,
  },
};
export const DELETE_Z_REPORTS_USECASES = {};
export const POST_Z_REPORTS_USECASES = {
  open_z_report: {
    fn: openZReportUsecase,
    needsToBroadcast: true,
  },
  close_z_report: {
    fn: closeZReportUsecase,
    needsToBroadcast: true,
  },
};
export const PATCH_Z_REPORTS_USECASES = {};
