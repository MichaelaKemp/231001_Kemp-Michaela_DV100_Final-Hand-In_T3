const accordions = document.querySelectorAll('.accordion');accordions.forEach(accordion => {
accordion.addEventListener('click', e => {
    accordion.classList.toggle('active');
});
});


const cruiseTripItems = [
  {
      title: "Tropical Island Getaway",
      destination: "Paradise Cove Luau",
      description: "Escape to a paradise island with white sandy beaches, turquoise waters, and vibrant marine life.",
      image: "tropical-island.jpeg",
      duration: "14 days",
      singleDestinations: true,
      multiDestinations: false,
      tripCode: "0001",
      roundTrips: true,
      Price: "R30 000"
  },
  {
      title: "Historical Port Exploration",
      destination: "Lake Garda",
      description: "Discover the history and culture of charming port cities through guided tours and local experiences.",
      image: "historical-port.jpeg",
      duration: "9 days",
      singleDestinations: false,
      multiDestinations: true,
      tripCode: "0002",
      roundTrips: false,
      Price: "R24 000"
  },
  {
      title: "Culinary Cruise Delights",
      destination: "Paris",
      description: "Savor a culinary journey on the high seas with gourmet dining, cooking classes, and wine tastings.",
      image: "culinary-cruise.jpeg",
      duration: "4 days",
      singleDestinations: true,
      multiDestinations: false,
      tripCode: "0003",
      roundTrips: false,
      Price: "R15 000"
  },
  {
      title: "Ocean Adventure Activities",
      destination: "Tropical Marine Sanctuaries",
      description: "Experience thrilling ocean activities such as snorkeling, scuba diving, and jet skiing.",
      image: "ocean-adventure.png",
      duration: "8 days",
      singleDestinations: false,
      multiDestinations: true,
      tripCode: "0004",
      roundTrips: true,
      Price: "R21 000"
  },
  {
      title: "Relaxing Spa and Wellness",
      destination: "Hilo Hawaii",
      description: "Indulge in relaxation with onboard spa treatments, yoga classes, and serene ocean views.",
      image: "spa-wellness.jpeg",
      duration: "11 days",
      singleDestinations: true,
      multiDestinations: true,
      tripCode: "0005",
      roundTrips: false,
      Price: "R17 000"
  }
];
$(document).ready(function () {
  loadTrips(cruiseTripItems);
  var headerName = document.getElementById('name')
    headerName.textContent = 'Welcome to Sinister Solace'
});



$("#allDestinationsButton").on("click", function () {
  const filteredTrips = cruiseTripItems;
  loadFilteredTrips(filteredTrips);
});

$("#shortDurationButton").on("click", function () {
  const filteredTrips = cruiseTripItems.filter(trip => parseInt(trip.duration) <= 5);
  loadFilteredTrips(filteredTrips);
});

$("#longDurationButton").on("click", function () {
  const filteredTrips = cruiseTripItems.filter(trip => parseInt(trip.duration) > 5);
  loadFilteredTrips(filteredTrips);
});

$("#singleDestinationButton").on("click", function () {
  const filteredTrips = cruiseTripItems.filter(trip => trip.singleDestinations);
  loadFilteredTrips(filteredTrips);
});

$("#multiDestinationsButton").on("click", function () {
  const filteredTrips = cruiseTripItems.filter(trip => trip.multiDestinations);
  loadFilteredTrips(filteredTrips);
});

$("#roundTripsButton").on("click", function () {
  const filteredTrips = cruiseTripItems.filter(trip => trip.roundTrips);
  loadFilteredTrips(filteredTrips);
});

$("#rowBoatSpecialButton").on("click", function () {
  const cheapestTrips = cruiseTripItems.sort((a, b) => parseInt(b.Price) - parseInt(a.Price)).slice(0, 5);
  loadFilteredTrips(cheapestTrips);
});

function clearTripCards() {
  const tripsContainer = document.getElementById("tripsContainer");
  const cardElements = tripsContainer.querySelectorAll(".col-4");
  
  cardElements.forEach((cardElement) => {
    tripsContainer.removeChild(cardElement);
  });
}

function loadTrips(trips) {
  for (let i = 0; i < trips.length; i++) {
    const tripItem = trips[i];

    const $template = $($.parseHTML($("#tripCardTemplate").html()));

    $template.find(".card-img-top").attr('src', '../assets/' + tripItem.image);
    $template.find("#titleText").text(tripItem.title);
    $template.find("#destinationText").text(tripItem.destination);
    $template.find("#descriptionText").text(tripItem.description);
    $template.find("#durationText").text(tripItem.duration);
    $template.find("#priceText").text(tripItem.Price);
    $template.find(".ticket").attr('data-trip-id', tripItem.tripCode); // Assign tripCode as data-trip-id
    $template.find("#ticket").hide();
    $template.find("#descriptionText").hide();
    $template.find("#durationText").hide();
    $template.find("#priceText").hide();
    $template.find("#ticket").hide();

    $("#tripsContainer").append($template);
  }
}

$("#tripsContainer").on("click", ".card", function () {
  const $card = $(this);
  const $descriptionText = $card.find("#descriptionText");
  const $durationText = $card.find("#durationText");
  const $priceText = $card.find("#priceText");
  const $ticketButton = $card.find(".ticket");
  const $img = $card.find(".card-img-top");

  const cardState = $card.data("card-state");

  if (cardState === "collapsed") {
      $descriptionText.show();
      $durationText.show();
      $priceText.show();
      $ticketButton.show();
      $img.addClass("small");
      
      $card.data("card-state", "expanded");
  } else {
      
      $card.data("card-state", "collapsed");
  }
});

function loadFilteredTrips(trips) {
  clearTripCards();
  loadTrips(trips);
}
const apiKey = 'bc7d7e4be216ab7a1d364af9277f8ad9';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hawaii&appid=${apiKey}&units=metric`;

const weatherInfoDiv = document.getElementById('weather-info');

async function fetchWeatherData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.weather && data.weather.length > 0) {
      displayWeatherData(data);
    } else {
      weatherInfoDiv.innerHTML = '<p>No weather data available</p>';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfoDiv.innerHTML = '<p>Error fetching weather data</p>';
  }
}

function displayWeatherData(data) {
  const weatherDescription = data.weather[0].description;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;

  const weatherHTML = `
    <p>Weather: ${weatherDescription}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
  `;

  weatherInfoDiv.innerHTML = weatherHTML;
}

fetchWeatherData();


function purchase(){
  alert("Successful Purchase!")
}

$("#tripsContainer").on("click", ".ticket", function () {
  const tripId = $(this).data("trip-id");
  console.log(tripId)

  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

  const selectedTrip = cruiseTripItems.find(trip => trip.tripCode === tripId);

  if (selectedTrip) {
      const ticket = {
          tripId: selectedTrip.tripCode,
          title: selectedTrip.title,
          price: selectedTrip.Price,
      };

      console.log(ticket)

      tickets.push(ticket);

      localStorage.setItem("tickets", JSON.stringify(tickets));

     alert("Ticket purchased successfully!");
  }
});

function displayPurchasedTickets() {
    let purchasedTickets = JSON.parse(localStorage.getItem("tickets"));
    for(let i = 0; i < purchasedTickets.length; i++){
      console.log("Ticket ID: " + purchasedTickets[i].tripId);
      console.log("Title: " + purchasedTickets[i].title);
      console.log("Price: " + purchasedTickets[i].price);

    }
      const table = document.getElementById("table");
      const tbody = table.getElementsByTagName("tbody")[0];

  purchasedTickets.forEach((ticket, index) => {
    const row = tbody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);


    cell1.textContent = purchasedTickets[i].tripId;
    cell2.textContent = purchasedTickets[i].title;
    cell3.textContent = purchasedTickets[i].price;

    const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.dataset.index = index;

        removeButton.addEventListener('click', function () {
            const rowIndex = this.dataset.index; 
            tbody.deleteRow(rowIndex);
            purchasedTickets.splice(rowIndex, 1);
            localStorage.setItem('tickets', JSON.stringify(purchasedTickets));
        });

        cell4.appendChild(removeButton);
    });
}

displayPurchasedTickets();

function removeRow(button) {

  var row = button.parentNode.parentNode;
  
function removeAllRows() {
  var tbody = document.querySelector("#table tbody");

  tbody.innerHTML = "";
}}