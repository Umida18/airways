import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table, Button, Switch, Input, Space, Drawer, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

import type { ColumnsType } from "antd/es/table";
import { AutoForm, FieldType } from "../../components/auto-form";
import axios from "axios";
import { User } from "../../types";

export const dataSuperAdmins = [
  {
    id: 1,
    image:
      "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg",
    fullname: "Davronov Davron",
    role: "Super Admin",
    email: "davronov@gmail.com",
  },
];

export function Admins() {
  const [form] = useForm();
  const [admins, setAdmins] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<User | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        "https://4d71b68cb41c81df.mokky.dev/admins"
      );
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
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (
        value: any //Record<string, unknown>
      ) => (
        <img
          className="w-12 h-12 rounded-full object-cover"
          // src={`${baseURL}${value?.url}`}
          src={value}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <a key={text} className="text-blue-600 hover:text-blue-800">
          {text}
        </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
        // { label: "Image", name: "image", type: "file" },
        {
          label: "FullName",
          name: "name",
          rules: [{ required: true, message: "Пустое поле!" }],
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
            { value: "User", label: "User" },
          ],
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
          {
            ...values,
            image: "",
          }
        );
        message.success("Admin updated successfully");
      } else {
        await axios.post("https://4d71b68cb41c81df.mokky.dev/admins", {
          ...values,
          id: uuidv4(),
          image: "",
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
            onClick={() => setIsModalVisible(true)}
          >
            Add New Admin
          </Button>
        </div>
        <Table columns={columns} dataSource={admins} />
      </div>

      <Drawer
        title="Category"
        onClose={() => setIsModalVisible(false)}
        open={isModalVisible}
        extra={
          <Space>
            {/* <Button onClick={handleModalCancel}>Cancel</Button> */}
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
