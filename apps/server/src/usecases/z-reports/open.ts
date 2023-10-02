import { ZReportsRepository } from "@/repositories/z_reports";
import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";

type ZReportsUsecasesProps = {
  zReportsRepository: ZReportsRepository;
};
type OpenZReportInput = InputUsecase<{}>;
export const openZReportUsecase =
  ({ zReportsRepository }: ZReportsUsecasesProps) =>
  async ({ organization }: OpenZReportInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingZReport = await zReportsRepository.getOpenZReport(
      organization.id
    );
    if (existingZReport) throw new Error("There is already an open z report");
    await zReportsRepository.create({
      organization: organization.id,
      dateStart: new Date(),
      dateEnd: null,
    });
    return zReportsRepository.getOpenZReport(organization.id);
  };
