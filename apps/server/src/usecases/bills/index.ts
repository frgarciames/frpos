import { createBillUsecase } from "./create";
import { deleteBillUsecase } from "./delete";
import { getBillUsecase } from "./get";
import { getBillsUsecase } from "./get-all";
import { changeTableUsecase } from "./change-table";
import { closeBillUsecase } from "./close";
import { getBillsSnapshotsByZReportUsecase } from "./get-snapshots-by-zreport";

export const GET_BILLS_USECASES = {
  get_bill: {
    fn: getBillUsecase,
  },
  get_bills: {
    fn: getBillsUsecase,
  },
  get_old_bills: {
    fn: getBillsSnapshotsByZReportUsecase,
  },
};
export const DELETE_BILLS_USECASES = {
  delete_bill: {
    fn: deleteBillUsecase,
    needsToBroadcast: true,
  },
};
export const POST_BILLS_USECASES = {
  create_bill: {
    fn: createBillUsecase,
    needsToBroadcast: true,
  },
  close_bill: {
    fn: closeBillUsecase,
    needsToBroadcast: true,
  },
  change_table: {
    fn: changeTableUsecase,
    needsToBroadcast: true,
  },
};
export const PATCH_BILLS_USECASES = {};
