import React from 'react'
import styles from './index.module.sass'

import { Link, Outlet } from 'react-router-dom'

import { ReactComponent as Home } from 'assets/home-solid.svg'
import { ReactComponent as ShoppingCart } from 'assets/shopping-cart-solid.svg'

import { paths } from 'config/routePaths'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Fruit Shop
        </h1>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link to={paths.home}>
                <Home/>
                Início
              </Link>
            </li>
            <li>
              <Link to={paths.cart}>
                <ShoppingCart/>
                Carrinho
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>
        <Outlet/>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default Layout
