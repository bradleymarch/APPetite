$(function() {
   
   var DATA_GOV_API_KEY = "ajPXxbg5QF2vLNQiTTh3weyQs6lchdkd6rJSEBkw";
   var SEARCH_API_URL = "https://api.nal.usda.gov/ndb/search/?format=json&max=10&offset=0&api_key=" + DATA_GOV_API_KEY;
   var SINGLE_FOOD_API_URL = "https://api.nal.usda.gov/ndb/reports/?format=json&api_key=" + DATA_GOV_API_KEY;
   // console.log(SINGLE_FOOD_API_URL);
   var state = {

    selectedFood: null,

    searchResults: []

  };
  function renderSearchResult(data) {
    return '<li class="search-results-item js-search-results-item" data-ndbno="' + data.ndbno +
    '">' + data.name + '</li>';
  }

  function renderNutrient(nutrientData) {
//wrap in span to do styling for below
return '<li class="nutrient-item js-nutrient-item">' + nutrientData.name + ": " + nutrientData.value + "</li>"
}

function renderFoodDetails() {

  var selectedFood = state.selectedFood
  $(".js-food-name-title").html(selectedFood.name);
  var nutrientMarkup = selectedFood.nutrients.map(renderNutrient);
  $(".js-nutrient-details").html(nutrientMarkup.join(""));

}
function displaySearchResults() {
  var resultsMarkup = state.searchResults.map(renderSearchResult);
/*another way to write this:
    var resultsMarkupItems = state.searchResults.map(...);
    var resultsMarkup = resultsMarkupItems.join('');*/
    $(".js-search-results").html(resultsMarkup.join(""));
  }
//state rendering functions
function onSearch(searchQuery) {
  const q = searchQuery
  $.ajax({
            headers: { "Accept": "application/json"},
            type: 'GET',
            url: "https://api.nal.usda.gov/ndb/search/?format=json&q=" + q + "&max=10&offset=0&api_key=" + DATA_GOV_API_KEY,
            crossDomain: true,
            beforeSend: function(xhr){
                xhr.withCredentials = true;
          },
            success: function(response, textStatus, request){
              state.searchResults = response.list.item;
              displaySearchResults();
            },
            error: function (xhr, status) {
                  console.log(status)
            }
   });

}

  //event listeners
  $('.js-search-form').on('submit', function(event) {
  //this is saying when I click on GO, the follwing with happen
  event.preventDefault();

  $(".js-search-results").removeClass("hidden");
  $(".js-food-name-title").removeClass("hidden");
  var $target = $(event.currentTarget);
  var searchQuery = $target.find(".js-search-text").val();

  onSearch(searchQuery);
});

  $(".js-search-results").on("click", ".js-search-results-item", function(event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    var ndbno = $target.attr('data-ndbno');

    $(".js-home-view").addClass("hidden");
    $(".js-details-view").removeClass("hidden");


    $.getJSON(SINGLE_FOOD_API_URL, { ndbno: ndbno }, function(response) {

      var foodData = response.report.food;
      var foodName = foodData.name;
      var foodNutrients = foodData.nutrients.map(function(item) {
        return {
          name: item.name,
          value: item.measures[0].value + " " + item.unit,
        }

      });

      state.selectedFood = {
        name: foodName,
        nutrients: foodNutrients,

      };

      renderFoodDetails();

    });

      $(".js-back-to-search-results").on("click", function(event) {
      $(".js-home-view").removeClass("hidden");
      $(".js-details-view").addClass("hidden");
    });
  });
});
