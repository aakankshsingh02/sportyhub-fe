"use client";
import Head from "next/head";
import ForgotPasswordPage from "@/src/components/forgot-password/page";

const ForgotPassMain = () => {
  return (
    <div>
      <Head>
        <title>SportyHub</title>
      </Head>
      <ForgotPasswordPage />
    </div>
  );
};

export default ForgotPassMain;
