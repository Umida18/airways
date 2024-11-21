import { Button, Card, Col, Row, Select, Typography } from "antd";
import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { IoCheckmarkOutline, IoSearch } from "react-icons/io5";

interface ITickets {
  city: string;
  dateRange: string;
  price: string;
  image: string;
}
interface TicketsProps {
  data: ITickets[];
}

const Tickets: React.FC<TicketsProps> = ({ data }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const hoverCard = (index: number) => {
    setIsHovered(index);
  };

  const leaveCard = () => {
    setIsHovered(null);
  };

  const getColSpan = (index: number) => {
    return index % 6 === 0 ? 12 : 6 && (index + 1) % 6 === 0 ? 12 : 6;
  };
  const filteredCities = selectedCity
    ? data.filter((item) => item.city === selectedCity)
    : data;

  return (
    <div className="bg-white py-8 ">
      <div className="max-w-7xl mx-auto px-14">
        <Typography.Title style={{ fontSize: "24px", fontWeight: 700 }}>
          Offers & Ticket Prices For Cheap Flights
        </Typography.Title>
        <div className="flex gap-3 items-center ">
          <Typography.Text
            style={{ fontSize: "16px", fontWeight: 500, marginBlock: "20px" }}
          >
            Departing from
          </Typography.Text>
          <Select
            onChange={(e) => setSelectedCity(e)}
            showSearch
            defaultValue={null}
            style={{ width: "100%", maxWidth: 400, height: "44px" }}
            options={data.map((item) => ({
              value: item.city,
              label: item.city,
              code: item.city.slice(0, 3),
            }))}
            value={selectedCity || undefined}
            suffixIcon={<IoSearch style={{ fontSize: "22px" }} />}
            optionRender={(option) => (
              <div className="flex items-center justify-between py-1 px-2">
                <div className="flex items-center gap-2">
                  {option.value === selectedCity && (
                    <IoCheckmarkOutline className="text-green-500" />
                  )}
                  <span>{option.data.label}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {option.data.code}
                </span>
              </div>
            )}
          />
          {selectedCity && (
            <div
              onClick={(e) => {
                e.preventDefault();
                setSelectedCity(null);
              }}
              style={{ cursor: "pointer" }}
            >
              <HiOutlineX />
            </div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-14 my-10">
        <Row gutter={[16, 16]}>
          {filteredCities.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={getColSpan(index)}>
              <Card
                key={index}
                className="relative overflow-hidden rounded-lg transition-all duration-700 ease-in-out"
                onMouseEnter={() => hoverCard(index)}
                onMouseLeave={leaveCard}
                style={{
                  borderRadius: "8px",
                  backgroundImage: `url(${item.image})`,
                  height: "342px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "none",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    filter: `brightness(${
                      isHovered === index ? "70%" : "100%"
                    })`,
                    transform: `scale(${isHovered === index ? "1.05" : "1"})`,
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-100 transition-opacity duration-700 ease-in-out"
                  style={{
                    opacity: isHovered === index ? "1" : "0.6",
                  }}
                />

                <div
                  className="absolute bottom-4 left-4 right-4 text-white transition-all duration-700 ease-in-out"
                  style={{
                    transform: `translateY(${
                      isHovered === index ? "-20px" : "0"
                    })`,
                    opacity: isHovered === index ? "1" : "0.9",
                  }}
                >
                  <h2
                    className="text-2xl font-bold mb-1 transition-all duration-700 ease-in-out"
                    style={{
                      transform: `translateY(${
                        isHovered === index ? "-5px" : "0"
                      })`,
                    }}
                  >
                    {item.city}
                  </h2>
                  <p
                    className="text-sm mb-1 transition-all duration-700 ease-in-out"
                    style={{ opacity: isHovered === index ? "1" : "0.8" }}
                  >
                    {item.dateRange}
                  </p>
                  <p
                    className="mb-2 transition-all duration-700 ease-in-out"
                    style={{ opacity: isHovered === index ? "1" : "0.8" }}
                  >
                    From {item.price}
                  </p>
                  <div
                    className="transition-all duration-1500 ease-in-out"
                    style={{
                      opacity: isHovered === index ? "1" : "0",
                      transform: `translateY(${
                        isHovered === index ? "0" : "20px"
                      })`,
                    }}
                  >
                    <Button className="w-full bg-[#479fe1] hover:!bg-[#479fe1] hover:!text-white transition-colors duration-300 border-0 text-white">
                      Book now
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Tickets;
