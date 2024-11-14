import { useEffect, useState } from "react";
import { Table, message } from "antd";

import axios from "axios";
import { User } from "../../types";

export function Users() {
  const [users, setusers] = useState<User[]>([]);

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await axios.get(
        "https://4d71b68cb41c81df.mokky.dev/users"
      );
      setusers(response.data);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  const columns = [
    {
      title: "FULLNAME",
      dataIndex: "id",
      key: "id",
      render: (value: any) => {
        const n = users.find((user) => user.id == value);
        return n ? <p>{n.username + " " + n.surname}</p> : "-";
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <Table columns={columns} dataSource={users} />
      </div>
    </div>
  );
}
