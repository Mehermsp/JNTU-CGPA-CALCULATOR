import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SiteFooter from "./SiteFooter";

const icons = {
    dashboard: (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    ),
    calculator: (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="12" y2="14" />
            <line x1="8" y1="18" x2="12" y2="18" />
        </svg>
    ),
    sgpa: (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    ),
    cgpa: (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    profile: (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    logout: (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    ),
    menu: (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    ),
};

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    const closeSidebar = () => setSidebarOpen(false);

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: icons.dashboard },
        { path: "/calculator", label: "Calculator", icon: icons.calculator },
        { path: "/sgpa", label: "SGPA", icon: icons.sgpa },
        { path: "/cgpa", label: "CGPA", icon: icons.cgpa },
        { path: "/profile", label: "Profile", icon: icons.profile },
    ];

    return (
        <div className="layout">
            <div
                className={`overlay${sidebarOpen ? " show" : ""}`}
                onClick={closeSidebar}
            />
            <aside
                className={`sidebar${sidebarOpen ? " open" : ""}`}
                tabIndex={-1}
                aria-hidden={!sidebarOpen}
            >
                <div className="sidebar-logo">
                    <h2>JNTU CGPA</h2>
                    <p>R20 Regulation Calculator</p>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-item${isActive ? " active" : ""}`
                            }
                            onClick={closeSidebar}
                            tabIndex={sidebarOpen ? 0 : -1}
                        >
                            {item.icon} {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="sidebar-bottom">
                    <div style={{ padding: "8px 14px", marginBottom: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                            {user?.name}
                        </div>
                        <div
                            style={{ fontSize: 12, color: "var(--text-muted)" }}
                        >
                            {user?.rollNumber || user?.email}
                        </div>
                    </div>
                    <button
                        className="nav-item"
                        onClick={handleLogout}
                        style={{ color: "var(--danger)" }}
                        tabIndex={sidebarOpen ? 0 : -1}
                    >
                        {icons.logout} Logout
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <div className="top-bar">
                    <button
                        className="hamburger"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                        style={{ display: "none" }}
                    >
                        {icons.menu}
                    </button>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>
                        JNTU CGPA
                    </span>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                        {user?.name}
                    </span>
                </div>
                <div className="page-content">
                    <Outlet />
                </div>
                <SiteFooter />
            </main>
        </div>
    );
}
