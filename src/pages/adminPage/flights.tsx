import { useCallback, useEffect, useMemo, useState } from "react";
import { Table, Button, Space, Drawer, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
const { Option } = Select;
import { AutoForm, FieldType } from "../../components/auto-form";
import { AirplaneType, Airports, FlightType } from "../../types";
import api from "../../components/api";

const Status = ["ON_TIME", "DELAYED"];

export function Flights() {
  const [form] = useForm();
  // const [editingFlight, setEditingFlight] = useState<FlightType | null>(null);
  const [flight, setFlight] = useState<FlightType[]>([]);
  const [airplanes, setAirplanes] = useState<AirplaneType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchFligths();
    fetchAirplanes();
  }, []);

  const fetchFligths = async () => {
    try {
      const response = await api.get("/flight/all-flight");
      setFlight(response.data);
    } catch (error) {
      message.error("Failed to fetch flights");
    }
  };
  const fetchAirplanes = async () => {
    try {
      const response = await api.get("/airplane/get-all");
      setAirplanes(response.data);
    } catch (error) {
      message.error("Failed to fetch flights");
    }
  };

  const handleAdd = () => {
    // setEditingFlight(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // const handleEdit = (flight: FlightType) => {
  //   setEditingFlight(flight);
  //   form.setFieldsValue(flight);
  //   setIsModalVisible(true);
  // };

  // const handleDelete = async (id: string) => {
  //   console.log(id);
  //   try {
  //     const response = await api.delete(`/flight/delete/${id}`);
  //     console.log(response.data);

  //     message.success("flight deleted successfully");
  //     fetchFligths();
  //   } catch (error) {
  //     message.error("Failed to delete flight");
  //     console.log(error);
  //   }
  // };
  const updateFlightStatus = useCallback(
    async (id: string, newStatus: string) => {
      try {
        await api.put(`/flight/update-flight/${id}`, {
          ...flight,
          status: newStatus,
        });
        fetchFligths();
        message.success("Parvoz holati muvaffaqiyatli yangilandi");
      } catch (error) {
        console.error("Parvoz holatini yangilashda xatolik:", error);
        message.error("Parvoz holatini yangilashda xatolik yuz berdi");
      }
    },
    []
  );
  const columns = [
    {
      title: "AIRPLANE",
      dataIndex: "airplane",
      key: "airplane",
      render: (airplane: any) => {
        const air = airplanes.find((item) => {
          return item.id === airplane.id;
        });
        if (air) return air.aircraftType;
      },
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
      title: "active",
      dataIndex: "",
      key: "active",
      render: (_: string, record: FlightType) => {
        console.log(record);
        return record.flightStatus == "ON_TIME" ? (
          <p className="text-green-400 font-bold">Active</p>
        ) : (
          <p className="text-red-500 font-bold">Inactive</p>
        );
      },
    },
    {
      title: "passengers",
      dataIndex: "airplane",
      key: "airplane",
      render: (airplane: any) => {
        const air = airplanes.find((item) => {
          return item.id === airplane.id;
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
      dataIndex: "flightStatus",
      key: "flightStatus",
      render: (status: string, record: FlightType) => {
        const handleChange = (value: string) => {
          updateFlightStatus(record.id, value);
        };

        const getColor = (s: string) => {
          switch (s) {
            case "ON_TIME":
              return "text-green-400";
            case "DELAYED":
              return "text-red-500";

            default:
              return "";
          }
        };

        return (
          <Select
            value={status}
            onChange={handleChange}
            className={`font-bold ${getColor(status)}`}
          >
            <Option
              key={status}
              value="ON_TIME"
              className="text-green-400 font-bold"
            >
              ON TIME
            </Option>
            <Option
              key={status}
              value="DELAYED"
              className="text-yellow-500 font-bold"
            >
              DELAYED
            </Option>
          </Select>
        );
      },
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text: string, record: FlightType) => {
    //     console.log(record);

    //     return (
    //       <span className="space-x-2">
    //         <Button
    //           icon={<DeleteOutlined />}
    //           onClick={() => handleDelete(record.id)}
    //           className="text-red-500 hover:text-red-700"
    //         />
    //       </span>
    //     );
    //   },
    // },
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
      value: item.id,
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
      await api.post("/flight/create-flight", {
        ...values,
      });
      message.success("Flight added successfully");
      setIsModalVisible(false);
      fetchFligths();
    } catch (error) {
      message.error("Failed to save FLIGHT");
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-end items-center mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-700"
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
