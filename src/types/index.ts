export type Admins = {
  id: number;
  image: string;
  fullname: string;
  role: string;
};

export interface User {
  id: string;
  username: string;
  surname: string;
  password: string;
  email: string;
  role: string;
  birthday: string;
  phoneNumber: string;
  balance: number;
  address: string;
  passportSeriies: string;
}

export type Airport =
  | "TASHKENT"
  | "SAMARKAND"
  | "BUKHARA"
  | "NAVOI"
  | "NAMANGAN"
  | "ANDIJON"
  | "FERGANA"
  | "KARSHI"
  | "NUKUS"
  | "TERMIZ"
  | "JIZZAKH"
  | "KHIVA";
export type FlightStatus = "ON_TIME" | "DELAYED" | "CANCELLED";

export interface FlightType {
  id: string;
  airplane: string;
  flightNumber: string;
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  status: FlightStatus;
}
export interface AirplaneType {
  id: string;
  model: string;
  manufacture: string;
  aircraftType: "JET" | "PROPELLER";
}
export type ClassType = "BUSINESS" | "FIRST" | "ECONOMY";
export const classtype = ["BUSINESS", "FIRST", "ECONOMY"];

export interface TicketType {
  id: string;
  flight: string;
  price: number;
  seatNumber: string;
  classType: ClassType;
  bookingDate: string;
  // nearWindow: boolean;
  // ticketStatus: string;
  // departureTime: string;
  // arrivalTime: string;
  // departureAirport: Airport;
  // arrivalAirport: Airport;
  // flightStatus: string;
}
export const Airports = [
  "TASHKENT",
  "SAMARKAND",
  "BUKHARA",
  "NAVOI",
  "NAMANGAN",
  "ANDIJON",
  "FERGANA",
  "KARSHI",
  "NUKUS",
  "TERMIZ",
  "JIZZAKH",
  "KHIVA",
];
export const Status = ["ON_TIME", "DELAYED", "CANCELLED"];
