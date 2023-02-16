const socket = io();
  $("#chatForm").submit(() => {
    let text = $("#chat-input").val(),
      userName = $("#chat-user-name").val(),
      userId = $("#chat-user-id").val();

    socket.emit("message", {
      content: text,
      userName: userName,
      userId: userId
    });

    $("#chat_input").val("");
    return false;
  });

  socket.on("message", message => {
    displayMessage(message);
    for (let i = 0; i < 2; i++) {
      $(".chat-icon").fadeOut(200).fadeIn(200);
    }
  });

  socket.on("load all messages", data => {
    data.forEach(message => {
      displayMessage(message);
    });
  });

  socket.on("user connected", () => {
    displayMessage({
      userName: "Notice",
      content: `${getCurrentUserName} connect to the chat`
    });
  });

  socket.on("user disconnected", () => {
    displayMessage({
      userName: "Notice",
      content: `${getCurrentUserName} left the chat`
    });
  });

  let displayMessage = message => {
    $("#chat").prepend(
      $("<li>").html(`
				<strong class="message ${getCurrentUserClass(message.user)}">
					${message.userName}
				</strong>: ${message.content}
			`)
    );
  };

  let getCurrentUserName = () => {
    let userName = $("#chat-user-name").val();
    return userName;
  };

  let getCurrentUserClass = id => {
    let userId = $("#chat-user-id").val();
    return userId === id ? "current-user" : "";
  };