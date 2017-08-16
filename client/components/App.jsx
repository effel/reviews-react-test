 
import React from 'react';
import dateFormat from 'dateformat';

import './App.scss';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       ratings: {},
       repo: []
    };
  }  

  componentDidMount() {
      var that = this;
      fetch("http://localhost:3000/ratings")
      .then(  
        function(response) {  
          response.json().then(function(data) {  
            
            that.setState({
                ratings: data
            });  
          });  
        }  
      )  
      .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
      });

      fetch("http://localhost:3000/reviews")
      .then(  
        function(response) {  
          response.json().then(function(data) {  
            
            that.setState({
                repo: data
            });  
          });  
        }  
      )  
      .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
      });

  }

  render() {

      var doubles2 = this.state.repo.map(function(x) {
        x.entryDate = new Date(x.entryDate);
        x.travelDate = new Date(x.travelDate);   

         return  x;
      });

      var doubles3 = this.state.repo.map(function(x) {
         return  x.traveledWith;
      });

      const sorted = doubles2.sort((date1, date2) => {
        return date1.entryDate - date2.entryDate;
      })
        console.log(sorted)

      const sorted2 = doubles2.sort((date1, date2) => {
        return date1.travelDate - date2.travelDate;
      })

      var doubles2 = this.state.repo.map(function(x) {
        x.entryDate = (dateFormat(x.entryDate,"dd/mm/yyyy")).toString();
        x.travelDate = (dateFormat(x.travelDate,"dd/mm/yyyy")).toString();
         return  x;
      });  

      let unique = [...new Set(doubles3)]; 
      console.log(unique)

     const listItems = sorted2.map((number, index ) =>
        <div key={index} className="row">
          <div  className="col-sm-12">
            <p>  {number.travelDate}  </p>
          </div>
        </div>        
     );     
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1>My Bootstrap Page</h1>
          <p>{this.state.ratings.priceQuality}</p>
        </div>      

        {listItems}
      </div>
    );
  }
}

export default App;

