 
import React from 'react';

function getHtmlFromObj(obj) {
  let teml = '';
  for (var key in obj) {
    teml += `<small><span class="text-info">Average of the ${key}:</span> ${obj[key]};</small> `;
  }
  return {__html: teml};
}

class ShowAverage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       ratings: {}
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
  }

  render() {

    return (
        <div className="jumbotron">

          <div className="row">
            <div  className="col-sm-12">
                <h3 className="text-center mb-4"><label className="text-info">Average of the general rating of the accommodation:</label> {this.state.ratings.genRating}</h3>
            </div>
          </div>         
          <div className="row mb-4">
            <div  className="col-sm-12">          
              <div dangerouslySetInnerHTML={getHtmlFromObj(this.state.ratings)} />   
            </div>        
          </div>
          <div className="row">
                <div  className="col-sm-2"><small><strong>Quantity of travellers with family:</strong> <span className="text-info">{this.state.ratings.travelWithFamily}</span> </small></div>
                <div  className="col-sm-2"><small><strong>Quantity of travellers with friends:</strong> <span className="text-info">{this.state.ratings.travelWithFriends}</span> </small></div>                
                <div  className="col-sm-2"><small><strong>Quantity of travellers with partner:</strong> <span className="text-info">{this.state.ratings.travelWithCouple}</span> </small></div>
                <div  className="col-sm-2"><small><strong>Quantity of travellers as single:</strong> <span className="text-info">{this.state.ratings.travelWithSingle}</span> </small></div>
                <div  className="col-sm-2"><small><strong>Quantity of travellers as other:</strong> <span className="text-info">{this.state.ratings.travelWithOthers}</span> </small></div>                
          </div>            
        </div>      

    );
  }
}

export default ShowAverage;

