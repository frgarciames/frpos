import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { MissingParamsError } from "@/domain/errors/missing-params";
import { BillsSnapshotsRepository } from "@/repositories/bills_snapshots";

type GetBillsByZReportProps = {
  billsSnapshotsRepository: BillsSnapshotsRepository;
};
type GetBillsByZReportInput = InputUsecase<{
  zReportId: number;
}>;

export const getBillsSnapshotsByZReportUsecase =
  ({ billsSnapshotsRepository }: GetBillsByZReportProps) =>
  async ({ organization, zReportId }: GetBillsByZReportInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!zReportId) throw MissingParamsError({ zReportId });
    const rows = await billsSnapshotsRepository.getBillsByZReport(zReportId);
    return rows;
  };
