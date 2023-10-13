import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../api/apiURL";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.init";

export const useUserByEmail = () => {
    const [userData, setUserData] = useState({});
    const [user] = useAuthState(auth);

  useEffect(() => {
    const baseURL = getApiUrl();
    const getUserByEmail = async (email) => {
        try {
            const response = await axios.get(`${baseURL}/users/email`, {
                params: {
                    email: email,
                },
            });
            const { success, data } = response.data;
            if (success) {
                setUserData(data[0]);
                // console.log(data[0]);
            } else {
                console.error("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    if (user) {
        const email = user.email;
        getUserByEmail(email);

    }
  }, [user]);

  return [ userData ];
};
