import { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider to provide authUser to your app
export const AuthContextProvider = ({ children }) => {
  // State to hold the authUser, loaded from localStorage or set to null
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("chat-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Effect to listen for changes in the authUser state and persist to localStorage
  useEffect(() => {
    if (authUser) {
      // Save the user object to localStorage when the user is set
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      // Remove user data from localStorage when no user is set (e.g., on logout)
      localStorage.removeItem("chat-user");
    }
  }, [authUser]);

  // Return the context provider with the authUser and setAuthUser function
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
