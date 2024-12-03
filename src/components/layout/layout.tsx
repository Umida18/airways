"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import { ProfileSettings } from "../profileSettings";
import { Bell, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "antd";
import api from "../api";
import { OrdersHistory } from "../ordersHistory";
import { Balance } from "../balance";
import { Tickets } from "../tickets";
import { IUser } from "@/type/type";
import { Link } from "react-router-dom";
// import Image from 'next/image'

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUser = async () => {
      const res = await api.get(`/user/find-by-id/${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#479fe1] shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <Typography
              style={{
                color: "#f3f3f3",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Welcome,<span className="text-white"> {user?.username}</span>
            </Typography>
          </div>
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">
                Uzbekistan Airways
              </span>
            </div>
          </Link>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1">
          {activeSection === "profile" && <ProfileSettings />}
          {activeSection === "balance" && <Balance />}
          {activeSection === "tickets" && <Tickets />}
        </main>
      </div>
    </div>
  );
}
