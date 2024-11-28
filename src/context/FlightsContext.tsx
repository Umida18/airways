import { ReactNode, createContext, useContext, useState } from "react";

interface Flight {
  active: boolean;
  bron: boolean;
  classType: string;
  created: string;
  id: string;
  modified: string;
  price: number;
}
interface FlightsContextProps {
  flights: Flight[];
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
}

const FlightsContext = createContext<FlightsContextProps | undefined>(
  undefined
);

export const FlightsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [flights, setFlights] = useState<Flight[]>([]);

  return (
    <FlightsContext.Provider value={{ flights, setFlights }}>
      {children}
    </FlightsContext.Provider>
  );
};

export const useFlights = () => {
  const context = useContext(FlightsContext);
  if (!context) {
    throw new Error("useFlights must be used within a FlightsProvider");
  }
  return context;
};
