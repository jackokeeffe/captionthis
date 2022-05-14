// Boolean conditonals used for reuqesting alternate information within functions
var submitted = false;
var loaded = false;

// Get the day # and find the comic that associates with it
function getIssue() {
    var currentDate = new Date();
    var newYear = new Date(currentDate.getFullYear(), 0, 0);

    // currentDate - newYear = number of seconds since the Jan 01
    // 86400000 = # of seconds in a day
    var dayOfTheYear = Math.floor((currentDate - newYear) / 86400000);
    // If the image has not been loaded onto the user's screen...
    if (loaded == false) {
        // Update the comics element and replace with today's comic (day 1 = comics/1.png)
        document.getElementById("comic").src = "comics/" + (dayOfTheYear - 132) + ".png";
        loaded = true;
    } else {
        // To find this # without re-loading the image, this conditional is used
        return dayOfTheYear - 132;
    }
    hasPlayed();
}

// Check (on website load) if the game has already been played today
function hasPlayed() {
    var lastPlayed = localStorage.getItem("lastIssue");
    // If it has been played before...
    if (lastPlayed != null) {
        // If the last time played = todays date...
        if (lastPlayed == getIssue()) {
            // Set the caption to the user's original entry
            document.getElementById("caption").value = localStorage.getItem("todaysCaption");
            // Disable any changes to the caption
            document.getElementById("caption").disabled = true;
            // Change button from Submit to Share (using copyEntry())
            copyEntry();
        }
    }
}

// When the 'Submit' button is pressed, change it to a 'Share' button
function copyEntry() {
    // If the caption is not blank...
    if (document.getElementById("caption").value.trim() != "") {
        // If the users has just submitted the caption...
        if (submitted == false) {
            // Disable the input
            document.getElementById("caption").disabled = true;
            // Add todays issue and caption to localStorage (to check on reload if it has already been completed today)
            localStorage.setItem("lastIssue", getIssue());
            localStorage.setItem("todaysCaption", document.getElementById("caption").value);
            // Change the buttons text to read 'Share'
            document.getElementById("submit").innerHTML = "Share";
            submitted = true;
            // If the button is clicked after submission (while submitted = true)
        } else {
            // Select all text in the caption input
            caption.select();
            caption.setSelectionRange(0, 100);
            // Create content using a template and the users caption (getIssue()'s alternate condition is used to get the date)
            var clipboardContent = '[📚 Comic Strip #' + getIssue() + ']\n"' + caption.value + '"\n💥🗯📕 www.captionthis.art'
                // Copy content to the user's clipboard
            navigator.clipboard.writeText(clipboardContent);
            // Change the text of the button to let the user know their caption has been copied
            document.getElementById("submit").innerHTML = "Copied";
        }
    }
}