import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    setErrorMessage("");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    setErrorMessage("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token);
        window.location.reload();
        router.push("/");
      } else {
        const { error } = await response.json();
        setErrorMessage(error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordCriteria = (criteria: string) => {
    let result = false;
    switch (criteria) {
      case "length":
        result = password.length >= 8;
        break;
      case "letters":
        result = /[a-zA-Z]/.test(password);
        break;
      case "numbers":
        result = /\d/.test(password);
        break;
      case "special":
        result = /[!@#$%^&*]/.test(password);
        break;
      default:
        result = false;
    }
    return result;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>SportyHub</h2>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
          />
          {nameError && <p className={styles.errorMessage}>{nameError}</p>}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
          />
          {emailError && <p className={styles.errorMessage}>{emailError}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
            />
            <span
              onClick={togglePasswordVisibility}
              className={styles.togglePassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {passwordError && (
            <p className={styles.errorMessage}>{passwordError}</p>
          )}
        </div>
        <div className={styles.passwordChecklist}>
          <p className={styles.passwordChecklistTitle}>Password must:</p>
          <ul>
            <li
              className={
                checkPasswordCriteria("length") ? styles.valid : styles.invalid
              }
            >
              <FontAwesomeIcon
                icon={
                  checkPasswordCriteria("length")
                    ? faCheckCircle
                    : faTimesCircle
                }
                className={styles.icon}
              />
              Be at least 8 characters long
            </li>
            <li
              className={
                checkPasswordCriteria("letters") ? styles.valid : styles.invalid
              }
            >
              <FontAwesomeIcon
                icon={
                  checkPasswordCriteria("letters")
                    ? faCheckCircle
                    : faTimesCircle
                }
                className={styles.icon}
              />
              Contain at least one letter
            </li>
            <li
              className={
                checkPasswordCriteria("numbers") ? styles.valid : styles.invalid
              }
            >
              <FontAwesomeIcon
                icon={
                  checkPasswordCriteria("numbers")
                    ? faCheckCircle
                    : faTimesCircle
                }
                className={styles.icon}
              />
              Contain at least one number
            </li>
            <li
              className={
                checkPasswordCriteria("special") ? styles.valid : styles.invalid
              }
            >
              <FontAwesomeIcon
                icon={
                  checkPasswordCriteria("special")
                    ? faCheckCircle
                    : faTimesCircle
                }
                className={styles.icon}
              />
              Contain at least one special character
            </li>
          </ul>
        </div>
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
        <div className={styles.textCenter}>
          <p className={styles.signupPrompt}>
            Already have an account?{" "}
            <Link href="/login" className={styles.signupLink}>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
