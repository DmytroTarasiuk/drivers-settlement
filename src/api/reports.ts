import axios from "axios";

export interface IReport {
  id?: string | number;
  _id?: string;
  date: string;
  symbol: string;
  description: string;
  income: number;
  cost: number;
}

const Report = {
  getReports: () => {
    return axios.get(`${process.env.REACT_APP_API_URL_PATH}/reports`);
  },
  createReport: (body: IReport) => {
    const data = {
      ...body,
    };
    return axios.post(`${process.env.REACT_APP_API_URL_PATH}/reports`, data);
  },
  deleteReport: (id: string) => {
    return axios.delete(`${process.env.REACT_APP_API_URL_PATH}/reports/${id}`);
  },
  editReport: (id: string) => {
    return axios.put(`${process.env.REACT_APP_API_URL_PATH}/reports/${id}`);
  },
};

export default Report;
