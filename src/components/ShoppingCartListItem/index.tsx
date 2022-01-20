import React from 'react'
import styles from './index.module.sass'

import { FruitInformation } from 'types/FruitInformation'

const ShoppingCartListItem = (props: { item: FruitInformation, amount: number, cartItemDispatch: Function }) => {
  const {item, amount, cartItemDispatch} = props

  return (
    <tr key={item.id} className={styles.listItem}>
      <td>{item.name}</td>
      <td className={styles.money}>R${(item.price)?.toFixed(2)}</td>
      <td>{amount}</td>
      <td className={styles.money}>R${(Number(item.price) * amount).toFixed(2)}</td>
      <td>
        <button className={styles.button} onClick={() => cartItemDispatch({ type: 'add', amount: 1, item: item })}>+</button>
        <button className={styles.button} onClick={() => cartItemDispatch({ type: 'subtract', amount: 1, item: item })}>-</button>
        <button className={styles.button} onClick={() => cartItemDispatch({ type: 'remove', amount: 0, item: item })}>Remover</button>
      </td>
    </tr>
  )
}

export default ShoppingCartListItem
