
import connection from '../redux/ws-api'
import { createStore } from 'redux'


let getData = (data) => {
    return {
      type: 'GET_DATA',
      data       
    }
};

let setData = () => {
    return {
      type: 'SET_DATA'
    }
};

let dataReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA') {
    setTimeout(() => { connection.send(action.data)}, 0);
  }
  if (action.type === 'SAVE_DATA') {
      console.log(action.data);
      
  }
  if (action.type === 'SET_DATA') {
     connection.onmessage = function (e) {
       store.dispatch({type: "SAVE_DATA", data: e.data});
     };    
  }  
  return state;
}

let store = createStore(dataReducer);

export {store, getData, setData};