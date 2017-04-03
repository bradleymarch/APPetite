$(function() {

  //$(".js-home-view").hide();
  $(".js-home-view").show();
  $(".js-details-view").hide();
  $(".js-results-view").hide();

  var DATA_GOV_API_KEY = "ts2aIGdCnhQMCUyO4jLJArVfM04Wwe0AehE1PsVB";
  var SEARCH_API_URL = "https://api.nal.usda.gov/ndb/search/?format=json&sort=n&max=10&offset=0&api_key=API_KEY" + DATA_GOV_API_KEY + "&q=SEARCH_QUERY";
  var SINGLE_FOOD_API_URL = "https://api.nal.usda.gov/ndb/search/?format=json&sort=n&max=10&offset=0&api_key=DEMO_KEY&q=cheese" + DATA_GOV_API_KEY + "&q=SEARCH_QUERY";
//these get the nutrients we want to display //Calories, protein, fat, carb, fiber, sugars
//produces the total amount in Calories for 1, and in grams for 4, 5, 6, 7, 8
 /* var Calories = report.food.nutrients[1].measures[0].value;
  var protein = report.food.nutrients[3].measures[0].value;
  var fat = report.food.nutrients[4].measures[0].value;
  var carb = report.food.nutrients[6].measures[0].value;
  var fiber = report.food.nutrients[7].measures[0].value;
  var sugar = report.food.nutrients[8].measures[0].value;
*/
//Click on "Vitamins?" (at the bottom of nutrients grid) link to be transported to USDA page For breakdown of vitamins for that food
// state section of the code
  var state = {

  selectedFood: null,
/*
  searchResults: []
*/
};
//state modification 
  var foodData = response.report.food;

  var foodName = foodData.name;

  var foodNutrients = foodData.nutrients.map(function(item) {

    return {
      name: item.name,
      value: item.measures[0].value,
  };
});

state.selectedFood = {

  name: foodName,
  nutrients: foodNutrients,
};

//state rendering functions
function onSearch(searchQuery) {

  $.getJSON(SEARCH_API_URL, function(response) {
    state.searchResults = response.list.item;

  });
}
//used to be...search-result as the class...does search-result need to be changed?  to "js-results-view"
function renderSearchResult(data) {
  return '<li class="js-results-view" data-ndbno="' + data.ndbno +
    '">' + data.name + '</li>';
}

function displaySearchResults() {
  var resultsMarkup = 
    state.searchResults.map(renderSearchResult);

    //$(".js-hidden").hide().removeClass(hide)
   // this isn't doing what I want it to do $(".js-hidden").hide().remove();
   //.toggle instead?
}
//event listeners
$('.js-results-view').on('click', function(event) {

  event.preventDefault();
    
    $(".js-home-view").show();
    $(".js-details-view").hide();
    $(".js-results-view").show();
    var $target = $(event.currentTarget);
    var ndbno = $target.attr('data-ndbno');
    onSearch(searchQuery);
    renderSearchResult(data);
    });
  });
   
$(".js-details-view").on("click", function(event) {

    event.preventDefault();

    $(".js-home-view").hide();
    $(".js-details-view").show();
    $(".js-results-view").hide();

  $.getJSON(SINGLE_FOOD_API_URL, { ndbno: ndbno }, 
      function(repsonse) {

        var foodData = repsonse.report.food;
        var foodName = foodData.name;
        var foodNutrients = foodName.foodData;
        displaySearchResults();

   });

 /*   foodData.nutrients.map(function(item) {
      return {
        name: item.name,
        value: item.measures[0].value,

      }});

    state.selectedFood = {
      name: foodName,
      nutrients: foodNutrients,
      };
*/
});
  
   



/*
//view home has the title and the subtitle for the search, search box, submit
//form submit handler
//console.log
//select form using jQuery
//grab search bar
  function searchUSDA () {
// gets data from database when searched
 // }

 // function displayResults() {
//Displays top 10 results
 // }

 // function getDetailsOfResult() {
//gets details of food selected, when clicked
//takes us to the 2nd view, view-details
//has a title of the food as the main title (unhides it)
//has 3 columns, 1st column is nutrient, 2nd is unit of measurement, 3rd is how much in the food (total, or serving i.e. 1 cup, depending on the food)
//hides search box
//unhides search box at top of page

//  }

 // function loadMoreResults() {
 //gets next 10 results to the DOM that you can click on, updates the state}

//APPetite Logo will remain in upper left corner always, takes u to the home screen  }

}

//FORM submit handler
$(".js-search-form").on("submit", function(event) {
  event.preventDefault();

  var searchForm = $(event.currentTarget);

  var searchText = searchForm.find(".js-search-text").val();

  //console.log(searchText);  
})



}); */