import { PickBanData } from "@/components/PickBan/PickBan";

export const DEFAULT_BACKGROUND = require("@/assets/maps/range.webp");

export const COMP_MAPS: PickBanData[] = [
  {
    label: "Ascent",
    image: require("@/assets/maps/ascent.webp"),
    minimap: require("@/assets/minimaps/ascent_minimap.webp"),
  },
  {
    label: "Bind",
    image: require("@/assets/maps/bind.webp"),
    minimap: require("@/assets/minimaps/bind_minimap.webp"),
  },
  {
    label: "Breeze",
    image: require("@/assets/maps/breeze.webp"),
    minimap: require("@/assets/minimaps/breeze_minimap.webp"),
  },
  {
    label: "Fracture",
    image: require("@/assets/maps/fracture.webp"),
    minimap: require("@/assets/minimaps/fracture_minimap.webp"),
  },
  {
    label: "Haven",
    image: require("@/assets/maps/haven.webp"),
    minimap: require("@/assets/minimaps/haven_minimap.webp"),
  },
  {
    label: "Icebox",
    image: require("@/assets/maps/icebox.webp"),
    minimap: require("@/assets/minimaps/icebox_minimap.webp"),
  },
  {
    label: "Pearl",
    image: require("@/assets/maps/pearl.webp"),
    minimap: require("@/assets/minimaps/pearl_minimap.webp"),
  },
];
