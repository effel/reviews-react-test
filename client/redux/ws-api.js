
let connection = new WebSocket('ws://localhost:8080/', ['soap', 'xmpp']);

import {store} from '../redux/store';


connection.onopen = function () {
  connection.send('Ping'); // 
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};




    
export default connection;