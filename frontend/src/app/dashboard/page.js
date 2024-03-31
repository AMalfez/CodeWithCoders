"use client";
import React, { useContext } from "react";
import Navbar from "@/components/navbar";
import AuthContext from "@/context/authContext";
import { redirect } from 'next/navigation'

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  if (user.length === 0) {
    return redirect("/login");
  }
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
