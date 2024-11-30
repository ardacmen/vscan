import React, { useMemo } from "react";
import SvgAsset from "../components/SvgAsset";
import { COLOR } from "../theme";
import { toWidth } from "../theme/helpers";

export default function TabBarIcon({ focused, route }) {
  const iconName = useMemo(() => {
    if (route.name === "HomeFunc") {
      return "camera_reverse";
    } else if (route.name === "HistoryFunc") {
      return "history";
    } else if (route.name === "SettingsFunc") {
      return "settings";
    } else if (route.name === "ArticlesFunc") {
      return "book";
    } else if (route.name === "CollectionsFunc") {
      return "history";
    }
  }, [route.name]);

  return (
    <SvgAsset
      name={iconName}
      style={{ width: toWidth(16), height: toWidth(16) }}
      color={focused ? "#006CF4" : COLOR.grayDark2}
    />
  );
}
