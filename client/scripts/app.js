
$(document).ready(function(){
  $("#updateButton").on("click", function(){
    app.fetch();
  });

  $('#send').on('submit', function(e){
    e.preventDefault();
    var msgObj = {
      "text": $("#message").val(),
      "username": window.location.search.substr(10),
      "roomname": $('#roomSelect option:selected').val()
    };
    app.handleSubmit(msgObj);
  });

  $('#roomSelect').change(function(){
    var room = $('#roomSelect option:selected').val();
    $('.message:not(.' + room +')').css('display', 'none');
    $("."+room).css("display", "block");
  });
});

window.app = {
  rooms: {},
  init: function(){
    this.fetch();
    $(".username").on("click", function(){
      app.addFriend($(this).text());
    });
  },
  send: function(message){
    $.ajax({
    // always use this url
      url: 'http://127.0.0.1:3000/classes/messages/',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {},
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
      url: 'http://127.0.0.1:3000/classes/messages/',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        var response = data;
        console.log(data);
        //data is an object with attr results, which is an array
        thisInstance.clearMessages();
        for (var i=0; i < response.results.length; i++){
          var obj = response.results[i];
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
      class: "message "+ _.escape(message.roomname)
    });
    var username = $("<div/>", {
      class: "username",
      text: _.escape(message.username)
    });
    var userTextDiv = $("<div/>", {
      class: "userText",
      text: _.escape(message.text)
    });
    msgDiv.append(username);
    msgDiv.append(userTextDiv);
    $('#chats').prepend(msgDiv);
    app.addRoom(message.roomname);
  },

  addRoom: function(roomName){
    var clean =_.escape(roomName);
    //if room doesn't exist
    if (!app.rooms.hasOwnProperty(clean)){
      //add it to the list
      $("#roomSelect").append('<option value="'+clean+'">'+clean+'</option>');
      app.rooms[clean] = true;
    }
  },

  addFriend: function(userName){
    console.log('clicked on username');

  },

  handleSubmit: function(message){
    console.log("handling submit!");
    app.send(message);
  }
};
