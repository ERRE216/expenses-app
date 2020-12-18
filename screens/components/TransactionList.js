import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import { GlobalContext } from "../../context/globalContext";

import TransactionItem from "./TransactionItem";

function TransactionList() {
  const [state, dispatch] = useContext(GlobalContext);

  return (
    <View style={styles.listContent}>
      <Text style={styles.text}>History</Text>
      <FlatList
        data={state.transactions}
        renderItem={({ item }) => <TransactionItem t={item} />}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#020B11",
    fontSize: 15,
    fontWeight: "100",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10
  },
  listContent: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    marginHorizontal: 0
    // borderTopRightRadius: 50,
    // borderTopLeftRadius: 50
  }
});
export default TransactionList;
