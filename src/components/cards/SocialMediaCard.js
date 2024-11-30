import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useMemo } from "react";
import { byWidth, toWidth } from "../../theme/helpers";
import { COLOR } from "../../theme";
import SvgAsset from "../SvgAsset";
import Typography from "../Typography";
import {
  checkPhotoSavePermission,
  requestPhotoSavePermission,
} from "../../services/helper";
import Share from "react-native-share";
import RNFS from "react-native-fs";

const SocialMediaCard = ({ extraStyle, url }) => {
  const saveImageToLibrary = async () => {
    const { error, granted } = await checkPhotoSavePermission();
    if (error) {
      Alert.alert(error);
      return;
    }

    let proceed = true;

    if (!granted) {
      const allowed = await requestPhotoSavePermission();

      if (!allowed) {
        proceed = false;
        Alert.alert("You don't have permission to save media");
        return;
      }
    }

    if (proceed) {
      const filePath = `${RNFS.TemporaryDirectoryPath}/swapp-file.mp3`;
      RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        cacheable: true,
      }).promise.then((res) => {
        Share.open({ url: filePath })
          .then(() => {
            Alert.alert("Saved to your device's gallery successfully");
          })
          .catch((err) => {
            if (err && err?.message !== "User did not share") {
              console.log(err);
              Alert.alert("Error occured while saving");
            }
          });
      });
    }
  };

  const MENU_ITEMS = useMemo(() => {
    return [
      {
        title: "Save",
        icon: "download",
        onPress: () => onPressMenuItem(saveImageToLibrary()),
        bg: COLOR.greenLight,
      },
      {
        title: "Facebook",
        icon: "facebook",
        onPress: () => onPressMenuItem(saveImageToLibrary()),
        bg: COLOR.blue,
      },
      {
        title: "Instagram",
        icon: "instagram",
        onPress: () => onPressMenuItem(saveImageToLibrary()),
        bg: "#E1306C",
      },
      {
        title: "More",
        icon: "settings2",
        onPress: () => onPressMenuItem(saveImageToLibrary()),
        bg: COLOR.grayDark2,
      },
    ];
  }, []);

  const onPressMenuItem = (func) => {
    if (func) func();
  };

  return (
    <View style={[styles.container, { ...extraStyle }]}>
      {MENU_ITEMS.map(({ title, icon, bg, onPress }, index) => (
        <View key={index} style={styles.content}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: bg }]}
            onPress={onPress}
          >
            <SvgAsset name={icon} style={styles.icon} color={COLOR.white} />
          </TouchableOpacity>
          <Typography
            size={16}
            weight="500"
            center
            style={{ width: "100%" }}
            color={COLOR.white}
            numberOfLines={1}
          >
            {title}
          </Typography>
        </View>
      ))}
    </View>
  );
};

export default SocialMediaCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: toWidth(10),
  },

  card: {
    width: byWidth(16),
    height: byWidth(16),
    borderRadius: toWidth(16),
    backgroundColor: COLOR.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: byWidth(8),
    height: byWidth(8),
    flexShrink: 0,
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
    gap: toWidth(10),
    flex: 1,
  },
});
