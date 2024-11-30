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
import Replicate from "replicate";
import RNFetchBlob from "rn-fetch-blob";

export default function Home() {
  const navigation = useNavigation();
  const { showSubscriptionModal, isPremium } = useIAPContext();
  const [loading, setLoading] = useState(false);
  const [createdTotal, setCreatedTotal] = useState(0);

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

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <PageHeader title="Scan Text" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: toWidth(16),
    backgroundColor: "#f1f3f7",
  },
});
