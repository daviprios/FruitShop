import React, { createContext, Reducer, useReducer } from 'react'

//Id: Amount
interface ShoppingCartList{
  [itemId: number]: number
}

interface ShoppingCartReducerAction{
  type: ('add' | 'remove'),
  itemId: number
}

const shoppingCartReducer = (prevState: ShoppingCartList, action: ShoppingCartReducerAction): ShoppingCartList => {
  const {type, itemId} = action
  switch(type){
    case 'add':
      if(Object(prevState).hasOwnProperty(itemId)) return { ...prevState, [itemId]: prevState[itemId] + 1}
      else return { ...prevState, [itemId]: 1 }
    case 'remove':
      if(Object(prevState).hasOwnProperty(itemId)) {
        if(prevState[itemId] === 1) {
          const state = { ...prevState }
          delete state[itemId]
          return state
        }
        return { ...prevState, [itemId]: prevState[itemId] - 1 }
      }
      else return { ...prevState }
    default:
      throw new Error('Wrong action in shoppingCartReducer')
  }
}

const ShoppingCartContext = createContext([{}, () => null])

const ShoppingCartProvider = (props: {children?: JSX.Element | Array<JSX.Element>}) => {
  const {children} = props

  const [itemListState, itemListDispatch] =
    useReducer<Reducer<ShoppingCartList, ShoppingCartReducerAction>>(shoppingCartReducer, {1: 5, 6: 7, 35: 8})

  return (
    <ShoppingCartContext.Provider value={[itemListState, itemListDispatch]}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export { ShoppingCartContext }
export default ShoppingCartProvider