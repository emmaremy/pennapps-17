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


people.limitToLast(10).on('child_added', function(childSnapshot) {
    person = childSnapshot.val();

    addPersonRow(person);

    //$("#name").html(person.firstname)
    //$("#zipcode").html(person.zipcode) 
    //$("#services").html(getServicesString(person))
    //$("#notes").html(person.notes)

});


var addPersonRow = function (person) {

    var html = "<tr> <td>" + person.firstname + 
        "</td> <td>" + person.zipcode + 
        "</td> <td>" + getServicesString(person) + 
        "</td> <td>" + person.notes + 
        "</td> </tr>";

    $("#people_table").append(html);

};

var getServicesString = function (person) {
    
    var services = "I'm available to";

    var services_list = [];
    if (person.walk) {
        services_list.push("accompany you on a walk to the clinic");
    }
    if (person.drive) {
        services_list.push("drive you to a clinic or medical appointment");
    }

    for (i = 0; i < services_list.length; i++) {
        services += " " + services_list[i];
        
        if (i < services_list.length - 1 && services_list.length > 2) {
            services += ",";
        }
        if (i == services_list.length - 2) {
            services += " and";
        }
    }
    console.log(services);
    return services; 
}
