import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table, Button, Input, Space, Drawer, Switch, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

import { AutoForm, FieldType } from "../../components/auto-form";
import {
  Airport,
  Airports,
  classtype,
  ClassType,
  FlightType,
  TicketType,
} from "../../types";
import axios from "axios";

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
      const response = await axios.get(
        "https://4d71b68cb41c81df.mokky.dev/tickets"
      );
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
      const response = await axios.delete(
        `https://4d71b68cb41c81df.mokky.dev/tickets/${id}`
      );
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
      title: "flight",
      dataIndex: "flight",
      key: "flight",
    },

    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "seatNumber",
      dataIndex: "seatNumber",
      key: "seatNumber",
    },
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

    // {
    //   title: "ticketStatus",
    //   dataIndex: "ticketStatus",
    //   key: "ticketStatus",
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
      render: (text: string, record: TicketType) => {
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
          label: "flight",
          name: "flight",
          span: 8,
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "price",
          name: "price",
          span: 8,
          type: "number",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "seatNumber",
          span: 8,
          name: "seatNumber",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
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
        //   label: "flightNumber",
        //   name: "flightNumber",
        //   rules: [{ required: true, message: "Пустое поле!" }],
        // },

        // {
        //   label: "nearWindow",
        //   name: "nearWindow",
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

    // const editingTicketIndex = data.findIndex(
    //   (item) => item.flightNumber == editingTicket?.flight
    // );
    // if (editingTicketIndex !== -1 && editingTicket) {
    //   const updatedLine = {
    //     flightNumber: values.flightNumber,
    //     seatNumber: values.seatNumber,
    //     price: values.price,
    //     bookingDate: values.bookingDate,
    //     classType: values.classType,
    //     nearWindow: values.nearWindow,
    //     ticketStatus: values.ticketStatus,
    //     departureTime: values.departureTime,
    //     arrivalTime: values.arrivalTime,
    //     departureAirport: values.departureAirport,
    //     arrivalAirport: values.arrivalAirport,
    //     flightStatus: values.flightStatus,
    //   };
    //   console.log(updatedLine);

    //   const newLine = [
    //     ...data.slice(0, editingTicketIndex),
    //     updatedLine,
    //     ...data.slice(editingTicketIndex + 1),
    //   ];
    //   setData(newLine);
    // } else {
    //   let newData = [
    //     ...data,
    //     {
    //       flightNumber: values.flightNumber,
    //       seatNumber: values.seatNumber,
    //       price: values.price,
    //       bookingDate: values.bookingDate,
    //       classType: values.classType,
    //       nearWindow: values.nearWindow,
    //       ticketStatus: values.ticketStatus,
    //       departureTime: values.departureTime,
    //       arrivalTime: values.arrivalTime,
    //       departureAirport: values.departureAirport,
    //       arrivalAirport: values.arrivalAirport,
    //       flightStatus: values.flightStatus,
    //     },
    //   ];
    //   setData(newData);
    // }
    // setIsModalVisible(false);
    // form.resetFields();

    try {
      if (editingTicket) {
        await axios.put(
          `https://4d71b68cb41c81df.mokky.dev/tickets/${editingTicket.id}`,
          values
        );
        message.success("tickets updated successfully");
      } else {
        await axios.post("https://4d71b68cb41c81df.mokky.dev/tickets", {
          ...values,
          id: uuidv4(),
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
//   setEditingTicket(admin);
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
//     if (editingTicket) {
//       await axios.put(`https://api.example.com/admins/${editingTicket.id}`, values);
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
