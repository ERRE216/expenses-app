import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import Total from "./components/Total";
import TransactionList from "./components/TransactionList";

import { GlobalContext } from "../context/globalContext";

function mainScreen() {
  const [positive, setPositive] = useState(false);
  const [state, dispatch] = useContext(GlobalContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const amount = state.transactions.map(t => t.value);
    const t = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
    setTotal(prevState => t);
    setPositive(() => t >= 0);
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: total >= 0 ? "#10A25B" : "#BB262C"
        }
      ]}
    >
      <Total />
      <TransactionList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  }
});
export default mainScreen;
