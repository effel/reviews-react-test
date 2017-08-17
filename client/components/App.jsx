 
import React from 'react';
import dateFormat from 'dateformat';
import ShowAverage from './ShowAverage.jsx';

import './App.scss';

function filterArray(arrToFilter, itemToCompare, prop) {
 arrToFilter.filter(function(elem){
    return elem[prop] === itemToCompare;
 });
}

function pagination(startPos, endPos, arr) {
   let sliced = arr.slice(startPos, endPos);
   return sliced;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       repo: []
    };
  }  

  componentDidMount() {
      var that = this;
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

      // var doubles2 = this.state.repo.map(function(x) {
      //   x.entryDate = new Date(x.entryDate);
      //   x.travelDate = new Date(x.travelDate);   

      //    return  x;
      // });

      var doubles3 = this.state.repo.map(function(x) {
         return  x.traveledWith;
      });

      // const sorted = doubles2.sort((date1, date2) => {
      //   return date1.entryDate - date2.entryDate;
      // })
      //   console.log(sorted)

      // const sorted2 = doubles2.sort((date1, date2) => {
      //   return date1.travelDate - date2.travelDate;
      // })

      // var doubles2 = this.state.repo.map(function(x) {
      //   x.entryDate = (dateFormat(x.entryDate,"dd/mm/yyyy")).toString();
      //   x.travelDate = (dateFormat(x.travelDate,"dd/mm/yyyy")).toString();
      //    return  x;
      // });  

      let unique = [...new Set(doubles3)]; 

     let arr = pagination(0, 9, this.state.repo);

     const listItems = arr.map((number, index ) =>
        <div key={index} className="row">
          <div  className="col-sm-12">
               <label className="text-primary"><small>Id: </small></label> <span>{number.id} </span>         
               <label className="text-primary"><small>Travel with: </small></label> <span>{number.traveledWith} </span>
               <label className="text-primary"><small>General rating: </small></label> <span>{number.ratings.general.general} </span>  
               <label className="text-primary"><small>Travel date: </small></label> <span>{number.travelDate} </span>                 
               <label className="text-primary"><small>Review date: </small></label> <span>{number.entryDate} </span>     
               <hr />
          </div>
        </div>   
     );   

    return (
      <div className="container">
  
        <ShowAverage />

        <div className="row mb-4">
          <div  className="col-sm-12">
               <div className="dropdown">
                  <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Filter Travel With
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider" />
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </div>
          </div>
        </div> 

        {listItems}

      </div>
    );
  }
}

export default App;

function getHtmlFromObj(obj) {
  let teml = '';
  for (var key in obj) {
    teml += `<small><span class="text-info">Average of the ${key}:</span> ${obj[key]};</small> `;
  }
  return {__html: teml};
}
