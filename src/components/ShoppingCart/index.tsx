import React, { createContext, Reducer, useReducer } from 'react'
import { FruitInformation } from 'types/FruitInformation'

interface ShoppingCartItem{
  item: FruitInformation,
  amount: number
}

interface ShoppingCartList{
  [itemId: number]: ShoppingCartItem
}

interface ShoppingCartReducerAction{
  type: ('add' | 'remove'),
  item: FruitInformation,
  amount: number
}

const shoppingCartReducer = (prevState: ShoppingCartList, action: ShoppingCartReducerAction): ShoppingCartList => {
  const {type, item, amount} = action
  const {id} = item
  switch(type){
    case 'add':
      if(Object(prevState).hasOwnProperty(id)) prevState[id].amount += amount
      else prevState[id] = { item, amount }
      return prevState
    case 'remove':
      if(!Object(prevState).hasOwnProperty(id)) return prevState
      if(prevState[id].amount - amount <= 0) delete prevState[id]
      else prevState[id].amount -= amount
      return prevState
    default:
      throw new Error('Wrong action in shoppingCartReducer')
  }
}

const ShoppingCartContext = createContext({state: {}, dispatch: (action: ShoppingCartReducerAction) => {}})

const ShoppingCartProvider = (props: {children?: JSX.Element | Array<JSX.Element>}) => {
  const {children} = props

  const [itemListState, itemListDispatch] =
    useReducer<Reducer<ShoppingCartList, ShoppingCartReducerAction>>(shoppingCartReducer, {})

  return (
    <ShoppingCartContext.Provider value={{state: itemListState, dispatch: itemListDispatch}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export type {ShoppingCartItem}
export { ShoppingCartContext }
export default ShoppingCartProvider