
$(".icon").click(function() {
    $(".menu").slideToggle();
});

function button_selected() {
    let form = document.getElementById("radio");
    let choice = form.elements.search_choice.value;
    if (choice == 'Title') {
        $(".byTitle").show();
        $(".byGenre").hide();
        $(".byAuthor").hide();
    }else if (choice == 'Author'){
        $(".byAuthor").show();
        $(".byTitle").hide();
        $(".byGenre").hide();
    }
    else{
        $(".byGenre").show();
        $(".byTitle").hide();
        $(".byAuthor").hide();
    }

}

function analyze(json) {
    if (json.totalItems == 0) {
        alert("Sorry, can't find this book. Try again with a valid name");
    }else {

        let book = json.items[0].volumeInfo;
        console.log(book);

        let title = book.title;
        console.log(title);
        $("#title").html(title);
        
        let author = book.authors[0];
        $("#author").html(author);

        let description = book.description;
        $("#description").html(description);

        let genre = book.categories;
        $("#genre").html(genre);

        let bookCover = book.imageLinks.thumbnail;
        $("#cover").attr('src', bookCover);

        let date = book.publishedDate;
        $("#date").html(date);

        let ratings = book.averageRating;


        
        if (ratings >= 4.5) {
            $("#star1").show();
            $("#star2").show();
            $("#star3").show();
            $("#star4").show();
            $("#star5").show();
            $("#rating").html(ratings);
        } else if(ratings >= 3.5) {
            $("#star1").show();
            $("#star2").show();
            $("#star3").show();
            $("#star4").show();
            $("#star5").hide();
            $("#rating").html(ratings);
        } else if(ratings >= 2.5) {
            $("#star1").show();
            $("#star2").show();
            $("#star3").show();
            $("#star4").hide();
            $("#star5").hide();
            $("#rating").html(ratings);
        } else if(ratings >= 1.5) {
            $("#star1").show();
            $("#star2").show();
            $("#star4").hide();
            $("#star5").hide();
            $("#rating").html(ratings);
        } else if (ratings >= 1) {
            $("#star1").show();
            $("#star2").hide();
            $("#star3").hide();
            $("#star4").hide();
            $("#star5").hide();
            $("#rating").html(ratings);
        } else {
            $("#star1").hide();
            $("#star2").hide();
            $("#star3").hide();
            $("#star4").hide();
            $("#star5").hide();
            $("#rating").html("<p> no rating is found </p>");
        }


    
    $(".display").show();
    $(".mainSearch").hide();
    }

}

function getJSON() {
    
	let baseURL = "https://www.googleapis.com/books/v1/volumes?q=";

   
	// get information entered to web-page here
    
    let fullURL = baseURL;

	let choice = document.getElementById("radio").elements.search_choice.value;
    console.log(choice);
    if (choice == 'Title') {
        let title = $("#title_input").val();
        if (title.length == 0) {
            alert("Enter something in the text box")
        }
        fullURL = baseURL + title;
        } else if (choice == 'Author') {
            let author = $("#author_input").val();
            if (author.length == 0) {
                alert("Enter something in the text box");
            }
            fullURL = baseURL + "inauthor:" + author;
        } else {
            let genre = $("#genre_input").val();
            if (genre.length == 0) {
                alert("Enter something in the text box")
            }
            fullURL = baseURL + "subject:" + genre;
        }   
	
	// Make sure the fullURL works: copy and paste it in a browser:
	console.log(fullURL);
	
	$.get(fullURL, function(data) {
		// The following line outputs the JSON response to the console:
	    console.log(data);
        $(".menu").fadeOut();
        
		
		// The following line outputs the JSON response to the webpage:
		$("#rawJSON").html(JSON.stringify(data));
		
		// The following line gives the JSON response to the analyze
		// function. From there, you can pull information from the JSON
		// response and display things on your webpage.
		analyze(data);
    
	});
}

function backToSearch(){
    $(".menu").fadeOut();
    $(".mainSearch").show();
    $(".display").hide();
}

function randomBook(){

    let possible = ['The Outsiders', 'love', 'Middlemarch', 'Great Expectations', 'Catch-22', 'The Adventures of Huckleberry Finn', 
                    'Les Miserables', 'Barchester Towers', 'Vanity Fair', 'The Iliad', 'Harry Potter', 'The Age of Innocence', 
                    'The Mill on the Floss', 'sweater', 'Things Fall Apart', 'Alice’s Adventures in Wonderland', "Midnight's Children", 'Another Country', 'The Hobbit',
                    'Frankenstein', 'Pride and Prejudice', 'One Hundred Years of Solitude',
                    'In Cold Blood', 'I Capture The Castle', 'Persuasion', 'History',
                    'Buddenbrooks', 'The Grapes of Wrath', 'Dracula', 'The Lord of the Rings'];
    
    
    let random_str = possible[Math.floor(Math.random()*possible.length)];

    console.log(random_str);

    let fullURL = "https://www.googleapis.com/books/v1/volumes?q=" + random_str;


    $.get(fullURL, function(data) {
	    console.log(data);
        $(".menu").fadeOut();
		analyze(data);
	});
   
}
