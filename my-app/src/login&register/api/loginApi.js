import axios from "axios";

export const loginApi = async (userData) => {
  try {
    const response = await axios.post(
      "https://depi-react-final.vercel.app/api/user/login",
      userData
    );
    return response;
  } catch (error) {
    const err = await error.response;
    return err;
  }
};
