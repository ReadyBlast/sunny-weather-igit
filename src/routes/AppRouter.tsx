import { BrowserRouter as Router, Route, Routes } from "react-router";
import { routes } from "./routes.tsx";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((childRoute, idx) => (
                <Route
                  key={idx}
                  index={childRoute.index}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </Router>
  );
};
