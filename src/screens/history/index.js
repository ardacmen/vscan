import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import PageHeader from "../../components/PageHeader";
import { toWidth, toHeight, byWidth } from "../../theme/helpers";
import Typography from "../../components/Typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SvgAsset from "../../components/SvgAsset";
import { useNavigation } from "@react-navigation/native";

export default function History() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <PageHeader title="History" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: toWidth(16),
    width: "100%",
    height: "100%",
    backgroundColor: "#f1f3f7",
  },
});
