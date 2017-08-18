 
import React from 'react';
import dateFormat from 'dateformat';
import ShowAverage from './ShowAverage.jsx';

import './App.scss';

function filterArray(arrToFilter, itemToCompare,prop) {
 return arrToFilter.filter(function(elem){
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
       repo: [],
       repoStatic: [],
       dropdownShow: '',
       filterArr: []      
    };
    this.handlePaging = this.handlePaging.bind(this); 
    this.filteringItems = this.filteringItems.bind(this);     
    this.showHideDropDown = this.showHideDropDown.bind(this);     
    this.sortingData = this.sortingData.bind(this);      
  }  


    handlePaging() {
      let something = pagination(0, 4, this.state.repo);
            this.setState({
                repo: something
            });      
    
    }  
 
    showHideDropDown() {

      if (this.state.dropdownShow.length === 0) {
            this.setState({
                dropdownShow: 'visible'
            });              
      } else {
            this.setState({
                dropdownShow: ''
            });                 
      }
          
    }  

    filteringItems(event) {
     let targetText = event.target.innerHTML;
     let something = [];
      this.setState({
          repo: filterArray(this.state.repoStatic, targetText,'traveledWith'),
          dropdownShow: ''
      });        
    }  

    sortingData(event) {
     let targetText = event.target.innerHTML;
             
    }     

  componentDidMount() {
      var that = this;
      fetch("http://localhost:3000/reviews")
      .then(  
        function(response) {  
          response.json().then(function(data) {  
            
            that.setState({
                repo: data,
                repoStatic: data
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



      // const sorted = doubles2.sort((date1, date2) => {
      //   return date1.entryDate - date2.entryDate;
      // })
      //   console.log(sorted)

      // const sorted2 = doubles2.sort((date1, date2) => {
      //   return date1.travelDate - date2.travelDate;
      // })

      this.state.repo.forEach(function(elem) {
        elem.entryDate = (dateFormat(elem.entryDate,"dd/mm/yyyy")).toString();
        elem.travelDate = (dateFormat(elem.travelDate,"dd/mm/yyyy")).toString();
        return  elem;
      });  

     var traveledWithArr = this.state.repoStatic.map(function(x) {
        return  x.traveledWith;
     });

     let unique = [...new Set(traveledWithArr)];

     const dropDownTravelWithItems = unique.map((itemName, index ) =>
        <li key={index} ><a href="#" onClick={this.filteringItems}>{itemName}</a></li>
     );  

     const listItems = this.state.repo.map((number, index ) =>
        <div key={index} className="row">
          <div  className="col-sm-12">
               <hr />          
               <label className="text-primary"><small>Id: </small></label> <span>{number.id} </span>         
               <label className="text-primary"><small>Travel with: </small></label> <span>{number.traveledWith} </span>
               <label className="text-primary"><small>General rating: </small></label> <span>{number.ratings.general.general} </span>  
               <label className="text-primary"><small>Travel date: </small></label> <span>{number.travelDate} </span>                 
               <label className="text-primary"><small>Review date: </small></label> <span>{number.entryDate} </span>     
          </div>
        </div>   
     );   
     
    let that = this;

    return (
      <div className="container">
  
        <ShowAverage />

        <div className="row">
          <div  className="col-sm-6">
               <div className="dropdown">
                  <button className= "btn btn-default dropdown-toggle" type="button" onClick={this.showHideDropDown}>
                    Filter Travel With <span className="caret"></span>
                  </button>
                  <ul className={'dropdown-menu ' + this.state.dropdownShow} aria-labelledby="dropdownMenu1"  >                  
                   {dropDownTravelWithItems}
                  </ul>                  
                </div>
          </div>
          <div  className="col-sm-6">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary btn-sm" onClick={this.sortingData}>Sorting Travel date</button>
              <button type="button" className="btn btn-primary btn-sm">Sorting Review date</button>
            </div>
          </div>          
        </div> 
        <button type="button" className="btn btn-primary btn-sm"  onClick={this.handlePaging}>Paging</button>
        {listItems}



      </div>
    );
  }
}

export default App;

