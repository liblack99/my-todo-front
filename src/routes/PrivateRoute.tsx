import React, {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux"; // Para acceder al estado global
import {RootState} from "../app/store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
