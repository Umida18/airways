import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout as LayoutAntd, Menu, Modal, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
const { Title } = Typography;
const { Header, Sider, Content } = LayoutAntd;
export const admin = [
  {
    id: 1,
    username: "Davron",
    surname: "Davronov",
    password: "davronov123",
    role: "ADMIN",
    email: "davronov@gmail.com",
    birthday: "2024-11-11",
    phoneNumber: "+998901234567",
    balance: 0,
    address: "Tashkent",
    passportSeriies: "ad1234567",
  },
];
export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/admin/")[1];
  console.log("path", path);
  const [selectedKey, setSelectedKey] = useState<string>(path);
  let title = path.charAt(0).toUpperCase() + path.slice(1);
  const handleClick = (e: any) => {
    setSelectedKey(e.key);
  };
  console.log(title);

  useEffect(() => {
    setSelectedKey(location.pathname.slice(1));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <LayoutAntd className="bg-white">
      <Sider
        className=" m-5  rounded-start-xl rounded-end-3xl pt-10 w-[250px] "
        collapsed={collapsed}
        style={{
          width: 500,
          background: "rgb(5,62,139)",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          borderTopRightRadius: "150px",
          borderBottomRightRadius: "10px",
        }}
      >
        <div className="demo-logo-vertical" />

        <div className="ps-2 mb-4 mt-5">
          {" "}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />
        </div>
        <Menu
          style={{ background: "rgb(5,62,139)", color: "white" }}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
          items={[
            {
              key: "/admin/admins",
              icon: <UserOutlined style={{ color: "white" }} />,
              label: (
                <Link to="admins" style={{ color: "white" }}>
                  Admins
                </Link>
              ),
            },
            {
              key: "/admin/users",
              icon: <UserOutlined style={{ color: "white" }} />,
              label: (
                <Link to="users" style={{ color: "white" }}>
                  Users
                </Link>
              ),
            },
            {
              key: "/admin/tickets",
              icon: <UserOutlined style={{ color: "white" }} />,
              label: (
                <Link to="tickets" style={{ color: "white" }}>
                  Tickets
                </Link>
              ),
            },

            {
              key: "/admin/flights",
              icon: <UploadOutlined style={{ color: "white" }} />,
              label: (
                <Link to="flights" style={{ color: "white" }}>
                  Flights
                </Link>
              ),
            },
            {
              key: "/admin/airplanes",
              icon: <UploadOutlined style={{ color: "white" }} />,
              label: (
                <Link to="airplanes" style={{ color: "white" }}>
                  Airplanes
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <LayoutAntd className="bg-white">
        <Header
          className="flex px-12 flex-row justify-between items-center mb-0 bg-white"
          style={{
            margin: "24px 16px",
            marginBottom: "0px",
          }}
        >
          <Title>{title}</Title>

          <div
            className="flex flex-row  items-center gap-3 "
            onClick={showModal}
          >
            <div className="flex flex-col">
              <Title level={5}>
                {admin[0].username} {admin[0].surname}
              </Title>
              <Title
                className="text-gray-500 p-0 m-0 text-end"
                style={{ fontSize: "10px", margin: "0" }}
              >
                {admin[0].role}
              </Title>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "750px",
            background: "rgb(240, 242, 245)",
            borderRadius: "30px",
          }}
        >
          {children}
        </Content>
      </LayoutAntd>
      <Modal
        title="Admin"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <div>
          <Title level={4}>{admin[0].username}</Title>
          <Title level={4}>{admin[0].surname}</Title>
          <Title level={4}>{admin[0].role}</Title>
          <Title level={4}>{admin[0].email}</Title>
          <Title level={4}>{admin[0].password}</Title>
          <Title level={4}>{admin[0].birthday}</Title>
          <Title level={4}>{admin[0].phoneNumber}</Title>
          <Title level={4}>{admin[0].balance}</Title>
          <Title level={4}>{admin[0].address}</Title>
          <Title level={4}>{admin[0].passportSeriies}</Title>
        </div>
        <div>
          <Link to="/">Exit</Link>
        </div>
      </Modal>
    </LayoutAntd>
  );
};
