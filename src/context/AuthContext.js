import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCurrentUser,
  loginUser as loginUserStorage,
  logoutUser as logoutUserStorage,
  registerUser as registerUserStorage,
} from '../utils/storage';
import { hashPassword } from '../utils/hash';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setLoading(false);
    })();
  }, []);

  const register = async (username, password) => {
    const passwordHash = await hashPassword(password);
    const result = await registerUserStorage(username, passwordHash);
    return result;
  };

  const login = async (username, password) => {
    const passwordHash = await hashPassword(password);
    const result = await loginUserStorage(username, passwordHash);
    if (result.success) {
      setCurrentUser(result.username);
    }
    return result;
  };

  const logout = async () => {
    await logoutUserStorage();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
