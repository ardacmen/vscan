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
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    const getAllHistory = await AsyncStorage.getItem("history");
    if (getAllHistory) {
      setData(JSON.parse(getAllHistory));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={data}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<PageHeader title={"History"} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Result", { item: item });
              }}
            >
              <Image
                source={{ uri: `${item.image}` }}
                style={{
                  width: byWidth(27),
                  marginRight: toWidth(16),
                  aspectRatio: 1,
                  borderRadius: toWidth(16),
                  marginBottom: toHeight(16),
                }}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Typography>0 Emoji found</Typography>}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: toWidth(20),
    width: "100%",
    height: "100%",
    backgroundColor: "#f1f3f7",
  },
});
