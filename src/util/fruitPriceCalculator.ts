import { FruitInformation } from "types/FruitInformation"

const fruitPriceCalculator = (fruit: FruitInformation): string => {
  return ((fruit.nutritions.calories + fruit.nutritions.carbohydrates + fruit.nutritions.fat +
    fruit.nutritions.protein + fruit.nutritions.sugar) / 100).toFixed(2)
}

export {fruitPriceCalculator}