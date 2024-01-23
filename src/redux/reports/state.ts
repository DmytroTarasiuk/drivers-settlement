import { IReport } from "../../api/reports";

export default interface ReportState {
  reports: IReport[];
  reportDetails: IReport;
}
