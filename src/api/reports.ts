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
  getReport: (id: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL_PATH}/reports/${id}`);
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
  editReport: (id: string, body: IReport) => {
    const data = {
      ...body,
    };
    return axios.put(
      `${process.env.REACT_APP_API_URL_PATH}/reports/${id}`,
      data,
    );
  },
};

export default Report;
