import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import { Link, browserHistory } from 'react-router'
import BeerStore from '../stores/BeerStore'
import AllBeers from './AllBeers'

export default class RandomBeer extends Component {
  constructor() {
    super()
    this.state = {
      randomBeer: BeerStore.getBeer(),
      sampled: false
    }
    this.getRandomBeer = this.getRandomBeer.bind(this)
    this.sampledTrue = this.sampledTrue.bind(this)
    this.submitBeer = this.submitBeer.bind(this)
    this._onChange = this._onChange.bind(this)
  }

   componentWillMount() {
    BeerStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    BeerStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({ 
      randomBeer: BeerStore.getBeer()
    })
  }

  sampledTrue(){
    this.setState({
      sampled: true
    })
  }

  submitBeer(e){
    e.preventDefault()
    const { rating } = this.refs
    let beerRank = rating.value
    console.log(beerRank)
    let buttonData = document.getElementById('beerBtn')
    let buttonId = buttonData.dataset.id
    let buttonName = buttonData.dataset.name
    let buttonDesc = buttonData.dataset.desc
    let beerObj = {
      id: buttonId,
      name: buttonName,
      description: buttonDesc,
      rank: beerRank
    }
    ToAPIActions.submitNewBeer(beerObj)
  }

  getRandomBeer(e){
    e.preventDefault()
    console.log('Beer Grabbed')
    ToAPIActions.getBeer()
  }

  render() {

    const { randomBeer, sampled } = this.state
    let beerDisplay;
    if(randomBeer){
      console.log('I am random beer in the component: ', randomBeer)
      beerDisplay = (
        <div className="row" key={randomBeer.id}>
          <h3>{randomBeer.name}</h3>
          <p>{randomBeer.style.description}</p>
          
          {sampled ? (
          <div>
            <form onSubmit={this.submitBeer}>
              <p>Rank This Beer To Add To Sampled List</p>
              <select ref='rating' name="rating" id="beerRating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <button id='beerBtn' type="submit" 
                data-name={randomBeer.name} 
                data-desc={randomBeer.style.description} 
                data-id={randomBeer.id}>
                Submit Ranking
              </button>
            </form>
          </div>): <button id={randomBeer.id} ref='favBeer' onClick={this.sampledTrue}>Have You Sampled This Beer?</button>}

        </div>
      )
    } else {
      beerDisplay = <div></div>
    }

    return (
      <div className="col-sm-8 col-sm-offset-2 searchForm text-center">
        <form onSubmit={this.getRandomBeer}>
          <button type="submit" className="searchBtn">GRAB A BEER</button>
        </form>
        {beerDisplay}
        <div className="row">
          <AllBeers />
        </div>
      </div>
    )
  }
}
