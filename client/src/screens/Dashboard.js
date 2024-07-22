import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import React from "react";

export const Dashboard = () => {

    

    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}