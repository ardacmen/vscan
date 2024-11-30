import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { toHeight, toWidth } from "../../theme/helpers";
import { useIAPContext } from "../../context/IAPContext";
import Typography from "../../components/Typography";
import PageHeader from "../../components/PageHeader";
import LoadingModal from "../../components/LoadingModal";
import { getLocalCreatedTotal, saveLocalCreatedTotal } from "./logic";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SAMPLE_PROMPT_FOR_CREATE_FUNNY_EMOJI } from "../../constants/constants";
import Replicate from "replicate";
import RNFetchBlob from "rn-fetch-blob";

export default function Home() {
  const navigation = useNavigation();
  const { showSubscriptionModal, isPremium } = useIAPContext();
  const [loading, setLoading] = useState(false);
  const [createdTotal, setCreatedTotal] = useState(0);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    setLoading(true);
    getLocalCreatedTotal(setCreatedTotal);
    if (!isPremium) {
      if (!__DEV__) {
        showSubscriptionModal();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    saveLocalCreatedTotal(createdTotal);
  }, [createdTotal]);

  const onSubmit = async () => {
    if (prompt === "") {
      Alert.alert("Please enter prompt");
      return;
    }

    try {
      setLoading(true);

      const replicateTokenResponse = await axios.get(
        "https://erbgarage.com/aiphototoanime.php?query=aivideosummarizerwithardacmen"
      );

      const token = replicateTokenResponse.data.replicateToken;

      if (!token) {
        Alert.alert("Error", "Something went wrong. Please try again later.");
        return;
      }

      const replicate = new Replicate({ auth: token });

      const inputModel = {
        width: 1024,
        height: 1024,
        prompt: prompt,
        refine: "no_refiner",
        scheduler: "K_EULER",
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt:
          "NSFW, explicit, offensive, violent, or hateful content, nudity, or copyrighted material",
        prompt_strength: 0.8,
        num_inference_steps: 50,
      };

      const output = await replicate.run(
        "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
        {
          input: inputModel,
        }
      );

      const fs = RNFetchBlob.fs;
      var modelForSave = {
        prompt: prompt,
        image: output[0],
      };
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch("GET", output[0])
        .then((resp) => {
          imagePath = resp.path();
          return resp.readFile("base64");
        })
        .then((base64Data) => {
          modelForSave.image = `data:image/png;base64,${base64Data}`;
          return fs.unlink(imagePath);
        });

      setCreatedTotal((prev) => prev + 1);

      const getAllHistory = await AsyncStorage.getItem("history");
      let history = [];
      if (getAllHistory) {
        history = JSON.parse(getAllHistory);
      }
      history.unshift(modelForSave);
      await AsyncStorage.setItem("history", JSON.stringify(history));
      navigation.navigate("Result", { item: modelForSave });
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const samplePressed = () => {
    const randmoNumberBeteern0ToMax = Math.floor(
      Math.random() * SAMPLE_PROMPT_FOR_CREATE_FUNNY_EMOJI.length
    );
    setPrompt(SAMPLE_PROMPT_FOR_CREATE_FUNNY_EMOJI[randmoNumberBeteern0ToMax]);
  };

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <PageHeader title="Funny Emoji" />

        <View>
          <TextInput
            multiline
            blurOnSubmit
            placeholder="Enter your prompt here"
            placeholderTextColor={"#000"}
            style={{
              height: toHeight(150),
              padding: toWidth(20),
              paddingTop: toHeight(10),
              marginVertical: toHeight(10),
              borderRadius: toWidth(16),
              borderColor: "#006CF4",
              borderWidth: 1,
            }}
            onChangeText={setPrompt}
            value={prompt}
          />
          <TouchableOpacity
            onPress={samplePressed}
            style={{
              position: "absolute",
              right: toWidth(30),
              bottom: toHeight(30),
            }}
          >
            <Typography color="black">Sample</Typography>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onSubmit} style={styles.unlockProButton}>
          <Typography color="white" size={20} weight="600" center>
            Create
          </Typography>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: toWidth(20),
    backgroundColor: "#f1f3f7",
  },
  unlockProButton: {
    backgroundColor: "#006CF4",
    marginTop: toHeight(10),
    height: toHeight(50),
    borderRadius: toWidth(16),
    justifyContent: "center",
  },
});
