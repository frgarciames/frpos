import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { BillsRepository } from "@/repositories/bills";

type BillsRepositoryProps = {
  billsRepository: BillsRepository;
};
type DeleteBillInput = InputUsecase<{ id: string }>;
export const deleteBillUsecase =
  ({ billsRepository }: BillsRepositoryProps) =>
  async ({ organization, user, id }: DeleteBillInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Bill", id);
    const bill = await billsRepository.get(Number(id));
    await billsRepository.update({
      id: Number(id),
      deleted: true,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return billsRepository.getBy({
      zReportId: bill.zReportId,
      deleted: false,
    });
  };
