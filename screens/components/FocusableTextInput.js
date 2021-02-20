import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const FocusableTextInput = (props) => {
  const onChanges = (text) => {
    const data = { name: props.name, text };
    props.handleChange(data);
  };

  return (
    <View style={[styles.inputBackground, { flex: props.flex }]}>
      <TextInput
        placeholder={props.placeholder}
        style={[styles.input, props.fullSize ? styles.fullSize : null]}
        keyboardType={props.type}
        multiline={props.multiline ? true : false}
        onChangeText={onChanges}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 6,
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    textAlign: "left",
    textAlignVertical: "center",
  },
  inputBackground: {
    margin: 3,
    width: "auto",
    backgroundColor: "white",
    borderColor: "#e2e2e2",
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "stretch",
  },
  row: {
    width: "100%",
    flexDirection: "row",
  },
  fullSize: {
    flex: 1,
    textAlignVertical: "top",
  },
});
export default FocusableTextInput;
