import { useState, useEffect } from 'react';

const apiEndPoint = "http://206.189.91.54/api/v1/";

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(apiEndPoint + 'users', {
          method: "GET",
          headers: {
            "access-token": localStorage.getItem("access-token"),
            client: localStorage.getItem("client"),
            expiry: localStorage.getItem("expiry"),
            uid: localStorage.getItem("uid"),
          },
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          const errorMessage = data ? data.message : "Unknown error";
          throw new Error(`Failed to fetch users. Status: ${response.status}. ${errorMessage}`);
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
};


