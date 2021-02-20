import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function LanguageOptionsPanel(props) {
  return (
    <ScrollView>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>ONLY ENGLISH FOR NOW</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 20,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 17,
  },
});

export default LanguageOptionsPanel;
