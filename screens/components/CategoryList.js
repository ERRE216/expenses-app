import React, { useContext } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

import CategoryItem from "./CategoryItem";

import { GlobalContext } from "../../context/globalContext";

function randomColor() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgb(${r},${g},${b})`;
}

function total(type, categories) {
  let acc = 0;

  let categoryByType = categories.filter(c => {
    return c.type == type;
  });

  acc = categoryByType.reduce((acc, item) => (acc += item.value), 0);
  return acc;
}

function CategoryList(props) {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>{props.title}</Text>
        <Text style={styles.sectionTitleAmount}>
          {/* {props.type == "Expense" && "-"} */}
          {total(props.type, state.categories).toFixed(2)} $
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={state.categories.filter(c => {
          return c.type == props.type;
        })}
        renderItem={({ item }) => (
          <CategoryItem category={item} randomColor={randomColor} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: "white",
    borderColor: "#e3e3e3",
    borderWidth: 0.5,
    paddingVertical: 10
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "Roboto-Medium"
  },
  sectionTitleAmount: {
    color: "#6d6d6d",
    fontSize: 18,
    fontFamily: "Roboto-Regular"
  },
  sectionHead: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 30,
    justifyContent: "space-between"
  }
});

export default CategoryList;
