import { ZReportsRepository } from "@/repositories/z_reports";
import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { NotFoundError } from "@/domain/errors/not-found";

type ZReportsUsecasesProps = {
  zReportsRepository: ZReportsRepository;
};
type CloseZReportInput = InputUsecase<{ id: string }>;
export const closeZReportUsecase =
  ({ zReportsRepository }: ZReportsUsecasesProps) =>
  async ({ organization }: CloseZReportInput) => {
    if (!organization) throw OrganizationNotFoundError();
    const existingZReport = await zReportsRepository.getOpenZReport(
      organization.id
    );
    if (!existingZReport)
      throw NotFoundError("OpenZReportOrg", organization.id);
    await zReportsRepository.update({
      id: Number(existingZReport.id),
      dateEnd: new Date(),
    });
  };
