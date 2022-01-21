import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'

import Api from 'services/api/api'
import FruitCard from 'components/FruitCard'
import { FruitInformation } from 'types/FruitInformation'
import { ReactComponent as Spinner } from 'assets/spinner-solid.svg'

const api = new Api()

const Products = () => {
  const [fruits, setfruits] = useState<Array<FruitInformation>>([])
  const [showRefreshButton, setShowRefreshButton] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  const refreshFruits = () => {
    setShowLoading(true)
    api.getAllFruits()
      .then((res) => {
        setShowRefreshButton(res.length <= 0 ? true : false)
        setfruits(res)
      })
      .catch((err) => {
        setfruits([])
        setShowRefreshButton(true)
      })
      .finally(() => {
        setShowLoading(false)
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
      {showLoading ? <div><Spinner/></div> : <></>}
    </main>
  )
}

export default Products