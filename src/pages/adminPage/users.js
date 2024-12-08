import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Table, message } from "antd";
import api from "../../components/api";
export function Users() {
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        fetchAdmins();
    }, []);
    const fetchAdmins = async () => {
        try {
            const response = await api.get("/user/all-user");
            setAdmins(response.data);
        }
        catch (error) {
            message.error("Failed to fetch admins");
        }
    };
    const columns = [
        {
            title: "FULLNAME",
            dataIndex: "id",
            key: "id",
            render: (value) => {
                const n = admins.find((admin) => admin.id == value);
                return n ? _jsx("p", { children: n.username + " " + n.surname }) : "-";
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        // {
        //   title: "Password",
        //   dataIndex: "password",
        //   key: "password",
        // },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "birthday",
            dataIndex: "birthday",
            key: "birthday",
        },
        {
            title: "phoneNumber",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "balance",
            dataIndex: "balance",
            key: "balance",
        },
        {
            title: "address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "passportSeries",
            dataIndex: "passportSeries",
            key: "passportSeries",
        },
    ];
    return (_jsx("div", { className: "p-6 bg-gray-100 min-h-screen", children: _jsx("div", { className: "bg-white rounded-lg shadow p-6", children: _jsx(Table, { columns: columns, dataSource: admins }) }) }));
}
