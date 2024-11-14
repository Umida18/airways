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
import { AirplaneType, Airports, FlightType } from "../../types";

const Status = ["ON_TIME", "DELAYED", "CANCELLED"];

export function Flights() {
  const [form] = useForm();
  const [editingFlight, setEditingFlight] = useState<FlightType | null>(null);
  const [flight, setFlight] = useState<FlightType[]>([]);
  const [airplanes, setAirplanes] = useState<AirplaneType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchFligths();
    fetchAirplanes();
  }, []);

  const fetchFligths = async () => {
    try {
      const response = await axios.get(
        "https://4d71b68cb41c81df.mokky.dev/flights"
      );
      setFlight(response.data);
    } catch (error) {
      message.error("Failed to fetch flights");
    }
  };
  const fetchAirplanes = async () => {
    try {
      const response = await axios.get(
        "https://4d71b68cb41c81df.mokky.dev/airplanes"
      );
      setAirplanes(response.data);
    } catch (error) {
      message.error("Failed to fetch flights");
    }
  };

  const handleAdd = () => {
    setEditingFlight(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (flight: FlightType) => {
    setEditingFlight(flight);
    form.setFieldsValue(flight);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://4d71b68cb41c81df.mokky.dev/flights/${id}`
      );
      console.log(response.data);

      message.success("flight deleted successfully");
      fetchFligths();
    } catch (error) {
      message.error("Failed to delete flight");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "AIRPLANE",
      dataIndex: "airplane",
      key: "airplane",
    },
    {
      title: "flightNumber",
      dataIndex: "flightNumber",
      key: "flightNumber",
    },
    {
      title: "FROM",
      dataIndex: "departureAirport",
      key: "departureAirport",
    },
    {
      title: "TO",
      dataIndex: "arrivalAirport",
      key: "arrivalAirport",
    },
    {
      title: "departure Time",
      dataIndex: "departureTime",
      key: "departureTime",
    },
    {
      title: "arrival Time",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
    },
    {
      title: "passengers",
      dataIndex: "airplane",
      key: "airplane",
      render: (airplane: string) => {
        const air = airplanes.find((item) => {
          return item.id === airplane;
        });
        if (air)
          return air.aircraftType == "JET"
            ? 60
            : air.aircraftType == "PROPELLER"
            ? 120
            : 0;
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (text: string, record: FlightType) => {
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
  const airportOptions = Airports.map((item: string) => {
    return {
      label: item,
      value: item,
    };
  });
  const statusOptions = Status.map((item: string) => {
    return {
      label: item,
      value: item,
    };
  });
  const airplaneOptions = airplanes.map((item: AirplaneType) => {
    return {
      label: item.model,
      value: item.model,
    };
  });

  const fields = useMemo(
    () =>
      [
        {
          label: "airplane",
          name: "airplane",
          rules: [{ required: true, message: "Пустое поле!" }],
          type: "select",
          options: airplaneOptions,
        },
        {
          label: "flightNumber",
          name: "flightNumber",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "departureAirport",
          name: "departureAirport",
          rules: [{ required: true, message: "Пустое поле!" }],
          type: "select",
          options: airportOptions,
        },
        {
          label: "arrivalAirport",
          name: "arrivalAirport",
          rules: [{ required: true, message: "Пустое поле!" }],
          type: "select",
          options: airportOptions,
        },
        {
          label: "departureTime",
          name: "departureTime",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "arrivalTime",
          name: "arrivalTime",
          rules: [{ required: true, message: "Пустое поле!" }],
        },

        {
          label: "status",
          name: "status",
          type: "select",
          options: statusOptions,
          rules: [{ required: true, message: "Пустое поле!" }],
        },
      ] as FieldType[],
    [flight]
  );

  const onFinish = async (values: Record<string, any>) => {
    try {
      if (editingFlight) {
        await axios.put(
          `https://4d71b68cb41c81df.mokky.dev/flights/${editingFlight.id}`,
          values
        );
        message.success("Flight updated successfully");
      } else {
        await axios.post("https://4d71b68cb41c81df.mokky.dev/flights", {
          ...values,
          id: uuidv4(),
        });
        message.success("Flight added successfully");
      }
      setIsModalVisible(false);
      fetchFligths();
    } catch (error) {
      message.error("Failed to save FLIGHT");
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
            Add New Flight
          </Button>
        </div>
        <Table columns={columns} dataSource={flight} />
      </div>

      <Drawer
        title="flights"
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

// const handleSearch = (value: string) => {
//   setSearchText(value);
// };

// const filteredflights = flights.filter(
//   (admin) =>
//     admin.name.toLowerCase().includes(searchText.toLowerCase()) ||
//     admin.email.toLowerCase().includes(searchText.toLowerCase())
// );
