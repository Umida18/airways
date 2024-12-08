import { useCallback, useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import api from "../../components/api";
import { TicketType } from "@/types";

export function Tickets() {
  // const [flight, setFlight] = useState<FlightType[]>([]);
  const [tickets, setTickets] = useState<TicketType[]>([]);

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
      render: (ClassType: string, record: TicketType) => {
        console.log(ClassType);

        ClassType =
          record.price == 200
            ? "ECONOMY"
            : record.price == 500
            ? "FIRST"
            : "BUSINESS";

        return (
          <p>{ClassType}</p>
          // <Select value={ClassType} onChange={handleChange} className="w-full">
          //   <Option
          //     key="ECONOMY"
          //     value="ECONOMY"
          //     className="text-green-400 font-bold"
          //   >
          //     ECONOMY
          //   </Option>
          //   <Option
          //     key="FIRST"
          //     value="FIRST"
          //     className="text-yellow-500 font-bold"
          //   >
          //     FIRST
          //   </Option>{" "}
          //   <Option
          //     key="BUSINESS"
          //     value="BUSINESS"
          //     className="text-yellow-500 font-bold"
          //   >
          //     BUSINESS
          //   </Option>
          // </Select>
        );
      },
    },
    {
      title: "departureTime",
      dataIndex: "departureTime",
      key: "departureTime",
    },
    {
      title: "arrivalTime",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
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
      title: "Action",
      key: "action",
      render: (_: string, record: TicketType) => {
        console.log(record);

        return (
          <span className="space-x-2">
            {!record.bron && (
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.ticketId)}
                className="text-red-500 hover:text-red-700"
              />
            )}
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
  // const classOptions = classtype.map((item: string) => {
  //   return {
  //     label: item,
  //     value: item,
  //   };
  // });

  // const fields = useMemo(
  //   () =>
  //     [
  //       {
  //         label: "classType",
  //         name: "classType",
  //         rules: [{ required: true, message: "Пустое поле!" }],
  //         type: "select",
  //         options: classOptions,
  //       },
  //       {
  //         label: "bookingDate",
  //         name: "bookingDate",
  //         rules: [{ required: true, message: "Пустое поле!" }],
  //       },
  //       // {
  //       //   label: "price",
  //       //   name: "price",
  //       //   span: 8,
  //       //   type: "number",
  //       //   rules: [{ required: true, message: "Пустое поле!" }],
  //       // },
  //       {
  //         label: "seatNumber",
  //         span: 8,
  //         name: "seatNumber",
  //         rules: [{ required: true, message: "Пустое поле!" }],
  //       },

  //       // {
  //       //   label: "flightNumber",
  //       //   name: "flightNumber",
  //       //   rules: [{ required: true, message: "Пустое поле!" }],
  //       // },

  //       // {
  //       //   label: "ticketStatus",
  //       //   name: "ticketStatus",
  //       //   rules: [{ required: true, message: "Пустое поле!" }],
  //       // },
  //       // {
  //       //   label: "departureTime",
  //       //   name: "departureTime",
  //       //   rules: [{ required: true, message: "Пустое поле!" }],
  //       // },
  //       // {
  //       //   label: "arrivalTime",
  //       //   name: "arrivalTime",
  //       //   rules: [{ required: true, message: "Пустое поле!" }],
  //       // },
  //       // {
  //       //   label: "departureAirport",
  //       //   name: "departureAirport",
  //       //   span: 24,
  //       //   rules: [{ required: true, message: "Пустое поле!" }],
  //       //   type: "select",
  //       //   options: airportOptions,
  //       // },
  //       // {
  //       //   label: "arrivalAirport",
  //       //   name: "arrivalAirport",
  //       //   span: 24,
  //       //   rules: [{ required: true, message: "Пустое поле!" }],
  //       //   type: "select",
  //       //   options: airportOptions,
  //       // },

  //       // {
  //       //   label: "flightStatus",
  //       //   name: "flightStatus",
  //       //   rules: [{ required: true, message: "Пустое поле!" }],
  //       // },
  //     ] as FieldType[],
  //   [tickets]
  // );

  // const onFinish = async (values: Record<string, any>) => {
  //   console.log("values ", values);

  //   try {
  //     if (editingTicket) {
  //       await api.put(`/ticket/update${editingTicket.ticketId}`, values);
  //       message.success("tickets updated successfully");
  //     } else {
  //       await axios.post("https://4d71b68cb41c81df.mokky.dev/tickets", {
  //         ...values,
  //       });
  //       message.success("tickets added successfully");
  //     }
  //     setIsModalVisible(false);
  //     fetchTickets();
  //   } catch (error) {
  //     message.error("Failed to save tickets");
  //   }
  // };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <Table columns={columns} dataSource={tickets} scroll={{ x: 1000 }} />
      </div>

      {/* <Drawer
        title="tickets"
        onClose={() => setIsModalVisible(false)}
        open={isModalVisible}
        extra={
          <Space>
            <Button onClick={handleModalCancel}>Cancel</Button>
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
      </Drawer> */}
    </div>
  );
}
