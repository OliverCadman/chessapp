import { RouterProps } from "../types/router.types";
import { Routes, Route } from "react-router-dom";
import pageRoutes from "../page-routes";

const PageRoutes = () => {
  return (
    <Routes>
      {pageRoutes.map((routeProps: RouterProps, index: number) => {
        const { path, element } = routeProps;
        return <Route path={path} element={element} key={index} />;
      })}
    </Routes>
  );
};

export default PageRoutes;
