import { Button, Card, Col, Divider, Row, Typography } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
const CardPrice = () => {
  return (
    <div className="mt-14  ">
      <Typography
        style={{
          color: "#828282",
          fontWeight: 700,
          fontSize: "16px",
          marginBlock: 25,
        }}
        className="flex items-center gap-1"
      >
        <IoIosInformationCircleOutline style={{ color: "#9ca7b1" }} /> Important
        information
      </Typography>
      <Row gutter={[20, 20]}>
        <Col xl={6}>
          <div
            className="hover:shadow-lg"
            style={{
              background: "#e8f1ff",
              border: "none",
              paddingBlock: 10,
              borderRadius: 8,
            }}
          >
            <Typography
              style={{
                background: "#479fe1",
                padding: 5,
                color: "white",
                fontSize: 18,
              }}
            >
              Economy Classic
            </Typography>
            <div className="p-3">
              {/* <Typography>Seats left: 9</Typography> */}
              {/* <Divider /> */}
              <Typography
                style={{ color: "#479fe1", fontWeight: 700, fontSize: 24 }}
              >
                1 209 000 <span>UZS</span>
              </Typography>
              <Button
                className="w-full"
                style={{
                  color: "#2885cb",
                  fontSize: "16px",
                  padding: 20,
                  //   marginBlock: 10,
                  marginTop: 30,
                }}
              >
                Go to issue
              </Button>
            </div>
          </div>
        </Col>
        <Col xl={6}>
          <div
            className="hover:shadow-lg"
            style={{
              background: "#e8f1ff",
              border: "none",
              paddingBlock: 10,
              borderRadius: 8,
            }}
          >
            <Typography
              style={{
                background: "#479fe1",
                padding: 5,
                color: "white",
                fontSize: 18,
              }}
            >
              Economy Convenience
            </Typography>
            <div className="p-3">
              {/* <Typography>Seats left: 9</Typography> */}
              {/* <Divider /> */}
              <Typography
                style={{ color: "#479fe1", fontWeight: 700, fontSize: 24 }}
              >
                1 209 000 <span>UZS</span>
              </Typography>
              <Button
                className="w-full"
                style={{
                  color: "#2885cb",
                  fontSize: "16px",
                  padding: 20,
                  //   marginBlock: 10,
                  marginTop: 30,
                }}
              >
                Go to issue
              </Button>
            </div>
          </div>
        </Col>
        <Col xl={6}>
          <div
            className="hover:shadow-lg"
            style={{
              background: "#e8f1ff",
              border: "none",
              paddingBlock: 10,
              borderRadius: 8,
            }}
          >
            <Typography
              style={{
                background: "#479fe1",
                padding: 5,
                color: "white",
                fontSize: 18,
              }}
            >
              Economy Comfort
            </Typography>
            <div className="p-3">
              {/* <Typography>Seats left: 9</Typography> */}
              {/* <Divider /> */}
              <Typography
                style={{ color: "#479fe1", fontWeight: 700, fontSize: 24 }}
              >
                1 209 000 <span>UZS</span>
              </Typography>
              <Button
                className="w-full"
                style={{
                  color: "#2885cb",
                  fontSize: "16px",
                  padding: 20,
                  //   marginBlock: 10,
                  marginTop: 30,
                }}
              >
                Go to issue
              </Button>
            </div>
          </div>
        </Col>
        <Col xl={6}>
          <div
            className="hover:shadow-lg"
            style={{
              background: "#e8f1ff",
              border: "none",
              paddingBlock: 10,
              borderRadius: 8,
            }}
          >
            <Typography
              style={{
                background: "#479fe1",
                padding: 5,
                color: "white",
                fontSize: 18,
              }}
            >
              Business
            </Typography>
            <div className="p-3">
              {/* <Typography>Seats left: 9</Typography> */}
              {/* <Divider /> */}
              <Typography
                style={{ color: "#479fe1", fontWeight: 700, fontSize: 24 }}
              >
                1 209 000 <span>UZS</span>
              </Typography>
              <Button
                className="w-full"
                style={{
                  color: "#2885cb",
                  fontSize: "16px",
                  padding: 20,
                  //   marginBlock: 10,
                  marginTop: 30,
                }}
              >
                Go to issue
              </Button>
            </div>
          </div>
        </Col>
        <Col xl={6}>
          <div
            className="hover:shadow-lg"
            style={{
              background: "#e8f1ff",
              border: "none",
              paddingBlock: 10,
              borderRadius: 8,
            }}
          >
            <Typography
              style={{
                background: "#479fe1",
                padding: 5,
                color: "white",
                fontSize: 18,
              }}
            >
              Business
            </Typography>
            <div className="p-3">
              {/* <Typography>Seats left: 9</Typography> */}
              {/* <Divider /> */}
              <Typography
                style={{ color: "#479fe1", fontWeight: 700, fontSize: 24 }}
              >
                1 209 000 <span>UZS</span>
              </Typography>
              <Button
                className="w-full"
                style={{
                  color: "#2885cb",
                  fontSize: "16px",
                  padding: 20,
                  //   marginBlock: 10,
                  marginTop: 30,
                }}
              >
                Go to issue
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardPrice;
