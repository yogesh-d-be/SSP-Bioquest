import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "./layout";


const PrivateRoute = ({element}) => {
    console.log("private",element)
    const token = useSelector((state) => state.auth.accessToken);
console.log(token,"token")
    if(!token){
        return <Navigate to = "/" replace />;
    };

    return <Layout children={element}/>;
};

export default PrivateRoute;