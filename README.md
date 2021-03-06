This is APPetite, the "what's in my food?" APP.

What's great about this is it pulls up food facts for any particular food in a matter of milliseconds using data from the USDA Food Database.

You merely search for a food, the top 10 results pop up, and by selecting a result, you are taken to the nutrient data for
that food result.  All activity remains within a single app URL for this single page app!

This app incorporates HTML, CSS, jQuery, and Javascript

Here is the live link to it: //The old API setup has been reconfigured, so this is currently not live
![Landing Page Photo](/appetiteMobile.png)

Here is the preliminary sketch of the APP architecture:
![User Flow Sketch](/APPetiteSketch.jpg)

Next steps...
    1. A sorting feature will be added for searches
    2. A user may be added for additional perks
    3. Previous search history may be logged for users

Here is some of the Javascript/jQuery code:
```
function displaySearchResults() {
  var resultsMarkup = state.searchResults.map(renderSearchResult);
    $(".js-search-results").html(resultsMarkup.join(""));
  }
function onSearch(searchQuery) {

  $.getJSON(SEARCH_API_URL, { q: searchQuery }, function(response) {
    state.searchResults = response.list.item;
    displaySearchResults();
  });
}
  $('.js-search-form').on('submit', function(event) {
  event.preventDefault();

  $(".js-search-results").removeClass("hidden");
  $(".js-food-name-title").removeClass("hidden");
  var $target = $(event.currentTarget);
  var searchQuery = $target.find(".js-search-text").val();

  onSearch(searchQuery);
});
```
