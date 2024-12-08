import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, } from "@ant-design/icons";
import { Button, Layout as LayoutAntd, Menu, Modal, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
const { Title } = Typography;
const { Header, Sider, Content } = LayoutAntd;
export const dataSuperAdmin = [
    {
        id: 1,
        username: "Davron",
        surname: "Davronov",
        password: "davronov123",
        role: "SUPERADMIN",
        email: "davronov@gmail.com",
        birthday: "2024-11-11",
        phoneNumber: "+998901234567",
        balance: 0,
        address: "Tashkent",
        passportSeries: "ad1234567",
    },
];
export const Layout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const path = location.pathname.split("/superAdmin/")[1];
    console.log("path", path);
    // const [selectedKey, setSelectedKey] = useState<string>(path);
    let title = path.charAt(0).toUpperCase() + path.slice(1);
    // const handleClick = (e: any) => {
    //   setSelectedKey(e.key);
    // };
    // console.log(title);
    // useEffect(() => {
    //   setSelectedKey(location.pathname.slice(1));
    // }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    return (_jsxs(LayoutAntd, { className: "bg-white", children: [_jsxs(Sider, { className: " m-5  rounded-start-xl rounded-end-3xl pt-10 w-[250px] ", collapsed: collapsed, style: {
                    width: 500,
                    background: "rgb(5,62,139)",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    borderTopRightRadius: "150px",
                    borderBottomRightRadius: "10px",
                }, children: [_jsx("div", { className: "demo-logo-vertical" }), _jsxs("div", { className: "ps-2 mb-4 mt-5", children: [" ", _jsx(Button, { type: "text", icon: collapsed ? _jsx(MenuUnfoldOutlined, {}) : _jsx(MenuFoldOutlined, {}), onClick: () => setCollapsed(!collapsed), style: {
                                    fontSize: "16px",
                                    width: 64,
                                    height: 64,
                                    color: "white",
                                } })] }), _jsx(Menu, { style: { background: "rgb(5,62,139)", color: "white" }, mode: "inline", selectedKeys: ["/superAdmin/admins"], 
                        // onClick={handleClick}
                        items: [
                            {
                                key: "/superAdmin/admins",
                                icon: _jsx(UserOutlined, { style: { color: "white" } }),
                                label: (_jsx(Link, { to: "admins", style: { color: "white" }, children: "Admins" })),
                            },
                        ] })] }), _jsxs(LayoutAntd, { className: "bg-white", children: [_jsxs(Header, { className: "flex px-12 flex-row justify-between items-center mb-0 bg-white", style: {
                            margin: "24px 16px",
                            marginBottom: "0px",
                        }, children: [_jsx(Title, { children: title }), _jsx("div", { className: "flex flex-row  items-center gap-3 ", onClick: showModal, children: _jsxs("div", { className: "flex flex-col", children: [_jsxs(Title, { level: 5, children: [dataSuperAdmin[0].username, dataSuperAdmin[0].surname] }), _jsx(Title, { className: "text-gray-500 p-0 m-0 text-end", style: { fontSize: "10px", margin: "0" }, children: dataSuperAdmin[0].role })] }) })] }), _jsx(Content, { style: {
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: "750px",
                            background: "rgb(240, 242, 245)",
                            borderRadius: "30px",
                        }, children: children })] }), _jsxs(Modal, { title: "Super Admin", open: isModalOpen, onOk: () => setIsModalOpen(false), onCancel: () => setIsModalOpen(false), children: [_jsxs("div", { children: [_jsx(Title, { level: 4, children: dataSuperAdmin[0].username }), _jsx(Title, { level: 4, children: dataSuperAdmin[0].surname }), _jsx(Title, { level: 4, children: dataSuperAdmin[0].role }), _jsx(Title, { level: 4, children: dataSuperAdmin[0].email }), _jsx(Title, { level: 4, children: dataSuperAdmin[0].password }), _jsx(Title, { level: 4, children: dataSuperAdmin[0].birthday }), _jsx(Title, { level: 4, children: dataSuperAdmin[0].phoneNumber }), _jsx(Title, { level: 4, children: dataSuperAdmin[0].balance }), _jsx(Title, { level: 4, children: dataSuperAdmin[0].address }), _jsx(Title, { level: 4, children: dataSuperAdmin[0].passportSeries })] }), _jsx("div", { style: { background: "rgb(5,62,139)", color: "white" }, children: _jsx(Link, { to: "/", children: "Exit" }) })] })] }));
};
