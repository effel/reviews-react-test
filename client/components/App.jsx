 
import React from 'react';
import {connect} from 'react-redux'
import {store, getData, setData} from '../redux/store';

import './App.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       inputVal : '',
       Text: 'default'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeValue = this.changeValue.bind(this);    
  }  

  handleInputChange() {
  
    store.dispatch(getData(this.state.inputVal)); 
    store.dispatch(setData());    
  }
  
  changeValue(event) {
     var value = event.target.value;
  
  }

  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello Tanya</h1>
        <input type="text" defaultValue={this.state.inputVal} onBlur = {this.changeValue}/>
        <button onClick={this.handleInputChange}>Send</button>
        <p>{this.state.Text}</p>
      </div>);
  }
}