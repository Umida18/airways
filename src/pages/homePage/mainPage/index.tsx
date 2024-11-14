import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Layout,
  Row,
  Select,
  Tabs,
  Typography,
} from "antd";
import { useState } from "react";
import Tickets from "./Cards";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useFloor } from "./FloorContext";
const { Header, Content } = Layout;
const { RangePicker } = DatePicker;

export default function MainLayout() {
  const [selectedWay, setSelectedWay] = useState<"oneWay" | "roundTrip">(
    "roundTrip"
  );
  const [floor, setFloor] = useFloor();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    navigate("/flightsPage");
  };

  const navItems = [
    {
      title: "Important information",
      items: [
        {
          title: "Before the purchase",
          items: [
            "Passengers carrier rules",
            "Passengers carrier contract",
            "Fare Rules",
            "Baggage",
            "Flying during pregnancy",
          ],
        },
        {
          title: "Before you fly",
          items: [
            "Aviation security",
            "Information about products",
            "Travel document requirements",
            "Special entry requirements",
          ],
        },
        {
          title: "Airport",
          items: [
            "CIP & Lounge",
            "Flight check-in",
            "Flight schedule",
            "Flight status",
            "Flight tracking",
          ],
        },
        {
          title: "Aboard",
          items: [
            "Business class",
            "Economy class",
            "Onboard meals",
            "Rules of conduct for passengers",
          ],
        },
      ],
    },
    {
      title: "Manage your flight",
      items: [
        {
          title: "Booking",
          items: [
            "Book a flight",
            "Modify booking",
            "Cancel booking",
            "Refund request",
          ],
        },
        {
          title: "Check-in",
          items: ["Online check-in", "Airport check-in", "Baggage drop-off"],
        },
        {
          title: "Flight status",
          items: ["Flight tracker", "Flight notifications"],
        },
      ],
    },
    {
      title: "Loyalty",
      items: [
        {
          title: "Loyalty program",
          items: [
            "Join loyalty program",
            "Earn miles",
            "Redeem miles",
            "Partner airlines",
          ],
        },
        {
          title: "Member benefits",
          items: ["Tier status", "Lounge access", "Priority services"],
        },
      ],
    },
    {
      title: "About company",
      items: [
        {
          title: "Company info",
          items: ["History", "Fleet", "Careers", "Press center"],
        },
        {
          title: "Partnerships",
          items: [
            "Alliance partners",
            "Codeshare partners",
            "Corporate partners",
          ],
        },
      ],
    },
  ];
  const data = [
    {
      city: "Samarkand",
      dateRange: "18 Nov 2024 - 23 Nov 2024",
      price: "USD 1894",
      image:
        "https://izb-school.uz/wp-content/uploads/2021/11/samarkand-uzbekistan-ancient-city-evening-sunset.jpg",
    },
    {
      city: "Bukhara",
      dateRange: "18 Nov 2024 - 23 Nov 2024",
      price: "USD 1894",
      image:
        "https://www.afisha.uz/uploads/media/2024/07/726ed482558faef00c995eff8b4ba97f.jpg",
    },
    {
      city: "New York",
      dateRange: "18 Nov 2024 - 23 Nov 2024",
      price: "USD 1894",
      image: "newy.jpeg",
    },
    {
      city: "Dubai",
      dateRange: "18 Nov 2024 - 23 Nov 2024",
      price: "USD 1894",
      image: "dub.jpeg",
    },
    {
      city: "Tashkent",
      dateRange: "18 Nov 2024 - 23 Nov 2024",
      price: "USD 1894",
      image: "tashk.jpeg",
    },
    {
      city: "Istanbul",
      dateRange: "18 Nov 2024 - 23 Nov 2024",
      price: "USD 1894",
      image: "ist.jpeg",
    },
    {
      city: "Azerbaijan",
      dateRange: "18 Nov 2024 - 23 Nov 2024",
      price: "USD 1894",
      image: "azr.jpeg",
    },
  ];

  return (
    <>
      <Layout className=" px-8 !mx-auto min-h-[590px] bg-center bg-no-repeat bg-cover bg-[url('https://assets.wego.com/image/upload/f_auto,q_auto:best,w_3840/v1725958728/flights/airlines_hero/HY_4.jpg')]">
        <Header className="bg-transparent px-4 flex items-center justify-between">
          <Select
            style={{ backdropFilter: "blur(10px)", background: "transparent" }}
            className=" !bg-opacity-80 !backdrop-blur-md"
            // style={{background: }}
            defaultValue={"ENG"}
            options={[
              { label: "UZB", value: "UZB" },
              { label: "RU", value: "RU" },
              { label: "ENG", value: "ENG" },
            ]}
          />
          <div className="flex gap-2">
            <Button onClick={() => navigate("./admin/admins")}>Admin</Button>
            <Button onClick={() => navigate("./superAdmin/admins")}>
              Super Admin
            </Button>
          </div>
        </Header>

        <Content
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="w-[358px] h-[74px] z-10 relative top-3 shadow-md rounded-full flex justify-center gap-4 items-center bg-white p-3">
            <div>
              <img
                className="object-cover h-[48px] w-[48px]"
                src="https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_square/HY"
                alt="Logo"
              />
            </div>
            <div>
              <Typography style={{ fontSize: "24px", fontWeight: 600 }}>
                Uzbekistan Airways
              </Typography>
              <Typography style={{ fontSize: "16px" }}>
                Online Booking & Reservations
              </Typography>
            </div>
          </div>
          <Card bordered={false} className="lg:!w-[1168px]">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Row gutter={16}>
                    <Col>
                      <Button
                        type={selectedWay === "oneWay" ? "primary" : "default"}
                        onClick={() => setSelectedWay("oneWay")}
                      >
                        One way
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type={
                          selectedWay === "roundTrip" ? "primary" : "default"
                        }
                        onClick={() => setSelectedWay("roundTrip")}
                      >
                        Round-trip
                      </Button>
                    </Col>
                  </Row>
                </Col>

                <Col xs={24} sm={12} md={8} lg={4}>
                  <Form.Item
                    name="from"
                    label="From"
                    rules={[
                      { required: true, message: "Please select origin" },
                    ]}
                  >
                    <Select
                      placeholder="From"
                      style={{ width: "100%", height: "60px", fontWeight: 700 }}
                    >
                      {" "}
                      <Select.Option value="moscow">Moscow</Select.Option>
                      <Select.Option value="dubai">Dubai</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={4}>
                  <Form.Item
                    name="to"
                    label="To"
                    rules={[
                      { required: true, message: "Please select destination" },
                    ]}
                  >
                    <Select
                      placeholder="To"
                      style={{ width: "100%", height: "60px", fontWeight: 700 }}
                    >
                      <Select.Option value="moscow">Moscow</Select.Option>
                      <Select.Option value="dubai">Dubai</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8}>
                  <Form.Item
                    name="dates"
                    label="Date"
                    rules={[{ required: true, message: "Please select date" }]}
                  >
                    {selectedWay === "oneWay" ? (
                      <DatePicker
                        style={{
                          width: "100%",
                          height: "60px",
                          fontWeight: 700,
                        }}
                      />
                    ) : (
                      <RangePicker
                        style={{
                          width: "100%",
                          height: "60px",
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={4}>
                  <Form.Item
                    name="passengers"
                    label="Passengers"
                    rules={[
                      {
                        required: true,
                        message: "Please select number of passengers",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Passengers"
                      style={{ width: "100%", height: "60px", fontWeight: 700 }}
                    >
                      <Select.Option value="1">
                        <InputNumber
                          min={1}
                          max={10}
                          value={floor}
                          onChange={(value) => setFloor(value)}
                          style={{ width: 80 }}
                          controls={{
                            upIcon: <span>▲</span>,
                            downIcon: <span>▼</span>,
                          }}
                        />
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={4}>
                  <Form.Item
                    name="paymentMethod"
                    label="Payment method"
                    rules={[
                      {
                        required: true,
                        message: "Please select payment method",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Payment method"
                      style={{ width: "100%", height: "60px", fontWeight: 700 }}
                    >
                      <Select.Option value="card">Credit Card</Select.Option>
                      <Select.Option value="paypal">PayPal</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Row justify="end">
                    <Col>
                      <Button
                        className=" rounded-full text-[16px] px-8 py-5"
                        type="primary"
                        htmlType="submit"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Card>
        </Content>
      </Layout>
      <Tickets data={data} />
    </>
  );
}
