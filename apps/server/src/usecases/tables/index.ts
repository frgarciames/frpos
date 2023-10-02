import { createTableUsecase } from "./create";
import { deleteTableUsecase } from "./delete";
import { getTableUsecase } from "./get";
import { getTablesUsecase } from "./get-all";
import { updateTableUsecase } from "./update";

export const GET_TABLES_USECASES = {
  get_table: {
    fn: getTableUsecase,
  },
  get_tables: {
    fn: getTablesUsecase,
  },
};
export const DELETE_TABLES_USECASES = {
  delete_table: {
    fn: deleteTableUsecase,
    needsToBroadcast: true,
  },
};
export const POST_TABLES_USECASES = {
  create_table: {
    fn: createTableUsecase,
    needsToBroadcast: true,
  },
};
export const PATCH_TABLES_USECASES = {
  update_table: {
    fn: updateTableUsecase,
    needsToBroadcast: true,
  },
};
