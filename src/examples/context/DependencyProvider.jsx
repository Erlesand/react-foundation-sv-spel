import { createContext, useContext, useState } from "react";

let logService;

if (process.env.NODE_ENV === "development") {
  logService = (message) => console.log(`LOG: ${message}`);
} else {
  logService = () => {};
}

const DependencyContext = createContext();

export function DependencyProvider({ children }) {
  const [shouldLog, setShouldLog] = useState(true);

  const value = { shouldLog, setShouldLog, logService };

  return (
    <DependencyContext.Provider value={value}>
      {children}
    </DependencyContext.Provider>
  );
}

export function useDependency() {
  return useContext(DependencyContext);
}
