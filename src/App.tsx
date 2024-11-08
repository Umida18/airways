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
import { Flights } from "./pages/superAdminPage/flights";
import { useState } from "react";
import { Layout } from "./components/adminLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Airplanes } from "./pages/superAdminPage/airplanes";

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
