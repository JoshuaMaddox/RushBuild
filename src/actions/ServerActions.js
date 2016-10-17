import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveBeer(beerData){
    AppDispatcher.dispatch({
      type: 'BEER_RECEIVED',
      payload: { beerData }
    }) 
  },

  receiveAllBeers(allBeers){
    AppDispatcher.dispatch({
      type: 'ALL_BEERS_RECEIVED',
      payload: { allBeers }
    })
  }
}
export default ServerActions


