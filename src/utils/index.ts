import { Dimensions } from "react-native";

export function sizeW(value) {
  const w = Dimensions.get("window").width * value;

  return w;
}

export function sizeH(value) {
  const w = Dimensions.get("window").height * value;

  return w;
}

export const UpdateDescription = [
  { title: "- Correões de bugs" },
  { title: "- Melhorias na interface" },
];
