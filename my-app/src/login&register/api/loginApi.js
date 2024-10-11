import axios from "axios";

export const loginApi = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/login",
      userData
    );
    return response;
  } catch (error) {
    const err = await error.response;
    return err;
  }
};
