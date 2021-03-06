import React from 'react'
import { HashRouter as Router, Routes as Switch, Route } from 'react-router-dom'

import { paths } from 'config/routePaths'

import Layout from 'components/Layout'
import Products from 'views/Products'
import Cart from 'views/Cart'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Products/>}/>
          <Route path={paths.cart} element={<Cart/>}/>
          <Route path={paths.details} element={<span>DETALHES</span>}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
