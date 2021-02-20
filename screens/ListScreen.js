import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TransactionList from "./components/TransactionList";
import { GlobalContext } from "../context/globalContext";

function mainScreen() {
  const { state, dispatch } = useContext(GlobalContext);

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const formateDate = (date) => {
    const dateComponents = new Date(date);
    const dateString = `${dateComponents.getDate()} ${
      dateComponents.toLocaleString("en-US").split(" ")[1]
    } ${dateComponents.getFullYear()}`;
    return dateString;
  };

  const showDatepicker = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  useEffect(() => {
    setShow(false);
  });

  return (
    <>
      <Text style={styles.text}>History</Text>
      <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
        <Text style={styles.text2}>{formateDate(date)}</Text>
        <MaterialCommunityIcons name='chevron-down' size={25} color={"black"} />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='spinner'
          onChange={onChange}
        />
      )}
      <TransactionList date={date} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#020B11",
    fontSize: 15,
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
    fontFamily: "Roboto-Light",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    color: "#020B11",
    fontSize: 15,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 10,
    fontFamily: "Roboto-Light",
  },
});
export default mainScreen;
