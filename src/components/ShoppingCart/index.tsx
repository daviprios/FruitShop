import React, { createContext, Reducer, useReducer } from 'react'

import LocalStorage, { ShoppingCartStorage } from 'config/localStorage'

import { FruitInformation } from 'types/FruitInformation'
import { ShoppingCartList, ShoppingCartItem } from 'types/ShoppingCart'
import { fruitPriceCalculator } from 'util/fruitPriceCalculator'

interface ShoppingCartReducerAction{
  type: ('add' | 'remove' | 'price' | 'clear'),
  item?: FruitInformation,
  amount?: number
}

const shoppingCartReducer = (prevState: ShoppingCartList, action: ShoppingCartReducerAction): ShoppingCartList => {
  const {type, item, amount} = action
  
  if(type === 'clear') {
    LocalStorage.remove('shoppingCartStorage')
    return {}
  }
  else if (item === undefined || amount === undefined) throw new Error('Item and amount cannot be undefined if type is not "clear" in shoppingCartReducer')
  
  const {id} = item

  switch(type){
    case 'add':
      if(Object(prevState).hasOwnProperty(id)) prevState[id].amount += amount
      else prevState[id] = { item, amount }
      break
    case 'remove':
      if(!Object(prevState).hasOwnProperty(id)) return prevState
      if(prevState[id].amount - amount <= 0) delete prevState[id]
      else prevState[id].amount -= amount
      break
    case 'price':
      if(!Object(prevState).hasOwnProperty(id)) return prevState
      prevState[id].item.price = Number(fruitPriceCalculator(item))
      break
    default:
      throw new Error('Wrong action in shoppingCartReducer')
  }
  LocalStorage.store<ShoppingCartStorage>({ name: 'shoppingCartStorage', data: prevState })
  return prevState
}

const ShoppingCartContext = createContext({state: {}, dispatch: (action: ShoppingCartReducerAction) => {}})

const ShoppingCartProvider = (props: {children?: JSX.Element | Array<JSX.Element>}) => {
  const {children} = props

  const [itemListState, itemListDispatch] =
    useReducer<Reducer<ShoppingCartList, ShoppingCartReducerAction>>(shoppingCartReducer, LocalStorage.load('shoppingCartStorage') || {})

  return (
    <ShoppingCartContext.Provider value={{state: itemListState, dispatch: itemListDispatch}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export type { ShoppingCartItem }
export { ShoppingCartContext }
export default ShoppingCartProvider