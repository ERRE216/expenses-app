import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { GlobalContext } from "../context/globalContext";

import FocusableTextInput from "./components/FocusableTextInput";
import CheckBox from "./components/CheckBox";
import CategoryList from "./components/options/CategoryList";

function newItemScreen(props) {
  const { state, dispatch, addTransaction } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(null);

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onCheck = (name) => {
    setType(name);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const showDatepicker = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  useEffect(() => {
    setShow(false);
  });

  const formateDate = (date) => {
    const dateComponents = new Date(date);
    const dateString = `${dateComponents.getDate()} ${
      dateComponents.toLocaleString("en-US").split(" ")[1]
    } ${dateComponents.getUTCFullYear()}`;
    return dateString;
  };

  const handleChange = (event) => {
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

  function CategoryListArray(list) {
    let ListArray = [];
    list.map((i) => {
      if (i.type.toLowerCase() === type.toLowerCase()) {
        ListArray.push({
          label: i.title,
          value: i.id,
          icon: () => (
            <MaterialCommunityIcons name={i.icon} size={18} color={"grey"} />
          ),
        });
      }
    });
    return ListArray;
  }

  return (
    <View style={[styles.container, styles.mg10]}>
      <Text style={styles.text}>New Item</Text>
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
          type='decimal-pad'
          flex={1}
          multiline={false}
          handleChange={handleChange}
          value={amount}
        />
      </View>
      <View style={[styles.row, styles.pdh]}>
        <Text style={styles.text}>Type: </Text>
        <CheckBox
          title={"Expense"}
          name={"expense"}
          onCheck={onCheck}
          type={type}
        />
        <CheckBox
          title={"Income"}
          name={"income"}
          onCheck={onCheck}
          type={type}
        />
      </View>
      <View style={[styles.row, styles.pdh]}>
        <Text style={styles.text}>Date: </Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
          <Text style={styles.text2}>{formateDate(date)}</Text>
          <MaterialCommunityIcons
            name='chevron-down'
            size={25}
            color={"black"}
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            is24Hour={false}
            display='default'
            onChange={onChange}
          />
        )}
      </View>
      <View style={[styles.row, styles.pdh]}>
        <Text style={styles.text}>Category: </Text>
        <View style={{ width: "50%" }}>
          <DropDownPicker
            placeholder='Select a Category'
            items={CategoryListArray(state.categories)}
            defaultValue={category}
            containerStyle={{ height: 40 }}
            style={{
              fontSize: 15,
              fontFamily: "Roboto-Regular",
              textAlign: "left",
              textAlignVertical: "center",
            }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => {
              setCategory(item.value);
            }}
          />
        </View>
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
        accessibilityLabel='Add new transaction'
        onPress={() => {
          const d = new Date(date);
          const transaction = {
            id: `${Math.random()}.${Date.now()}`,
            title,
            value: parseFloat(type === "expense" ? -amount : amount),
            description:
              description == "" ? "No given description" : description,
            date: d,
            category: category,
          };

          if (title == "" || amount == "" || category == "")
            return Alert.alert(
              "Invalid Inputs",
              "You must fill all the inputs to create a new category"
            );
          addTransaction(transaction);
          props.navigation.navigate("Home");
          setTitle("");
          setAmount("");
          setCategory(null);
          setDescription("");
          setDate(new Date(Date.now()));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pdh: {
    paddingHorizontal: 25,
  },
  flex2: {
    flex: 2,
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
  mg10: {
    margin: 10,
  },
});
export default newItemScreen;
