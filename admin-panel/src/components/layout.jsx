import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";


const Layout = ({children}) => {
    console.log("Layout rendered",children);  
    return (
        <div className="flex">
            <div className="max-w-64">

            <Sidebar/>
            </div>
            <div className="flex-1 p-6  min-h-screen">
                {children}
            </div>
        </div>
    )
};

export default Layout;