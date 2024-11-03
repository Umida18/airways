import { ConfigProvider } from "antd";
import "./App.css";
import HomePage from "./pages/homePage/homePage";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Admins } from "./pages/superAdminPage/admins";
import { Tickets } from "./pages/superAdminPage/tickets";
import { Lines } from "./pages/superAdminPage/lines";
import { useState } from "react";
import { Layout } from "./components/adminLayout";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/admins" />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FFAB08",
          },
        }}
      >
        {/* <Provider store={store}> */}
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/admin/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <Outlet />
                </Layout>
              </ProtectedRoute>
            }
          >
            <Route path="admins" element={<Admins />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="lines" element={<Lines />} />
          </Route>
        </Routes>
        {/* </Provider> */}
        <HomePage />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
