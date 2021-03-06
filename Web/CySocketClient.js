/*
  CyKITv2 
  Cy.SocketClient.js 2017.12
  ============================
  Written by Warren
  
  CyKITv2 CyWebSocket client for dispatching event-driven data to emotiv.py
*/

function CySocketClient(ip, port, query) {
  var _this = this;
  this.socket = null;
  this.uid = 0;
  this.sign = '';
  this.connect = function () {
    this.socket = new WebSocket('ws://' + ip + ':' + port + '/' + query);
    this.socket.onopen = function () {
      _this.onOpen();
    };
    this.socket.onmessage = function (event) {
      data = event.data;
      data = data.split("<split>");
      _this.uid = data[0];
      _this.sign = data[1];
      text = data[2];
      
      command = text.substring(0, 10);
      if (command === "CyKITv2:::") {
        //_this.onCommand(text); // how did this work before?
        client.onCommand(text);
        return;
      }
      
      if (text !== 'SETUID') {
        _this.onData(text);
      } else {
        _this.onRegist();
      }
    };
    this.socket.onclose = function (event) {
      _this.onClose();
    };
  };
  this.onRegist = function () {
  
  };
  this.onClose = function () {
  
  };
  
  this.onOpen = function () {
    console.log('Socket Open');
  };
  
  this.onData = function (text) {
  
  };
  
  this.sendData = function (text) {
    var data = this.uid + '<split>' + this.sign + '<split>' + text;
    this.socket.send(data);
  };
  
  this.close = function () {
    this.socket.close();
  }
}
