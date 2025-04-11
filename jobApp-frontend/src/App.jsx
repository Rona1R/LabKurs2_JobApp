import "./App.css";
import { Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import routes from "./routes";
// import "../src/api/axiosConfig";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map((route, index) => {
          const RouteComponent = route.protected
            ? ProtectedRoute
            : route.private
            ? PrivateRoute
            : PublicRoute;
          if (route.layout) {
            const Layout = route.layout; // The layout component
            return (
              <Route
                key={index}
                element={
                  <RouteComponent roles={route.roles}>
                    <Layout />
                  </RouteComponent>
                }
                path={route.path}
              >
                {route.children?.map((childRoute, childIndex) => {
                  const ChildRouteComponent = childRoute.protected
                    ? ProtectedRoute
                    :  childRoute.private
                    ? PrivateRoute
                    : PublicRoute;
                  return (
                    <Route
                      key={childIndex}
                      path={childRoute.path}
                      element={
                        <ChildRouteComponent roles={childRoute.roles}>
                          <childRoute.element />
                        </ChildRouteComponent>
                      }
                    />
                  );
                })}
              </Route>
            );
          } else {
            const Element = route.element; // The page component
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <RouteComponent roles={route.roles}>
                    <Element />
                  </RouteComponent>
                }
              />
            );
          }
        })}
      </Routes>
    </div>
  );
}

export default App;

