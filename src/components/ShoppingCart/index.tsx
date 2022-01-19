import React, { createContext, Reducer, useReducer } from 'react'

import LocalStorage, { ShoppingCartStorage } from 'config/localStorage'

import { FruitInformation } from 'types/FruitInformation'
import { ShoppingCartList, ShoppingCartItem } from 'types/ShoppingCart'

interface ShoppingCartReducerAction{
  type: ('add' | 'subtract' | 'remove' | 'price' | 'clear'),
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
  const state = { ...prevState }

  switch(type){
    case 'add':
      if(Object(state).hasOwnProperty(id)) state[id].amount += amount
      else state[id] = { item, amount }
      break
    case 'subtract':
      if(!Object(state).hasOwnProperty(id) || state[id].amount - amount <= 0) return state
      state[id].amount -= amount
      break
    case 'remove':
      if(Object(state).hasOwnProperty(id))
      delete state[id]
      break
    default:
      throw new Error('Wrong action in shoppingCartReducer')
  }
  LocalStorage.store<ShoppingCartStorage>({ name: 'shoppingCartStorage', data: state })
  return state
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