 
import React from 'react';
import {connect} from 'react-redux'
import connection from '../redux/ws-api'

import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       inputVal : this.props.item,
       Text: 'default'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }  

  handleInputChange() {
  	setTimeout(() => { connection.send(this.state.inputVal)}, 0);
    this.props.setData(this.state.inputVal);		
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

const mapDispatchToProps = function(dispatch) {
  return {
        setData: (data) => {
            dispatch({type: "SAVE_DATA", data: data});
        }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)