import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    if (!passwordRegex.test(value)) {
      setErrorMessage("Password must meet all criteria.");
    } else {
      setErrorMessage("");
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must meet all criteria.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setSuccessMessage(
          "Password has been reset successfully. Redirecting to login..."
        );
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const { error } = await response.json();
        setErrorMessage(error || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Reset Password</h2>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <div className={styles.inputContainer}>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
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
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={styles.input}
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className={styles.togglePassword}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </span>
          </div>
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
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
