import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import * as StoreReview from "react-native-store-review";
import { useIAPContext } from "../../context/IAPContext";
import { toWidth, toHeight, byWidth, byHeight } from "../../theme/helpers";
import SvgAsset from "../../components/SvgAsset";
import Typography from "../../components/Typography";
import WebViewModal from "../../components/modal/WebViewModal";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingModal from "../../components/LoadingModal";

const Settings = () => {
  const navigation = useNavigation();
  const { restorePurchase, showSubscriptionModal, isPremium } = useIAPContext();
  const [webViewSource, setWebViewSource] = useState(null);
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const termsAndConditionsUrl =
    "https://raw.githubusercontent.com/ardacmen/VScan-Policies/refs/heads/main/terms-of-use";
  const privacyPolicyUrl =
    "https://raw.githubusercontent.com/ardacmen/VScan-Policies/refs/heads/main/privacy-policy";

  const MENU_ITEMS = useMemo(
    () => [
      {
        id: 1,
        name: "Rate Us",
        icon: "likeIcon",
        isChvronVisible: true,
        onPress: () => onPressMenuItem(StoreReview.requestReview),
      },
      {
        id: 3,
        name: "Restore Purchases",
        icon: "ticketIcon",
        isChvronVisible: true,
        onPress: () => onPressMenuItem(restorePurchase),
      },
      {
        id: 5,
        name: "Terms of Use",
        icon: "shieldIcon",
        isChvronVisible: true,
        onPress: () =>
          onPressMenuItem(() => {
            setWebViewSource(termsAndConditionsUrl);
            setIsWebViewVisible(true);
          }),
      },
      {
        id: 4,
        name: "Privacy Policy",
        icon: "document2Icon",
        isChvronVisible: true,
        onPress: () =>
          onPressMenuItem(() => {
            setWebViewSource(privacyPolicyUrl);
            setIsWebViewVisible(true);
          }),
      },
      {
        id: 6,
        name: "Contact Us",
        icon: "email",
        isChvronVisible: true,
        onPress: () =>
          onPressMenuItem(() => {
            setWebViewSource("http://melno.co/contact/");
            setIsWebViewVisible(true);
          }),
      },
    ],
    []
  );

  const onPressMenuItem = (func) => {
    if (func) func();
  };

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Typography size={32} color="#000" weight="700">
            Settings
          </Typography>
        </View>
        {isPremium ? null : (
          <TouchableOpacity onPress={showSubscriptionModal}>
            <View
              style={{
                marginHorizontal: toWidth(16),
                marginVertical: toHeight(16),
                height: byHeight(10),
                backgroundColor: "#fff",
                borderRadius: toHeight(12),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  gap: 20,
                }}
              >
                <SvgAsset
                  name="pro"
                  color={"#006CF4"}
                  style={{ width: toWidth(50), height: toWidth(50) }}
                />
                <Typography center weight={"600"} size={32}>
                  Get Pro
                </Typography>
              </View>
            </View>
          </TouchableOpacity>
        )}

        <Typography
          style={{
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 20,
          }}
        >
          General
        </Typography>
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              style={styles.settingsItemContainer}
            >
              <View style={styles.settingsItemLeft}>
                <SvgAsset
                  name={item.icon}
                  style={styles.itemIcon}
                  color={"black"}
                />
                <Typography size={16} color="#000" weight="500">
                  {item.name}
                </Typography>
              </View>
              {item.isChvronVisible ? (
                <SvgAsset
                  name="rightArrowSettings"
                  style={styles.chevronIcon}
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {isWebViewVisible && (
        <WebViewModal
          close={() => setIsWebViewVisible(false)}
          source={webViewSource}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f3f7",
    marginTop: toHeight(61),
  },
  header: {
    paddingVertical: toHeight(20),
    paddingHorizontal: toWidth(16),
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.6,
  },
  menuSection: {
    backgroundColor: "#fff",
    marginHorizontal: toWidth(16),
    borderRadius: toWidth(12),
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: toWidth(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    paddingVertical: toHeight(10),
  },
  settingsItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: toHeight(20),
    paddingHorizontal: toWidth(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    width: toWidth(20),
    height: toWidth(20),
    marginRight: toWidth(16),
  },
  chevronIcon: {
    width: toWidth(14),
    height: toWidth(14),
    tintColor: "#ccc",
  },
});

export default Settings;
