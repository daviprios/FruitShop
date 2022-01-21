import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'

import Api from 'services/api/api'
import FruitCard from 'components/FruitCard'
import { FruitInformation } from 'types/FruitInformation'

const api = new Api()

const Products = () => {
  const [fruits, setfruits] = useState<Array<FruitInformation>>([])

  const refreshFruits = () => { api.getAllFruits().then(res => setfruits(res)) }

  useEffect(() => { refreshFruits() }, [])

  return (
    <main className={styles.page}>
      <section className={styles.fruitSection}>
        {fruits.length <= 0 ? <button className={styles.refreshButton} onClick={refreshFruits}>Refresh</button> : <></>}
        {fruits.map((fruit) => {
          return <FruitCard key={fruit.id} fruitInfo={fruit}/>
        })}
      </section>
    </main>
  )
}

export default Products