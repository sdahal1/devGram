import React, {createContext, useContext, useEffect, useState} from 'react'
import {IContextType, IUser} from '@/types/index';
import { getCurrentUser } from '@/lib/appwrite/api';
import {useNavigate} from 'react-router-dom';

export const INITIAL_USER = {
  id: '',
  name:'',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: true,
  isAuthenticated: false,
  setUser: ()=>{},
  setIsAuthneticated: ()=>{},
  checkAuthUser: async ()=>false as boolean,

}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}: {children:React.ReactNode}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthneticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async ()=>{
    try{
      const currentAccount = await getCurrentUser();
      if(currentAccount){
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.name,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        })
        setIsAuthneticated(true)
        return true;
      }
      return false; 
    }catch(error){
      console.log(error)
      return false;
    }finally{
      setIsLoading(false)
    }
  };
  
  useEffect(()=>{
    if(
      localStorage.getItem('cookieFallback')==='[]' ||
      localStorage.getItem('cookieFallback')===null
    ){
      navigate('/sign-in');
    }

    checkAuthUser();
  },[])

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthneticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value = {value}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);