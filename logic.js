var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

$.ajax({
  url: queryURL,
  method: "GET"
})