import React, { Component } from 'react'
import BeerStore from '../stores/BeerStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row layOutContainer">
        <h1>Beer App</h1>
        <div className="row linkRow">
            <Link to='/beer' className='searchBtnLayout' >GET STARTED</Link>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
  