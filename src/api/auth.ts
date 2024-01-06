import axios from "axios";

export interface IAuth {
  username: string;
  password: string;
  email?: string;
}

const Auth = {
  login: (body: IAuth) => {
    const data = {
      ...body,
    };
    return axios.post(
      `${process.env.REACT_APP_API_URL_PATH}/api/auth/login`,
      data,
    );
  },
  register: (body: IAuth) => {
    const data = {
      ...body,
    };
    return axios.post(
      `${process.env.REACT_APP_API_URL_PATH}/api/auth/register`,
      data,
    );
  },
};

export default Auth;
