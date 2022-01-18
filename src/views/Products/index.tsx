import React, { useEffect, useState } from 'react'

import Api, { FruitInformation } from 'api/api'

const api = new Api()

const Products = () => {
  const [fruits, setfruits] = useState<Array<FruitInformation>>([])

  useEffect(() => {
    api.getAllFruits().then(res => setfruits(res))
  }, [])

  return (
    <>
      Products:
      {fruits.map((fruit) => {
        return <div>
          <h1>{fruit.name}</h1>
          <p>{fruit.genus}</p>
          <p>{fruit.family}</p>
          <p>{fruit.order}</p>
          <div>
            <p>
              {JSON.stringify(fruit.nutritions)}
            </p>
          </div>
        </div>
      })}
    </>
  )
}

export default Products