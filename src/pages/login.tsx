import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Form,
  Input,
  Layout,
  MenuProps,
  Row,
  Switch,
  Typography,
} from "antd";
import { useMemo, useState } from "react";
import "./login.scss";
import { RxFontRoman } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const LoginPage = () => {
  const [selectedTypeRegist, setSelectedTypeRegist] = useState<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const navigate = useNavigate();

  const handleFieldsChange = (changedFields: any, allFields: any) => {
    const allFilled = allFields.every((field: any) => field.value);
    setIsButtonActive(allFilled);
    console.log("allFields", allFields);
  };
  // const handleMenuClick = (e: any) => {
  //   setSelectedLanguage(e.key);
  // };

  const handleValues = () => {
    navigate("./");
  };

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        label: "Русский",
        key: "1",
      },
      {
        label: "English",
        key: "2",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col text-white min-h-screen !justify-between bg-[url(https://percab.uzairways.com/assets/bg_banner-2c69d0de.jpg)] bg-fixed bg-cover pb-5">
      <Header className="bg-transparent px-10 py-6 h-[100%]">
        <Row className="flex justify-between">
          <Col>
            <img
              src="https://percab.uzairways.com/assets/logo-fcb75195.svg"
              alt=""
            />
          </Col>
          <Col>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button className="bg-white" type="text">
                O'zbek tili
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content className="px-10 py-6">
        <Row className="flex justify-between">
          <Col xl={12} className=" flex flex-col justify-center items-start">
            <Typography className="text-5xl font-bold text-white mb-5">
              Login or Register
            </Typography>
            <Typography className="text-white my-6 text-xl">
              What are the benefits of registering with «Uzbekistan Airways» JSC
              ?
            </Typography>
            <ol className="custom-list p-4">
              <li className="mb-6 text-lg text-white">
                Registration of additional services for a comfortable flight
              </li>
              <li className="mb-6 text-lg text-white">
                Possibility of online check-in for a flight, without queues
              </li>
              <li className="mb-6 text-lg text-white">
                Ability to choose a comfortable seat on the plane
              </li>
              <li className="mb-6 text-lg text-white">
                View ticket purchase history with detailed information
              </li>
            </ol>
          </Col>
          <Col xl={12} className="flex justify-end items-center w-[100%]">
            <div className="bg-white w-[480px] py-10 px-8 rounded-lg">
              <div
                //   css={formStyle}
                className="w-[100%]"
              >
                <div className="flex">
                  <Typography
                    style={{
                      color: "black",
                      fontWeight: 700,
                      fontSize: "29px",
                      marginBottom: "30px",
                    }}
                  >
                    Login
                  </Typography>
                </div>
                {/* <Form
                  layout="vertical"
                  // onFinish={() => router.push("/admin/product/product")}
                > */}
                {!selectedTypeRegist && (
                  <Form onFinish={handleValues}>
                    <Form.Item>
                      <Typography
                        style={{ fontSize: "18px", marginBottom: "10px" }}
                      >
                        Email
                      </Typography>
                      <Input
                        // type="email"
                        style={{ borderRadius: "10px", height: "45px" }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Typography
                        style={{ fontSize: "18px", marginBottom: "10px" }}
                      >
                        Password
                      </Typography>
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        minWidth: "100%",
                        marginBottom: "10px",
                      }}
                    >
                      <Checkbox style={{ fontSize: "1.25rem" }}>
                        Remember me
                      </Checkbox>
                      <Link
                        style={{
                          color: "#16a34a",
                          fontWeight: 600,
                          fontSize: "1.25rem",
                        }}
                        to="ggg"
                      >
                        Forgot password
                      </Link>
                    </div>
                    <Form.Item>
                      <Button
                        style={{
                          backgroundColor: "#16a34a",

                          width: "100%",
                          height: "52px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          borderRadius: "10px",
                          border: "0",
                          marginBlock: "10px",
                          fontWeight: 600,
                          fontSize: "1.25rem",
                        }}
                        htmlType="submit"
                        // disabled={!isButtonActive}
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => setSelectedTypeRegist(true)}
                        style={{
                          backgroundColor: "transparent",
                          width: "100%",
                          height: "52px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#16a34a",
                          fontSize: "1.25rem",
                          borderRadius: "10px",
                          border: "1px solid #16a34a",
                          fontWeight: 600,
                        }}
                      >
                        Register by Email
                      </Button>
                    </Form.Item>
                  </Form>
                )}
                {selectedTypeRegist && (
                  <Form>
                    <Form.Item>
                      <Typography
                        style={{ fontSize: "18px", marginBottom: "10px" }}
                      >
                        Email
                      </Typography>
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Form.Item>
                      <Typography
                        style={{ fontSize: "18px", marginBottom: "10px" }}
                      >
                        First name
                      </Typography>
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Form.Item>
                      <Typography
                        style={{ fontSize: "18px", marginBottom: "10px" }}
                      >
                        Last name
                      </Typography>
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Form.Item>
                      <Typography
                        style={{ fontSize: "18px", marginBottom: "10px" }}
                      >
                        Birth date
                      </Typography>
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Form.Item>
                      <Typography
                        style={{ fontSize: "18px", marginBottom: "10px" }}
                      >
                        Create a password
                      </Typography>
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>

                    <Button
                      onClick={() => setSelectedTypeRegist(true)}
                      style={{
                        backgroundColor: "#8ad1a4",
                        width: "100%",
                        height: "52px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: "0",
                      }}
                    >
                      Sign up
                    </Button>
                  </Form>
                )}
                {/* </Form> */}
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default LoginPage;
