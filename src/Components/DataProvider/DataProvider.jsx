import React, { createContext, useContext, useReducer } from "react";

// Create context
export const DataContext = createContext();

// Provider component
export const DataProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Provide [state, dispatch] as an array for easy destructuring
  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook (optional)
export function useData() {
  return useContext(DataContext);
}
