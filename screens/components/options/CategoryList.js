import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

import { GlobalContext } from "../../../context/globalContext";

import FocusableTextInput from "../FocusableTextInput";

function randomColor() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgb(${r},${g},${b})`;
}

function CategoryList(props) {
  const { state, addCategory, deleteCategory } = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: `${Math.random()}.${Date.now()}`,
    title: "",
    type: "",
    value: 0,
    icon: "",
  });

  function handleFormDataChange(data) {
    setFormData((prevState) => ({
      ...prevState,
      [data.name]: data.text,
    }));
  }

  return (
    <>
      <Button
        title='Add New'
        color='#e91e63'
        accessibilityLabel='Add new category'
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <FlatList
        data={state.categories}
        renderItem={({ item }) => <Category item={item} />}
      ></FlatList>
      <Modal visible={modalVisible} transparent animationType={"fade"}>
        <View style={styles.modal}>
          <View style={styles.card}>
            <View style={styles.modalHeader}>
              <Text style={styles.text}>New Category</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <MaterialCommunityIcons
                  name={"close"}
                  size={30}
                  color={"grey"}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.tag}>Category Name</Text>
            <FocusableTextInput
              placeholder={"Insert Category Name..."}
              name={"title"}
              value={formData.name}
              handleChange={handleFormDataChange}
            />

            <View style={{ maxHeight: 600 }}>
              <Text style={styles.tag}>Category Icon</Text>
              <DropDownPicker
                placeholder='Select an Icon'
                items={IconsArray(IconsList)}
                defaultValue={formData.icon}
                containerStyle={{ height: 40 }}
                searchable={true}
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
                onChangeItem={(item) =>
                  handleFormDataChange({ name: "icon", text: item.value })
                }
                dropDownMaxHeight={150}
              />
              <Text style={styles.tag}>Category Type</Text>
              <DropDownPicker
                placeholder='Select a Type'
                items={[
                  {
                    label: "Income",
                    value: "Income",
                    icon: () => (
                      <MaterialCommunityIcons
                        name={"trending-up"}
                        size={18}
                        color={"grey"}
                      />
                    ),
                  },
                  {
                    label: "Expense",
                    value: "Expense",
                    icon: () => (
                      <MaterialCommunityIcons
                        name={"trending-down"}
                        size={18}
                        color={"grey"}
                      />
                    ),
                  },
                ]}
                defaultValue={formData.type}
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
                onChangeItem={(item) =>
                  handleFormDataChange({ name: "type", text: item.value })
                }
              />
            </View>
            <View style={{ marginTop: 85 }}>
              <Button
                title='Create'
                color='#e91e63'
                accessibilityLabel='Add new category'
                onPress={() => {
                  if (
                    formData.name === "" ||
                    formData.type === "" ||
                    formData.icon === ""
                  ) {
                    return Alert.alert(
                      "Invalid Inputs",
                      " You must fill all the inputs to create a new Track"
                    );
                  }
                  addCategory(formData);
                  setModalVisible(false);
                  setFormData({
                    id: `${Math.random()}.${Date.now()}`,
                    title: "",
                    type: "",
                    value: 0,
                    icon: "",
                  });
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function Category(props) {
  const { state, deleteCategory } = useContext(GlobalContext);
  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <View style={[styles.categoryIcon, { backgroundColor: randomColor() }]}>
          <MaterialCommunityIcons
            name={props.item.icon != undefined ? props.item.icon : "cancel"}
            size={25}
            color={"white"}
          />
        </View>
        <Text style={styles.text}>{props.item.title}</Text>
      </View>
      <View style={styles.row}>
        {/* <TouchableOpacity>
          <MaterialCommunityIcons
            name='pencil-outline'
            size={25}
            color={"black"}
            style={styles.pdh5}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            if (parseFloat(props.item.value) != 0)
              return Alert.alert(
                "Invalid Delete",
                " You cant delete a category that have been used at least once"
              );
            deleteCategory(props.item.id);
          }}
        >
          <MaterialCommunityIcons
            name='trash-can-outline'
            size={25}
            color={"black"}
            style={styles.pdh5}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 35,
  },
  categoryIcon: {
    padding: 5,
    borderRadius: 50,
    color: "white",
    marginRight: 15,
  },
  pdh5: {
    paddingHorizontal: 5,
  },
  row: { flexDirection: "row" },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 17,
  },
  modal: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    width: "70%",
    padding: 25,
    borderRadius: 7,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 25,
    alignItems: "center",
  },
  tag: {
    paddingTop: 7,
    paddingBottom: 3,
    paddingLeft: 5,
    fontFamily: "Roboto-Light",
  },
});

const IconsList = [
  "Briefcase",
  "Tools",
  "Food",
  "Shield",
  "Water",
  "Dog",
  "Cat",
  "Book",
  "Library",
  "Car",
  "School",
  "Bus",
  "Bank",
  "Clock",
  "Pin",
  "Tag",
  "Heart",
  "Pencil",
  "Rocket",
  "Tree",
  "Netflix",
  "Hospital",
  "Brain",
  "Airport",
  "Airballoon",
  "Store",
  "Antenna",
  "Anvil",
  "Application",
  "Baby",
  "Barn",
  "Battery",
  "Bike",
  "Power",
  "Fire",
  "Cupcake",
  "ATM",
  "Ballot",
];

function IconsArray(list) {
  let iconsArray = [];
  const sorted = list.sort();
  sorted.map((i) => {
    iconsArray.push({
      label: i,
      value: i.toLowerCase(),
      icon: () => (
        <MaterialCommunityIcons
          name={i.toLowerCase()}
          size={18}
          color={"grey"}
        />
      ),
    });
  });
  return iconsArray;
}

export default CategoryList;
