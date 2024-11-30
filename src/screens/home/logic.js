import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLocalCreatedTotal = async (createdTotal) => {
  try {
    await AsyncStorage.setItem("createdTotal", createdTotal.toString());
  } catch (error) {
    console.error("Error saving createdTotal:", error);
  }
};

export const getLocalCreatedTotal = async (setCreatedTotal) => {
  try {
    const value = await AsyncStorage.getItem("createdTotal");
    if (value !== null) {
      setCreatedTotal(parseInt(value));
    }
  } catch (error) {
    console.error("Error fetching createdTotal:", error);
  }
};
