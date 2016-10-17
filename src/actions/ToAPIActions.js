import API from '../API'

const ToAPIActions = {
  getBeer(){
    API.getBeer() 
  },

  submitNewBeer(beerObj){
    API.submitNewBeer(beerObj)
  }
}
export default ToAPIActions