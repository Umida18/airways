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
  Typography,
} from "antd";
import { useCallback, useState } from "react";
import Tickets from "./Cards";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import api from "../../../api/api";
import dayjs from "dayjs";
import { useFlights } from "../../../context/FlightsContext";
import { useQuery } from "@tanstack/react-query";
const { Header, Content } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const { flights, setFlights } = useFlights();

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

  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values: any) => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const formattedDate = dayjs(values.departureTime.$d).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        const res = await api.post("/ticket/get-flight-info", {
          departureAirport: values.departureAirport,
          arrivalAirport: values.arrivalAirport,
          departureTime: formattedDate,
          passengers: values.passengers,
        });
        setFlights(res.data); // flightsni kontekstga yuklash
        console.log("res", res);
        // navigate("/flightsPage");
        navigate(`/flightsPage?passengers=${values.passengers}`);
      } catch (error) {
        console.log("error", error);
      }
    },
    [navigate, setFlights] // Ulanadigan dependencies
  );

  const { data: getAvailableAirplanes } = useQuery(
    ["getAvailableAirplanes"],
    async () => {
      const res = await api.get("/flight/get-available-airplanes");
      return res.data;
    }
  );

  console.log("getAvailableAirplanes", getAvailableAirplanes);

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
                {/* <Col xs={24} sm={24} md={24} lg={24}>
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
                </Col> */}

                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item
                    name="departureAirport"
                    label="From"
                    rules={[
                      { required: true, message: "Please select origin" },
                    ]}
                  >
                    <Select
                      placeholder="From"
                      style={{ width: "100%", height: "60px", fontWeight: 700 }}
                    >
                      <Select.Option value="TASHKENT">TASHKENT</Select.Option>
                      <Select.Option value="SAMARKAND">SAMARKAND</Select.Option>
                      <Select.Option value="BUKHARA">BUKHARA</Select.Option>
                      <Select.Option value="NAVOIY">NAVOIY</Select.Option>
                      <Select.Option value="ANDIJON">ANDIJON</Select.Option>
                      <Select.Option value="FERGANA">FERGANA</Select.Option>
                      <Select.Option value="KARSHI">KARSHI</Select.Option>
                      <Select.Option value="NUKUS">NUKUS</Select.Option>
                      <Select.Option value="TERMIZ">TERMIZ</Select.Option>
                      <Select.Option value="JIZZAKH">JIZZAKH</Select.Option>
                      <Select.Option value="KHIVA">KHIVA</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item
                    name="arrivalAirport"
                    label="To"
                    rules={[
                      { required: true, message: "Please select destination" },
                    ]}
                  >
                    <Select
                      placeholder="To"
                      style={{ width: "100%", height: "60px", fontWeight: 700 }}
                    >
                      <Select.Option value="TASHKENT">TASHKENT</Select.Option>
                      <Select.Option value="SAMARKAND">SAMARKAND</Select.Option>
                      <Select.Option value="BUKHARA">BUKHARA</Select.Option>
                      <Select.Option value="NAVOIY">NAVOIY</Select.Option>
                      <Select.Option value="ANDIJON">ANDIJON</Select.Option>
                      <Select.Option value="FERGANA">FERGANA</Select.Option>
                      <Select.Option value="KARSHI">KARSHI</Select.Option>
                      <Select.Option value="NUKUS">NUKUS</Select.Option>
                      <Select.Option value="TERMIZ">TERMIZ</Select.Option>
                      <Select.Option value="JIZZAKH">JIZZAKH</Select.Option>
                      <Select.Option value="KHIVA">KHIVA</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={6}>
                  <Form.Item
                    name="departureTime"
                    label="Date"
                    rules={[{ required: true, message: "Please select date" }]}
                  >
                    <DatePicker
                      style={{
                        width: "100%",
                        height: "60px",
                        fontWeight: 700,
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6}>
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
                    <InputNumber
                      style={{
                        width: "100%",
                        height: "60px",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
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
