import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { byHeight, toHeight, toWidth } from "../../theme/helpers";
import Typography from "../../components/Typography";
import LoadingModal from "../../components/LoadingModal";
import SvgAsset from "../../components/SvgAsset";
import { APP_SPESIFIC_COLOR } from "../../theme";
import { setIsOnboarded } from "../../services/user";

export default function Walkthrough() {
  const { reInitApp } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const create = async () => {
    setIsLoading(true);
    await setIsOnboarded();
    await reInitApp();
    setIsLoading(false);
  };

  if (isLoading) return <LoadingModal />;

  return (
    <View style={{ backgroundColor: "black" }}>
      <ImageBackground
        source={require("../../static/onboarding.webp")}
        resizeMode="repeat"
        style={{ width: "100%", height: "100%" }}
      >
        <ImageBackground
          source={require("../../static/gradient.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={style.downSideCard}>
            <Typography color={"white"} size={32} weight="600">
              Create {"\n"}Emoji {"\n"}Effortlessly
            </Typography>
            <View style={style.basicFlex}>
              <View>
                <Typography color={"white"} size={15} weight="600">
                  Easy{"\n"}Usage for {"\n"}Everyone
                </Typography>
              </View>
              <TouchableOpacity disabled={isLoading} onPress={create}>
                <View style={style.buttonContaimer}>
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Typography color={"white"} size={20} weight="600">
                      Continue
                    </Typography>
                  )}
                  <SvgAsset
                    name="rightArrowOnboarding"
                    style={{
                      width: toWidth(32),
                      height: toWidth(32),
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View></View>
            <View>
              <Typography
                color={APP_SPESIFIC_COLOR.darkWhite}
                fontSize={12}
                weight="600"
                center
                style={{
                  marginTop: toHeight(30),
                }}
              >
                By continuing, you agree to our Privacy Policy and Terms of Use
              </Typography>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContaimer: {
    paddingTop: toHeight(20),
    paddingBottom: toHeight(20),
    paddingLeft: toWidth(30),
    paddingRight: toWidth(30),
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 100,
    backgroundColor: "blue",
    opacity: 0.8,
  },
  basicFlex: {
    marginTop: toHeight(32),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  downSideCard: {
    padding: toWidth(20),
    marginTop: byHeight(50),
    position: "absolute",
    bottom: toHeight(32),
    width: "100%",
  },
});
