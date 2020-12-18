import React, { useState, useContext, createContext, useReducer } from "react";

export const GlobalContext = createContext({});

const initialState = {
  transactions: [
    {
      id: "0",
      value: -25,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    },
    {
      id: "1",
      value: 500,
      title: "Salary",
      description: "Paycheck recived Every week",
      date: "July, 15"
    },
    {
      id: "2",
      value: 100,
      title: "Transport",
      description: "Fly tiket to LA",
      date: "July, 20"
    },
    {
      id: "3",
      value: -25,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    },
    {
      id: "4",
      value: -25,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    },
    {
      id: "5",
      value: -25,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    },
    {
      id: "6",
      value: -25,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    },
    {
      id: "7",
      value: -25,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    },
    {
      id: "8",
      value: -25,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    },
    {
      id: "9",
      value: -25,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    },
    {
      id: "10",
      value: -25,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    },
    {
      id: "11",
      value: 2500,
      title: "Bread",
      description: "Bought for breakfast",
      date: "July, 2"
    }
  ]
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
