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
        imageStyle={{ borderRadius: 5 }}
      >
        <View style={styles.listItemHeader}>
          <Text style={styles.text1}>{props.t.title} - </Text>
          <Text style={styles.text2}>{props.t.date}</Text>
        </View>
        <Text
          style={[
            styles.amount,
            { color: props.t.value >= 0 ? "green" : "red" }
          ]}
        >
          {props.t.value.toFixed(2)} $
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 0,
    borderRadius: 50
  },

  amount: {
    textAlign: "right",
    fontSize: 25,
    paddingHorizontal: 10,
    paddingBottom: 5
  },

  listItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10
  },

  text1: {
    fontSize: 17
  },
  text2: {
    fontSize: 15,
    color: "#212121"
  }
});

export default TransactionItem;
