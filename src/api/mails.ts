import axios from "axios";

interface IMail {
  to: string;
  subject: string;
}

const Mail = {
  sendEmail: (body: IMail) => {
    const data = {
      ...body,
    };
    return axios.post(`${process.env.REACT_APP_API_URL_PATH}/send-email`, data);
  },
};

export default Mail;
