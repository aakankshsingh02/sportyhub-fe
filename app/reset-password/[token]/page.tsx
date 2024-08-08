
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ResetPasswordForm from "@/src/components/reset-password/page";


const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
  const token = params.token;
  const [message, setMessage] = useState("");
  const [validToken, setValidToken] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset/${token}`;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(url);
        setMessage(res.data.message);
        setValidToken(true);
      } catch (error: any) {
        setMessage(error.response?.data?.message || "Invalid token");
        setValidToken(false);
      }
    };
    verifyToken();
  }, [token]);

  if (!validToken) {
    return <div>{message}</div>;
  }

  return (
    <div>
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
