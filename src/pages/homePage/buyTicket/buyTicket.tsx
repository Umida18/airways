import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// import { Calendar } from "@/components/ui/calendar";

import { useSearchParams } from "react-router-dom";
import { Col, DatePicker, Form, Row, Select, Typography, Radio } from "antd";
import api from "@/api/api";

const { Text } = Typography;
const { Option } = Select;

interface PassengerForm {
  familiya: string;
  ism: string;
  tugilganSana: Date | undefined;
  fuqarolik: string;
  jinsingiz: "erkak" | "ayol";
  hujjatTuri: string;
  seriyaRaqami: string;
  amalQilishMuddati: Date | undefined;
}

export function BuyTicket() {
  const [searchParams] = useSearchParams();
  const [passengerForms, setPassengerForms] = useState<PassengerForm[]>([]);
  const passengers1 = searchParams.get("passengers");

  useEffect(() => {
    const passengers = Number(searchParams.get("passengers") || passengers1);
    console.log("passengers", passengers);

    setPassengerForms(
      Array(passengers)
        .fill(null)
        .map(() => ({
          familiya: "",
          ism: "",
          tugilganSana: undefined,
          fuqarolik: "O'zbekiston",
          jinsingiz: "erkak" as const,
          hujjatTuri: "pasport",
          seriyaRaqami: "",
          amalQilishMuddati: undefined,
        }))
    );
  }, [searchParams]);

  const handleInputChange = (
    index: number,
    field: keyof PassengerForm,
    value: string | Date
  ) => {
    const updatedForms = [...passengerForms];
    updatedForms[index] = { ...updatedForms[index], [field]: value };
    setPassengerForms(updatedForms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/booking/create-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passengerForms),
      });
      console.log("Response:", response);

      // if (response.ok) {
      //   window.location.href = "/booking-confirmation";
      // } else {
      //   console.error("Submission failed");
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {passengerForms.map((form, index) => (
        <Col key={index} span={24}>
          <Card className="w-full bg-white border-0 shadow-sm">
            <Text className="block mb-4 text-center text-red-500">
              Barcha kataklar to&apos;ldirilishi, yozuvlar lotin alfavitida
              kiritilishi shart
            </Text>
            <Form<PassengerForm> layout="vertical">
              <Row gutter={16}>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    name="username"
                    label="username"
                    rules={[
                      {
                        required: true,
                        message: "username kiritish shart",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    name="firstName"
                    label="firstName"
                    rules={[
                      { required: true, message: "firstName kiritish shart" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    name="tugilganSana"
                    label="Tug'ilgan sanangiz"
                    rules={[
                      {
                        required: true,
                        message: "Tug'ilgan sana kiritish shart",
                      },
                    ]}
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    name="citizenship"
                    label="citizenship"
                    initialValue="O'zbekiston"
                  >
                    <Select>
                      <Option value="O'zbekiston">O&apos;zbekiston</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    name="hujjatTuri"
                    label="Hujjat turi"
                    initialValue="pasport"
                  >
                    <Select>
                      <Option value="pasport">Pasport</Option>
                    </Select>
                  </Form.Item>
                </Col> */}
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    name="serialNumber"
                    label="Seriyasi/raqami"
                    rules={[
                      {
                        required: true,
                        message: "Seriya/raqam kiritish shart",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    name="validityPeriod"
                    label="Amal qilish muddati"
                    rules={[
                      {
                        required: true,
                        message: "Amal qilish muddatini kiritish shart",
                      },
                    ]}
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      ))}
      <div className="flex justify-center">
        <Button type="submit">Buyurtma berish</Button>
      </div>
    </form>
  );
}
