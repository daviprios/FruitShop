import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'

import Api from 'services/api/api'
import FruitCard from 'components/FruitCard'
import { FruitInformation } from 'types/FruitInformation'

const api = new Api()

const Products = () => {
  const [fruits, setfruits] = useState<Array<FruitInformation>>([])
  const [showRefreshButton, setShowRefreshButton] = useState(false)

  const refreshFruits = () => {
    api.getAllFruits()
      .then((res) => {
        setShowRefreshButton(res.length <= 0 ? true : false)
        setfruits(res)
      })
      .catch((err) => {
        setfruits([])
        setShowRefreshButton(true)
      })
  }

  useEffect(() => { refreshFruits() }, [])

  return (
    <main className={styles.page}>
      <section className={styles.fruitSection}>
        {showRefreshButton ? <button className={styles.refreshButton} onClick={refreshFruits}>Refresh</button> : <></>}
        {fruits.map((fruit) => {
          return <FruitCard key={fruit.id} fruitInfo={fruit}/>
        })}
      </section>
    </main>
  )
}

export default Products