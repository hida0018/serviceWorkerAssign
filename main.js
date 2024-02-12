//register the service worker and add message event listener
//listen for navigation popstate event
//get the data for the page
//add click listener to #cards

document.addEventListener("DOMContentLoaded", () => {
  getData();
  registerSW();
});

(function registerSW() {
  //IIFE
  //onDOMContentLoaded script

  navigator.serviceWorker.register("/sw.js").then((reg) => {
    console.log("Service worker registered");
    console.log({ reg });
  });

  navigator.serviceWorker.ready.then((reg) => {
    console.log(reg.active); //the current active service worker
  });
})();

function getData() {
  console.log("Fetching data...");
  fetch("https://random-data-api.com/api/v2/users?size=20")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((user) => {
        createCard(user);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function createCard(user) {
  console.log(user);
  // We're creating a card element
  const card = document.createElement("li");
  card.classList.add("card");

  const fullName = `${user.first_name} ${user.last_name}`;

  // Card Data Text
  card.innerHTML = `
        <li data-uid="${user.uid}">
          <img src="${user.avatar}" alt="${fullName}'s Avatar">
          <h3>${fullName}</h3>
          <p>Email: ${user.email}</p>
          <!-- Add other user properties as needed -->
        </li>
      `;

  // Append card to cards UL
  document.getElementById("cards").appendChild(card);
}
//   function handleCardClicks() {}

//   function showCards() {}

//   function sendMessageToSW() {}

//   function receiveMessageFromSW() {}
// });
