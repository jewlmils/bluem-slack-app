import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChatList, ChannelList, Sidebar } from "@";
import { ErrorPage } from "@pages";

function Dashboard() {
  return (
    <main>
      <Sidebar />
      <Routes>
        <Route path="chat/*" element={<ChatList />} />
        <Route path="channel/*" element={<ChannelList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  );
}

export default Dashboard;
