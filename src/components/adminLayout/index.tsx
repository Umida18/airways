export const a = "rgb(5, 69, 146)";
export const b = "rgb(240, 242, 245)";
const primary = "rgb(229, 240, 252)";
const c = "rgb(229, 240, 252)";
import { useEffect, useState } from "react";
import { IoExitOutline } from "react-icons/io5";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout as LayoutAntd, Menu, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
const { Title } = Typography;
const { Header, Sider, Content } = LayoutAntd;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/admin/")[1];
  console.log("path", path);
  // const [openKeys, setOpenKeys] = useState([""]);
  const [selectedKey, setSelectedKey] = useState<string>(path);

  const handleClick = (e: any) => {
    setSelectedKey(e.key);
  };
  useEffect(() => {
    setSelectedKey(location.pathname.slice(1));
  }, []);

  return (
    <LayoutAntd className="bg-[`rgb(240, 242, 245)`]">
      <Sider
        className=" m-5  rounded-start-xl rounded-end-3xl pt-10 w-[250px] "
        collapsed={collapsed}
        style={{
          width: 500,
          background: "#B3E5FC",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          borderTopRightRadius: "150px",
          borderBottomRightRadius: "150px",
        }}
      >
        <div className="demo-logo-vertical" />
        {/* <div className="flex flex-col ps-8 pb-5 object-cover overflow-hidden ">
          <img
            src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg"
            alt=""
            className="w-16 h-16 rounded-full mb-5"
          />
          <Title level={5}>Super Admin</Title>
        </div> */}
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
            }}
          />
        </div>
        <Menu
          style={{ background: "#B3E5FC" }}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
          // defaultSelectedKeys={["/admin/admins"]}
          items={[
            {
              key: "/admin/admins",
              icon: <UserOutlined />,
              label: <Link to="admins">Admins</Link>,
            },
            {
              key: "/admin/tickets",
              icon: <UserOutlined />,
              label: <Link to="tickets">Tickets</Link>,
            },

            {
              key: "/admin/lines",
              icon: <UploadOutlined />,
              label: <Link to="lines">Lines</Link>,
            },
          ]}
        />
        <Menu
          style={{ background: "#B3E5FC" }}
          mode="inline"
          items={[
            {
              key: "exit",
              icon: <IoExitOutline />,
              label: (
                <div>
                  <Link to="/">Exit</Link>
                </div>
              ),
            },
          ]}
        />
      </Sider>
      <LayoutAntd className="bg-[`rgb(245, 245, 245)`]">
        <Header
          className="flex flex-row justify-between "
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#f5f5f5",
            // background: "rgb(229, 240, 252)",
            // borderRadius: "30px",
          }}
        >
          <Title style={{ background: "rgb(240, 242, 245)" }}>Dashboard</Title>
          <div className="flex flex-row gap-5">
            <Input
              type="search"
              name="search"
              placeholder="search"
              style={{
                background: "#B3E5FC",
                width: "300px ",
                padding: "15px",
                borderRadius: "15px",
              }}
            />
            <div className="flex flex-row ps-8 pb-5  items-center gap-3 ">
              <img
                src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg"
                alt=""
                className="w-12 h-12 rounded-full mb-5 overflow-hidden object-cover"
              />
              <Title level={5}>Super Admin</Title>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: "#B3E5FC",
            borderRadius: "30px",
          }}
        >
          {children}
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  );
};
