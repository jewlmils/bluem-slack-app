import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user-info")
  );

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsLoggedIn(!!localStorage.getItem("user-info"));
    };
    checkAuthentication();
  }, []);

  return isLoggedIn;
};

export default function ProtectedRoute() {
  const isAuth = useAuth();

  return <>{isAuth ? <Outlet /> : <Navigate to="/signin" />}</>;
}
