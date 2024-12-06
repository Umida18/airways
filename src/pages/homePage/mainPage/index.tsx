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
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import api from "../../../api/api";
import dayjs from "dayjs";
import { useFlights } from "../../../context/FlightsContext";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Plane, User } from "lucide-react";
const { Header, Content } = Layout;
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleApiError } from "@/utils/apiErrorHandler";

export default function MainLayout() {
  const navigate = useNavigate();
  const { flights, setFlights } = useFlights();
  const [isOpen, setIsOpen] = useState(false);

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
      const userId = localStorage.getItem("userId");

      if (!token && !userId) {
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
        setFlights(res.data);
        console.log("res", res);
        navigate(`/flightsPage?passengers=${values.passengers}`);
      } catch (error) {
        console.log("error", error);
      }
    },
    [navigate, setFlights]
  );

  const handleCapinet = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await api.get(`/user/find-by-id/${userId}`);
      navigate("/dashboardPage");
    } catch (error) {
      handleApiError(error, navigate);
    }
  };

  return (
    <>
      <Layout className="min-h-[590px]">
        <Header className="bg-[#479fe1] shadow-md h-[100%]">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <Plane className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">
                  Uzbekistan Airways
                </span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link
                  to="/question"
                  className="text-white flex font-semibold text-lg justify-center items-center  h-[32px] hover:text-primary"
                >
                  Questions and answers
                </Link>
                <Link
                  to="/about"
                  className="text-white flex justify-center  font-semibold text-lg items-center h-[32px] hover:text-primary"
                >
                  About Us
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      // variant="outlined"
                      className="text-white hover:text-primary   font-semibold text-lg"
                    >
                      Admin <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/admin/users">Admin Panel</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/superAdmin/admins">Super Admin</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  onClick={handleCapinet}
                  variant="outlined"
                  className="text-white  font-semibold text-lg bg-transparent border-white border-2 border-primary hover:bg-primary hover:text-white"
                >
                  <User className="mr-2 h-4 w-4" /> Cabinet
                </Button>
              </nav>
              <div className="md:hidden">
                <Button variant="outlined" onClick={() => setIsOpen(!isOpen)}>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            {isOpen && (
              <div className="mt-4 md:hidden">
                <Link
                  to="/flights"
                  className="block py-2 text-gray-600 hover:text-primary"
                >
                  Questions and answers
                </Link>
                <Link
                  to="/about"
                  className="block py-2 text-gray-600 hover:text-primary"
                >
                  About Us
                </Link>
                <Link
                  to="/admin"
                  className="block py-2 text-gray-600 hover:text-primary"
                >
                  Admin Panel
                </Link>
                <Link
                  to="/super-admin"
                  className="block py-2 text-gray-600 hover:text-primary"
                >
                  Super Admin
                </Link>
                <Link
                  to="/cabinet"
                  className="block py-2 text-gray-600 hover:text-primary"
                >
                  Cabinet
                </Link>
              </div>
            )}
          </div>
        </Header>

        <Content
          className=" min-h-[590px] bg-center bg-no-repeat bg-cover bg-[url('https://assets.wego.com/image/upload/f_auto,q_auto:best,w_3840/v1725958728/flights/airlines_hero/HY_4.jpg')]"
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div></div>
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
