import { Text as RNTextComponent } from "react-native";

export default function Text({ type, content, additionalClasses }) {
  const fontClass =
    type === "regular"
      ? "font-['inter-reg']"
      : type === "semibold"
      ? "font-['inter-semibold']"
      : type === "bold"
      ? "font-['inter-bold']"
      : "font-['inter-reg']";

    // type === "regular"
    //   ? "font-['jost-reg']"
    //   : type === "semibold"
    //   ? "font-['jost-semibold']"
    //   : type === "bold"
    //   ? "font-['jost-bold']"
    //   : "font-['jost-reg']";

  const combinedClass = `${fontClass} ${additionalClasses}`;

  return <RNTextComponent className={combinedClass}>{content}</RNTextComponent>;
}
