
import MontserratRegular from "../assets/fonts/Montserrat-Regular.ttf";
import MontserratMedium from "../assets/fonts/Montserrat-Medium.ttf";
import MontserratSemiBold from "../assets/fonts/Montserrat-SemiBold.ttf";
import MontserratBold from "../assets/fonts/Montserrat-Bold.ttf";

export const loadFonts = () => {
  return Font.loadAsync({
    MontserratRegular,
    MontserratMedium,
    MontserratSemiBold,
    MontserratBold,
  });
};

export const FONT_FAMILIES = Object.freeze({
  regular: "MontserratRegular",
  medium: "MontserratMedium",
  semi: "MontserratSemiBold",
  bold: "MontserratBold",
});
