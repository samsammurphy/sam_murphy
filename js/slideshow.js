// slide index variable
var slideIndex = 0;

// display first slide
displaySlide(slideIndex);

function displaySlide(newIndex) {

    // find slide collection
    var x = document.getElementsByClassName("mySlides");

    // slide index is cyclical
    if (newIndex > x.length - 1) { newIndex = 0 };
    if (newIndex < 0) { newIndex = x.length - 1 };

    // update slide index
    slideIndex = newIndex

    // hide all slides
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    // show target slide
    x[slideIndex].style.display = "block";
}

// button click event listener
function changeSlide(increment) {
    displaySlide(slideIndex += increment);
}