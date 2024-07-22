import React from "react";
import { Outlet } from "react-router-dom";
import { Home } from "../components/Home";

export const HomePage = () => {

    return (
        <div>
            <Home />
            <Outlet />
        </div>

    );
};