var chat={};
chat.memory = null;
chat.room = undefined;
chat.userName = null;
chat.alreadyRan = false;

// if(!/(&|\?)username=/.test(window.location.search)){
//   var newSearch = window.location.search;
//   if(newSearch !== '' & newSearch !== '?'){
//     newSearch += '&';
//   }
//   chat.userName = prompt('What is your name?') || 'anonymous';
//   newSearch += 'username=' + (chat.userName);
//   window.location.search = newSearch;
// } else {
//   chat.userName = window.location.href.split("?")[1].split("=")[1];
// }

// $.ajaxPrefilter(function(settings, _, jqXHR) {
//   jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
//   jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
// });

$(document).ready(function(){
  chat.Message = Backbone.Model.extend({
  });

  chat.MessageStore = Backbone.Collection.extend({
    model: chat.Message,
    url: "http://127.0.0.1:8081/classes/messages"
  });

  chat.latestMessages = new chat.MessageStore();

  chat.updater = function(){
    chat.latestMessages.fetch({success: function(){chat.view.render();}});
  };

  chat.MessageView = Backbone.View.extend({
    template: _.template('<li class ="message"><%= username %>: <%= text %></li>'),
    render: function(){
      chat.data = chat.latestMessages.map(function(message){return message;});
      _.each(chat.data,function(value){
        this.$el.append(this.template(value.attributes));
      }, this);
    }
  });

  chat.SendView = Backbone.View.extend({
    events:{"click #submitbtn":"handleNewMessage"},
    handleNewMessage: function(event){
      event.preventDefault();
      chat.latestMessages.create({
        text: $('#submittext').val(),
        username: chat.userName
      });
    }
  });
  chat.view = new chat.MessageView({el:$('#chatWindow')});
  chat.sendview = new chat.SendView({el:$('#sendMessages')});

  //   $('.home').click(function(){
  //   chat.room = undefined;
  //   $('#chatWindow').empty();
  // });
  // $('.room').click(function(){
  //   chat.room = $('#roomform').val();
  //   $('#chatWindow').empty();
  //   event.preventDefault();
  // });
  // $('#chatWindow').on('click',function(event){
  //   $('.'+event.target.classList[1]).addClass('friend');
  // });
  // $('#submitbtn').on('click', function(){
  //   event.preventDefault();
  //   chat.messageObject = {
  //     username: chat.userName,
  //     text: $('#submittext').val(),
  //     roomname: chat.room
  //   };

});

function ratchetmessages(){
    messageObject ={
      username: "Chief Keef",
      text: "Where all the spambot shawties at?"
    };
    sendText = JSON.stringify(messageObject);
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:8081/classes/messages',
      data: sendText,
      contentType: 'application/json'
    });
}
setInterval(ratchetmessages,5000);
setInterval(function(){
  chat.updater();
},5000);