import React, { useState, useEffect } from "react";
import styles from "../styles/Register.module.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { registerApi } from "./api/registerApi";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";

function Register() {
  // initial State for register form
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Cpassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  // handle changing inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    //force inputs
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.Cpassword
    ) {
      setSeverity("error");
      setMessage("All fields are required");
      return;
    }

    //Validating email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setSeverity("error");
      setMessage("Invalid email address");
      return;
    }

    //Validating password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setSeverity("error");
      setMessage(
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }

    //compare password and confirm pass
    if (formData.password !== formData.Cpassword) {
      setSeverity("error");
      setMessage("Passwords do not match");
      return;
    }

    //Sending API request
    const response = await registerApi(formData);

    // Handling API response when error
    if (response.status === 400 || response.status === 500) {
      setSeverity("warning");
      setMessage(response.data.message);
      return;
    }

    // Handling API response when success
    if (response.status === 201) {
      setSeverity("success");
      setMessage(response.data.message);
    }
  };

  useEffect(() => {
    // Clear the message after 4 seconds
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={styles.register}>
      <div className={styles.wrapper}>
        <Link className={styles.homeNav} to="/">
          <i className="fas fa-home"></i>
        </Link>

        <h2>Register</h2>

        <div className={styles.inputs}>
          <TextField
            onChange={handleChange}
            value={formData.firstName}
            name="firstName"
            label="Enter your first name"
            variant="standard"
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "rgba(255, 222, 173, 0.7)",
              },
            }}
          />

          <TextField
            onChange={handleChange}
            value={formData.lastName}
            name="lastName"
            label="Enter your last name"
            variant="standard"
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "rgba(255, 222, 173, 0.7)",
              },
            }}
          />

          <TextField
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            label="Enter your email"
            variant="standard"
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "rgba(255, 222, 173, 0.7)",
              },
            }}
          />
          <TextField
            onChange={handleChange}
            value={formData.password}
            name="password"
            label="Enter your password"
            type="password"
            variant="standard"
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "rgba(255, 222, 173, 0.7)",
              },
            }}
          />
          <TextField
            onChange={handleChange}
            value={formData.Cpassword}
            name="Cpassword"
            label="Confirm your password"
            type="password"
            variant="standard"
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "rgba(255, 222, 173, 0.7)",
              },
            }}
          />
        </div>

        <Button
          onClick={handleSubmit}
          sx={{
            "&": {
              backgroundColor: "white",
              width: "100%",
              marginTop: 4,
              color: "red",
            },
          }}
        >
          Log In
        </Button>

        <div className={styles["sign-in"]}>
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>

      <div className={styles.message}>
        {message && (
          <Alert style={{ minWidth: 500 }} severity={severity}>
            {message}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Register;
