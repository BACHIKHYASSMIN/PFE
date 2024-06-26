// AuthContext.js
import React, { createContext, useState, useContext,useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(); 

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté en vérifiant le stockage local
    const token = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId'); 
    if (token && storedUserId) {
      setIsConnected(true);
      setUserId(storedUserId);
    }
  }, []);

  const login = ( userId) => {
    // Stockez le token et l'ID de l'utilisateur dans le stockage local
    localStorage.setItem('userId', userId);
    setIsConnected(true);
    setUserId(userId); // Définir userId après la connexion
    
  };

  const logout = () => {
    // Supprimez le token du stockage local
    localStorage.removeItem('authToken');
    setIsConnected(false);
    setUserId(); // Réinitialiser userId après la déconnexion
  };

  return (
    <AuthContext.Provider value={{ isConnected, login, logout,userId}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
