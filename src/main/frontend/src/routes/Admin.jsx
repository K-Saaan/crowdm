import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar'; // Sidebar 경로를 맞춰주세요

const mainStyle = (sidebarOpen) => ({
  marginLeft: sidebarOpen ? 240 : 0,
  transition: 'margin 0.3s',
});

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    const handleDrawerClose = () => {
        setSidebarOpen(false);
    };

    return (
        <div>
            <Sidebar open={sidebarOpen} handleDrawerClose={handleDrawerClose} isAdmin={true} />
            <main style={mainStyle(sidebarOpen)}>
                <Outlet />
            </main>
        </div>
    );
};

export default Admin;