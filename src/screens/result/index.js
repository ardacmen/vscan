import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { toHeight, toWidth } from "../../theme/helpers";
import Typography from "../../components/Typography";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useIAPContext } from "../../context/IAPContext";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import * as StoreReview from "react-native-store-review";
import RNFS from "react-native-fs";
import Share from "react-native-share";

export default function Result() {
  const { isPremium, showSubscriptionModal } = useIAPContext();
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  useEffect(() => {
    StoreReview.requestReview();
    navigation.setOptions({
      title: "Result",
    });
  }, []);

  const downloadImage = async () => {
    try {
      CameraRoll.save(item.image, { type: "photo" });
      Alert.alert("Success", "Image downloaded successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to download image");
    }
  };

  const shareWithOthers = async () => {
    const filePath = `${
      RNFS.TemporaryDirectoryPath
    }/emoji-share-${Date.now()}.png`;

    try {
      await RNFS.writeFile(filePath, item.image, "base64");

      const shareOptions = {
        message: "Check out this emoji I made!",
        url: `file://${filePath}`,
      };

      await Share.open(shareOptions);
    } catch (error) {
      if (error.message === "User did not share") {
        return;
      }

      Alert.alert("Error", "Failed to share the image");
    }
  };

  return (
    <View className="p-4">
      <SafeAreaView>
        <ScrollView>
          <View
            style={{ backgroundColor: "white", marginBottom: toHeight(20) }}
          >
            <Typography
              size={15}
              weight={"600"}
              style={{ padding: toWidth(16) }}
            >
              {item.prompt}
            </Typography>
          </View>
          <Image
            source={{ uri: `${item.image}` }}
            style={{
              width: "100%",
              aspectRatio: 1,
              borderRadius: toWidth(16),
            }}
          />
          <View className="mt-5 flex-row justify-between">
            <TouchableOpacity
              style={styles.actionButton}
              onPress={downloadImage}
            >
              <Typography center color={"black"} size={16}>
                Download
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={shareWithOthers}
            >
              <Typography center color={"black"} size={16}>
                Share
              </Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: toHeight(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
