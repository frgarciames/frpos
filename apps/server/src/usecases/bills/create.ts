import { MissingParamsError } from "@/domain/errors/missing-params";
import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { NewBill } from "@/entities";
import { BillsRepository } from "@/repositories/bills";

type BillsRepositoryProps = {
  billsRepository: BillsRepository;
};
type CreateBillInput = InputUsecase<NewBill>;
export const createBillUsecase =
  ({ billsRepository }: BillsRepositoryProps) =>
  async ({ organization, zReportId, tableId, user }: CreateBillInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!zReportId) throw MissingParamsError({ zReportId, tableId });
    if (!tableId) throw MissingParamsError({ tableId });
    const existingBill = await billsRepository.getBy({
      zReportId,
      tableId,
    });
    if (existingBill.length > 0) {
      throw AlreadyExistsError(
        "Bill in Table and ZReport",
        `table:${tableId} zReport:${zReportId}`
      );
    }

    await billsRepository.create({
      zReportId,
      tableId,
      createdBy: user.id,
    });
    return billsRepository.getBy({
      zReportId,
      deleted: false,
    });
  };
