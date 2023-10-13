
import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";

export const useBrands = (page, limit, search, status) => {
  const [brands, setBrands] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const baseURL = getApiUrl();
    const getAllBrands = async () => {
      try {
        const response = await axios.get(`${baseURL}/brands`, {
          params: {
            page,
            limit,
            search,
            status,
          },
        });

        const { success, data, totalItem } = response.data;

        if (success) {
          setBrands(data);
          setTotalPages(totalItem);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getAllBrands();
  }, [page, limit, search, status]);

  return [ brands, totalPages ];
};
