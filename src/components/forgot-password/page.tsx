import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Optionally, you can add a success message or redirect here
        router.push("/");
      } else {
        const { error } = await response.json();
        setErrorMessage(
          error || "Failed to send password reset email. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Forgot Password</h2>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
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
        <button type="submit" className={styles.submitButton}>
          Send Password Reset Email
        </button>
        <div className={styles.textCenter}>
          <p className={styles.signupPrompt}>
            Remember your password?{" "}
            <Link href="/login" className={styles.signupLink}>
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
