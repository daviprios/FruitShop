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

  const [showBuyMenu, setShowBuyMenu] = useState(false)

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
            <button className={styles.finishButton} onClick={() => setShowBuyMenu(!showBuyMenu)}>
              Comprar
            </button>
            <button className={styles.finishButton} onClick={() => cartItensDispatch({ type: 'clear' })}>
              Limpar Carrinho
            </button>
          </div>
        </section>
      </article>
      <section style={{ display: showBuyMenu ? 'flex' : 'none' }} className={styles.buyMenuContainer}>
        <div onClick={() => setShowBuyMenu(false)}></div>
        <article className={styles.buyMenu}>
          <section>
            <ul className={styles.receipt}>
              {getCartItens.map((item) => {
                return (
                  <li className={styles.receiptItem}>
                    <p>
                      {item.item.name}
                    </p>
                    <div>
                      <p>
                        x{item.amount}
                      </p>
                      <p className={styles.money}>
                        R${Number(item.item.price || 0) * item.amount}
                      </p>
                    </div>
                  </li>
                )
              })}
              <li className={styles.receiptItem}>
                <h4>
                  Total:
                </h4>
                <h4 className={styles.money}>
                  R${totalPrice}
                </h4>
              </li>
            </ul>
          </section>
          <section className={styles.confirmation}>
            <button onClick={() => {
              cartItensDispatch({ type: 'clear' })
              setShowBuyMenu(false)
            }}>
              Confirmar Compra
            </button>
            <button onClick={() => setShowBuyMenu(false)}>
              Cancelar
            </button>
          </section>
        </article>
      </section>
    </main>
  )
}

export default Cart
