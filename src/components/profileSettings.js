"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Button, Col, DatePicker, Form, Row, notification } from "antd";
import { useEffect, useState } from "react";
import api from "./api";
import dayjs from "dayjs";
export function ProfileSettings() {
    const [form] = Form.useForm();
    const [_, setUser] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem("userId");
            try {
                const res = await api.get(`/user/find-by-id/${userId}`);
                const userData = res.data;
                form.setFieldsValue({
                    ...userData,
                    birthDate: userData.birthDate ? dayjs(userData.birthDate) : null,
                });
                console.log("userData", userData);
                setUser(userData);
            }
            catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [form]);
    const handleProfileSettings = async (values) => {
        const birthDate = new Date(values.birthDate);
        // Mahalliy vaqtni to'g'ri formatlash
        const formattedBirthDate = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())
            .toISOString()
            .split("T")[0];
        const userId = localStorage.getItem("userId");
        // const passw = user?.password === values.password;
        const res = await api.put(`/user/update/${userId}`, {
            ...values,
            birthDate: formattedBirthDate,
        });
        console.log("res", res);
        notification.success({
            message: "Success",
            description: "Profile updated successfully",
        });
    };
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Personal information" }) }), _jsx(CardContent, { children: _jsxs(Form, { layout: "vertical", form: form, onFinish: handleProfileSettings, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { xl: 12, lg: 12, md: 24, sm: 24, xs: 24, children: _jsx(Form.Item, { label: "username", name: "username", children: _jsx(Input, {}) }) }), _jsx(Col, { xl: 12, lg: 12, md: 24, sm: 24, xs: 24, children: _jsx(Form.Item, { label: "surname", name: "surname", children: _jsx(Input, {}) }) }), _jsx(Col, { xl: 12, lg: 12, md: 24, sm: 24, xs: 24, children: _jsx(Form.Item, { label: "email", name: "email", children: _jsx(Input, {}) }) }), _jsx(Col, { xl: 12, lg: 12, md: 24, sm: 24, xs: 24, children: _jsx(Form.Item, { style: { minWidth: "100%", minHeight: "100%" }, label: "birthDate", name: "birthDate", children: _jsx(DatePicker, { style: { minWidth: "100%", minHeight: "100%" } }) }) }), _jsx(Col, { xl: 12, lg: 12, md: 24, sm: 24, xs: 24, children: _jsx(Form.Item, { style: { minWidth: "100%" }, label: "phoneNumber", name: "phoneNumber", children: _jsx(Input, { style: { minWidth: "100%" } }) }) }), _jsx(Col, { xl: 12, lg: 12, md: 24, sm: 24, xs: 24, children: _jsx(Form.Item, { label: "passportSeries", name: "passportSeries", children: _jsx(Input, {}) }) })] }), _jsx(Button, { className: "bg-[#2395DE] text-white hover:text-white hover:bg-[#2086c5] border-0", htmlType: "submit", children: "Save" })] }) })] }) }));
}
