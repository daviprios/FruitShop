import React, { useContext, useEffect, useState } from 'react'

import { ShoppingCartContext, ShoppingCartItem } from 'components/ShoppingCart'
import { fruitPriceCalculator } from 'util/fruitPriceCalculator'

const Cart = () => {
  const {state: cartItens, dispatch: cartItensDispatch} = useContext(ShoppingCartContext)
  
  const getCartItens = () => {
    let itens: Array<ShoppingCartItem> = []
    if(typeof(cartItens) !== 'undefined') for(const [, value] of Object.entries<ShoppingCartItem>(cartItens)) itens.push(value)
    return itens
  }

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
            {getCartItens().map((item) => {
              cartItensDispatch({ type: 'price', item: item.item, amount: 0 })
              const fruitPrice = fruitPriceCalculator(item.item)
              const total = (Number(fruitPrice) * item.amount).toFixed(2)

              return (
                <li key={item.item.id}>
                  {item.item.name} - {item.amount}
                  <p>
                    Preço por unidade: {fruitPrice}
                  </p>
                  <p>
                    Preço total: {total}
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
