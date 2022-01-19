import React, { useContext } from 'react'
import styles from './index.module.sass'

import { FruitInformation } from 'types/FruitInformation'
import { ShoppingCartContext } from 'components/ShoppingCart'

const FruitCard = (props: { fruitInfo: FruitInformation }) => {
  const { fruitInfo } = props
  const cartItensContext = useContext(ShoppingCartContext)

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>{fruitInfo.name}</h2>
      <figure className={styles.figure}>
        <img src='' alt={`imagem de um(a) ${fruitInfo.name}`}/>
      </figure>
      <article>
        <p>
          Preço: R$100,00
        </p>
      </article>
      <article className={styles.details}>
        <h3 className={styles.title}>Detalhes</h3>
        <div className={styles.detailsContainer}>
          <section className={styles.nutrition}>
            <p>
              <span>Calorias: </span>
              <span>{fruitInfo.nutritions.calories}g</span>
            </p>
            <p>
              <span>Carboidratos: </span>
              <span>{fruitInfo.nutritions.carbohydrates}g</span>
            </p>
            <p>
              <span>Gordura: </span>
              <span>{fruitInfo.nutritions.fat}g</span>
            </p>
            <p>
              <span>Proteina: </span>
              <span>{fruitInfo.nutritions.protein}g</span>
            </p>
            <p>
              <span>Açucar: </span>
              <span>{fruitInfo.nutritions.sugar}g</span>
            </p>
          </section>
          <section className={styles.classification}>
            <p>
              <span>Gênero: </span>
              <span>{fruitInfo.genus}</span>
            </p>
            <p>
              <span>Família: </span>
              <span>{fruitInfo.family}</span>
            </p>
            <p>
              <span>Ordem: </span>
              <span>{fruitInfo.order}</span>
            </p>
          </section>
        </div>
      </article>
      <button className={styles.button} onClick={() => cartItensContext.dispatch({type: 'add', item: fruitInfo, amount: 1})}>
        Adicionar ao Carrinho
      </button>
    </section>
  )
}

export default FruitCard
