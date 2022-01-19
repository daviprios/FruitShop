import React, { useContext } from 'react'

import { ShoppingCartContext, ShoppingCartItem } from 'components/ShoppingCart'

const Cart = () => {
  const {state: cartItens, } = useContext(ShoppingCartContext)

  const getCartItens = () => {
    let itens: Array<ShoppingCartItem> = []
    for(const [, value] of Object.entries<ShoppingCartItem>(cartItens)) itens.push(value)
    return itens
  }

  return (
    <main>
      <article>
        <section>
          <ul>
            {getCartItens().map((item) => 
              <li key={item.item.id}>
                {item.item.name} - {item.amount}
              </li>
            )}
          </ul>
        </section>
        <section>
          Total
        </section>
        <section>
          Comprar
        </section>
      </article>
    </main>
  )
}

export default Cart
