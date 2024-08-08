"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";

import SignupPage from "@/src/components/signupPage/page";

const SignupMain = () => {
  return (
    <div>
      <Head>
        <title>SportyHub</title>
      </Head>
      <SignupPage />
    </div>
  );
};

export default SignupMain;
