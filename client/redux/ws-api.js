'use strict';

let connection = new WebSocket('ws://localhost:8080/', ['soap', 'xmpp']);

// When the connection is open, send some data to the server
connection.onopen = function () {
  connection.send('Ping'); // Send the message 'Ping' to the server
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};


connection.onmessage = function (e) {
   console.log(e.data);
};    

let something = "Tanya";

export default something;