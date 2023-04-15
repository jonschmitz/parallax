// Run Function on load and all movements
$(window).on("load resize scroll",function(e){
  parallax('.parallax');
});

// parallax function
function parallax(e) {
  
  $(e).each(function( index ) {
    
    // Get 'plx-' class from element via '.parallax'
    var className = $(this).attr('class').match(/plx[\w-]*\b/);
    var className = className.toString();

    // GET ELEMENT AND DETAILS
    // Get Element
    var elemName = className;
    // Get animation length from class name
    var animationLength = elemName.match(/\d+/);
    // Get transform direction from class name - y or x
    var transformDirection = elemName[elemName.length -1];
    // Capatilize Y or X
    var transformDirection = transformDirection.substr(0,1).toUpperCase()+transformDirection.substr(1);

    // Measurements
    var elemHeight = $(this).outerHeight();
    var viewportHeight = $(window).height();
    var boxAndViewportHeight = elemHeight + viewportHeight;

    // Positions
    var elemPosition = this.getBoundingClientRect().top;

    // Offset element's position so that it is still a positive number until entire element is above viewport
    var elemPositionOffset = elemPosition + elemHeight;

    // Get percentage based on expanded viewport and the element's offset position. Output is from 0 to 1.
    var parallaxPercentage = elemPositionOffset / boxAndViewportHeight;
    
    // Conver number from 0 to 1, to: -1 to 1
    var parallaxPercentage = (parallaxPercentage * 2) - 1;

    // Remove numbers below -1 and above 1
    if ( parallaxPercentage <= -1 ) {
      var parallaxPercentage = -1;
    } else if ( parallaxPercentage >= 1 ) {
      var parallaxPercentage = 1;
    } else {
      var parallaxPercentage = parallaxPercentage;
    }
    
    var pixelMeasurement = parallaxPercentage * animationLength;

    // Invert if .inv exists
    if ( $(this).hasClass('inv') ) {
      var pixelMeasurement = pixelMeasurement * -1;
    }
    
    // Execute
    this.style.transform = "translate"+transformDirection+"("+pixelMeasurement+"px)";

    // Outputs
    // console.log("Animation Length: "+pixelMeasurement+"px - Transform Direction: "+transformDirection);

  });

}