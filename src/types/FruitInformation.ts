interface FruitInformation{
  genus: string,
  name: string,
  id: number,
  family: string,
  order: string,
  nutritions: FruitNutritions
}

interface FruitNutritions {
  carbohydrates: number,
  protein: number,
  fat: number,
  calories: number,
  sugar: number
}

export type {FruitInformation, FruitNutritions}