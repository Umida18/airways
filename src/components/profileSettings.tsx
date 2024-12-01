"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, Col, DatePicker, Form, Row } from "antd";
import { IUser } from "@/type/type";
import { useEffect, useState } from "react";
import api from "./api";

export function ProfileSettings() {
  const [form] = Form.useForm();
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                defaultValue="akbarova42@gmail.com"
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form layout="vertical" form={form}>
            <Row gutter={16}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label="username" name={"username"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label="surname" name={"surname"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  style={{ minWidth: "100%" }}
                  label="password"
                  name={"password"}
                >
                  <Input style={{ minWidth: "100%" }} />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  style={{ minWidth: "100%", minHeight: "100%" }}
                  label="birthDate"
                  name={"birthDate"}
                >
                  <DatePicker style={{ minWidth: "100%", minHeight: "100%" }} />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  style={{ minWidth: "100%" }}
                  label="phoneNumber"
                  name={"phoneNumber"}
                >
                  <Input style={{ minWidth: "100%" }} />
                </Form.Item>
              </Col>
              {/* <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label="address" name={"address"}>
                  <Input />
                </Form.Item>
              </Col> */}
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label="passportSeries" name={"passportSeries"}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Button
              className="bg-[#2395DE] text-white hover:text-white hover:bg-[#2086c5] border-0"
              htmlType="submit"
            >
              Сохранить
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
