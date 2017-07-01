 
import React from 'react';
import {connect} from 'react-redux'
import connection from '../redux/ws-api'
import {store, setData} from '../redux/store';

import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       inputVal : store.item,
       Text: 'default'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }  

  handleInputChange() {
  	setTimeout(() => { connection.send(this.state.inputVal)}, 0);
    store.dispatch(setData(this.state.inputVal));		
  }
  
  changeValue(event) {
     var value = event.target.value;
	  this.setState({
        inputVal: value
      });
  }

  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello Tanya</h1>
        <input type="text" defaultValue={this.state.inputVal} onBlur = {this.changeValue}/>
        <button onClick={this.handleInputChange}>Send</button>
        <p>{this.props.item}</p>
        <p>{this.props.dataArrayMaps}</p>		
      </div>);
  }
}

const mapStateToProps = (state) => {
	const dataArrayMaps = state.dataArr || [];
	return {
		dataArrayMaps,
		item: state.item
	}
}

export default connect(mapStateToProps)(App)