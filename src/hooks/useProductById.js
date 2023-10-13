import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";

export const useProductByID = (id) => {
  const [product, setProduct] = useState();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    
    const baseURL = getApiUrl();
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/products/${id}`);

        const { success, data, totalItem } = response.data;

        if (success) {
          setProduct(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };
    getAllProducts();
    
  }, [id]);

  return [product,loading];
};
