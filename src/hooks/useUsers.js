import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";

export const useUsers = (page, limit, search, role) => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const baseURL = getApiUrl();
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/auth/users`, {
          params: {
            page,
            limit,
            search,
            role,
          },
        });

        const { success, users, totalPages } = response.data;

        if (success) {
          setUsers(users);
          setTotalPages(totalPages);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };
    getAllUsers();
  }, [page, limit, search, role]);

  const updateUsers = async () => {
    try {
      const baseURL = getApiUrl();
      setLoading(true);
      const response = await axios.get(`${baseURL}/auth/users`, {
        params: {
          page,
          limit,
          search,
          role,
        },
      });

      const { success, users, totalPages } = response.data;

      if (success) {
        setUsers(users);
        setTotalPages(totalPages);
      } else {
        console.error("Error updating users");
      }
    } catch (error) {
      console.error("Error updating users", error);
    }
    setLoading(false);
  };

  return [users, totalPages, loading, updateUsers];
};
