import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CategoryItem(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.textHeader}>{props.category.title}</Text>
        <View
          style={[
            styles.categoryIcon,
            { backgroundColor: props.randomColor() },
          ]}
        >
          <MaterialCommunityIcons
            name={
              props.category.icon != undefined ? props.category.icon : "cancel"
            }
            size={25}
            color={"white"}
          />
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.textLight}>Balance</Text>
        <Text style={styles.amountText}>
          {parseFloat(props.category.value).toFixed(2)} $
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 7,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    elevation: 5,
  },
  cardHeader: {
    backgroundColor: "#fdfdfd",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    padding: 30,
    paddingVertical: 15,
    // shadowColor: "black",
    // shadowRadius: 5,
    // shadowOffset: { width: 0, height: 3 },
    // elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#efefef",
    borderWidth: 1,
  },
  cardBody: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  textHeader: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  textLight: {
    fontSize: 15,
    color: "grey",
    paddingRight: 70,
    fontFamily: "Roboto-Thin",
  },
  amountText: {
    fontSize: 20,
    fontFamily: "Roboto-Light",
  },
  categoryIcon: {
    padding: 5,
    borderRadius: 50,
    color: "white",
  },
});

export default CategoryItem;
