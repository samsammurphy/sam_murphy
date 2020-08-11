
function Slideshow(slideClassName){
    
    // slide class name
    this.slideClassName = slideClassName

    // slide elements
    this.slides = document.getElementsByClassName(this.slideClassName);

    // slide index to display
    this.slideIndex = 0;

    // event listener
    this.changeSlide =function(increment) {
        this.displaySlide(this.slideIndex += increment);
    }

    this.displaySlide = function (newIndex) {

        // slide index is cyclical
        if (newIndex > this.slides.length - 1) { newIndex = 0 };
        if (newIndex < 0) { newIndex = this.slides.length - 1 };

        // update slide index
        this.slideIndex = newIndex

        // hide all slides
        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = "none";
        }

        // show target slide
        this.slides[this.slideIndex].style.display = "block";
    }

    // display first slide
    this.displaySlide(0);
}

let imageSlideshow = new Slideshow("imageSlides")
let timeSeriesSlideshow = new Slideshow("timeSeriesSlides")

