"use client";

import AdminDashboard from "@/components/AdminDashboard";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const login = urlParams.get("login");
    const username = urlParams.get("with_username");
    const password = urlParams.get("and_password");

    const correctUsername = process.env.NEXT_PUBLIC_LOGIN_USERNAME;
    const correctPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

    const isThatMe = localStorage.getItem("IsThayYoudexsof?");
    if (
      login === "admin" &&
      isThatMe &&
      username === correctUsername &&
      password === correctPassword
    ) {
      setLoginSuccess(true);
    } else {
      notFound();
    }
  }, []);

  if (!loginSuccess) {
    return null;
  }

  return <AdminDashboard />;
}
