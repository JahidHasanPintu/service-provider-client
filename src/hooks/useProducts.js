import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";

export const useProducts = (page, limit, search, brandID, catID, subcatID, sort,offer) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    
    const baseURL = getApiUrl();
    const getAllProducts = async () => {
      setLoading(true);
      try {
        let brandIdString = '';
        let catIdString = '';

        if (Array.isArray(brandID)) {
          brandIdString = brandID.join(',');
        }else{
          brandIdString = brandID;
        }

        if (Array.isArray(catID)) {
          catIdString = catID.join(',');
        }else{
          catIdString = catID;
        }
        const response = await axios.get(`${baseURL}/products`, {
          params: {
            page,
            limit,
            search,
            brand_id:brandIdString,
            cat_id: catIdString,
            subcat_id: subcatID,
            sort,
            offer,
          },
        });

        const { success, data, totalItem } = response.data;

        if (success) {
          setProducts(data);
          setTotal(totalItem);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };
    getAllProducts();
    
  }, [page, limit, search, brandID, catID, subcatID, sort,offer]);

  return [products, total,loading];
};
