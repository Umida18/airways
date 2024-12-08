import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { Table, Button, Space, Drawer, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { AutoForm } from "../../components/auto-form";
import api from "../../components/api";
export function Airplanes() {
    const [form] = useForm();
    const [editingAirplane, setEditingAirplane] = useState(null);
    const [airplanes, setAirplanes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        fetchAirplanes();
    }, []);
    const fetchAirplanes = async () => {
        try {
            const response = await api.get("/airplane/get-all");
            setAirplanes(response.data);
        }
        catch (error) {
            message.error("Failed to fetch airplanes");
        }
    };
    const handleAdd = () => {
        setEditingAirplane(null);
        form.resetFields();
        setIsModalVisible(true);
    };
    const handleEdit = (airplane) => {
        setEditingAirplane(airplane);
        form.setFieldsValue(airplane);
        setIsModalVisible(true);
    };
    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await api.delete(`/airplane/delete${id}`);
            console.log(response.data);
            message.success("airplanes deleted successfully");
            fetchAirplanes();
        }
        catch (error) {
            message.error("Failed to delete airplanes");
            console.log(error);
        }
    };
    const onFinish = async (values) => {
        try {
            if (editingAirplane) {
                await api.put(`/airplane/update-airplane${editingAirplane.id}`, values);
                message.success("airplanes updated successfully");
            }
            else {
                await api.post("/airplane/create-airplane", {
                    ...values,
                });
                message.success("airplanes added successfully");
            }
            setIsModalVisible(false);
            fetchAirplanes();
        }
        catch (error) {
            message.error("Failed to save airplanes");
        }
    };
    const columns = [
        {
            title: "model",
            dataIndex: "model",
            key: "model",
        },
        {
            title: "manufacturer",
            dataIndex: "manufacturer",
            key: "manufacturer",
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
            render: (aircraftType) => {
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
            render: (_, record) => {
                console.log(record);
                return (_jsxs("span", { className: "space-x-2", children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), onClick: () => handleEdit(record), className: "text-blue-500 hover:text-blue-700" }), _jsx(Button, { icon: _jsx(DeleteOutlined, {}), onClick: () => handleDelete(record.id), className: "text-red-500 hover:text-red-700" })] }));
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
    const fields = useMemo(() => [
        {
            label: "model",
            name: "model",
            rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
            label: "manufacturer",
            name: "manufacturer",
            rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
            label: "aircraftType",
            name: "aircraftType",
            rules: [{ required: true, message: "Пустое поле!" }],
            type: "select",
            options: aircraftTypeOptions,
        },
    ], [airplanes]);
    return (_jsxs("div", { className: "p-6 bg-gray-100 min-h-screen", children: [_jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("div", { className: "flex justify-end items-center mb-4", children: _jsx(Button, { type: "primary", icon: _jsx(PlusOutlined, {}), onClick: handleAdd, className: "bg-blue-500 hover:bg-blue-700", children: "Add New airplanes" }) }), _jsx(Table, { columns: columns, dataSource: airplanes })] }), _jsx(Drawer, { title: "airplanes", onClose: () => setIsModalVisible(false), open: isModalVisible, extra: _jsx(Space, { children: _jsx(Button, { onClick: () => form.submit(), type: "primary", children: "Save" }) }), width: 700, forceRender: true, children: _jsx(AutoForm, { fields: fields, columnSize: 2, form: form, onFinish: onFinish, loading: false }) })] }));
}
