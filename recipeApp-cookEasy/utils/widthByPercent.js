import { Dimensions } from "react-native";

export function widthByPercent(percents = 100, spacesCount = 0) {
  return (
    ((Dimensions.get("window").width - 15 * spacesCount) /
      100) *
    percents
  );
}
