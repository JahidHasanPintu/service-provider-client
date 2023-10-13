
import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";
import { useUserByEmail } from "./useUserByEmail";

export const useOrders = (page, limit, sortBy, userID) => {
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [userData] = useUserByEmail();

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const baseURL = getApiUrl();
        const getOrderByUser = async () => {
            setLoading(true);
            try {
                if (userData && userData.id) {
                    const response = await axios.get(`${baseURL}/orders/user/${userData.id}`, {
                        params: {
                            page,
                            limit,
                            sortBy,
                        },
                    });

                    const { success, data, totalItem, totalPages } = response.data;

                    if (success) {
                        setOrders(data);
                        setTotalPages(totalPages);
                        setTotalItem(totalItem);
                    } else {
                        console.error("Error fetching data");
                    }
                } else {
                    console.error("Invalid userData or userData.id is not set still waiting");
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
            setLoading(false);
        };

        getOrderByUser();
    }, [page, limit, sortBy, userData]);

    return [orders, totalPages, totalItem,loading];
};
