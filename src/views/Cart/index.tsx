import React, { useContext, useEffect, useMemo, useState } from 'react'
import styles from './index.module.sass'

import { ShoppingCartContext, ShoppingCartItem } from 'components/ShoppingCart'
import ShoppingCartListItem from 'components/ShoppingCartListItem'

const Cart = () => {
  const {state: cartItens, dispatch: cartItensDispatch} = useContext(ShoppingCartContext)
  
  const getCartItens = useMemo(() => {
    let itens: Array<ShoppingCartItem> = []
    if(typeof(cartItens) !== 'undefined') for(const [, value] of Object.entries<ShoppingCartItem>(cartItens)) itens.push(value)
    return itens
  }, [cartItens])

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let total = 0
    for(const [, value] of Object.entries<ShoppingCartItem>(cartItens)) total += (value.item.price || 0) * value.amount
    setTotalPrice(total)
  }, [cartItens])

  return (
    <main>
      <article className={styles.shoppingCartMenu}>
        <section className={styles.tableContainer}>
          <table className={styles.itemContainer}>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço (u)</th>
                <th>Qnt.</th>
                <th>Preço (t)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getCartItens.map((item) => {
              return (
                  <ShoppingCartListItem key={item.item.id} item={item.item} amount={item.amount} cartItemDispatch={cartItensDispatch}/>
                )
              })}
            </tbody>
          </table>
        </section>
        <section className={styles.finish}>
          <p className={styles.finishText}>Total:<span className={styles.finishTextInside}>R${totalPrice.toFixed(2)}</span></p>
          <div className={styles.finishButtonContainer}>
            <button className={styles.finishButton} onClick={() => cartItensDispatch({ type: 'clear' })}>
              Comprar
            </button>
            <button className={styles.finishButton} onClick={() => cartItensDispatch({ type: 'clear' })}>
              Limpar Carrinho
            </button>
          </div>
        </section>
      </article>
    </main>
  )
}

export default Cart
