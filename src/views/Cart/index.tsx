import React, { useContext, useEffect, useState } from 'react'

import { ShoppingCartContext } from 'components/ShoppingCart'

import Api from 'api/api'
const api = new Api()

const Cart = () => {
  const [state, dispatch] = useContext(ShoppingCartContext)

  const getValues = async () => {
    let itens: Array<JSX.Element> = []
    const fruits = await api.getAllFruits()
    console.log(fruits)
    console.log(state)
    for (const [key, value] of Object.entries<number>(state)){
      console.log(key)
      itens.push(<li key={key}>
        {fruits.filter((fruit) => {
          console.log(key)
          console.log(fruit.id)
          return Number(key) === fruit.id
        }).map((item) => <span>{item.name} - {value}</span>)}
      </li>)
    }
    return itens
  }

  const [fruits, setFruits] = useState<Array<JSX.Element>>([])

  useEffect(() => {
    getValues()
      .then(res => {
        setFruits(res)
      })
      .catch(err => {
        setFruits([])
      })
  }, [])

  return (
    <main>
      <article>
        <section>
          <ul>
            {fruits}
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
