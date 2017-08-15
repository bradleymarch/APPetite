This is APPetite, the "what's in my food?" APP.

What's great about this is it pulls up food facts for any particular food in a matter of seconds using data from the USDA Food Database.

You merely search for a food, the top 10 results pop up, and by selecting a result, you are taken to the nutrient data for
that food result.  All activity remains within a single app URL for the single page app!

This app incorporates HTML, CSS, jQuery, and Javascript


Here is the live link to it: https://bradleymarch.github.io/APPetite

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
  //this is saying when I click on GO, the follwing with happen
  event.preventDefault();

  $(".js-search-results").removeClass("hidden");
  $(".js-food-name-title").removeClass("hidden");
  var $target = $(event.currentTarget);
  var searchQuery = $target.find(".js-search-text").val();

  onSearch(searchQuery);
});
```
