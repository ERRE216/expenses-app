import React, {
  useState,
  useContext,
  createContext,
  useReducer,
  useEffect
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GlobalContext = createContext({});

const initialState = {
  transactions: []
};

function reducer(state, action) {
  switch (action.type) {
    case "GET-TRANSACTIONS":
      return {
        transactions: action.payload
      };
    case "ADD-TRANSACTION":
      return { transactions: [...state.transactions, action.payload] };
    case "DELETE-TRANSACTION":
      return {
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        )
      };
    default:
      throw new Error("Action Invalid");
  }
}

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getTransactions() {
    try {
      const itemsJson = await AsyncStorage.getItem("transactions");
      const items = JSON.parse(itemsJson);
      return items != null
        ? dispatch({ type: "GET-TRANSACTIONS", payload: items })
        : null;
    } catch (error) {
      console.log(error);
    }
  }

  async function addTransaction(transaction) {
    try {
      dispatch({
        type: "ADD-TRANSACTION",
        payload: transaction
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteTransaction(id) {
    try {
      dispatch({
        type: "DELETE-TRANSACTION",
        payload: id
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function save() {
      const jsonValue = JSON.stringify(state.transactions);
      await AsyncStorage.setItem("transactions", jsonValue);
    }
    save();
  }, [state.transactions]);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        getTransactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
