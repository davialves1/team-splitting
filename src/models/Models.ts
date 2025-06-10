export type Player = {
  name: string;
  rating: number;
};

export type ColorShirt = "Black" | "White" | "Red" | "Yellow" | "Bibs";

export type Team = {
  id: number;
  color: ColorShirt;
  players: Player[];
  rating: number;
};
