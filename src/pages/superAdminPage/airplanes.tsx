import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table, Button, Input, Space, Drawer, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

import { AutoForm, FieldType } from "../../components/auto-form";
import axios from "axios";
import { AirplaneType } from "../../types";

export function Airplanes() {
  const [form] = useForm();
  const [editingAirplane, setEditingAirplane] = useState<AirplaneType | null>(
    null
  );
  const [airplanes, setAirplanes] = useState<AirplaneType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchAirplanes();
  }, []);

  const fetchAirplanes = async () => {
    try {
      const response = await axios.get(
        "https://4d71b68cb41c81df.mokky.dev/airplanes"
      );
      setAirplanes(response.data);
    } catch (error) {
      message.error("Failed to fetch airplanes");
    }
  };

  const handleAdd = () => {
    setEditingAirplane(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (airplane: AirplaneType) => {
    setEditingAirplane(airplane);
    form.setFieldsValue(airplane);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://4d71b68cb41c81df.mokky.dev/airplanes/${id}`
      );
      console.log(response.data);

      message.success("airplanes deleted successfully");
      fetchAirplanes();
    } catch (error) {
      message.error("Failed to delete airplanes");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "manufacture",
      dataIndex: "manufacture",
      key: "manufacture",
    },
    {
      title: "aircraftType",
      dataIndex: "aircraftType",
      key: "aircraftType",
    },

    {
      title: "passengers",
      dataIndex: "aircraftType",
      key: "aircraftType",
      render: (aircraftType: string) => {
        return aircraftType == "JET"
          ? 60
          : aircraftType == "PROPELLER"
          ? 120
          : 0;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text: string, record: AirplaneType) => {
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
  const aircraftTypeOptions = [
    {
      label: "JET",
      value: "JET",
    },
    {
      label: "PROPELLER",
      value: "PROPELLER",
    },
  ];

  const fields = useMemo(
    () =>
      [
        {
          label: "model",
          name: "model",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "manufacture",
          name: "manufacture",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "aircraftType",
          name: "aircraftType",
          rules: [{ required: true, message: "Пустое поле!" }],
          type: "select",
          options: aircraftTypeOptions,
        },
      ] as FieldType[],
    [airplanes]
  );

  const onFinish = async (values: Record<string, any>) => {
    try {
      if (editingAirplane) {
        await axios.put(
          `https://4d71b68cb41c81df.mokky.dev/airplanes/${editingAirplane.id}`,
          values
        );
        message.success("airplanes updated successfully");
      } else {
        await axios.post("https://4d71b68cb41c81df.mokky.dev/airplanes", {
          ...values,
          id: uuidv4(),
        });
        message.success("airplanes added successfully");
      }
      setIsModalVisible(false);
      fetchAirplanes();
    } catch (error) {
      message.error("Failed to save airplanes");
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search flights"
            prefix={<SearchOutlined />}
            className="max-w-xs"
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-700"
          >
            Add New airplanes
          </Button>
        </div>
        <Table columns={columns} dataSource={airplanes} />
      </div>

      <Drawer
        title="airplanes"
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
