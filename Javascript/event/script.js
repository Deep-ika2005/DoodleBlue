const eventlist = document.getElementById("event-list");
const message = document.getElementById("message");
eventlist.addEventListener("click",function(event){
 const button = event.target.closest(".join-button");
if (button) {
  const eventName = button.previousElementSibling.textContent;
  message.textContent = "You joined: " + eventName;
}
}) ;

