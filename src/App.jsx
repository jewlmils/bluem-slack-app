import React from "react";
import './style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/LandingPage';
import { SignUp } from "@/SignIn_SignUp/SignUp";
import { SignIn } from "@/SignIn_SignUp/SignIn";
import { Dashboard } from "@/MainPage/Dashboard";
import { ErrorPage } from "./components/ErrorPage";
import { ProtectedRoutes } from "@utils/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard/*" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App
