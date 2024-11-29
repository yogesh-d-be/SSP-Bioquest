import { Route, Routes } from "react-router-dom";
import PageRoutes from './routes';
import Layout from "../components/layout";
import PrivateRoute from "../components/privateRouter";

const Router = () => {
 
      const pageRoutes = PageRoutes.map(({ title, path, element, layout }) => {
       
        if (layout) {
            // console.log("ele",element)
          return (
            <Route
              key={title}
              path={path}
              element={<PrivateRoute key={title} path={path} element={element}></PrivateRoute>}
            />
          );
        }

        return <Route key={title} path={`/${path}`} element={element} />;
      });

      return <Routes>{pageRoutes}</Routes>
    
};

export default Router;
