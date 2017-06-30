 
import React from 'react';

import {store, getData} from '../redux/store';

import './App.scss';

let activateLasers = () => {
        store.dispatch(getData('Tanya')); 
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }  



  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello Tanya</h1>
        <button onClick={activateLasers()}>Send</button>
        
      </div>);
  }
}