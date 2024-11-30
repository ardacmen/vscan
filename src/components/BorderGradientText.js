import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { APP_SPESIFIC_COLOR } from "../theme";
import Typography from "./Typography";

const BorderGradientText = ({ title }) => {
  return (
    <>
      <LinearGradient
        colors={APP_SPESIFIC_COLOR.linearGradientColor2}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
      >
        <View style={styles.innerContainer}>
          <MaskedView
            style={{ flex: 1, flexDirection: "row", height: 30 }}
            maskElement={
              <View style={styles.maskedViewContainer}>
                <Typography color={APP_SPESIFIC_COLOR.borderGradientTextColor1}>{title}</Typography>
              </View>
            }
          >
            <LinearGradient
              colors={APP_SPESIFIC_COLOR.linearGradientColor2}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 30,
    width: 110,
    borderRadius: 8,
    overflow: "hidden",
  },
  innerContainer: {
    borderRadius: 8,
    flex: 1,
    margin: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  maskedViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BorderGradientText;
