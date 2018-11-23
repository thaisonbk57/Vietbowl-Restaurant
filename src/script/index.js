$(document).ready(function() {
  // get the height of the header section
  let headerHeight = $(".header").outerHeight();
  // set the padding-top of MAIN section based on the height of header section
  $(".main").css({
    "padding-top": headerHeight
  });

  // set the height of HERO section based on the height of HEADER section.
  $(".hero").css({
    height: `calc(100vh - ${headerHeight}px)`
  });
});
