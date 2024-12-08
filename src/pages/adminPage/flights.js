import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Table, Button, Space, Drawer, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
const { Option } = Select;
import { AutoForm } from "../../components/auto-form";
import { Airports } from "../../types";
import api from "../../components/api";
const Status = ["ON_TIME", "DELAYED"];
export function Flights() {
    const [form] = useForm();
    // const [editingFlight, setEditingFlight] = useState<FlightType | null>(null);
    const [flight, setFlight] = useState([]);
    const [airplanes, setAirplanes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        fetchFligths();
        fetchAirplanes();
    }, []);
    const fetchFligths = async () => {
        try {
            const response = await api.get("/flight/all-flight");
            setFlight(response.data);
        }
        catch (error) {
            message.error("Failed to fetch flights");
        }
    };
    const fetchAirplanes = async () => {
        try {
            const response = await api.get("/airplane/get-all");
            setAirplanes(response.data);
        }
        catch (error) {
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
    const updateFlightStatus = useCallback(async (id, newStatus) => {
        try {
            await api.put(`/flight/update-flight/${id}`, {
                ...flight,
                status: newStatus,
            });
            fetchFligths();
            message.success("Parvoz holati muvaffaqiyatli yangilandi");
        }
        catch (error) {
            console.error("Parvoz holatini yangilashda xatolik:", error);
            message.error("Parvoz holatini yangilashda xatolik yuz berdi");
        }
    }, []);
    const columns = [
        {
            title: "AIRPLANE",
            dataIndex: "airplane",
            key: "airplane",
            render: (airplane) => {
                const air = airplanes.find((item) => {
                    return item.id === airplane.id;
                });
                if (air)
                    return air.aircraftType;
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
            render: (_, record) => {
                console.log(record);
                return record.flightStatus == "ON_TIME" ? (_jsx("p", { className: "text-green-400 font-bold", children: "Active" })) : (_jsx("p", { className: "text-red-500 font-bold", children: "Inactive" }));
            },
        },
        {
            title: "passengers",
            dataIndex: "airplane",
            key: "airplane",
            render: (airplane) => {
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
            render: (status, record) => {
                const handleChange = (value) => {
                    updateFlightStatus(record.id, value);
                };
                const getColor = (s) => {
                    switch (s) {
                        case "ON_TIME":
                            return "text-green-400";
                        case "DELAYED":
                            return "text-red-500";
                        default:
                            return "";
                    }
                };
                return (_jsxs(Select, { value: status, onChange: handleChange, className: `font-bold ${getColor(status)}`, children: [_jsx(Option, { value: "ON_TIME", className: "text-green-400 font-bold", children: "ON TIME" }, status), _jsx(Option, { value: "DELAYED", className: "text-yellow-500 font-bold", children: "DELAYED" }, status)] }));
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
    const airportOptions = Airports.map((item) => {
        return {
            label: item,
            value: item,
        };
    });
    const statusOptions = Status.map((item) => {
        return {
            label: item,
            value: item,
        };
    });
    const airplaneOptions = airplanes.map((item) => {
        return {
            label: item.model,
            value: item.id,
        };
    });
    const fields = useMemo(() => [
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
    ], [flight]);
    const onFinish = async (values) => {
        try {
            await api.post("/flight/create-flight", {
                ...values,
            });
            message.success("Flight added successfully");
            setIsModalVisible(false);
            fetchFligths();
        }
        catch (error) {
            message.error("Failed to save FLIGHT");
        }
    };
    return (_jsxs("div", { className: "p-6 bg-gray-100 min-h-screen", children: [_jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("div", { className: "flex justify-end items-center mb-4", children: _jsx(Button, { type: "primary", icon: _jsx(PlusOutlined, {}), onClick: handleAdd, className: "bg-blue-500 hover:bg-blue-700", children: "Add New Flight" }) }), _jsx(Table, { columns: columns, dataSource: flight })] }), _jsx(Drawer, { title: "flights", onClose: () => setIsModalVisible(false), open: isModalVisible, extra: _jsx(Space, { children: _jsx(Button, { onClick: () => form.submit(), type: "primary", children: "Save" }) }), width: 700, forceRender: true, children: _jsx(AutoForm, { fields: fields, columnSize: 2, form: form, onFinish: onFinish, loading: false }) })] }));
}
