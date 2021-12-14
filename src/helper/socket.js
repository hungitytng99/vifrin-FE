export const stompConfig = {
  // Typically login, passcode and vhost
  // Adjust these for your broker
  connectHeaders: {
    Authorization:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodW5nIiwicm9sZXMiOlsiVVNFUiJdLCJpc3MiOiJodHRwOi8vMTkyLjE2OC4xLjY6OTAwNC9hdXRoL2xvZ2luIiwiZXhwIjoxNjQwMDgwOTExfQ.KBEg63dR5KJKiRzTzxsFCOJ7zuHEqWe644BZtvVm3iI",
  },

  // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
  brokerURL: "http://localhost:9006/vifrin/cmt",

  // Keep it off for production, it can be quit verbose
  // Skip this key to disable
  debug: function (str) {
    console.log("STOMP: " + str);
  },

  // If disconnected, it will retry after 200ms
  reconnectDelay: 200,

  // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
  onConnect: function (frame) {
    // The return object has a method called `unsubscribe`
    console.log("CONNECT TO COMMENT SOCKET");
  },
};

// function onConnected() {
//   // Subscribe to the Public Topic
//   stompClient.subscribe('/topic/public', onMessageReceived);

//   // Tell your username to the server
//   stompClient.send("/app/chat.register",
//       {},
//       JSON.stringify({sender: username, type: 'JOIN'})
//   )

//   connectingElement.classList.add('hidden');
// }


// function onError(error) {
//   connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
//   connectingElement.style.color = 'red';
// }


// function send(event) {
//   var messageContent = messageInput.value.trim();

//   if(messageContent && stompClient) {
//       var chatMessage = {
//           sender: username,
//           content: messageInput.value,
//           type: 'CHAT'
//       };

//       stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
//       messageInput.value = '';
//   }
//   event.preventDefault();
// }
