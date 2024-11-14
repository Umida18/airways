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
import { SuperAdmins } from "./pages/superAdminPage/admins";
import { Tickets } from "./pages/adminPage/tickets";
import { Flights } from "./pages/adminPage/flights";
import { useState } from "react";
import { Layout } from "./components/superAdminLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Airplanes } from "./pages/adminPage/airplanes";
import { AdminLayout } from "./components/adminLayout";
import { Admins } from "./pages/adminPage/admins";
import { Users } from "./pages/adminPage/users";

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
const cache = createCache({ key: "custom" });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 4 * 60 * 1000,
      cacheTime: 0,
      retry: 0,
    },
  },
});
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(5,62,139)",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <CacheProvider value={cache}>
            {/* <Provider store={store}> */}
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route
                path="/superAdmin/"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Layout>
                      <Outlet />
                    </Layout>
                  </ProtectedRoute>
                }
              >
                <Route path="admins" element={<SuperAdmins />} />
              </Route>
            </Routes>{" "}
            <Routes>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AdminLayout>
                      <Outlet />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              >
                <Route path="admins" element={<Admins />} />
                <Route path="users" element={<Users />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="flights" element={<Flights />} />
                <Route path="airplanes" element={<Airplanes />} />
              </Route>
            </Routes>
            {/* </Provider> */}
          </CacheProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
