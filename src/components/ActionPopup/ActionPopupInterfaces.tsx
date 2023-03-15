export interface ActionPopupOptions {
  label: string;
  clickFunction: () => void;
  icon: string;
  color: string;
  dark: boolean; // If the color is dark, this should be set to true for label contrast
}
