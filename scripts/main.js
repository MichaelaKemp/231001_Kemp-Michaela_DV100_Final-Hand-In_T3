const cruiseTripItems = [
    {
      title: "Tropical Island Getaway",
      description: "Escape to a paradise island with white sandy beaches, turquoise waters, and vibrant marine life.",
      image: "tropical-island.jpeg"
    },
    {
      title: "Historical Port Exploration",
      description: "Discover the history and culture of charming port cities through guided tours and local experiences.",
      image: "historical-port.jpeg"
    },
    {
      title: "Culinary Cruise Delights",
      description: "Savor a culinary journey on the high seas with gourmet dining, cooking classes, and wine tastings.",
      image: "culinary-cruise.jpeg"
    },
    {
      title: "Ocean Adventure Activities",
      description: "Experience thrilling ocean activities such as snorkeling, scuba diving, and jet skiing.",
      image: "ocean-adventure.png"
    },
    {
      title: "Relaxing Spa and Wellness",
      description: "Indulge in relaxation with onboard spa treatments, yoga classes, and serene ocean views.",
      image: "spa-wellness.jpeg"
    }
]



$(document).ready(function(){

    loadTrips();
}); 

function loadTrips() {
    for (let i = 0; i < cruiseTripItems.length; i++) {
        const tripItem = cruiseTripItems[i]; // Rename variable here
        

        $("#tripsContainer").append($("#tripCardTemplate").html())

        let currentChild = $("#tripsContainer").children().eq(i + 1);

        $(currentChild).find(".card-img-top").attr('src', '../assets/' + tripItem.image);
        $(currentChild).find("#titleText").text(tripItem.title);
        $(currentChild).find("#descriptionText").text(tripItem.description);
        $(currentChild).find("#descriptionText").hide();
    }
}



$("#tripsContainer").on('click', '.card', function(){

    $(this).find("#descriptionText").toggle();
  
    $(this).find(".card-img-top").toggleClass("small");
  
  })
  
  $(document).ready(function() {
    $(document).on('click', '.remove-btn', function() {
      $(this).closest('tr').remove()
    })
  })