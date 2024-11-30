import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProButton from "./ProButton";
import Typography from "./Typography";
import { toHeight } from "../theme/helpers";

const PageHeader = ({ title, marginBottomValue = 20, proVisible = true }) => {
  return (
    <View
      style={[
        styles.header,
        {
          marginBottom: toHeight(marginBottomValue),
        },
      ]}
    >
      <Typography color={"black"} size={24} weight="700">
        {title}
      </Typography>
      {proVisible ? <ProButton /> : null}
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
