import "./index.css";
import HomePage from "./pages/homePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { ConfigProvider } from "antd";
import Flights from "./pages/Tickets/Tickets";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#479fe1",
          },
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/flights" element={<Flights />} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
