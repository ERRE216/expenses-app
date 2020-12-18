import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";

import { GlobalContext } from "../../context/globalContext";

function Total() {
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
    <View style={styles.content}>
      {/* <Text style={styles.text}>Total</Text> */}
      <Text style={[styles.totalAmount]}>{total} $</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  //   total: {
  //     backgroundColor: "#0F4C75",
  //     marginHorizontal: 15,
  //     marginTop: 20,
  //     padding: 25,
  //     borderRadius: 0
  //   },
  text: {
    color: "#020B11",
    fontSize: 20,
    fontWeight: "700"
  },
  content: {
    padding: 10,
    marginHorizontal: 30,
    marginBottom: 5
  },
  totalAmount: {
    fontSize: 40,
    textAlign: "center",
    paddingVertical: 25,
    color: "white",
    fontWeight: "100"
  }
});
export default Total;
