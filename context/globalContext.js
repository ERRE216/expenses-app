import React, { useState, useContext, createContext, useReducer } from "react";

export const GlobalContext = createContext({});

const initialState = {
  transactions: []
};

function reducer(state, action) {
  switch (action.type) {
    case "addTransaction":
      return { transactions: [...state.transactions, action.payload] };
    default:
      throw new Error("Action Invalid");
  }
}

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
