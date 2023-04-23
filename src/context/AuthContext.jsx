import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(user) {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/auth/register",
        {
          email: user.email,
          password: user.password,
          name: user.name,
        }
      );
      setCurrentUser(response.data.user);
      setLoading(false);
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  async function login(user) {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/auth/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      setCurrentUser(response.data.user);
      setLoading(false);
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  async function logout() {
    try {
      await axios.get(process.env.REACT_APP_API_BASE_URL + "/auth/logout");
      setCurrentUser(null);
      setLoading(false);
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  async function updateCurrentUser() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/user/${currentUser._id}`
      );
      setCurrentUser(response.data.user);
      setLoading(false);
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  useEffect(() => {
    if (!currentUser) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_API_BASE_URL + "/auth/user"
          );
          setCurrentUser(response.data.user);
        } catch (error) {
          // handle error
          console.log(error);
        }
      };
      fetchUser();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  }, [currentUser]);

  const value = {
    loading,
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    updateCurrentUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
