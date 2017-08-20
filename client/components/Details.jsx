 
import React from 'react';
import { withRouter } from 'react-router-dom';

class DetailesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       item: { titles:{nl: 'hello'} }
    };
  }  

  componentDidMount() {
      const { match } = this.props;
      fetch("http://localhost:3000/Detailed/" + match.params.id)
      .then((response) => {  
          response.json().then((data) => {  
            
            this.setState({
                item: data
            });  
          });  
        }  
      )  
      .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
      });
  }

  render() {
    const shit = this.state.item.titles.nl.toString();
    return (
      <div className="container">
        <div className="row">
          <div  className="col-sm-12">      
           <h1>{shit}</h1>  
          </div>
        </div>     
      </div>                
    );
  }
}


 export default withRouter(DetailesPage)