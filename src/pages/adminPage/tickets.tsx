import { useEffect, useMemo, useState } from "react";
import { Table, Button, Space, Drawer, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

import { AutoForm, FieldType } from "../../components/auto-form";
import { classtype, TicketType } from "../../types";
import axios from "axios";
import api from "../../components/api";

// type PaymentType = "Uzcard" | "Humo" | "Visa" | "MasterCard";
// const Payments = ["Uzcard", "Humo", "Visa", "MasterCard"];
// const paymentOptions = Payments.map((item: string) => {
//   return {
//     label: item,
//     value: item,
//   };
// });

export function Tickets() {
  const [form] = useForm();
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  // const [flight, setFlight] = useState<FlightType[]>([]);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // fetchFligths();
    fetchTickets();
  }, []);

  // const fetchFligths = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://4d71b68cb41c81df.mokky.dev/flights"
  //     );
  //     setFlight(response.data);
  //   } catch (error) {
  //     message.error("Failed to fetch flights");
  //   }
  // };
  const fetchTickets = async () => {
    try {
      const response = await api.get("/ticket/get-all");
      setTickets(response.data);
    } catch (error) {
      message.error("Failed to fetch flights");
    }
  };

  const handleAdd = () => {
    setEditingTicket(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (tickets: TicketType) => {
    setEditingTicket(tickets);
    form.setFieldsValue(tickets);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const response = await api.delete(`/ticket/delete${id}`);
      console.log(response.data);

      message.success("tickets deleted successfully");
      fetchTickets();
    } catch (error) {
      message.error("Failed to delete tickets");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "classType",
      dataIndex: "classType",
      key: "classType",
    },
    {
      title: "bookingDate",
      dataIndex: "bookingDate",
      key: "bookingDate",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      render: (value: any) => {
        return value + " $";
      },
    },
    {
      title: "seatNumber",
      dataIndex: "seatNumber",
      key: "seatNumber",
    },

    {
      title: "bron",
      dataIndex: "bron",
      key: "bron",
      render: (value: any) => {
        return value ? (
          <p className="text-green-400 font-bold">Bron</p>
        ) : (
          <p className="text-red-500 font-bold">Not Bron</p>
        );
      },
    },
    {
      title: "active",
      dataIndex: "active",
      key: "active",
      render: (value: any) => {
        return value ? (
          <p className="text-green-400 font-bold">Active</p>
        ) : (
          <p className="text-red-500 font-bold">Inactive</p>
        );
      },
    },
    // {
    //   title: "Actions",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (id: string) => (
    //     <Space>
    //       <Button
    //         type="primary"
    //         icon={<EditOutlined />}
    //         onClick={() => handleEdit(tickets)}
    //       />
    //       <Button
    //         type="primary"
    //         danger
    //         icon={<DeleteOutlined />}
    //         onClick={() => handleDelete(id)}
    //       />
    //     </Space>
    //   ),
    // },

    // {
    //   title: "departureTime",
    //   dataIndex: "departureTime",
    //   key: "departureTime",
    // },
    // {
    //   title: "arrivalTime",
    //   dataIndex: "arrivalTime",
    //   key: "arrivalTime",
    // },
    // {
    //   title: "departureAirport",
    //   dataIndex: "departureAirport",
    //   key: "departureAirport",
    // },
    // {
    //   title: "arrivalAirport",
    //   dataIndex: "arrivalAirport",
    //   key: "arrivalAirport",
    // },
    // {
    //   title: "flightStatus",
    //   dataIndex: "flightStatus",
    //   key: "flightStatus",
    // },

    {
      title: "Action",
      key: "action",
      render: (_: string, record: TicketType) => {
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
  // const airportOptions = Airports.map((item: string) => {
  //   return {
  //     label: item,
  //     value: item,
  //   };
  // });
  const classOptions = classtype.map((item: string) => {
    return {
      label: item,
      value: item,
    };
  });

  const fields = useMemo(
    () =>
      [
        {
          label: "classType",
          name: "classType",
          rules: [{ required: true, message: "Пустое поле!" }],
          type: "select",
          options: classOptions,
        },
        {
          label: "bookingDate",
          name: "bookingDate",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        // {
        //   label: "price",
        //   name: "price",
        //   span: 8,
        //   type: "number",
        //   rules: [{ required: true, message: "Пустое поле!" }],
        // },
        {
          label: "seatNumber",
          span: 8,
          name: "seatNumber",
          rules: [{ required: true, message: "Пустое поле!" }],
        },

        // {
        //   label: "flightNumber",
        //   name: "flightNumber",
        //   rules: [{ required: true, message: "Пустое поле!" }],
        // },

        // {
        //   label: "ticketStatus",
        //   name: "ticketStatus",
        //   rules: [{ required: true, message: "Пустое поле!" }],
        // },
        // {
        //   label: "departureTime",
        //   name: "departureTime",
        //   rules: [{ required: true, message: "Пустое поле!" }],
        // },
        // {
        //   label: "arrivalTime",
        //   name: "arrivalTime",
        //   rules: [{ required: true, message: "Пустое поле!" }],
        // },
        // {
        //   label: "departureAirport",
        //   name: "departureAirport",
        //   span: 24,
        //   rules: [{ required: true, message: "Пустое поле!" }],
        //   type: "select",
        //   options: airportOptions,
        // },
        // {
        //   label: "arrivalAirport",
        //   name: "arrivalAirport",
        //   span: 24,
        //   rules: [{ required: true, message: "Пустое поле!" }],
        //   type: "select",
        //   options: airportOptions,
        // },

        // {
        //   label: "flightStatus",
        //   name: "flightStatus",
        //   rules: [{ required: true, message: "Пустое поле!" }],
        // },
      ] as FieldType[],
    [tickets]
  );

  const onFinish = async (values: Record<string, any>) => {
    console.log("values ", values);

    try {
      if (editingTicket) {
        await api.put(`/ticket/update${editingTicket.id}`, values);
        message.success("tickets updated successfully");
      } else {
        await axios.post("https://4d71b68cb41c81df.mokky.dev/tickets", {
          ...values,
        });
        message.success("tickets added successfully");
      }
      setIsModalVisible(false);
      fetchTickets();
    } catch (error) {
      message.error("Failed to save tickets");
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-end items-center mb-4">
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleAdd}
          >
            Add New Ticket
          </Button>
        </div>
        <Table columns={columns} dataSource={tickets} scroll={{ x: 1000 }} />
      </div>

      <Drawer
        title="tickets"
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
