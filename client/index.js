import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import App from './components/App.jsx';
import Details from './components/Details.jsx'

ReactDOM.render( <BrowserRouter>
   <Switch>
     <Route exact  path="/" component={App}/>
     <Route path="/Detailed/:id" component={Details}/>  
     <Route path="/" component={App}/>    
   </Switch> 
  </BrowserRouter>, document.getElementById('root'));