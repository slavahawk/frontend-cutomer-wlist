export type Colour = "RED" | "WHITE" | "ORANGE" | "ROSE";
export type SugarType = "DRY" | "SEMI_DRY" | "SEMI_SWEET" | "SWEET";

export interface Wine {
  id: number,
  name: string,
  category: string,
  colour: Colour,
  vintage: number,
  sugarType: SugarType,
  bottleVolume: number,
  alcoholByVolume: number,
  country: {
    id: number,
    name: string,
    originalImagePath: string
  },
  originalImagePath: string,
  interestingFacts: string,
  organoleptic: string
}
