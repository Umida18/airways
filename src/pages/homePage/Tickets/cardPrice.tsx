import { Button, Col, Row, Typography } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFlights } from "../../../context/FlightsContext";
import { PriceComponent } from "../../../utils/utils";
const CardPrice = () => {
  const navigate = useNavigate();
  const { flights, setFlights } = useFlights();

  const [searchParams] = useSearchParams();

  const passengers = searchParams.get("passengers");

  return (
    <div className="mt-14">
      <Typography
        style={{
          color: "#828282",
          fontWeight: 700,
          fontSize: "16px",
          marginBlock: 25,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="flex items-center gap-1"
      >
        <IoIosInformationCircleOutline style={{ color: "#9ca7b1" }} /> Important
        information
      </Typography>
      <Row gutter={[20, 20]}>
        {flights.map((flight) => (
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
                  background:
                    flight.classType === "ECONOMY"
                      ? "#479fe1"
                      : flight.classType === "BUSINESS"
                      ? "#F1C40F"
                      : "#16a34a",
                  padding: 5,
                  color: "white",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {flight.classType}
              </Typography>
              <div className="p-3">
                {/* <Typography>Seats left: 9</Typography> */}
                {/* <Divider /> */}
                <Typography
                  style={{ color: "#479fe1", fontWeight: 700, fontSize: 24 }}
                >
                  <PriceComponent price={String(flight.price)} />
                </Typography>
                <Button
                  onClick={() =>
                    navigate(`/buyTicket?passengers=${passengers}`)
                  }
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
        ))}
      </Row>
    </div>
  );
};

export default CardPrice;
