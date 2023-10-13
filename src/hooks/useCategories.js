import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";

export const useCategories = (page, limit, search, status) => {
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const baseURL = getApiUrl();
    const getAllCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/categories`, {
          params: {
            page,
            limit,
            search,
            status,
          },
        });

        const { success, data, totalItem } = response.data;

        if (success) {
          setCategories(data);
          setTotalPages(totalItem);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };
    getAllCategories();
  }, [page, limit, search, status]);

  return [ categories, totalPages, loading ];
};
