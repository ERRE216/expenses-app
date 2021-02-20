import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CheckBox = props => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    props.type === props.name ? setActive(true) : setActive(false);
  });

  return (
    <TouchableOpacity
      onPress={() => {
        props.onCheck(props.name);
      }}
      style={[styles.row, styles.box]}
    >
      <View
        style={[
          styles.check,
          active
            ? {
                backgroundColor: "#e91e63"
              }
            : { backgroundColor: "white" }
        ]}
      >
        <MaterialCommunityIcons
          name={"check-circle"}
          size={17}
          color={"white"}
        />
      </View>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  fullSize: {
    flex: 1
  },
  box: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#020B11",
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Roboto-Light"
  },
  check: {
    padding: 3,
    margin: 3,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 3
  }
});
export default CheckBox;
