import { useState, useEffect } from "react";
import { BASE_URL } from "./endpoint";

function useFetch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const accessToken = localStorage.getItem("access-token");
        const client = localStorage.getItem("client");
        const expiry = localStorage.getItem("expiry");
        const uid = localStorage.getItem("uid");

        if (!accessToken || !client || !expiry || !uid) {
          throw new Error("Authentication tokens are missing.");
        }

        const response = await fetch(BASE_URL + "users", {
          method: "GET",
          headers: {
            "access-token": accessToken,
            client: client,
            expiry: expiry,
            uid: uid,
          },
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          const errorMessage = data ? data.message : "Unknown error";
          throw new Error(
            `Failed to fetch users. Status: ${response.status}. ${errorMessage}`
          );
        }

        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError(`Failed to fetch users. ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}

export default useFetch;
