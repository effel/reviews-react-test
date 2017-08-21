 
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const LoadingIndicator = () => {
  return (
    <div className="loader"></div>  
  )
}

class DetailesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       item: []
    };
  }  

  componentDidMount() {
      const { match } = this.props;
      let that = this;
      async function fetchAsync() {
          let response = await fetch("http://localhost:3000/Detailed/" + match.params.id);

          let data = await response.json();
          that.setState({
              item: data
          });
          return data;
      }

      fetchAsync();

  }

  render() {
      const detailsHTML =  this.state.item.map((elem, index ) => 
          <div key={index}  className="col-sm-12">      
             <h1>{elem.user}</h1>  
             <hr />
             <small className="text-primary">General rating:  {elem.genRating}</small>
             <h2 className="text-info">{elem.title}</h2>  
             <p>{elem.texts}</p>  
             <h3>Traveled with:  {elem.traveledWith}</h3>                        
          </div>        
      );  

    return (
      <div className="container">
        <div className="row">
           {detailsHTML}
            <hr />
           <Link to={'/'}  className="btn btn-info btn-sm pull-right" >Back</Link>
        </div>     
      </div>                
    );
  }
}


 export default withRouter(DetailesPage)