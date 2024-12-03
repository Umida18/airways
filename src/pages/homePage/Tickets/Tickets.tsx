import { Button, Card, Col, Layout, Row, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import CardPrice from "./cardPrice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plane, User } from "lucide-react";
import { useState } from "react";
import { useFlights } from "@/context/FlightsContext";
import BuyTicketsCard from "../../../components/cardBalance";

// const { Text, Title } = Typography;
const { Header, Content } = Layout;

//479fe1

const FlightsPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { flights } = useFlights();

  // const formattedTimes = flights.map((flight) =>
  //   new Date(flight.departureTime).toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   })
  // );

  const formattedTime = (time: string) => {
    const tim = new Date(time).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return tim;
  };

  return (
    <div className="">
      <Header className="bg-[#479fe1] shadow-md h-[80px]">
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
                to="/flights"
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
                onClick={() => navigate("/dashboardPage")}
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
                Flights
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
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          // width: "100vw",
        }}
        // className="xl:!w-[1168px]"
      >
        <div className="w-full">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={18} xl={18}>
              <Card className="border-2 border-[#cdddf3] bg-[#f5f8fa]">
                <div className="flex gap-3 mb-5">
                  <img
                    className="w-[40px] h-[40px]"
                    src="https://booking.uzairways.com/images/logo.svg"
                    alt=""
                  />
                  <span className="border-2 border-[#479fe1] bg-white color-[#479fe1] font-semibold rounded-lg px-3 flex justify-center items-center">
                    HY 271
                  </span>
                  <div className="flex gap-2 !justify-center items-center ">
                    <Typography
                      style={{
                        color: "#479fe1",
                        fontWeight: "bolder",
                        fontSize: "16px",
                      }}
                    >
                      Toshkent
                    </Typography>
                    <div className="flex justify-center items-center">
                      <IoIosArrowRoundForward
                        style={{
                          color: "#479fe1",
                          fontWeight: "bolder",
                          fontSize: "24px",
                        }}
                      />
                    </div>
                    <Typography
                      style={{
                        color: "#479fe1",
                        fontWeight: "bolder",
                        fontSize: "16px",
                      }}
                    >
                      Istanbul
                    </Typography>
                  </div>
                </div>
                <Row gutter={[20, 20]} className="">
                  <Col xl={4}>
                    <Typography
                      style={{
                        color: "#2885cb",
                        fontWeight: 700,
                        fontSize: "26px",
                      }}
                    >
                      {/* {formattedTime()} */}
                      07:40
                    </Typography>
                    <Typography
                      style={{
                        color: "#828282",
                        fontWeight: 700,
                      }}
                    >
                      14 Noyabr, Pa, 2024y.
                    </Typography>
                  </Col>
                  <Col xl={16} className="w-[100%] flex ">
                    <div className="w-[120px] flex justify-center items-center mb-9 gap-3">
                      <Typography
                        style={{
                          color: "#479fe1",
                          fontWeight: 600,
                          fontSize: "18px",
                        }}
                      >
                        TAS
                      </Typography>
                      <GiAirplaneDeparture
                        style={{
                          color: "#479fe1",
                          fontWeight: "bold",
                          fontSize: "40px",
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-[100%] gap-4">
                      <Typography
                        className="flex justify-center"
                        style={{
                          color: "#479fe1",
                          fontSize: "18px",
                          fontWeight: 600,
                        }}
                      >
                        Airbus 330
                      </Typography>
                      <span className=" h-[2px] border-2 border-dashed border-[#479fe1]"></span>
                      {/* <Typography
                      className="flex justify-center"
                      style={{
                        color: "#479fe1",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      Airbus 330
                    </Typography> */}
                    </div>
                    <div className="w-[120px] flex justify-center items-center mb-9 gap-3">
                      <GiAirplaneArrival
                        style={{
                          color: "#479fe1",
                          fontWeight: "bold",
                          fontSize: "40px",
                        }}
                      />
                      <Typography
                        style={{
                          color: "#479fe1",
                          fontWeight: 600,
                          fontSize: "18px",
                        }}
                      >
                        IST
                      </Typography>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <Typography
                      style={{
                        color: "#2885cb",
                        fontWeight: 700,
                        fontSize: "26px",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      13:00
                    </Typography>
                    <Typography
                      style={{
                        color: "#828282",
                        fontWeight: 700,
                        display: "flex",
                        justifyContent: "end",
                        textAlign: "end",
                      }}
                    >
                      14 Noyabr, Pa, 2024y.
                    </Typography>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <BuyTicketsCard />
            </Col>
          </Row>
          <CardPrice />
        </div>
      </Content>
    </div>
  );
};

export default FlightsPage;
