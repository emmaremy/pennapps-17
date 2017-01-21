var config = {
    apiKey: "AIzaSyCYKdU82vidG4j1hDCeSELcOL3FqYgDW74",
    authDomain: "pennapps2017-e83e4.firebaseapp.com",
    databaseURL: "https://pennapps2017-e83e4.firebaseio.com",
    storageBucket: "pennapps2017-e83e4.appspot.com",
    messagingSenderId: "151281469749"
  };

// Initialize your Firebase app
firebase.initializeApp(config);

// Reference to your entire Firebase database
var people = firebase.database().ref("people");

// Save a new contact to the database, using the input in the form
var submitPerson = function () {

  // Get input values from each of the form elements
  var firstname = $("#revFirst").val();
  var lastname = $("#revLast").val();
  var contact = $("#revContact").val();
  var services = $("#revServices").val();
  var notes = $("#revNotes").val();

// Push our first recommendation to the end of the list and assign it a
// unique ID automatically.
	people.push({
	    "firstname": firstname,
	    "lastname": lastname,
	    "contact": contact,
	    "services": services,
	    "notes": notes,
	});
};

$(window).load(function () {

	$("#peopleForm").submit(submitPerson);
});