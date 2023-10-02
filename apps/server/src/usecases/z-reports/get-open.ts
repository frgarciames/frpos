import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { InputUsecase } from "..";
import { ZReportsRepository } from "../../repositories/z_reports";

type GetZReportUsecaseProps = {
  zReportsRepository: ZReportsRepository;
};
type GetZReportUsecaseInput = InputUsecase<{}>;

export const getOpenZReportUsecase =
  ({ zReportsRepository }: GetZReportUsecaseProps) =>
  ({ organization }: GetZReportUsecaseInput) => {
    if (!organization) throw OrganizationNotFoundError();
    return zReportsRepository.getOpenZReport(organization.id);
  };
