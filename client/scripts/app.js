// YOUR CODE HERE:
var clearDom = function () {

};

$(document).ready(function(){
  $("#updateButton").on("click", function(){

    app.fetch();
  });
  $('#send .submit').on('click', function(e){
    // thisInstance.handleSubmit($("#message").val());
    e.preventDefault();
    app.handleSubmit("hello");
  });

  // $("#submit").on('click', function(){

  //   var msg = $('#message').val();
  //   app.send(msg);
  // });

  $(".username").on("click", function(){
    thisInstance.addFriend($(this).text());
  });
});

window.app = {
  init: function(){
    this.fetch();
  },
  send: function(message){
    $.ajax({
    // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent' + data);
        //this.results.push(message);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  fetch: function(){
    var thisInstance = this;
    $.ajax({
    // always use this url
      // url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt&limit=100',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        //data is an object with attr results, which is an array
        //console.log('chatterbox: Message received' + data);
        thisInstance.clearMessages();
        for (var i=0; i < data.results.length; i++){
          var obj = data.results[i];
          thisInstance.addMessage(obj);
        }

      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });
  },

  clearMessages: function(){
    $('#chats').children().remove();
  },

  addMessage: function(message){
    var msgDiv = $("<div/>", {
      class: "message"
    });
    var username = $("<div/>", {
      class: "username",
      text: message.username
    });
    var userTextDiv = $("<div/>", {
      class: "userText",
      text: message.text
    });
    msgDiv.append(username);
    msgDiv.append(userTextDiv);
    $('#chats').append(msgDiv);
  },

  addRoom: function(roomName){
    $("#roomSelect").append('<option value="'+roomName+'">'+roomName+'</option>');

  },

  addFriend: function(userName){

  },

  handleSubmit: function(message){
    console.log("handling submit!")
  }
};
