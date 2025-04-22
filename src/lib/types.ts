// src/lib/types.ts

export type GradientType = "linear" | "radial";

export type ColorStop = {
  offset: number; // 0 to 1
  color: string;
};

export type Gradient = {
  type: GradientType;
  rotation?: number; // degrees
  colorStops: ColorStop[];
};

export type DotType =
  | "dots"
  | "rounded"
  | "classy"
  | "classy-rounded"
  | "square"
  | "extra-rounded";

export type CornerSquareType = "dot" | "square" | "extra-rounded";
export type CornerDotType = "dot" | "square";

export type QROptions = {
  width: number;
  height: number;
  data: string;
  type?: "svg" | "canvas";
  image?: string;
  margin?: number;
  qrOptions?: {
    // typeNumber?: number;
    mode?: "Numeric" | "Alphanumeric" | "Byte" | "Kanji";
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  };
  imageOptions?: {
    hideBackgroundDots?: boolean;
    imageSize?: number; // 0 to 1
    margin?: number;
    crossOrigin?: string;
  };
  dotsOptions?: {
    color?: string;
    type?: DotType;
    gradient?: Gradient;
  };
  backgroundOptions?: {
    color?: string;
    gradient?: Gradient;
  };
  cornersSquareOptions?: {
    color?: string;
    type?: CornerSquareType;
    gradient?: Gradient;
  };
  cornersDotOptions?: {
    color?: string;
    type?: CornerDotType;
    gradient?: Gradient;
  };
};