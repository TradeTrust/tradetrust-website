import React, { createContext, ReactChildren, useContext } from "react";
import { magic } from "../helpers";
import { NETWORK } from "../../../config";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (email: string) => Promise<void | null | string> | ReturnType<typeof magic.auth.loginWithMagicLink>;
  logout: () => Promise<void | boolean> | ReturnType<typeof magic.user.logout>;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: async () => new Promise((resolve) => resolve()),
  logout: async () => new Promise((resolve) => resolve()),
});

export const AuthProvider: any = ({ children }: { children: ReactChildren }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const login = async (email: string) => {
    // needs error handling here
    // better to defer error handling to another function
    if (NETWORK !== "local") {
      await magic.auth.loginWithMagicLink({ email });
    }

    setIsLoggedIn(true);
  };

  const logout = async () => {
    // needs error handling
    await magic.user.logout();
    setIsLoggedIn(false);
  };

  React.useLayoutEffect(() => {
    // eagerly check if user is already logged in
    const execute = async () => {
      // needs error handling here
      const status = await magic.user.isLoggedIn();
      setIsLoggedIn(status);
    };
    execute();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextProps => useContext<AuthContextProps>(AuthContext);
