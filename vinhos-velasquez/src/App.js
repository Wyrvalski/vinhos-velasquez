import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Lista from './main/lista'
import MaiorCompra from './main/maiorCompra'
import ClientesFieis from './main/clientesFieis'
import 'bootstrap/dist/css/bootstrap.min.css'

export default props => (
  <Router>
     <Switch>
      <Route exact path='/' component={Lista} />
      <Route path='/maiorCompra' component={MaiorCompra} />
      <Route path='/clientesFieis' component={ClientesFieis} />
    </Switch>
  </Router>
 
)
