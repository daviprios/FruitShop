import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'

import Api from 'api/api'
import FruitCard from 'components/FruitCard'
import { FruitInformation } from 'types/FruitInformation'

const api = new Api()

const Products = () => {
  const [fruits, setfruits] = useState<Array<FruitInformation>>([])

  useEffect(() => {
    api.getAllFruits().then(res => setfruits(res))
  }, [])

  return (
    <main className={styles.page}>
      <section className={styles.fruitSection}>
        {fruits.map((fruit) => {
          return <FruitCard key={fruit.id} fruitInfo={fruit}/>
        })}
      </section>
    </main>
  )
}

export default Products