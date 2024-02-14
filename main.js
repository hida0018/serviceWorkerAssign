document.addEventListener("DOMContentLoaded", () => {
  getData();

  handleCardClicks();

  receiveMessageFromSW();

  const showAllUsersButton = document.getElementById("showAllUsersButton");

  showAllUsersButton.addEventListener("click", showAllUsers);
});

function showAllUsers() {
  // Reset the URL hash
  location.assign("#");

  // Refresh the page
  location.reload();
}

(function registerSW() {
  //IIFE
  //onDOMContentLoaded script

  navigator.serviceWorker.register("/sw.js").then((reg) => {
    console.log("Service worker registered");
    console.log({ reg });
  });

  navigator.serviceWorker.ready.then((reg) => {
    console.log(reg.active);
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
  const fullName = `${user.first_name} ${user.last_name}`;

  const card = document.createElement("li");

  card.classList.add("card");

  card.setAttribute("data-uid", user.uid); // Set data-uid attribute to user's UID

  // Card Data Text
  card.innerHTML = `
      <img src="${user.avatar}" alt="${fullName}'s Avatar">
      <h3>${fullName}</h3>
      <p>Email: ${user.email}</p>
      
    `;

  card.addEventListener("click", function () {
    showCards(user.uid);
  });

  // Append card to cards UL
  document.getElementById("cards").appendChild(card);
}

function handleCardClicks() {
  document.getElementById("cards").addEventListener("click", function (event) {
    // Check if the clicked element is a card li element
    if (
      event.target.tagName === "LI" &&
      event.target.classList.contains("card")
    ) {
      // Get the id from the data-uid attribute of the clicked card element
      const clickedId = event.target.getAttribute("data-uid");

      // call the showCards function with the clickedId
      showCards(clickedId);
    }
  });
}

function showCards(clickedId) {
  // Get all cards & loop thru them
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    // Check if the card's data uid matches the clickedId
    if (card.dataset.uid === clickedId) {
      card.style.display = "block"; // Show the clicked card
    } else {
      card.style.display = "none"; // Hide other cards
    }
  });

  // Update URL hash with the clickedId
  location.assign("#" + clickedId);

  // Next is the popstate event
  window.dispatchEvent(new Event("popstate"));

  sendMessageToSW(clickedId);
}

function sendMessageToSW(hash) {
  navigator.serviceWorker.controller.postMessage({ hash });
}

function receiveMessageFromSW() {
  window.addEventListener("message", function (event) {
    if (event.data && event.data.hash) {
      const hash = event.data.hash;
      // Call a function to handle the received hash from the service worker
      handleReceivedHash(hash);
    }
  });
}

function handleReceivedHash(hash) {
  // Handle the received hash.. im not sure how to implement this Professor

  console.log("Received hash from service worker:", hash);
}
