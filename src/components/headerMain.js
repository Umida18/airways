import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, Plane, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { handleApiError } from "@/utils/apiErrorHandler";
import api from "./api";
import { useState } from "react";
const { Header } = Layout;
const HeaderMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleCapinet = async () => {
        const userId = localStorage.getItem("userId");
        try {
            await api.get(`/user/find-by-id/${userId}`);
            navigate("/dashboardPage");
        }
        catch (error) {
            handleApiError(error, navigate);
        }
    };
    return (_jsx(Header, { className: "bg-[#479fe1] shadow-md h-full", children: _jsxs("div", { className: "container mx-auto px-4 py-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx(Plane, { className: "h-8 w-8 text-white" }), _jsx("span", { className: "text-2xl font-bold text-white", children: "Uzbekistan Airways" })] }), _jsxs("nav", { className: "hidden md:flex space-x-8", children: [_jsx(Link, { to: "/question", className: "text-white flex font-semibold text-lg justify-center items-center  h-[32px] hover:text-primary", children: "Questions and answers" }), _jsx(Link, { to: "/about", className: "text-white flex justify-center  font-semibold text-lg items-center h-[32px] hover:text-primary", children: "About Us" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button
                                            // variant="outlined"
                                            , { 
                                                // variant="outlined"
                                                className: "text-white hover:text-primary   font-semibold text-lg", children: ["Admin ", _jsx(ChevronDown, { className: "ml-1 h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuItem, { children: _jsx(Link, { to: "/admin/users", children: "Admin Panel" }) }), _jsx(DropdownMenuItem, { children: _jsx(Link, { to: "/superAdmin/admins", children: "Super Admin" }) })] })] }), _jsxs(Button, { onClick: handleCapinet, variant: "outlined", className: "text-white  font-semibold text-lg bg-transparent border-white border-2 border-primary hover:bg-primary hover:text-white", children: [_jsx(User, { className: "mr-2 h-4 w-4" }), " Cabinet"] })] }), _jsx("div", { className: "md:hidden", children: _jsx(Button, { variant: "outlined", onClick: () => setIsOpen(!isOpen), children: _jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }) })] }), isOpen && (_jsxs("div", { className: "mt-4 md:hidden", children: [_jsx(Link, { to: "/flights", className: "block py-2 text-white hover:text-primary", children: "Questions and answers" }), _jsx(Link, { to: "/about", className: "block py-2 text-white hover:text-primary", children: "About Us" }), _jsx(Link, { to: "/admin", className: "block py-2 text-white hover:text-primary", children: "Admin Panel" }), _jsx(Link, { to: "/super-admin", className: "block py-2 text-white hover:text-primary", children: "Super Admin" }), _jsx(Link, { to: "/cabinet", className: "block py-2 text-white hover:text-primary", children: "Cabinet" })] }))] }) }));
};
export default HeaderMain;
