import { View, StyleSheet } from "react-native";
import React from "react";
import Button from "../../Button";
import Typography from "../../Typography";
import { COLOR } from "../../../theme";
import { toHeight, toWidth } from "../../../theme/helpers";
import { useAppContext } from "../../../context/AppContext";

const getItems = (setVisibleWebView, restoreSubscription) => {
  return [
    {
      title: "Terms of Use",
      onPress: () =>
        setVisibleWebView(
          "https://raw.githubusercontent.com/ardacmen/ai-tattoo-generator-policies/main/terms-ol-use"
        ),
    },
    {
      title: "Privacy Policy",
      onPress: () =>
        setVisibleWebView(
          "https://raw.githubusercontent.com/ardacmen/ai-tattoo-generator-policies/main/privacy-policy"
        ),
    },
  ];
};

export default function SubscriptionFooter({ setVisibleWebView, restoreSubscription }) {
  return (
    <View style={styles.container}>
      {getItems(setVisibleWebView, restoreSubscription).map((item, index) => {
        return (
          <React.Fragment key={item.title}>
            <Button onPress={item.onPress}>
              <Typography size={8} weight="200" center color={COLOR.grayLight}>
                {item.title}
              </Typography>
            </Button>
            {index !== getItems().length - 1 && (
              <Typography
                key={item.title + index + "separator"}
                size={8}
                weight="200"
                style={{ marginHorizontal: toWidth(12) }}
                center
                color={COLOR.grayLight}
              >
                |
              </Typography>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: toHeight(10),
  },
});
