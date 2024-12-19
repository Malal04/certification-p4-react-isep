import { Route as InternalRouteInterface } from "./interfaces";
import { Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { ReactNode } from "react";
import WrapperComponent from "./shared/components/WrapperComponent";

function App() {

  // La liste des routes est définie dans le fichier "routes/routes.ts"
  
  const getRoutes = (allRoutes: InternalRouteInterface[]) =>
    allRoutes.map((route) => {
      if (route.route) {
        return (
          <Route
            path={route.route}
            element={<WrapperComponent title={route.name} component={route.component as ReactNode} auth={route?.authGuard} routeKey={route.key}  />}
            key={route.key}
          />
        );
      }

      return null;
    });
  return (
    <>
      <Routes>{getRoutes(routes)}</Routes>
    </>
  );
}

export default App;
