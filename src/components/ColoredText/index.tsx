import type { Segment, SegmentStyle } from "./types";
import { TextSegment } from "./TextSegment";

const colorMap = {
  "0": "text-black",
  "1": "text-dark-blue",
  "2": "text-dark-green",
  "3": "text-dark-aqua",
  "4": "text-dark-red",
  "5": "text-dark-purple",
  "6": "text-gold",
  "7": "text-gray",
  "8": "text-dark-gray",
  "9": "text-blue",
  a: "text-green",
  b: "text-aqua",
  c: "text-red",
  d: "text-light-purple",
  e: "text-yellow",
  f: "text-white",
} as const;

const formatMap: { [key: string]: keyof Omit<SegmentStyle, "color"> } = {
  k: "obfuscated",
  l: "bold",
  m: "strikethrough",
  n: "underline",
  o: "italic",
};

const parseText = (
  inputText: string,
  defaultColor?: keyof typeof colorMap,
): Segment[] => {
  const segments: Segment[] = [];
  let currentStyle: SegmentStyle = {
    color: colorMap[defaultColor || "f"],
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    obfuscated: false,
  };
  let currentText = "";

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === "§") {
      if (currentText) {
        segments.push({ text: currentText, style: { ...currentStyle } });
        currentText = "";
      }

      const code = inputText[i + 1];
      if (Object.hasOwnProperty.call(colorMap, code)) {
        currentStyle = {
          ...currentStyle,
          color: colorMap[code as keyof typeof colorMap],
        };
      } else if (formatMap[code]) {
        const formatKey = formatMap[code];
        currentStyle[formatKey] = true;
      } else if (code === "r") {
        // Reset
        currentStyle = {
          color: colorMap["f"],
          bold: false,
          italic: false,
          underline: false,
          strikethrough: false,
          obfuscated: false,
        };
      }
      i++; // Skip the format code
    } else {
      currentText += inputText[i];
    }
  }

  if (currentText) {
    segments.push({ text: currentText, style: { ...currentStyle } });
  }

  return segments;
};

type ColoredTextProps = {
  children: string;
  defaultColor?: keyof typeof colorMap;
  className?: string;
};

export const ColoredText = ({
  children,
  className,
  defaultColor,
}: ColoredTextProps) => {
  return (
    <p className={className}>
      {parseText(children, defaultColor).map((segment, i) => (
        <TextSegment key={i} segment={segment} />
      ))}
    </p>
  );
};
