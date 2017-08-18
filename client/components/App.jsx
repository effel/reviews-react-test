 
import React from 'react';
import dateFormat from 'dateformat';
import ShowAverage from './ShowAverage.jsx';

import './App.scss';

const itemPagedNumber = 10;

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
       filterArr: [],
       filterLabel:  ''    
    };
    this.handlePaging = this.handlePaging.bind(this); 
    this.filteringItems = this.filteringItems.bind(this);     
    this.clearFilter = this.clearFilter.bind(this);     
    this.showHideDropDown = this.showHideDropDown.bind(this);     
    this.sortingData = this.sortingData.bind(this);      
  }  


    handlePaging() {
      let something = pagination(0, itemPagedNumber, this.state.repoStatic);
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
      this.setState({
          repo: filterArray(this.state.repoStatic, targetText,'traveledWith'),
          dropdownShow: '',
          filterLabel: targetText
      });        
    }  

    clearFilter(event) {
      this.setState({
          repo: this.state.repoStatic,
          dropdownShow: '',
          filterLabel: ''
      });        
    }  

    sortingData(event) {
     let arr = this.state.repoStatic; 
     let targetAttrDate = event.target.getAttribute('data-sort');
     let prop = targetAttrDate==='travelDate' ? 'travelDate' : 'entryDate';

     arr.forEach((x) => {
        x.entryDate = new Date(x.entryDate);
        x.travelDate = new Date(x.travelDate);   
        return  x;
      });  

      arr.sort((date1, date2) => {
        return date1[prop] - date2[prop];
      })      

     arr.forEach((x) => {
        x.entryDate = x.entryDate.toString();
        x.travelDate =x.travelDate.toString();   
        return  x;
      });       

      this.setState({
          repo: arr
      });        

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


      // this.state.repo.forEach(function(elem) {
      //   elem.entryDate = (dateFormat(elem.entryDate,"dd/mm/yyyy")).toString();
      //   elem.travelDate = (dateFormat(elem.travelDate,"dd/mm/yyyy")).toString();
      //   return  elem;
      // });  

     this.state.repo.forEach(function(x) {
        x.entryDate = new Date(x.entryDate).toString();
        x.travelDate = new Date(x.travelDate).toString();   

         return  x;
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
          <div  className="col-sm-4">
               <div className="dropdown pull-left filter-drop">
                  <button className= "btn btn-default dropdown-toggle" type="button" onClick={this.showHideDropDown}>
                    Filter Travel With {this.state.filterLabel} <span className="caret"></span>
                  </button>
                  <ul className={'dropdown-menu ' + this.state.dropdownShow} aria-labelledby="dropdownMenu1"  >                  
                   {dropDownTravelWithItems}
                  </ul>                  
                </div>
              <button type="button" className="btn btn-danger btn-sm" onClick={this.clearFilter}>Clear Filter</button>                
          </div>
          <div  className="col-sm-4 text-center">        
            <button type="button" className="btn btn-primary btn-sm"  onClick={this.handlePaging}>Paging</button>
          </div>  
          <div  className="col-sm-4">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary btn-sm"  data-sort='travelDate' onClick={this.sortingData}>Sorting Travel date</button>
              <button type="button" className="btn btn-primary btn-sm"  data-sort='reviewDate' onClick={this.sortingData}>Sorting Review date</button>
            </div>
          </div>          
        </div> 

        {listItems}

      </div>
    );
  }
}

export default App;

