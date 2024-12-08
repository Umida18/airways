"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import { ProfileSettings } from "../profileSettings";
import { Plane } from "lucide-react";
import { Typography } from "antd";
import api from "../api";
import { Tickets } from "../tickets";
import { Link } from "react-router-dom";
import BuyTicketsCard from "../cardBalance";
export default function DashboardPage() {
    const [activeSection, setActiveSection] = useState("profile");
    const [user, setUser] = useState();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const fetchUser = async () => {
            const res = await api.get(`/user/find-by-id/${userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-[#479fe1] shadow-md", children: _jsxs("div", { className: "max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center", children: [_jsx("div", { children: _jsxs(Typography, { style: {
                                    color: "#f3f3f3",
                                    fontSize: "20px",
                                    fontWeight: 600,
                                }, children: ["Welcome,", _jsxs("span", { className: "text-white", children: [" ", user?.username] })] }) }), _jsx(Link, { to: "/", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Plane, { className: "h-8 w-8 text-white" }), _jsx("span", { className: "text-2xl font-bold text-white", children: "Uzbekistan Airways" })] }) })] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 flex gap-8", children: [_jsx(Sidebar, { activeSection: activeSection, setActiveSection: setActiveSection }), _jsxs("main", { className: "flex-1", children: [activeSection === "profile" && _jsx(ProfileSettings, {}), activeSection === "balance" && _jsx(BuyTicketsCard, {}), activeSection === "tickets" && _jsx(Tickets, {})] })] })] }));
}
