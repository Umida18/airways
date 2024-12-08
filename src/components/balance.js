"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, Form, InputNumber, notification } from "antd";
import api from "./api";
export function Balance() {
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
                description: `Successfully sent $${values.balance} to ${user.username}.`,
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
    return (_jsxs(Card, { className: "border-sky-100", children: [_jsx(CardHeader, { className: "border-b border-sky-100", children: _jsx(CardTitle, { className: "text-sky-900", children: "Balance" }) }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-2xl font-bold mb-6 mt-5", children: ["Current Balance: ", user?.balance, " $"] }), _jsxs(Form, { form: form, onFinish: handleSendMoney, layout: "vertical", children: [_jsx(Form.Item, { name: "balance", label: "Amount to Send", rules: [
                                    { required: true, message: "Please enter an amount" },
                                    {
                                        type: "number",
                                        min: 1,
                                        message: "Amount must be greater than 0",
                                    },
                                ], children: _jsx(InputNumber, { placeholder: "Enter amount", style: { width: "100%" } }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", className: "w-full", children: "Send Money" }) })] })] })] }));
}
