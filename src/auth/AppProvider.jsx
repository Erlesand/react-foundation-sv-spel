import { createContext, useContext } from "react";

import useAuth from "./useAuth";

const AppContext = createContext();

export function AppProvider({ children }) {
  const auth = useAuth();

  return <AppContext.Provider value={auth}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
