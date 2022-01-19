import { FruitInformation } from "./FruitInformation";

interface ShoppingCartItem{
  item: FruitInformation,
  amount: number
}

interface ShoppingCartList{
  [itemId: number]: ShoppingCartItem
}

export type {ShoppingCartItem, ShoppingCartList}