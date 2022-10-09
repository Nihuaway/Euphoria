export interface IImage {
  _id: string;
  type: string;
  shot: string;
  palette: string;
}

export interface IPalette {
  _id: string;
  image: string;
  vibrant: {hex: string, populate: number};
  vibrantDark: {hex: string, populate: number};
  vibrantLight: {hex: string, populate: number};
  muted: {hex: string, populate: number};
  mutedDark: {hex: string, populate: number};
  mutedLight: {hex: string, populate: number};
}
