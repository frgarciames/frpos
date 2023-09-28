import { BillsRepository } from "../../repositories/bills";
import { ZReportsRepository } from "../../repositories/z_reports";

type ZReportsUsecasesProps = {
  zReportsRepository: ZReportsRepository;
};
type OpenZReportInput = {
  organization: string;
};
export const openZReportUsecase =
  ({ zReportsRepository }: ZReportsUsecasesProps) =>
  async ({ organization }: OpenZReportInput) => {
    const existingZReport = await zReportsRepository.getOpenZReport(
      organization
    );
    if (existingZReport) throw new Error("There is already an open z report");
    const createdZReport = await zReportsRepository.create({
      organization,
      dateStart: new Date(),
      dateEnd: null,
    });
    return createdZReport;
  };

type GetZReportUsecaseInput = {
  organization: string;
};
type GetZReportUsecaseProps = ZReportsUsecasesProps & {
  billsRepository: BillsRepository;
};
export const getOpenZReportUsecase =
  ({ zReportsRepository, billsRepository }: GetZReportUsecaseProps) =>
  async ({ organization }: GetZReportUsecaseInput) => {
    let zReport = await zReportsRepository.getOpenZReport(organization);
    if (!zReport) {
      zReport = await openZReportUsecase({ zReportsRepository })({
        organization,
      });
    }
    const relations = await billsRepository.getBillsByZReport(zReport.id);
    return relations;
  };
