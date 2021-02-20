import React, { useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";

import { GlobalContext } from "../../context/globalContext";

import TransactionItem from "./TransactionItem";

const transactionsByWeeks = (transactions, dateRange) => {
  const transactionsInRange = [];

  const dateForRange = new Date(dateRange);

  transactions.map((t) => {
    const month = new Date(t.date).getMonth();
    const year = new Date(t.date).getFullYear();

    const monthR = dateForRange.getMonth();
    const yearR = dateForRange.getFullYear();

    if (year === yearR) {
      if (month === monthR) {
        transactionsInRange.push(t);
      }
    }
  });

  let sections = [
    { title: "Week 1", data: [] },
    { title: "Week 2", data: [] },
    { title: "Week 3", data: [] },
    { title: "Week 4", data: [] },
  ];

  transactionsInRange.map((t) => {
    const date = new Date(t.date);
    if (date.getDate() <= 8) {
      sections[0].data.push(t);
    }
    if (date.getDate() > 8 && date.getDate() <= 16) {
      sections[1].data.push(t);
    }
    if (date.getDate() > 16 && date.getDate() <= 24) {
      sections[2].data.push(t);
    }
    if (date.getDate() > 24 && date.getDate() <= 32) {
      sections[3].data.push(t);
    }
  });

  return sections;
};

function TransactionList(props) {
  const { state, dispatch, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    // transactionsByWeeks(state.transactions);
    // console.log(state.transactions);
  });

  return (
    <View style={styles.listContent}>
      {/* Implements Section Based Transactions */}
      <SectionList
        sections={transactionsByWeeks(state.transactions, props.date)}
        renderItem={({ item }) => <TransactionItem t={item} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    marginHorizontal: 0,
  },
  sectionHeader: {
    backgroundColor: "#eee",
    color: "rgb(100,100,100)",
    fontFamily: "Roboto-Light",
    padding: 3,
    margin: 3,
    paddingLeft: 5,
    borderRadius: 3,
  },
});
export default TransactionList;
