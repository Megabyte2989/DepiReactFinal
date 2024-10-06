import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Hook to handle logout functionality
export const useLogout = () => {
  const navigate = useNavigate();

  // Function remove user cookie and navigate to login page
  const logout = () => {
    Cookies.remove("authToken");
    navigate("/login", { replace: true });
  };

  return logout;
};
