var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response){
  alert("running api call")
  $("#well-section").append(JSON.stringify(response))
})