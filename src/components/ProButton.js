import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { toWidth } from "../theme/helpers";
import { useIAPContext } from "../context/IAPContext";
import Typography from "./Typography";
export default function ProButton({ isBlue = true, disable = false }) {
  const { showSubscriptionModal, isPremium } = useIAPContext();

  if (isPremium) {
    return <></>;
  } else {
    return (
      <View>
        <TouchableOpacity
          disabled={disable}
          onPress={() => {
            showSubscriptionModal();
          }}
        >
          <View style={styles.container}>
            <Typography
              color="white"
              size={14}
              weight="600"
              style={{
                marginLeft: toWidth(4),
              }}
            >
              PRO
            </Typography>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: toWidth(12),
    paddingVertical: toWidth(8),
    backgroundColor: "#006CF4",
    borderRadius: 8,
  },
  inputContainer: {
    overflow: "hidden",
    padding: toWidth(1),
    borderRadius: toWidth(100),
  },
});
