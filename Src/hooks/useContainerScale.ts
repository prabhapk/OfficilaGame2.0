// hooks/useContainerScale.ts
import { useContext } from "react";
import {MobileContainerContext} from "../Components/MobileContainer";

const BASE_WIDTH = 430;
const BASE_HEIGHT = 736;

export function useContainerScale() {
  const containerWidth = useContext(MobileContainerContext);
  const Scale = (size: number) => (containerWidth / BASE_WIDTH) * size;

  // we can’t easily get height of container, so still fallback to screen height
  const verticalScale = (size: number, screenHeight: number = BASE_HEIGHT) =>
    (screenHeight / BASE_HEIGHT) * size;

  return { Scale, verticalScale };
}
