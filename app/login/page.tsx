"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import LoginPage from "@/src/components/loginpage/page";

const LoginMain = () => {
  return (
    <div>
      <Head>
        <title>SportyHub</title>
      </Head>
      <LoginPage />
    </div>
  );
};

export default LoginMain;
