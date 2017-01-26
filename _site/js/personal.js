/* ==================================================================== */
/*
  Show work details
*/

/* Open portfolio more info */
function openPortfolioInfo(id) {
    document.getElementById(id).style.width = "100%";
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
}

/* Close portfolio more info */
function closePortfolioInfo(id) {
    document.getElementById(id).style.width = "0";
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
}

/* ==================================================================== */
/* 
   Change active filter button 
*/
var ulDiv = document.getElementsByClassName("filter-list")[0];
var liDivs = ulDiv.getElementsByTagName("li");

// Get the element, add a click listener...
var filtersBtn = document.getElementsByClassName("filter-list")[0];
filtersBtn.addEventListener("click", function(e) {
    // e.target is the clicked element!
    // If it was a list item
    if(e.target && e.target.nodeName == "LI") {
	// List item found!  Output the ID!
	var selected = e.target.getAttribute("data-filter");

	for (var element of liDivs) {
	    if (selected == element.getAttribute("data-filter")) {
		element.className = "filter btn active";
	    }
	    else {
		element.className = "filter btn";
	    }

	    
	    // Filter the data
	    if (selected != "todos") {
		var dataFilter = [];
		for (var element of data){
		    if (isInArray(element.tags, selected)){
			dataFilter.push(element);
		    }
		}
	    }
	    else {
		dataFilter = data;
	    }
	    // create the filter divs
	    createWorksDiv(dataFilter);
	}
    }
});

/* ==================================================================== */
/*
  Create and filter the works
*/

// Get the json with the data
var data;
$.ajax({
    type: "GET",
    dataType: "json",
    url: "data/products.json",
    success: function(requestJson) {
	data = requestJson;
	createWorksDiv(data);
    }
});


function createWorksDiv(dataFilter) {
    var html = '';
    for (var element of dataFilter) {
	html  += workTemplate.format(element.id, element.img,
				     element.client, element.sort_description);
    }

    // Add the html
    var portfolio = document.getElementById("portfolio");
    var rowDiv = portfolio.getElementsByClassName("row")[0];
    rowDiv.innerHTML = html;

    // Show with the transition effect
    window.setTimeout(function() {
	for (div of document.getElementsByClassName("portfolio-item")) {
	    div.style.transform = "scale(1)";
	}
    }, 10);
}


function isInArray(tags, tag) {
    /* SImple fucntion to check if string is inside array */
    return tags.indexOf(tag.toLowerCase()) > -1;
}


// Template of work div
// {0}: id
// {1}: img
// {2}: client
// {3}: sort-description
var workTemplate = `
<article class="col-sm-4 col-md-3">
  <header class="header-hidden">
    <h3>Resúmen de {0}</h3>
  </header>
    
  <figure class="portfolio-item">
    <a onclick="openPortfolioInfo('{0}')">
      <img class="img-responsive" src="{1}"
           alt="Foto del trabajo realizado a {0}">
      <div class="caption-bg"></div>
      <p class="portfolio-item-title">
        {2}
      </p>
      <p class="portfolio-item-description">
        {3}
      </p>
    </a>
  </figure>
</article><!--/col-md-3 -->`;


/* ==================================================================== */
// Thanks for this solutions!
// https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#4673436

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}


/* ==================================================================== */
/* Efect of transition on click on navBar buttons */
$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}


/* ==================================================================== */
/* Add countUp animation */
var linesCode = document.getElementById("linesCode");
var linesCode2 = document.getElementById("linesCode2");
var linesCode3 = document.getElementById("linesCode3");
var linesCode4 = document.getElementById("linesCode4");
var codeCount = new CountUp(linesCode, 0, 250000, 0, 3);
var codeCount2 = new CountUp(linesCode2, 0, 250000, 0, 3);
var codeCount3 = new CountUp(linesCode3, 0, 250000, 0, 3);
var codeCount4 = new CountUp(linesCode4, 0, 250000, 0, 3);


function Utils() {}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();

$(document).ready(function () {
    $(document).on("scroll", activateDeactivateConuts);
});

function activateDeactivateConuts() {
    var isElementInView = Utils.isElementInView($('#linesCode'), false);
    if (isElementInView) {
	codeCount.start();
	codeCount2.start();
	codeCount3.start();
	codeCount4.start();
    } else {
	codeCount.reset();
	codeCount2.reset();
	codeCount3.reset();
	codeCount4.reset();
    }
}
