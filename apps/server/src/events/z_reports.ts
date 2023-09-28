import {
  getOpenZReportUsecase,
  openZReportUsecase,
} from "../usecases/z-reports/open";

export const GET_CURRENT_Z_REPORT_KEY = "GET_CURRENT_Z_REPORT";
export const NEW_Z_REPORT_KEY = "NEW_Z_REPORT";

export const Z_REPORTS_EVENTS = {
  [GET_CURRENT_Z_REPORT_KEY]: getOpenZReportUsecase,
  [NEW_Z_REPORT_KEY]: openZReportUsecase,
} as const;

export type ZReportsEvent = keyof typeof Z_REPORTS_EVENTS;
