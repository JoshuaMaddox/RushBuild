import React, { Component } from 'react'
import BeerStore from '../stores/BeerStore'

export default class CompName extends Component {
  constructor() {
    super();
    this.state = {
      allBeer: BeerStore.getAllBeers()
    }
  }

  componentWillMount() {
    BeerStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    BeerStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({ 
      allBeer: BeerStore.getAllBeers()
    })
  }

  render() {

    const { allBeer } = this.state
    let beerDisplay;
    if(allbeer){
      console.log('I am allBeer in the component: ', allBeer)
      beerDisplay = (
        <div className="row" key={allBeer.id}>
          <h3>{allBeer.name}</h3>
          <p>{allBeer.description}</p>
          <p>{allBeer.rank}</p>
          <button id='beerBtn' type="submit" 
                data-name={allBeer.name} 
                data-desc={allBeer.description} 
                data-id={allBeer.id}
                data-rank={allBeer.rank}>
                Delete This Beer
          </button>
          
          {sampled ? (
          <div>
          </div>): <button id={allBeer.id} ref='favBeer' onClick={this.sampledTrue}>Have You Sampled This Beer?</button>}

        </div>
      )
    } else {
      beerDisplay = <div></div>
    }

    return (

    )
  }
}
