import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";

export const useProducts = (page, limit, search, category, brand) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    
    const baseURL = getApiUrl();
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/products`, {
          params: {
            page,
            limit,
            search,
            category, 
            brand
          },
        });

        const { success, products, totalItem,totalPages } = response.data;

        if (success) {
          setProducts(products);
          setTotal(totalItem);
          setTotalPages(totalPages);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };
    getAllProducts();
    
  }, [page, limit, search, category,brand]);

  return [products, total,totalPages,loading];
};
