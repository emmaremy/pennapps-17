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
  var accompany = $("revAccompany").is(':checked');
  var drive = $("#revDrive").is(':checked');
  var pickup = $("#revPickup").is(':checked');
  var coffee = $("revCoffee").is(':checked');
  var ed = $("revEd").is(':checked');
  var resource = $("revResource").is(':checked');
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
        "accompany": accompany,
        "drive": drive,
        "pickup": pickup,
        "coffee": coffee,
        "ed": ed,
        "resource": resource,
        "notes": notes,
        "id": Date.now()
    });

};

$(window).load(function () {

	$("#peopleForm").submit(submitPerson);
});


people.limitToLast(100).on('child_added', function(childSnapshot) {
    person = childSnapshot.val();
    addPersonRow(person);
});



var addPersonRow = function (person) {

    var html = "<tr> <td>" + person.firstname + 
        "</td> <td>" + person.zipcode + 
        "</td> <td>" + getServicesString(person) + 
        "</td> <td>" + person.notes + 
        "</td> <td>" + "<a href='#contactForm'><button id='contact_button' value='" + (person.email) + "' " +
        "class='btn btn-success btn-sm btn-outline' onclick='enterContactId(this.value)'>Contact</button></a>" +      
        "</tr>" + "<div id =" + "'" + (person.id).toString() + "'" + ">HI THERE</div>"
    $("#people_table").append(html);

};

var showForm = function (person) {
    console.log('function was called')
    var button = document.getElementById('contact_button');
    var form = document.getElementById((person.id).toString());
    if (button.clicked == true) {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}



var enterContactId = function (email) {
    document.getElementById("revToEmail").value=email;
    document.theirEmail =contact
}

var getServicesString = function (person) {
    console.log(person.id)
    var services = "I'm available to";

    var services_list = [];
    if (person.walk) {
        services_list.push("accompany you on a walk to the clinic");
    }
    if (person.drive) {
        services_list.push("drive you to a clinic or medical appointment");
    }
    if (person.accompany) {
        services_list.push("accompany you to a station or other location if you feel unsafe");
    }
    if (person.pickup) {
        services_list.push("pickup something for you from a pharmacy or grocery store");
    }
    if (person.coffee) {
        services_list.push("meet you for coffee, to chat or to listen");
    }
    if (person.ed) {
        services_list.push("teach you about healthy relationships and contraception");
    }
    if (person.resource) {
        services_list.push("help you find resources to get out of a unsafe situation");
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
    return services; 
}
