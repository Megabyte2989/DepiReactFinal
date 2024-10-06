import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Function to get the current user from the JWT cookie
export const getCurrentUser = () => {
  try {
    const token = Cookies.get("authToken");
    const decoded = jwtDecode(token);
    return decoded;
  } catch {
    return null;
  }
};
