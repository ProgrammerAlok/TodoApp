import { useEffect, useState } from 'react';
import { AuthContext } from "./AuthContext";
import { axiosInstnce, endpoints } from '../utils/axiosInstance';
import { LinearProgress } from '@mui/material';


const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null)

  async function handleGetUser () {
    setIsLoading(true);
    try {
      const res = await axiosInstnce.get(endpoints.auth.me);
      const { data, success } = res.data;
      if(success){
        setUser(data);
      }
    } catch (error) {
      // console.log(error)
    } finally {
      setIsLoading(false)
    }
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
      {isLoading && (<LinearProgress />)}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider