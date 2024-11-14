import { Button, Card, Col, Layout, Row, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import CardPrice from "./cardPrice";

// const { Text, Title } = Typography;
const { Header, Content } = Layout;

//479fe1

const Flights = () => {
  return (
    <div className="h-screen">
      <Header
        style={{
          background: "linear-gradient(180deg, #4274b8 0, #479fe1 100%)",
          height: "150px",
          padding: "20px",
        }}
      >
        <div>
          <img
            className="w-[260px]"
            src="https://booking.uzairways.com/images/color_main_logo.svg"
            alt=""
          />
        </div>
      </Header>
      <Content style={{ padding: "20px" }}>
        <div>
          {/* <Typography
            style={{
              color: "#828282",
              fontSize: "28px",
        
            }}
            className="flex items-center gap-1"
          >
            Select your departure flight<br/> from
            <span style={{ color: "#479fe1" }}>Tashkent</span> to
            <span style={{ color: "#479fe1" }}>Instanbul</span>
          </Typography> */}
        </div>
        <div>
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
        </div>
        <CardPrice />
      </Content>
    </div>
  );
};

export default Flights;
