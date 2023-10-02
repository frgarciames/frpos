import { MissingParamsError } from "@/domain/errors/missing-params";
import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { BillsRepository } from "@/repositories/bills";

type BillsRepositoryProps = {
  billsRepository: BillsRepository;
};
type GetBillsInput = InputUsecase<{
  zReportId: number;
  includeDeleted?: boolean;
}>;
export const getBillsUsecase =
  ({ billsRepository }: BillsRepositoryProps) =>
  async ({
    organization,
    zReportId,
    includeDeleted = false,
  }: GetBillsInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!zReportId) throw MissingParamsError({ zReportId });
    return billsRepository.getBy({
      zReportId,
      deleted: includeDeleted,
    });
  };
