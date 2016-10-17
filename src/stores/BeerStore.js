import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import {  browserHistory } from 'react-router'

let _randomBeer;
let _allBeers


class BeerStore extends EventEmitter {
  constructor(){
    super()
    AppDispatcher.register(action => {
      switch(action.type) {
        case 'BEER_RECEIVED':
          _randomBeer = action.payload.beerData 
          this.emit('CHANGE')
          // browserHistory.push('/image/translation')
          break
        case 'ALL_BEERS_RECEIVED':
          _allBeers = action.payload.allBeers 
          this.emit('CHANGE')
          break
      }
    })
  }
  
  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }

  getBeer(){
    return _randomBeer
  }

  getAllBeers(){
    return _allBeers
  }
}

export default new BeerStore