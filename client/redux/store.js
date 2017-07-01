import { createStore } from 'redux'
import connection from '../redux/ws-api'

let setData = (data) => {
    return {
      type: 'SET_DATA',
	  data
    }
};

let dataReducer = (state = {}, action) => {

  if (action.type === 'SET_DATA') {
     connection.onmessage = function (e) {
       store.dispatch({type: "SAVE_DATA", data: e.data});
     }; 	  
  }   
  if (action.type === 'SAVE_DATA') {
        const item = action.data; 
		const newarr = state.dataArr ? [...state.dataArr, action.data] : [];
	   return {
		   ...state,
		   dataArr: newarr,
		   item
	   }	  
  }
  return state;
}

let store = createStore(dataReducer);

export {store, setData};