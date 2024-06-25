import { useState, useEffect } from "react";
import { apiCall } from "./apiCall"; // Assuming apiCall is exported correctly
import { BASE_URL } from "./endpoint";

export function useFetch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await apiCall(BASE_URL + "users", {
          method: "GET",
        });

        setUsers(response.data);
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
