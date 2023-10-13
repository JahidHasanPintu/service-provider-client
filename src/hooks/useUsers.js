import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";

export const useUsers = (page, limit, search, status) => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const baseURL = getApiUrl();
    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/users`, {
          params: {
            page,
            limit,
            search,
            status,
          },
        });

        const { success, data, totalItem } = response.data;

        if (success) {
          setUsers(data);
          setTotalPages(totalItem);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getAllUsers();
  }, [page, limit, search, status]);

  return [ users, totalPages ];
};
