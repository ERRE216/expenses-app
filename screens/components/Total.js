import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";

import { GlobalContext } from "../../context/globalContext";

function Total() {
  const [positive, setPositive] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);
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
        styles.content,
        { backgroundColor: total >= 0 ? "#10A25B" : "#BB262C" }
      ]}
    >
      <Text style={[styles.totalAmount]}>{total} $</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#020B11",
    fontSize: 20
  },
  content: {
    paddingTop: 50
  },
  totalAmount: {
    fontFamily: "Roboto-Light",
    fontSize: 40,
    textAlign: "center",
    paddingVertical: 20,
    color: "white",
    fontWeight: "100"
  }
});
export default Total;
