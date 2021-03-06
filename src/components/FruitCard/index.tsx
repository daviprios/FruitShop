import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.sass'

import { FruitInformation } from 'types/FruitInformation'
import { ShoppingCartContext } from 'components/ShoppingCart'
import { fruitPriceCalculator } from 'util/fruitPriceCalculator'
import ImageRequester from 'services/api/imageRequester'
import FruitCardAddToCart from './FruitCardAddToCart'

const imageRequester = new ImageRequester()

const FruitCard = (props: { fruitInfo: FruitInformation }) => {
  const { fruitInfo } = props
  const cartItensContext = useContext(ShoppingCartContext)

  const [url, setUrl] = useState('')

  useEffect(() => {
  imageRequester.getImage(fruitInfo.name + ' fruit').then(res => {
      setUrl(res)
    })
  }, [fruitInfo.name])

  const [showFruitCardPopup, setShowFruitCardPopup] = useState(false)

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>{fruitInfo.name}</h2>
      <figure className={styles.figure}>
        <img src={url} alt={`imagem de um(a) ${fruitInfo.name}`}/>
      </figure>
      <p className={styles.price}>
        R${fruitPriceCalculator(fruitInfo)}
      </p>
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
      <button className={styles.button} onClick={() => setShowFruitCardPopup(!showFruitCardPopup)}>
        Adicionar ao Carrinho
      </button>
      <FruitCardAddToCart
        show={showFruitCardPopup}
        setShow={setShowFruitCardPopup}
        addToCart={(amount: number) => cartItensContext.dispatch({type: 'add', item: fruitInfo, amount })}
      />
    </section>
  )
}

export default FruitCard
