import React, { useContext } from "react";

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { GlobalContext } from "../../../context/globalContext";

function OptionsList(props) {
  const { state } = useContext(GlobalContext);

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          // props.navigation.navigate("Language");
        }}
      >
        <Text style={styles.text}>
          Language -{" "}
          <Text style={{ fontFamily: "Roboto-Thin", color: "grey" }}>
            (Comming Soon)
          </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          props.navigation.navigate("Categories");
        }}
      >
        <Text style={styles.text}>Categories</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.item}
        onPress={() => {
          console.log(state);
        }}
      >
        <Text style={styles.text}>Console Log State</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          props.navigation.navigate("About");
        }}
      >
        <Text style={styles.text}>About</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 20,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "Roboto-Light",
    fontSize: 17,
  },
});

export default OptionsList;
