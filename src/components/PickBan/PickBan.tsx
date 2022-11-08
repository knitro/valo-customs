export interface PickBanData {
  label: string;
  image: string;
  minimap: string;
}

export interface PickBanItem {
  data: PickBanData;
  status: PickBanMapStatus;
  side: PickBanTeamSide;
  index: number; // For Online Storage
}

export enum PickBanTeamSide {
  // All of these are in relation to Team 1
  ATTACK_SIDE = 0, // Team 1 on Attacker Side
  DEFEND_SIDE = 1, // Team 1 on Defender Side
  UNSELECTED = 2, // Team is still selecting side
  NOT_APPLICABLE = 3, // Map is Banned therefore side is N/A or Team Info is irrelevant
}

export enum PickBanMapStatus {
  UNSELECTED = 0, // 0 == Unselected,
  SELECTED = 1, // 1 == Selected,
  PICKED = 2, // 2 == Picked,
  BANNED = 3, // 3 == Banned
}
