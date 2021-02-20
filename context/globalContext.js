import React, {
  useState,
  useContext,
  createContext,
  useReducer,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GlobalContext = createContext({});

// Object {
//   "date": "12/29/20",
//   "description": "Yxfyf",
//   "id": "0.20248297818180006",
//   "title": "Tyrry",
//   "value": 555,
// },

const initialState = {
  categories: [
    { id: "1", title: "Food", icon: "food", value: 0, type: "Expense" },
    { id: "2", title: "Salary", icon: "briefcase", value: 0, type: "Income" },
    { id: "3", title: "Bussines", icon: "store", value: 0, type: "Income" },
    { id: "4", title: "Car", icon: "car", value: 0, type: "Expense" },
  ],
  transactions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "GET-TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };
    case "ADD-TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE-TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "GET-CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD-CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "DELETE-CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    case "UPDATE-CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === action.payload.category) {
            category.value += parseFloat(action.payload.value);
          }
          return category;
        }),
      };
    default:
      return state;
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
  async function getCategories() {
    try {
      const itemsJson = await AsyncStorage.getItem("categories");
      const items = JSON.parse(itemsJson);
      return items != null
        ? dispatch({ type: "GET-CATEGORIES", payload: items })
        : null;
    } catch (error) {
      console.log(error);
    }
  }

  async function addTransaction(transaction) {
    try {
      dispatch({
        type: "ADD-TRANSACTION",
        payload: transaction,
      });
    } catch (err) {
      console.log(err);
    }
    try {
      dispatch({
        type: "UPDATE-CATEGORY",
        payload: transaction,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function addCategory(category) {
    try {
      dispatch({
        type: "ADD-CATEGORY",
        payload: category,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteTransaction(id) {
    try {
      const deleted = state.transactions.map((t) => {
        if (t.id === id) return t;
      })[0];
      dispatch({
        type: "UPDATE-CATEGORY",
        payload: { ...deleted, value: -deleted.value },
      });
    } catch (err) {
      console.log(err);
    }
    try {
      dispatch({
        type: "DELETE-TRANSACTION",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteCategory(id) {
    try {
      dispatch({
        type: "DELETE-CATEGORY",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getTransactions();
    getCategories();
  }, []);

  useEffect(() => {
    async function save() {
      const transactionsJsonValue = JSON.stringify(state.transactions);
      await AsyncStorage.setItem("transactions", transactionsJsonValue);

      const categoriesJsonValue = JSON.stringify(state.categories);
      await AsyncStorage.setItem("categories", categoriesJsonValue);
    }
    save();
  }, [state]);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        getTransactions,
        addTransaction,
        deleteTransaction,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
