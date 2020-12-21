import React, { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Button
} from "react-native";

import { GlobalContext } from "../../context/globalContext";

function TransactionItem(props) {
  const [expanded, setExpanded] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(false);

  const { state, dispatch, deleteTransaction } = useContext(GlobalContext);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.listItem}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <ImageBackground
        source={
          props.t.value >= 0
            ? require("../../assets/bg-green.png")
            : require("../../assets/bg-red.png")
        }
        style={{ flex: 1, flexDirection: "row" }}
        imageStyle={{ borderRadius: 5, width: "100%", height: "100%" }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.listItemHeader}>
            <Text style={styles.text1}>{props.t.title} - </Text>
            <Text style={styles.text2}>{props.t.date}</Text>
          </View>
          <Text style={[styles.amount]}>{props.t.value.toFixed(2)} $</Text>
        </View>
        {expanded ? (
          <View style={styles.options}>
            {/* Delete Icon */}
            <TouchableOpacity
              style={{
                backgroundColor: props.t.value >= 0 ? "#0E8E4E" : "#911E24",
                padding: 5
              }}
              onPress={() => {
                console.log("Sent to Delete", props.t.id);
                deleteTransaction(props.t.id);
              }}
            >
              <MaterialCommunityIcons
                name='trash-can'
                size={20}
                color={"#fff"}
              />
            </TouchableOpacity>

            {/* Info Icon */}
            <TouchableOpacity
              style={{
                backgroundColor: props.t.value >= 0 ? "#0E8E4E" : "#911E24",
                padding: 5
              }}
              onPress={() => {
                setInfoExpanded(!infoExpanded);
              }}
            >
              <MaterialCommunityIcons
                name='information'
                size={20}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </ImageBackground>
      {infoExpanded && expanded ? (
        <View style={styles.infoView}>
          <MaterialCommunityIcons
            name='information'
            size={25}
            color={"#8E8E8E"}
          />
          <Text style={styles.infoDescription}>{props.t.description}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 50
  },

  amount: {
    textAlign: "right",
    textAlignVertical: "center",
    fontSize: 30,
    paddingRight: 25,
    paddingBottom: 5,
    color: "white",
    fontWeight: "100"
  },

  listItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10
  },

  text1: {
    fontSize: 17,
    color: "white"
  },
  text2: {
    fontSize: 15,
    color: "#fff"
  },
  text3: {
    color: "black",
    paddingHorizontal: 50,
    fontSize: 17
  },
  options: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: 10
  },
  infoView: {
    backgroundColor: "#eee",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  infoDescription: {
    flex: 1,
    paddingHorizontal: 10,
    color: "black"
  }
});

export default TransactionItem;
