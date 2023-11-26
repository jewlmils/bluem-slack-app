import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Sidebar } from './Sidebar';
import { ChatList } from './ChatApp/ChatList';
import { ChannelApp } from './ChannelApp/ChannelApp'
import { ErrorPage } from "@/ErrorPage";


export const Dashboard = () => {
    return (
        <main>
            <Sidebar />
            <Routes>
                <Route path="chat/*" element={<ChatList />} />
                <Route path="channel/*" element={<ChannelApp />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </main>
    )
}

