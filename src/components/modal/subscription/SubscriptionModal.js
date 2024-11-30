import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { PRO_FEATURES } from "../../../constants/constants";
import { toHeight, toWidth } from "../../../theme/helpers";
import SvgAsset from "../../../components/SvgAsset";
import Typography from "../../../components/Typography";
import LoadingModal from "../../../components/LoadingModal";
import { useIAPContext } from "../../../context/IAPContext";
import WebViewModal from "../../../components/modal/WebViewModal";

export default function SubscriptionModal({ isOpen, setIsOpen }) {
  const [selectedPackage, setSelectedPackage] = useState("weekly");
  const { products, subscribe, restorePurchase } = useIAPContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [discount, setDiscount] = useState();
  const [webViewSource, setWebViewSource] = useState(null);
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);

  const onSubmit = async () => {
    setIsProcessing(true);
    const packageIdentifier =
      selectedPackage == "weekly"
        ? products?.subscription?.weekly?.product?.identifier
        : products?.subscription?.annual?.product?.identifier;

    if (packageIdentifier) {
      await subscribe(packageIdentifier, onSuccessfulPurchase, onPurchaseError);
    } else {
      console.error("Package identifier is not available");
      setIsProcessing(false);
    }
  };

  const onRestore = async () => {
    setIsProcessing(true);
    await restorePurchase();
    setIsProcessing(false);
    setIsOpen(false);
  };

  const onSuccessfulPurchase = async () => {
    setIsProcessing(false);
    setIsOpen(false);
    Alert.alert("Welcome!", "Welcome to the Funny Emoji Pro!");
  };

  const onPurchaseError = (err) => {
    setIsProcessing(false);
    setIsOpen(false);
    console.error(err);
  };

  const navigateBack = () => {
    setIsOpen(false);
  };

  const getValueFromSubscription = (type, key) => {
    return products?.subscription?.[type]?.product?.[key];
  };

  const monthlyDiscountPercent = useMemo(() => {
    if (products?.subscription?.weekly) {
      const weeklyPrice = getValueFromSubscription("weekly", "price");
      const yearlyPrice = getValueFromSubscription("annual", "price");
      const yearlyPerWeek = yearlyPrice / 52;

      if (weeklyPrice && yearlyPrice) {
        const discount = Math.round((1 - yearlyPerWeek / weeklyPrice) * 100);
        return discount;
      }
    }
    return 0;
  }, [products]);

  useEffect(() => {
    setDiscount(monthlyDiscountPercent);
  }, [monthlyDiscountPercent]);

  const BOTTOM_ITEMS = [
    {
      title: "Terms",
      onPress: () => {
        setWebViewSource(
          "https://raw.githubusercontent.com/ardacmen/VScan-Policies/refs/heads/main/terms-of-use"
        ),
          setIsWebViewVisible(!isWebViewVisible);
      },
    },
    {
      title: "Privacy Policy",
      onPress: () => {
        setWebViewSource(
          "https://raw.githubusercontent.com/ardacmen/VScan-Policies/refs/heads/main/privacy-policy"
        ),
          setIsWebViewVisible(!isWebViewVisible);
      },
    },
    {
      title: "Restore",
      onPress: onRestore,
    },
  ];

  return (
    <>
      {isProcessing && <LoadingModal />}
      <Modal
        visible={isOpen && !isProcessing}
        style={{ width: "100%", height: "100%" }}
        transparent={false}
        animationType="slide"
      >
        <View style={{ width: "100%", height: "100%" }}>
          <SafeAreaView>
            <View
              style={{
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <TouchableOpacity onPress={navigateBack}>
                  <SvgAsset
                    color={"black"}
                    name="close"
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
                <View style={styles.downSideCard}>
                  <View style={styles.titleContainer}>
                    <Typography color="black" size={32} center weight="900">
                      Scan Text{"\n"}in a second
                    </Typography>
                  </View>
                  <View>
                    <Typography
                      color="black"
                      size={16}
                      weight="600"
                      center
                      style={styles.marginTop8}
                    >
                      Unlock All Features With Pro
                    </Typography>
                  </View>
                  <View style={styles.featureContainer}>
                    <View style={styles.featureList}>
                      {PRO_FEATURES.map((feature, index) => (
                        <View key={index} style={styles.containerFeature}>
                          <SvgAsset
                            name="featuredMark"
                            color={"black"}
                            style={styles.featureIcon}
                          />
                          <Typography color="black" size={18} weight="600">
                            {feature.feature}
                          </Typography>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                <View className="absolute left-4 right-4 bottom-0 ">
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPackage("weekly");
                    }}
                  >
                    <View style={styles.alignCenter}>
                      <View
                        style={
                          selectedPackage == "annual"
                            ? styles.unSelectedPackageView
                            : styles.selectedPackageView
                        }
                      >
                        <View style={styles.packageView}>
                          <SvgAsset
                            color={"black"}
                            name={
                              selectedPackage == "annual"
                                ? "unSelectedPackage"
                                : "selectedPackage"
                            }
                            width={24}
                            height={24}
                          />
                          <View style={styles.packageTextContainer}>
                            <Typography size={15} weight="500" color="#000">
                              Weekly Subscription
                            </Typography>
                            <Typography size={14} weight="500" color={"black"}>
                              {getValueFromSubscription(
                                "weekly",
                                "priceString"
                              )}
                              /week
                            </Typography>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPackage("annual");
                    }}
                  >
                    <View style={[styles.alignCenter, styles.marginTop10]}>
                      <View
                        style={
                          selectedPackage == "annual"
                            ? styles.selectedPackageView
                            : styles.unSelectedPackageView
                        }
                      >
                        <View style={styles.flexRowSpaceBetween}>
                          <View style={styles.packageView}>
                            <SvgAsset
                              color={"black"}
                              name={
                                selectedPackage == "annual"
                                  ? "selectedPackage"
                                  : "unSelectedPackage"
                              }
                              width={24}
                              height={24}
                            />
                            <View style={styles.packageTextContainer}>
                              <Typography size={16} weight="500" color={"#000"}>
                                Annual Subscription
                              </Typography>
                              <Typography
                                size={14}
                                weight="500"
                                color={"black"}
                              >
                                {getValueFromSubscription(
                                  "annual",
                                  "priceString"
                                )}
                                /Annual`
                              </Typography>
                            </View>
                          </View>
                          <View style={styles.saveRateLabel}>
                            <Typography
                              size={10}
                              weight="700"
                              color="white"
                              center
                            >
                              Save {discount}%
                            </Typography>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onSubmit}
                    style={styles.unlockProButton}
                  >
                    <Typography color="white" size={20} weight="600" center>
                      Continue
                    </Typography>
                  </TouchableOpacity>
                  <View>
                    <Typography
                      color="#92959E"
                      size={12}
                      weight="600"
                      center
                      style={styles.marginTop6}
                    >
                      Subscription can be cancelled at any time
                    </Typography>
                    <View style={styles.bottomLinksContainer}>
                      {BOTTOM_ITEMS.map((item, index) => (
                        <View style={styles.flexRow} key={index}>
                          <TouchableOpacity onPress={item.onPress}>
                            <Typography
                              size={12}
                              color="#92959E"
                              weight="600"
                              center
                            >
                              {item.title}
                            </Typography>
                          </TouchableOpacity>
                          {index !== 2 ? (
                            <Text style={styles.separator}>|</Text>
                          ) : null}
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
          {isWebViewVisible && (
            <WebViewModal
              close={() => setIsWebViewVisible(false)}
              source={webViewSource}
            />
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerFeature: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: toHeight(12),
    width: "100%",
  },
  container: {
    flex: 1,
  },
  buttonContaimer: {
    paddingTop: toHeight(20),
    paddingBottom: toHeight(20),
    borderRadius: toWidth(16),
    marginTop: toHeight(20),
  },
  goBack: {
    paddingRight: toWidth(24),
    marginTop: toHeight(31),
    alignItems: "flex-start",
  },
  downSideCard: {
    paddingHorizontal: toWidth(16),
  },
  saveRateLabel: {
    borderRadius: 6,
    backgroundColor: "#006CF4",
    paddingHorizontal: toWidth(10),
    marginLeft: toWidth(16),
    height: toHeight(24),
    justifyContent: "center",
    marginRight: toWidth(16),
  },
  packageView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: toWidth(16),
    marginBottom: toHeight(4),
  },
  selectedPackageView: {
    height: toHeight(60),
    borderRadius: toWidth(16),
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    width: "100%",
    justifyContent: "center",
  },
  unSelectedPackageView: {
    height: toHeight(60),
    borderRadius: toWidth(16),
    borderWidth: toWidth(1),
    borderStyle: "solid",
    borderColor: "black",
    opacity: 0.25,
    width: "100%",
    justifyContent: "center",
  },

  marginTop10: {
    marginTop: toHeight(10),
  },
  flexRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  packageTextContainer: {
    marginLeft: toWidth(17),
  },
  closeIcon: {
    width: toWidth(32),
    height: toWidth(32),
    marginLeft: toWidth(24),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: toHeight(50),
  },
  marginTop8: {
    marginTop: toHeight(8),
  },
  featureContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: toHeight(24),
    marginBottom: toHeight(35),
  },
  featureList: {
    alignItems: "center",
    justifyContent: "center",
    width: "55%",
  },
  featureIcon: {
    width: toWidth(24),
    height: toWidth(24),
    marginRight: toWidth(10),
  },
  unlockProButton: {
    backgroundColor: "#006CF4",
    marginTop: toHeight(20),
    height: toHeight(60),
    borderRadius: toWidth(16),
    justifyContent: "center",
  },
  marginTop6: {
    marginTop: toHeight(6),
  },
  bottomLinksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: toHeight(10),
  },
  flexRow: {
    flexDirection: "row",
  },
  separator: {
    color: "#92959E",
    marginHorizontal: toWidth(5),
  },
});
