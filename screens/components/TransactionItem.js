import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";

function TransactionItem(props) {
  return (
    <TouchableOpacity style={styles.listItem}>
      <ImageBackground
        source={
          props.t.value >= 0
            ? require("../../assets/bg-green.png")
            : require("../../assets/bg-red.png")
        }
        style={{ flex: 1 }}
        imageStyle={{ borderRadius: 5, width: "100%", height: "100%" }}
      >
        <View style={styles.listItemHeader}>
          <Text style={styles.text1}>{props.t.title} - </Text>
          <Text style={styles.text2}>{props.t.date}</Text>
        </View>
        <Text style={[styles.amount]}>{props.t.value.toFixed(2)} $</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 50
  },

  amount: {
    textAlign: "right",
    textAlignVertical: "center",
    fontSize: 30,
    paddingRight: 25,
    paddingBottom: 5,
    color: "white",
    fontWeight: "100"
  },

  listItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10
  },

  text1: {
    fontSize: 17,
    color: "white"
  },
  text2: {
    fontSize: 15,
    color: "#fff"
  }
});

export default TransactionItem;
