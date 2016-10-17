import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Layout from './components/Layout';
import RandomBeer from './components/RandomBeer'
import AllBeers from './components/AllBeers'


render(
  <div className="container">
    <Router history = {browserHistory}>
      <Route path = '/' component = {Layout}/>
      <Route path = '/beer' component = {RandomBeer}/>
      <Route path = '/beer/all' component = {AllBeers}/>
    </Router>
  </div>,
  document.getElementById('root')  
)

