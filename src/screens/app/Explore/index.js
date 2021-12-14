import React from "react";

function Todos({ match, history }) {
  return (
    <>
      {/* <button style={{marginTop: '100px'}} onClick={() => sendMessage("aaa")}>CLICK ME</button> */}
    </>
  );
}

export default Todos;

// function onConnected() {
//   // Subscribe to the Public Topic
//   stompClient.subscribe("/topic/public", onMessageReceived);

//   // Tell your username to the server
//   stompClient.send(
//     "/app/chat.register",
//     {},
//     JSON.stringify({ sender: username, type: "JOIN" })
//   );

//   connectingElement.classList.add("hidden");
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
