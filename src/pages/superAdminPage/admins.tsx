import { useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Space, Drawer, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "antd/es/form/Form";

import { AutoForm, FieldType } from "../../components/auto-form";
import axios from "axios";
import { User } from "../../types";
import api from "../../components/api";

export function SuperAdmins() {
  const [form] = useForm();
  const [admins, setAdmins] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<User | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await api.get("/user/User-role/ADMIN/owner");
      console.log("response", response.data);

      setAdmins(response.data);
    } catch (error) {
      message.error("Failed to fetch admins");
    }
  };

  // const handleSearch = (value: string) => {
  //   setSearchText(value);
  // };

  // const filteredAdmins = admins.filter(
  //   (admin) =>
  //     admin.name.toLowerCase().includes(searchText.toLowerCase()) ||
  //     admin.email.toLowerCase().includes(searchText.toLowerCase())
  // );
  const handleAdd = () => {
    setEditingAdmin(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (admin: User) => {
    setEditingAdmin(admin);
    form.setFieldsValue(admin);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://4d71b68cb41c81df.mokky.dev/admins/${id}`);
      message.success("Admin deleted successfully");
      fetchAdmins();
    } catch (error) {
      message.error("Error deleting admin");
    }
  };

  const columns = [
    {
      title: "FULLNAME",
      dataIndex: "id",
      key: "id",
      render: (value: any) => {
        const n = admins.find((admin) => admin.id == value);
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

    {
      title: "Action",
      key: "action",
      render: (text: string, record: User) => {
        console.log(record);

        return (
          <span className="space-x-2">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="text-blue-500 hover:text-blue-700"
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              className="text-red-500 hover:text-red-700"
            />
          </span>
        );
      },
    },
  ];

  const fields = useMemo(
    () =>
      [
        {
          label: "Name",
          name: "username",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "lastName",
          name: "surname",
        },
        {
          label: "password",
          name: "password",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "Email",
          name: "email",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "Role",
          name: "role",
          type: "select",
          options: [
            { value: "Admin", label: "Admin" },
            // { value: "User", label: "User" },
          ],
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "birthday",
          name: "birthday",
          // rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "phoneNumber",
          name: "phoneNumber",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "balance",
          name: "balance",
          type: "number",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "address",
          name: "address",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "passportSeries",
          name: "passportSeries",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
      ] as FieldType[],
    [admins]
  );

  const onFinish = async (values: Record<string, any>) => {
    try {
      if (editingAdmin) {
        await axios.put(
          `https://4d71b68cb41c81df.mokky.dev/admins/${editingAdmin.id}`,
          { ...values }
        );
        message.success("Admin updated successfully");
      } else {
        await axios.post("https://4d71b68cb41c81df.mokky.dev/admins", {
          ...values,
          // id: uuidv4(),
        });
        message.success("Admin added successfully");
      }
      setIsModalVisible(false);
      fetchAdmins();
    } catch (error) {
      message.error("Error saving admin");
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search admins"
            prefix={<SearchOutlined />}
            className="max-w-xs"
          />
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => handleAdd()}
          >
            Add New Admin
          </Button>
        </div>
        <Table columns={columns} dataSource={admins} />
      </div>

      <Drawer
        title="Admins"
        onClose={() => setIsModalVisible(false)}
        open={isModalVisible}
        extra={
          <Space>
            <Button onClick={() => form.submit()} type="primary">
              Save
            </Button>
          </Space>
        }
        width={700}
        forceRender={true}
      >
        <AutoForm
          fields={fields}
          columnSize={2}
          form={form}
          onFinish={onFinish}
          loading={false}
        />
      </Drawer>
    </div>
  );
}

// useEffect(() => {
//   fetchAdmins();
// }, []);

// const fetchAdmins = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get('https://api.example.com/admins');
//     setAdmins(response.data);
//   } catch (error) {
//     message.error('Failed to fetch admins');
//   }
//   setLoading(false);
// };

// const handleSearch = (value: string) => {
//   setSearchText(value);
// };

// const filteredAdmins = admins.filter(
//   (admin) =>
//     admin.name.toLowerCase().includes(searchText.toLowerCase()) ||
//     admin.email.toLowerCase().includes(searchText.toLowerCase())
// );

// const showModal = (admin: Admin | null) => {
//   setEditingAdmin(admin);
//   setIsModalVisible(true);
//   if (admin) {
//     form.setFieldsValue(admin);
//   } else {
//     form.resetFields();
//   }
// };

// const handleOk = async () => {
//   try {
//     const values = await form.validateFields();
//     if (editingAdmin) {
//       await axios.put(`https://api.example.com/admins/${editingAdmin.id}`, values);
//       message.success('Admin updated successfully');
//     } else {
//       await axios.post('https://api.example.com/admins', values);
//       message.success('Admin added successfully');
//     }
//     setIsModalVisible(false);
//     fetchAdmins();
//   } catch (error) {
//     message.error('Error saving admin');
//   }
// };

// const handleDelete = async (id: number) => {
//   try {
//     await axios.delete(`https://api.example.com/admins/${id}`);
//     message.success('Admin deleted successfully');
//     fetchAdmins();
//   } catch (error) {
//     message.error('Error deleting admin');
//   }
// };

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Email',
//     dataIndex: 'email',
//     key: 'email',
//   },
//   {
//     title: 'Role',
//     dataIndex: 'role',
//     key: 'role',
//   },
//   {
//     title: 'Actions',
//     key: 'actions',
//     render: (_: any, record: Admin) => (
//       <span className="space-x-2">
//         <Button
//           icon={<EditOutlined />}
//           onClick={() => showModal(record)}
//           className="text-blue-600 hover:text-blue-800"
//         >
//           Edit
//         </Button>
//         <Button
//           icon={<DeleteOutlined />}
//           onClick={() => handleDelete(record.id)}
//           className="text-red-600 hover:text-red-800"
//         >
//           Delete
//         </Button>
//       </span>
//     ),
//   },
// ];
