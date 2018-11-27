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

  $("#reservation-submit-btn").on("click", e => {
    e.preventDefault();
    submitReservation();
  });

  function submitReservation() {
    const [name, phone, date, time, seat, email, note] = [
      $("[name='name']").val(),
      $("[name='phone']").val(),
      $("[name='date']").val(),
      $("[name='time']").val(),
      $("[name='seat']").val(),
      $("[name='email']").val(),
      $("[name='note']").val()
    ];

    const data = { name, phone, date, time, seat, email, note };

    $.post(
      "https://vietbowl-mail.herokuapp.com/new-reservation",
      data,
      function(res, status) {
        if (status) {
          $("#server-msg").text(res.message);
          $("#server-msg").addClass(res.status);
        }
      }
    );
  }
});
