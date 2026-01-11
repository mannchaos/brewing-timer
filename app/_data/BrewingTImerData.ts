export interface BrewingTimerArrayType {
  sec: number;
  label: string;
  bgColor: string;
}

export const brewingTimerArray: BrewingTimerArrayType[] = [
  {
    sec: 110,
    label: "Off the boil",
    bgColor: "#142e43",
  },
  {
    sec: 30,
    label: "Bloom",
    bgColor: "#2a1852",
  },
  {
    sec: 240,
    label: "Brew / Steep",
    bgColor: "#162265",
  },
  {
    sec: 60,
    label: "Plunge",
    bgColor: "#301134",
  },
];
