import axios from 'axios';
import { login, logout } from './authActions'; // Import Redux actions for authentication

// Action to handle user login
export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // If login is successful, dispatch the login action with user data
        dispatch(login(response.data)); // Assuming that response.data contains user information
        console.log('Login successful');
        // You can perform a redirect or other actions here upon successful login.
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Login failed');
      console.error('Login error:', error);
    }
  };
};

// Action to fetch user information (if needed)
export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseURL}/auth/userinfo`);
      if (response.status === 200) {
        // Dispatch an action to update the user information in the Redux store
        dispatch(login(response.data));
      } else {
        // Handle the case when user information cannot be fetched
        console.log('Unable to fetch user information');
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };
};

// Action to log the user out
export const logoutUser = () => {
  return async (dispatch) => {
    try {
      // Perform any necessary logout logic, such as clearing tokens or sessions
      // ...

      // Dispatch the logout action to update the Redux store
      dispatch(logout());
      console.log('Logout successful');
      // You can perform a redirect or other actions here upon successful logout.
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
};
