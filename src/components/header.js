import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
export function Header() {
    return (_jsx("header", { className: "bg-white shadow-md border-b border-sky-100", children: _jsxs("div", { className: "max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: "https://percab.uzairways.com/assets/blue_logo-f2fb00b4.svg", alt: "" }), _jsx("h2", { className: "font-semibold text-xl text-gray-800", children: "Welcome, User" })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-sky-600 hover:text-sky-700", children: _jsx(Bell, { className: "h-5 w-5" }) })] }) }));
}
