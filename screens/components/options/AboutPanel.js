import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function AboutPanel(props) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>
        Hello if you are here you are interested in knowing more About Us. This
        app was developed with the scope of help you mange your monthly expenses
        so you can track the money in your pocket. Hope you Enjoy!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 20,
  },
  text: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto-Light",
    fontSize: 17,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default AboutPanel;
