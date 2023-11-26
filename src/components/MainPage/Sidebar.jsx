import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, Outlet } from 'react-router-dom';
import { MessageSquare, UsersRound, LogOut } from 'lucide-react';

export const Sidebar = () => {
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState(null);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            navigate("/");
        }
    };

    return (
        <>
            <nav className="sidebar">
                <ul>
                    <li>
                        <Link
                            to='/dashboard/chat'
                            className={`sidebar-list ${selectedButton === "chat" ? "active" : ""}`}
                            onClick={() => setSelectedButton('chat')}>
                            <MessageSquare />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/dashboard/channel'
                            className={`sidebar-list ${selectedButton === "channel" ? "active" : ""}`}
                            onClick={() => setSelectedButton('channel')}>
                            <UsersRound />
                        </Link>
                    </li>
                </ul>
                <div>
                    <Link
                        to='/'
                        className={`logout ${selectedButton === "logout" ? "active" : ""}`}
                        onClick={() => { handleLogout(); setSelectedButton('channel') }}>
                        <LogOut />
                    </Link>
                </div>
            </nav>
            <div>
                <Outlet />
            </div>
        </>
    );
};
