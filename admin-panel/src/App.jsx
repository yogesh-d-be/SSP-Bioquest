import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { setTokens, clearTokens } from "./redux/authSlice";
import apiInstance from "./interceptors/axios";
import store from "./redux/store";

function App() {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const reauthenticate = async () => {
    //         try {
    //             const response = await apiInstance.post("/admin/refreshaccesstoken", {}, { withCredentials: true });
    //             const { accessToken } = response.data.data;
                
    //             // Update Redux store with the new access token
    //             dispatch(setTokens({ accessToken }));
               
    //         } catch (error) {
    //             console.error("Reauthentication failed:", error.message);
    //             dispatch(clearTokens());
    //         }
    //     };

    //     reauthenticate();
    // }, [dispatch]);

    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
}

export default App;
