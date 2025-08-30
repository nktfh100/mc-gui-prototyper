export type SegmentStyle = {
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  obfuscated: boolean;
};

export type Segment = {
  text: string;
  style: SegmentStyle;
};
