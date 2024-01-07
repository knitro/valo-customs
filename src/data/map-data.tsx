import { PickBanData } from "@/components/PickBan/PickBan";

export const DEFAULT_BACKGROUND = require("@/assets/maps/range.webp");

export const ALL_MAPS: PickBanData[] = [
  {
    label: "Ascent",
    image: require("@/assets/maps/ascent.webp"),
    minimap: require("@/assets/minimaps/ascent_minimap.webp"),
    activeInComp: true,
  },
  {
    label: "Bind",
    image: require("@/assets/maps/bind.webp"),
    minimap: require("@/assets/minimaps/bind_minimap.webp"),
    activeInComp: true,
  },
  {
    label: "Breeze",
    image: require("@/assets/maps/breeze.webp"),
    minimap: require("@/assets/minimaps/breeze_minimap.webp"),
    activeInComp: true,
  },
  {
    label: "Fracture",
    image: require("@/assets/maps/fracture.webp"),
    minimap: require("@/assets/minimaps/fracture_minimap.webp"),
    activeInComp: false,
  },
  {
    label: "Haven",
    image: require("@/assets/maps/haven.webp"),
    minimap: require("@/assets/minimaps/haven_minimap.webp"),
    activeInComp: true,
  },
  {
    label: "Icebox",
    image: require("@/assets/maps/icebox.webp"),
    minimap: require("@/assets/minimaps/icebox_minimap.webp"),
    activeInComp: false,
  },
  {
    label: "Lotus",
    image: require("@/assets/maps/lotus.webp"),
    minimap: require("@/assets/minimaps/lotus_minimap.webp"),
    activeInComp: true,
  },
  {
    label: "Pearl",
    image: require("@/assets/maps/pearl.webp"),
    minimap: require("@/assets/minimaps/pearl_minimap.webp"),
    activeInComp: true,
  },
  {
    label: "Split",
    image: require("@/assets/maps/split.webp"),
    minimap: require("@/assets/minimaps/split_minimap.webp"),
    activeInComp: true,
  },
];

export const COMP_MAPS: PickBanData[] = ALL_MAPS.filter(
  (currentMap) => currentMap.activeInComp
);
