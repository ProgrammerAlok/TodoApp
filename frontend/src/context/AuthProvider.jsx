import React, { useEffect, useState } from 'react';
import { AuthContext } from "./AuthContext";
import { axiosInstnce, endpoints } from '../utils/axiosInstance';
import { CircularProgress } from '@mui/material';


const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null)

  async function handleGetUser () {
    const res = await axiosInstnce.get(endpoints.auth.me);
    const { data, success } = res.data;
    if(success){
        setUser(data);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  const value = {
    isLoading, setIsLoading,
    user, setUser,
  };

  return (
    <AuthContext.Provider value={value}>
        {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider