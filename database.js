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
  var zipcode = $("#revZipcode").val();
  
  //var services = $("#revServices").val();
  var walk = $("#revWalk").is(':checked');
  var drive = $("#revDrive").is(':checked');
  var notes = $("#revNotes").val();

// Push our first recommendation to the end of the list and assign it a
// unique ID automatically.
	people.push({
	    "firstname": firstname,
	    "lastname": lastname,
	    "contact": contact,
            "zipcode": zipcode,
            //"services":services,
	    "walk": walk,
            "drive": drive,
	    "notes": notes,
	});
};

$(window).load(function () {

	$("#peopleForm").submit(submitPerson);
});


people.limitToLast(1).on('child_added', function(childSnapshot) {
    person = childSnapshot.val();

    $("#name").html(person.firstname)
    $("#zipcode").html(person.zipcode) 
    $("#services").html(person.services)
    $("#notes").html(person.notes)

});

