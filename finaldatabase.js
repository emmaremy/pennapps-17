// TODO: Replace with your Firebase app
var myFirebaseApp = "vivid-inferno-2578";
var MAXROWS = 10;

// Reference to the reviews object in your Firebase
var reviews = new Firebase("https://" + myFirebaseApp + ".firebaseio.com/reviews");

// Save a new review to the database, using the input in the form
var submitreview = function () {

  // Get input values from each of the form elements
  var company = $("#revCompany").val();
  var loc = $("#revLoc").val();
  var age = $("#revAge").val();
  var salary = $("#revSalary").val();
  var rating = $("#revRating").val();
  var positives = $("#revPos").val();
  var negatives = $("#revNeg").val();
  var field = $("#revField").val();

  // // Push a new review to the database using those values
  reviews.push({
    "company": company,
    "loc": loc,
    "age": age,
    "salary": salary,
    "rating": rating,
    "positives": positives,
    "negatives": negatives,
    "field": field,
  });
};

  var addReviewRow = function (review) {
    // Build the HTML string that represents this new row and the data it shows
    var html = "<tr>\
      <td>" + review.age + "</td>\
      <td>" + review.company + "</td>\
      <td>" + review.field + "</td>\
      <td>" + review.salary + "</td>\
      <td>" + review.loc + "</td>\
      <td>" + review.rating + "</td>\
      <td>" + review.positives + "</td>\
      <td>" + review.negatives + "</td>\
    </tr>";

    // Add the new HTML to the end of the table body
    $("#reviews").append(html);

    // If there are more rows than there should be, remove extras from the top
    // of the table (these are the oldest recommendations).
    while ($("#reviews tr").length > MAXROWS) {
      $("#reviews tr").first().remove();
    }
  };


// Get the single most recent review from the database and
// update the table with its values. This is called every time the child_added
// event is triggered on the reviews Firebase reference, which means
// that this will update EVEN IF you don't refresh the page. Magic.
reviews.limitToLast(MAXROWS).on('child_added', function(childSnapshot) {
  // Get the review data from the most recent snapshot of data
  // added to the reviews list in Firebase
  review = childSnapshot.val();

  // Update the HTML to display the review text

  addReviewRow(review);
  

  // $("#company").html(review.company)
  // $("#loc").html(review.loc)
  // $("#age").html(review.age)
  // $("#salary").html(review.salary)
  // $("#rating").html(review.rating)
  // $("#positives").html(review.positives)
  // $("#negatives").html(review.negatives)
  // $("#field").html(review.field)

  // Make the link actually work and direct to the URL provided
});

// When the window is fully loaded, call this function.
// Note: because we are attaching an event listener to a particular HTML element
// in this function, we can't do that until the HTML element in question has
// been loaded. Otherwise, we're attaching our listener to nothing, and no code
// will run when the submit button is clicked.
$(window).load(function () {

  // Find the HTML element with the id reviewForm, and when the submit
  // event is triggered on that element, call submitreview.
  $("#reviewForm").submit(submitreview);

});