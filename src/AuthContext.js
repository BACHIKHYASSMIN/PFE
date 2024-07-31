// AuthContext.js
import React, { createContext, useState, useContext,useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(); 
  const [role, setRole] = useState(null);
  const [image, setImage] = useState(null);
  const [isUpdated, setIsUpdates] = useState(false);
  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté en vérifiant le stockage local
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId'); 
    const storedImage = localStorage.getItem('image'); 

    if (token && storedUserId && userRole && storedImage) {
      setIsConnected(true);
      setIsUpdates(false)
      setUserId(storedUserId);
      setRole(userRole);
      setImage(storedImage);
    }
  }, []);

  const login = ( userId,userRole,userImage) => {
    // Stockez le token et l'ID de l'utilisateur dans le stockage local
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', userRole);
    localStorage.setItem('image', userImage);
    setIsConnected(true);
    setIsUpdates(false)
    setRole(userRole);
    setImage(userImage);
    setUserId(userId); // Définir userId après la connexion
    
  };

  const logout = () => {
    // Supprimez le token du stockage local
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('image');
    setIsConnected(false);
    setIsUpdates(false)
    setRole(null);
    setImage(null);
    setUserId(); // Réinitialiser userId après la déconnexion
  };

   const updateProfileImage = (newImage) => {
    setIsUpdates(true);
    setImage(newImage);
  };

  return (
    <AuthContext.Provider value={{ isConnected, login, logout,userId,role,image,updateProfileImage,isUpdated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
