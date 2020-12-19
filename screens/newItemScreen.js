import React, { useState, useContext } from "react";
import { View, StyleSheet, Button, TextInput, Text, Alert } from "react-native";

import { GlobalContext } from "../context/globalContext";

import FocusableTextInput from "./components/FocusableTextInput";

function newItemScreen(props) {
  const [state, dispatch] = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = event => {
    switch (event.name) {
      case "title":
        setTitle(event.text);
        break;
      case "amount":
        setAmount(event.text);
        break;
      case "description":
        setDescription(event.text);
        break;

      default:
        break;
    }
  };

  return (
    <View style={[styles.container, styles.mg10]}>
      <View style={styles.row}>
        <FocusableTextInput
          name='title'
          placeholder='Insert Transaction Title...'
          type='default'
          flex={2}
          handleChange={handleChange}
          multiline={false}
          value={title}
        />
        <FocusableTextInput
          name='amount'
          placeholder='Amount'
          type='numeric'
          flex={1}
          multiline={false}
          handleChange={handleChange}
          value={amount}
        />
      </View>
      <FocusableTextInput
        name='description'
        placeholder='Insert Description...'
        type='default'
        flex={1}
        multiline={true}
        fullSize={true}
        handleChange={handleChange}
        value={description}
      />
      <Button
        title='Add New'
        color='#e91e63'
        accessibilityLabel='Learn more about this purple button'
        onPress={() => {
          const d = new Date(Date.now());
          const dNow = d;
          const transaction = {
            id: Math.random().toString(),
            title,
            value: parseFloat(amount),
            description,
            date: dNow.toLocaleDateString("en-US")
          };

          if (title == "" || amount == "" || description == "")
            return Alert.alert(
              "Invalid Inputs",
              " You must fill all the inputs to create a new Track"
            );
          dispatch({ type: "addTransaction", payload: transaction });
          setTitle("");
          setAmount("");
          setDescription("");

          props.navigation.navigate("Home");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#eeeeee"
  },
  row: {
    width: "100%",
    flexDirection: "row"
  },
  flex2: {
    flex: 2
  },
  mg10: {
    margin: 10
  }
});
export default newItemScreen;
