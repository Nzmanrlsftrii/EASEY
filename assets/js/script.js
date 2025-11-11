function sendMessage() {
  let input = document.getElementById("userInput").value;
  if (input === "") return;

  let messages = document.getElementById("messages");
  messages.innerHTML += "<div><b>You:</b> " + input + "</div>";

  fetch("process_chat.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "message=" + encodeURIComponent(input)
  })
  .then(res => res.text())
  .then(data => {
    messages.innerHTML += "<div><b>Bot:</b> " + data + "</div>";
  });

  document.getElementById("userInput").value = "";
}
