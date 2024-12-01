"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import { ProfileSettings } from "../profileSettings";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "antd";
import api from "../api";
import { OrdersHistory } from "../ordersHistory";
import { Balance } from "../balance";
import { Tickets } from "../tickets";
import { IUser } from "@/type/type";
// import Image from 'next/image'

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUser = async () => {
      const res = await api.get(`/user/find-by-id/${userId}`);

      console.log("userdata", res.data);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md border-b border-sky-100">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <Typography
              style={{
                color: "#5c6572",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Welcome,<span className="text-black"> {user?.username}</span>
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://percab.uzairways.com/assets/blue_logo-f2fb00b4.svg"
              alt=""
            />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1">
          {activeSection === "profile" && <ProfileSettings />}
          {/* {activeSection === "orders" && <OrdersHistory />} */}
          {activeSection === "balance" && <Balance />}
          {activeSection === "tickets" && <Tickets />}
        </main>
      </div>
    </div>
  );
}
