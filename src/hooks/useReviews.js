import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";

export const useReviews = (id) => {
  const [reviews, setReviews] = useState();
  const [revLoading,setRevLoading] = useState(false);

  useEffect(() => {
    
    const baseURL = getApiUrl();
    const getAllReviews = async () => {
      setRevLoading(true);
      try {
        const response = await axios.get(`${baseURL}/reviews/product/${id}`);

        const { success, data } = response.data;

        if (success) {
          setReviews(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setRevLoading(false);
    };
    getAllReviews();
    
  }, [id]);

  return [reviews,revLoading];
};
