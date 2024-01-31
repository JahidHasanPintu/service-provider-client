import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";

export const useProducts = (page, limit, search, category, brand) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [productOnCurrentPage, setProductOnCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

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
            brand,
          },
        });

        const { success, products, totalItem, productsOnCurrentPage, totalPages } = response.data;

        if (success) {
          setProducts(products);
          setTotal(totalItem);
          setTotalPages(totalPages);
          setProductOnCurrentPage(productsOnCurrentPage);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };
    getAllProducts();
  }, [page, limit, search, category, brand]);

  const updateProducts = async () => {
    try {
      const baseURL = getApiUrl();
      setLoading(true);
      const response = await axios.get(`${baseURL}/products`, {
        params: {
          page,
          limit,
          search,
          category,
          brand,
        },
      });

      const { success, products, totalItem, productsOnCurrentPage, totalPages } = response.data;

      if (success) {
        setProducts(products);
        setTotal(totalItem);
        setTotalPages(totalPages);
        setProductOnCurrentPage(productsOnCurrentPage);
      } else {
        console.error("Error updating products");
      }
    } catch (error) {
      console.error("Error updating products", error);
    }
    setLoading(false);
  };

  return [products, total, totalPages, productOnCurrentPage, loading, updateProducts];
};
