"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import api from "./api";
import { Col, Form, InputNumber, Row, notification } from "antd";
export default function BuyTicketsCard() {
    const [form] = Form.useForm();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem("userId");
            try {
                const res = await api.get(`/user/find-by-id/${userId}`);
                setUser(res.data);
            }
            catch (error) {
                console.error("Error fetching user data:", error);
                notification.error({
                    message: "Error",
                    description: "Failed to fetch user data. Please try again.",
                });
            }
        };
        fetchUser();
    }, [user]);
    const handleSendMoney = async (values) => {
        const userId = localStorage.getItem("userId");
        if (!user || !userId)
            return;
        const newBalance = values.balance;
        try {
            console.log("Request Payload:", { ...user, balance: newBalance });
            const response = await api.post(`/user/add-balance?userId=${userId}&balance=${newBalance}`);
            console.log("API Response:", response.data);
            // if (response.data) {
            setUser(response.data);
            form.resetFields();
            notification.success({
                message: "Success",
                description: `Successfully sent ${values.balance} USD to ${user.username}.`,
            });
            // }
        }
        catch (error) {
            console.error("Error sending money:", error);
            notification.error({
                message: "Error",
                description: "Failed to send money. Please try again.",
            });
        }
    };
    return (_jsxs(Card, { className: "w-full  lg:!my-0 my-5", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl font-bold text-[#2885cb]", children: "Check your balance" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex items-center justify-between p-4 bg-[#f5f8fa] rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Wallet, { className: "h-6 w-6 text-[#479fe1]" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Current Balance" }), _jsxs("p", { className: "text-2xl font-bold text-[#479fe1]", children: ["$ ", user?.balance] })] })] }) }) }), _jsx(CardFooter, { className: "flex flex-col space-y-4", children: _jsx("div", { className: "flex space-x-2 w-full", children: _jsx(Form, { style: { minWidth: "100%" }, form: form, onFinish: handleSendMoney, layout: "horizontal", children: _jsxs(Row, { gutter: [10, 10], children: [_jsx(Col, { xl: 24, sm: 24, style: { height: "36px", minWidth: "full" }, children: _jsx(Form.Item, { name: "balance", rules: [
                                            { required: true, message: "Please enter an amount" },
                                            {
                                                type: "number",
                                                min: 1,
                                                message: "Amount must be greater than 0",
                                            },
                                        ], children: _jsx(InputNumber, { placeholder: "Enter amount", style: { width: "100%", height: "36px" } }) }) }), _jsx(Col, { xl: 24, sm: 24, children: _jsx(Form.Item, { children: _jsx(Button, { style: {
                                                width: "100%",
                                                height: "36px",
                                                backgroundColor: "#479fe1",
                                            }, type: "submit", className: "w-full", children: "Send Money" }) }) })] }) }) }) })] }));
}
