// Components/Scale.ts
import { Dimensions } from "react-native";

const SCREEN_HEIGHT = 736;
const SCREEN_WIDTH = 414;

let { height, width } = Dimensions.get("window");

// Listen to changes (works for web + mobile rotation)
Dimensions.addEventListener("change", ({ window }) => {
  width = window.width;
  height = window.height;
});

export default function Scale(units: number = 1) {
  return (width / SCREEN_WIDTH) * units;
}

export function verticalScale(size: number) {
  return (height / SCREEN_HEIGHT) * size;
}
