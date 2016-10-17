import axios, { get, put, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  getBeer(){ 
    get('/beer')
      .then(res => {
        let { data } = res
        ServerActions.receiveBeer(data.data)
      })
      .catch(console.error)
  },

  submitNewBeer(beerObj){
    const { id, name, description, rank } = beerObj
    put(`/beer/new?name=${name}&id=${id}&description=${description}&rank=${rank}`)
    .then(res => {
      let { data } = res
      ServerActions.receiveAllBeers(data)
    })
  }

}

export default API



