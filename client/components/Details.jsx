 
import React from 'react';
import { withRouter } from 'react-router-dom';

class DetailesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       ratings: {}
    };
  }  

  componentDidMount() {
      const { match } = this.props;
      fetch("http://localhost:3000/Detailed/" + match.params.id)
      .then((response) => {  
          response.json().then((data) => {  
            
            this.setState({
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
       <h1>Detaled Page</h1>    
    );
  }
}


 export default withRouter(DetailesPage)