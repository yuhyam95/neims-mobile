import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import apiClient from '../service/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error getting user from AsyncStorage:', error);
      }
    };

    getUserFromStorage();
  }, []);

  const login = async (userId) => {
    try {
      const userDetailsResponse = await apiClient.get(`/user/${userId}`);
      const userData = userDetailsResponse.data;
      setUser(userData);

      // Save user data to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const logout = () => {
    // Remove user data from AsyncStorage
    AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
