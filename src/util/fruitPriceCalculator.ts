import { FruitInformation } from "types/FruitInformation"

const fruitPriceCalculator = (fruit: FruitInformation): number => {
  return Number(((fruit.nutritions.calories + fruit.nutritions.carbohydrates + fruit.nutritions.fat +
    fruit.nutritions.protein + fruit.nutritions.sugar) / 100).toFixed(2))
}

export {fruitPriceCalculator}