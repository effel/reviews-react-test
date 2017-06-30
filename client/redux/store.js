import { createStore } from 'redux'
import { something } from '../redux/ws-api'

let getData = (data) => {
    return {
      type: 'GET_DATA',
      data       
    }
};


let dataReducer = (state, action) => {
  if (state === undefined) {
    state = [];
  }
  if (action.type === 'GET_DATA') {
    //connection.send("Tanya");
      console.log(something);
      console.log(action.data);
  }
  return state;
}

let store = createStore(dataReducer);

export {store, getData};