import { useState } from "react"
import styles from './index.module.sass'

type addToCartType = (amount: number) => void

const FruitCardAddToCart = (props: { addToCart: addToCartType, setShow: React.Dispatch<React.SetStateAction<boolean>>, show: boolean }) => {
  const { addToCart, setShow, show } = props

  const [amount, setAmount] = useState(1)

  return (
    <section style={{ display: show ? 'block' : 'none' }} className={styles.popup}>
      <div className={styles.closeContainer}>
        <button onClick={() => setShow(false)}>x</button>
      </div>
      <h4>Selecione a quantidade</h4>
      <input className={styles.slider} type='range' min={1} max={15} value={amount} onChange={(event) => setAmount(Number(event.currentTarget.value))}/>
      <input className={styles.amountInput} value={amount} onChange={(event) => setAmount(Number(event.currentTarget.value))}/>
      <button onClick={() => {addToCart(amount); setShow(false)}} className={styles.button}>
        Adicionar
      </button>
    </section>
  )
}

export default FruitCardAddToCart
