import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Total from "./components/Total";
import CategoryList from "./components/CategoryList";
import BarChart from "./components/barChart";

import { GlobalContext } from "../context/globalContext";

function mainScreen() {
  const { state, dispatch } = useContext(GlobalContext);
  const [appLoading, setAppLoading] = useState(true);

  return (
    <>
      <Total />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryList title={"Income"} type={"Income"} />
        <CategoryList title={"Expense"} type={"Expense"} />
        <BarChart type='Expense' barTitle='This Month Expenses' />
        <BarChart type='Income' barTitle='This Month Incomes' />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default mainScreen;
