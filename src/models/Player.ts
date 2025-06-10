export type Player = {
  name: string;
  rating: number;
};

export type TeamColorShirt = "Black" | "White" | "Red" | "Yellow" | "Bibs";

export type Team = `${TeamColorShirt} Color Shirt`;
