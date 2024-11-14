// FloorContext.tsx
import React, { createContext, useContext, useState } from "react";

// Kontekst yaratish
const FloorContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>] | undefined
>(undefined);

export const useFloor = () => {
  const context = useContext(FloorContext);
  if (!context) {
    throw new Error("useFloor must be used within a FloorProvider");
  }
  return context;
};

// Provider komponenti
export const FloorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [floor, setFloor] = useState(1);

  return (
    <FloorContext.Provider value={[floor, setFloor]}>
      {children}
    </FloorContext.Provider>
  );
};
