//
//id searchTerm
//id numRecords
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var runSearch = document.getElementById("runSearch");
var searchResults = document.getElementById("searchResults");


var authKey = "asylPdckpAcAYu6xj2PTfCgG2Boqaeko";

var queryTerm 	= "";
var numResults 	= 0;
var startYear 	= 0;
var endYear		= 0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

// Array to hold the various article info
var articleCounter = 0;

// FUNCTIONS


// This runQuery function expects two parameters (the number of articles to show and the final URL to download data from)
function runQuery(numArticles, queryURL){

	// The AJAX function uses the URL and Gets the JSON data associated with it. The data then gets stored in the variable called: "NYTData"
	$.ajax({url: queryURL, method: "GET"}) 
		.then(function(NYTData) {
      //log the result to console to prove we are getting it.
      //console.log(JSON.stringify(NYTData));

      // Here we are logging the URL so we have access to it for troubleshooting
      console.log(NYTData);

			// Loop through and provide the correct number of articles
			for (var i=0; i<numArticles; i++) {
        // Add to the Article Counter (to make sure we show the right number)
        articleCounter++;
        var headlineData = NYTData.response.docs[i].headline.main;
        var pubDateData = NYTData.response.docs[i].pub_date;
        var byData = NYTData.response.docs[i].byline.original;
        var urlData = NYTData.response.docs[i].web_url;

        console.log(headlineData);
        console.log(pubDateData);
        console.log(byData);
        console.log(urlData);



        var curArticle = $("<div>");
        curArticle.addClass("card");

        //curArticle.append( $("<h2>"+headline+"</h2>"));
        curArticle.append( $('<span class="float-left bg-primary text-light">'+articleCounter+"<span>"));
        curArticle.append( $("<h2>"+headlineData+"<h2>"));
        curArticle.append( $("<span>"+byData+"<span>"));

        $("#searchResults").append(curArticle); 
      }
		});

}

// METHODS
// ==========================================================
	
	// On Click button associated with the Search Button
	$('#runSearch').on('click', function(event){
    event.preventDefault();
		// Initially sets the articleCounter to 0
		articleCounter = 0;

		// Empties the region associated with the articles
		$("#searchResults").empty();

		// Search Term
		var searchTerm = $('#searchTerm').val().trim();
		queryURL = queryURLBase + searchTerm;

		// Num Results
		numResults = $("#numRecords").val();

		// Start Year
    startYear = $('#startYear').val()
    if(startYear!=undefined){startYear.trim()};

		// End Year
    endYear = $('#endYear').val();
    if(endYear!=undefined){startYear.trim()};

		// If the user provides a startYear -- the startYear will be included in the queryURL
		if (parseInt(startYear)) {
			queryURL = queryURL + "&begin_date=" + startYear + "0101";
		}

		// If the user provides a startYear -- the endYear will be included in the queryURL
		if (parseInt(endYear)) {
			queryURL = queryURL + "&end_date=" + endYear + "0101";
		}

    console.log(numResults +" | "+ queryURL);
		// Then we will pass the final queryURL and the number of results to include to the runQuery function
		runQuery(numResults, queryURL);

		// This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
		return false;
	});	



// This button clears the top articles section
$('#clearAll').on('click', function(){
	articleCounter = 0;
	searchResults.empty();
})
