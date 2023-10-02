import { InputUsecase } from "..";
import { NotFoundError } from "@/domain/errors/not-found";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { BillsRepository } from "@/repositories/bills";

type BillsRepositoryProps = {
  billsRepository: BillsRepository;
};
type GetBillInput = InputUsecase<{ id: string }>;
export const getBillUsecase =
  ({ billsRepository }: BillsRepositoryProps) =>
  async ({ organization, id }: GetBillInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw NotFoundError("Bill", id);
    const bill = await billsRepository.getBy({
      id: Number(id),
    });
    if (bill.length === 0) {
      throw NotFoundError("Bill", id);
    }
    return bill[0];
  };
