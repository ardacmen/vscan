import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import SvgAsset from "./SvgAsset";
import { toWidth, toHeight, byWidth, byHeight } from "../theme/helpers";

export default function SearchBar({ searchText, setSearchText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={{ flex: 1, marginLeft: toWidth(10) }}
        placeholder="Search"
        placeholderTextColor={"gray"}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <SvgAsset
        name="search"
        style={{
          width: toWidth(20),
          height: toHeight(20),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: toWidth(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    padding: toWidth(10),
  },
});
