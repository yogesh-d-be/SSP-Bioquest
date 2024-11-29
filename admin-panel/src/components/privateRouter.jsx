import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "./layout";
import store from "../redux/store";


const PrivateRoute = ({element}) => {
    // console.log("private",element)
    const token = useSelector((state) => state.auth.accessToken);
    // console.log("uuutt",store.getState().auth.accessToken)

// console.log(token,"token")
    if(!token){
        // console.log("navigate")
        return <Navigate to = "/" replace />;
    };

    return <Layout children={element}/>;
};

export default PrivateRoute;