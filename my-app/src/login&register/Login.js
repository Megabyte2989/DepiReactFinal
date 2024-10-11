import React, { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { loginApi } from "./api/loginApi";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import { getCurrentUser } from "./services/getCurrentUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // handle inpuuts changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async () => {
    //alert error when inputs is empty
    if (!formData.email || !formData.password) {
      setSeverity("error");
      setMessage("Both fields are required");
      return;
    }

    //send request api user data
    const response = await loginApi(formData);

    // handle errors from API response
    if (response.status === 400 || response.status === 500) {
      setSeverity("warning");
      setMessage(response.data.message);
      return;
    }

    // handle success from API response
    if (response.status === 200) {
      setSeverity("success");
      setMessage(`Welcome back ${response.data.user.firstName}`);
    }

    // Store token in cookies
    if (rememberMe) {
      Cookies.set("authToken", response.data.token, { expires: 30 }); // Cookie expires in 30 days
    } else {
      Cookies.set("authToken", response.data.token); // Session cookie
    }

    // Redirect user to appropriate page based on their role
    if (response.data.user.role === "admin") {
      navigate("/dashboard", { replace: true });
    }

    //remove userPage and put real route
    if (response.data.user.role === "user") {
      navigate("/userPage", { replace: true });
    }
  };

  // Clear the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Check if user is already logged in and redirect them to appropriate page
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser?.role === "admin") {
      navigate("/dashboard", { replace: true });
    }

    if (currentUser?.role === "user") {
      navigate("/userPage", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        <Link className={styles.homeNav} to="/">
          <i className="fas fa-home"></i>
        </Link>

        <h2>Login</h2>

        <div className={styles.inputs}>
          <TextField
            onChange={handleChange}
            value={formData.email}
            id="standard"
            name="email"
            label="Enter your email"
            type="email"
            variant="standard"
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "navajowhite",
              },
            }}
          />
          <TextField
            onChange={handleChange}
            value={formData.password}
            id="standard-password-input"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "navajowhite",
              },
            }}
          />
        </div>

        <div className={styles.forget}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="remember"
          />
        </div>

        <Button
          onClick={handleSubmit}
          sx={{
            "&": { backgroundColor: "white", width: "100%" },
          }}
        >
          Log In
        </Button>

        <div className={styles["join-us"]}>
          <p>
            Don't have an account? <Link to="/register">join-us</Link>
          </p>
        </div>
      </div>

      <div className={styles.message}>
        {message && (
          <Alert style={{ width: 500 }} severity={severity}>
            {message}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Login;
