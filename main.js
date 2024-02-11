document.addEventListener("DOMContentLoaded", () => {
  //register the service worker and add message event listener
  //listen for navigation popstate event
  //get the data for the page
  //add click listener to #cards

  (function () {
    //IIFE
    //onDOMContentLoaded script

    navigator.serviceWorker.register("/sw.js").then((reg) => {
      console.log("Service worker reigistered");
      console.log({ reg });
    });

    navigator.serviceWorker.ready.then((reg) => {
      console.log(reg.active); //the current active service worker
    });
  })();
});

function registerSW() {}

function getData() {}

function handleCardClicks() {}

function showCards() {}

function sendMessageToSW() {}

function receiveMessageFromSW() {}
