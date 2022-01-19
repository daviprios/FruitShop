import React, { useContext, useEffect, useMemo, useState } from 'react'

import { ShoppingCartContext, ShoppingCartItem } from 'components/ShoppingCart'

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
      <article>
        <section>
          <ul>
            {getCartItens.map((item) => {
            return (
              <li key={item.item.id}>
                <p>
                  {item.item.name} - {item.amount}
                  <button onClick={() => cartItensDispatch({ type: 'add', amount: 1, item: item.item })}>+</button>
                  <button onClick={() => cartItensDispatch({ type: 'subtract', amount: 1, item: item.item })}>-</button>
                  <button onClick={() => cartItensDispatch({ type: 'remove', amount: 0, item: item.item })}>Remover</button>
                </p>
                <p>
                  Preço por unidade: {(item.item.price)?.toFixed(2)}
                </p>
                <p>
                  Preço total: {(Number(item.item.price) * item.amount).toFixed(2)}
                </p>
                <br />
              </li>
            )
          })}
          </ul>
        </section>
        <section>
          Total: {totalPrice.toFixed(2)}
          <button>
            Comprar
          </button>
          <button onClick={() => cartItensDispatch({ type: 'clear' })}>
            Limpar Carrinho
          </button>
        </section>
      </article>
    </main>
  )
}

export default Cart
