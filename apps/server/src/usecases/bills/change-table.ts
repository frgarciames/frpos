import { NotFoundError } from "@/domain/errors/not-found";
import { InputUsecase } from "..";
import { AlreadyExistsError } from "@/domain/errors/exists";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { BillsRepository } from "@/repositories/bills";

type BillsRepositoryProps = {
  billsRepository: BillsRepository;
};
type ChangeTableBillInput = InputUsecase<{
  id: number;
  newTableId: number;
}>;
export const changeTableUsecase =
  ({ billsRepository }: BillsRepositoryProps) =>
  async ({ organization, newTableId, id, user }: ChangeTableBillInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const bill = await billsRepository.getBy({
      id,
    });
    if (bill.length === 0) {
      throw NotFoundError("Bill", id);
    }
    const billInTable = await billsRepository.getBy({
      tableId: newTableId,
    });
    if (billInTable.length > 0) {
      throw AlreadyExistsError("Bill in Table", `table:${newTableId}`);
    }

    await billsRepository.update({
      id: Number(id),
      tableId: newTableId,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return billsRepository.getBy({
      zReportId: bill[0].zReportId,
    });
  };
