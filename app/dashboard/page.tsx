"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import DashboardPage from "@/src/components/dashboard/page";


const LoginMain = () => {
  return (
    <div>
      <Head>
        <title>SportyHub</title>
      </Head>
      <DashboardPage />
    </div>
  );
};

export default LoginMain;
