import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { loginApi } from "./api/loginApi";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!formData.email || !formData.password) {
      setSeverity("error");
      setMessage("Both fields are required");
      return;
    }

    const response = await loginApi(formData);

    if (response.status === 400 || response.status === 500) {
      setSeverity("warning");
      setMessage(response.data.message);
      return;
    }

    if (response.status === 200) {
      setSeverity("success");
      setMessage(`Welcome back ${response.data.user.firstName}`);
    }

    if (rememberMe) {
      Cookies.set("authToken", response.data.token, { expires: 30 }); // Cookie expires in 30 days
    } else {
      Cookies.set("authToken", response.data.token); // Session cookie
    }
  };

  useEffect(() => {
    // Clear the message after 3 seconds
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      // Redirect to user page
    }
  }, []);

  return (
    <div className="login">
      <div className="wrapper">
        <Link className="homeNav" to="/">
          <i class="fas fa-home"></i>
        </Link>

        <h2>Login</h2>

        <div className="inputs">
          <TextField
            required
            onChange={handleChange}
            value={formData.email}
            id="standard"
            name="email"
            label="Enter your email"
            variant="standard"
            sx={{
              input: {
                color: "white",
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
            }}
          />
        </div>

        <div className="forget">
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

        <div className="register">
          <p>
            Don't have an account? <Link to="/register">join-us</Link>
          </p>
        </div>
      </div>

      <div className="message">
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
