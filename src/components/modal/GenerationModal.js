import { View, StyleSheet, Image } from "react-native";
import React from "react";
import BottomSheet from "../bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppContext } from "../../context/AppContext";
import { byHeight, byWidth, toHeight, toWidth } from "../../theme/helpers";
import { COLOR } from "../../theme";
import SvgAsset from "../SvgAsset";
import Typography from "../Typography";
import GenerationButton from "../button/GenerationButton";
import BackgroundShadow from "../BackgroundShadow";

const GenerationModal = () => {
  const {
    user,
    setRemainingGenerationCount,
    remainingGenerationCount,
    handleNotificationPermission,
  } = useAppContext();
  return (
    <BottomSheet>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0D0F14" }}>
        <BackgroundShadow />
        <TouchableOpacity
          onPress={() => setRemainingGenerationCount(null)}
          style={styles.close}
        >
          <SvgAsset
            name="close"
            color={COLOR.gray}
            style={{
              width: toHeight(24),
              height: toHeight(24),
            }}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            {/*
              <Image
              source={require('../../../src/static/generating.gif')}
              style={styles.image}
            />
              */}
            <View style={styles.title}>
              <Typography size={24} weight="700" color={COLOR.white} center>
                We are generating your result
              </Typography>

              <Typography size={18} weight="400" color={COLOR.textGray2} center>
                It may take up to few minutes for you to receive an Al-generated
                music. You can find your music in Library
              </Typography>
              <Typography size={18} weight="500" color={COLOR.pink} center>
                {remainingGenerationCount} free generation left
              </Typography>
            </View>
          </View>
          {user && (
            <>
              {user?.notifications_granted ? (
                <View style={{ alignItems: "center" }}>
                  <SvgAsset
                    name="bell"
                    color={COLOR.primary}
                    style={{
                      width: toWidth(32),
                      height: toWidth(32),
                      marginBottom: toHeight(10),
                    }}
                  />
                  <Typography
                    size={18}
                    weight="500"
                    color={COLOR.primary}
                    center
                  >
                    You will be notified when your music is ready
                  </Typography>
                </View>
              ) : (
                <GenerationButton
                  style={{ marginBottom: toHeight(8) }}
                  onPress={handleNotificationPermission}
                >
                  <Typography size={20} weight="600" color={COLOR.white} center>
                    Notify me
                  </Typography>
                </GenerationButton>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </BottomSheet>
  );
};

export default GenerationModal;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: toWidth(20),
    flex: 1,
  },
  close: {
    width: toWidth(40),
    height: toWidth(40),
    borderRadius: toWidth(40 / 2),
    marginHorizontal: toWidth(20),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: byWidth(90),
    borderRadius: toWidth(20),
    height: byHeight(30),
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: toHeight(20),
    gap: toHeight(20),
    paddingHorizontal: toWidth(20),
  },
});
