// BuyTicket.tsx
import { useFloor } from "../mainPage/FloorContext";
import {
  Card,
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  Typography,
  Row,
  Col,
} from "antd";

const { Text } = Typography;
const { Option } = Select;
const BuyTicket = () => {
  const [floor] = useFloor();
  const [form] = Form.useForm();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="!w-[1168px] ">
        <Row className="!w-[100%]">
          {Array.from({ length: floor }, (_, __) => (
            <Card
              style={{
                width: "100%",
                background: "#f5f8fa",
                border: 0,
                marginBlock: "20px",
              }}
            >
              <Text
                type="danger"
                style={{
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Barcha kataklar to'ldirilishi, yozuvlar lotin alfavitida
                kiritilishi shart
              </Text>
              <Form form={form} layout="vertical">
                <Row gutter={[16, 16]}>
                  <Col xl={6}>
                    <Form.Item name="familiya" label="Familiya">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xl={6}>
                    <Form.Item name="ism" label="Ism">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xl={6}>
                    <Form.Item name="tugilganSana" label="Tug'ilgan sanangiz">
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col xl={6}>
                    <Form.Item name="fuqarolik" label="Fuqarolik">
                      <Select defaultValue="O'zbekiston">
                        <Option value="O'zbekiston">O'zbekiston</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xl={6}>
                    <Form.Item name="jinsingiz" label="Jinsingiz">
                      <Radio.Group style={{ width: "100%", display: "flex" }}>
                        <Radio.Button style={{ width: "100%" }} value="erkak">
                          Erkak
                        </Radio.Button>
                        <Radio.Button style={{ width: "100%" }} value="ayol">
                          Ayol
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>

                  <Col xl={6}>
                    <Form.Item name="hujjatTuri" label="Hujjat turi">
                      <Select defaultValue="pasport">
                        <Option value="pasport">Pasport</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xl={6}>
                    <Form.Item name="seriyaRaqami" label="Seriyasi/raqami">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xl={6}>
                    <Form.Item
                      name="amalQilishMuddati"
                      label="Amal qilish muddati"
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BuyTicket;
