
let connection = new WebSocket('ws://localhost:8080/', ['soap', 'xmpp']);


connection.onopen = function () {
  connection.send('Ping'); // 
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};


connection.onmessage = function (e) {
   console.log(e.data);
};    

    
export default connection;