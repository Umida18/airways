"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, Form, InputNumber, notification } from "antd";
import { IUser } from "@/type/type";
import api from "./api";
import { useNavigate } from "react-router-dom";

export function Balance() {
  const [form] = Form.useForm();
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const res = await api.get(`/user/find-by-id/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch user data. Please try again.",
        });
      }
    };
    fetchUser();
  }, []);

  const handleSendMoney = async (values: IUser) => {
    const userId = localStorage.getItem("userId");
    if (!user || !userId) return;

    const newBalance = user.balance + values.balance;

    try {
      console.log("Request Payload:", { ...user, balance: newBalance });

      const response = await api.put(`/user/update/${userId}`, {
        ...user,
        balance: newBalance,
      });

      console.log("API Response:", response.data);

      if (response.data && response.data.balance !== undefined) {
        setUser(response.data);
        form.resetFields();
        notification.success({
          message: "Success",
          description: `Successfully sent $${values.balance} to ${user.username}.`,
        });
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error sending money:", error);
      notification.error({
        message: "Error",
        description: "Failed to send money. Please try again.",
      });
    }
  };

  // const handleApiError = (error: any) => {
  //   if (error.response) {
  //     switch (error.response.status) {
  //       case 401:
  //         notification.error({
  //           message: "Authentication Error",
  //           description:
  //             "Your session has expired or the token is invalid. Please log in again.",
  //         });
  //         // Clear the invalid token
  //         localStorage.removeItem("token");
  //         // Redirect to login page
  //         navigate("/login");
  //         break;
  //       case 403:
  //         notification.error({
  //           message: "Authorization Error",
  //           description: "You don't have permission to perform this action.",
  //         });
  //         break;
  //       default:
  //         notification.error({
  //           message: "Error",
  //           description: "An unexpected error occurred. Please try again.",
  //         });
  //     }
  //   } else if (error.request) {
  //     notification.error({
  //       message: "Network Error",
  //       description:
  //         "Unable to connect to the server. Please check your internet connection.",
  //     });
  //   } else {
  //     notification.error({
  //       message: "Error",
  //       description: "An unexpected error occurred. Please try again.",
  //     });
  //   }
  // };

  return (
    <Card className="border-sky-100">
      <CardHeader className="border-b border-sky-100">
        <CardTitle className="text-sky-900">Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-6">
          Current Balance: ${user?.balance}
        </p>
        <Form form={form} onFinish={handleSendMoney} layout="vertical">
          <Form.Item
            name="balance"
            label="Amount to Send"
            rules={[
              { required: true, message: "Please enter an amount" },
              {
                type: "number",
                min: 1,
                message: "Amount must be greater than 0",
              },
            ]}
          >
            <InputNumber placeholder="Enter amount" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Send Money
            </Button>
          </Form.Item>
        </Form>
      </CardContent>
    </Card>
  );
}
