import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Layout,
  MenuProps,
  Row,
  Typography,
} from "antd";
import { useMemo, useState } from "react";
import "./login.scss";

const { Header, Content } = Layout;

const LoginPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("O'zbekcha");
  const [selectedTypeRegist, setSelectedTypeRegist] = useState<boolean>(false);

  const handleMenuClick = (e: any) => {
    setSelectedLanguage(e.key);
  };

  const items: MenuProps["items"] = useMemo(
    () => [
      //   {
      //     label: "O'zbek tili",
      //     key: "0",
      //   },
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
      <Content className="flex items-center justify-center py-6 p-3">
        <Row gutter={[100, 30]} className=" flex !justify-between !px-3">
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
          <Col xl={12} className="flex justify-center w-[100%]">
            <div className="bg-white w-[480px] py-10 px-8 rounded-lg">
              <div
                //   css={formStyle}
                className="w-[100%]"
              >
                <div className="flex">
                  <Typography
                    style={{
                      color: "black",
                      fontWeight: 600,
                      fontSize: "29px",
                      marginBottom: "30px",
                    }}
                  >
                    Войти
                  </Typography>
                </div>
                <Form
                  layout="vertical"
                  // onFinish={() => router.push("/admin/product/product")}
                >
                  {!selectedTypeRegist && (
                    <>
                      <Form.Item>
                        <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Email
                        </Typography>
                        <Input
                          style={{ borderRadius: "10px", height: "45px" }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Password
                        </Typography>
                        <Input
                          style={{ borderRadius: "10px", height: "45px" }}
                        />
                      </Form.Item>
                      <Button
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
                          marginTop: "60px",
                          border: "0",
                        }}
                        htmlType="submit"
                      >
                        Login
                      </Button>
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
                          marginTop: "60px",
                          border: "0",
                        }}
                      >
                        Register by Email
                      </Button>
                    </>
                  )}
                  {selectedTypeRegist && (
                    <>
                      <Form.Item>
                        <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Email
                        </Typography>
                        <Input
                          style={{ borderRadius: "10px", height: "45px" }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          First name
                        </Typography>
                        <Input
                          style={{ borderRadius: "10px", height: "45px" }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Last name
                        </Typography>
                        <Input
                          style={{ borderRadius: "10px", height: "45px" }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Birth date
                        </Typography>
                        <Input
                          style={{ borderRadius: "10px", height: "45px" }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Create a password
                        </Typography>
                        <Input
                          style={{ borderRadius: "10px", height: "45px" }}
                        />
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
                          marginTop: "60px",
                          border: "0",
                        }}
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default LoginPage;
