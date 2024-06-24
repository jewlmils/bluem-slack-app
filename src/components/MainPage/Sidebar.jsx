import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MessageSquare, UsersRound, LogOut } from "lucide-react";

function Sidebar() {
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
              to="/b/chat"
              className={`sidebar-list ${
                selectedButton === "chat" ? "active" : ""
              }`}
              onClick={() => setSelectedButton("chat")}
            >
              <MessageSquare />
            </Link>
          </li>
          <li>
            <Link
              to="/b/channel"
              className={`sidebar-list ${
                selectedButton === "channel" ? "active" : ""
              }`}
              onClick={() => setSelectedButton("channel")}
            >
              <UsersRound />
            </Link>
          </li>
        </ul>
        <div>
          <Link
            to="/"
            className={`logout ${selectedButton === "logout" ? "active" : ""}`}
            onClick={() => {
              handleLogout();
              setSelectedButton("channel");
            }}
          >
            <LogOut />
          </Link>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Sidebar;
