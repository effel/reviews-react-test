
import connection from '../redux/ws-api'
import { createStore } from 'redux'


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
    setTimeout(() => { connection.send(action.data)}, 0);
  }
  return state;
}

let store = createStore(dataReducer);

export {store, getData};