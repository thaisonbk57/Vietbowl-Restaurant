let submitting = false; // sending reservation to server and waiting for response

/////////////////////////////////////////////

function heroSectionHeightJustify() {
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
}

function submitReservation() {
  // change submitting to TRUE and update the RESERVE button
  submitting = true;
  updateReserveButton(submitting);

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
    (res, status) => {
      if (status === "success") {
        $("#server-msg").text(res.message);
        $("#server-msg").addClass(res.status); // 'OK' ||  'ERROR'
      }

      // change the submitting to FALSE and update the RESERVE button
      submitting = false;
      updateReserveButton(submitting);

      // Reset the form
      $("#reservation-form").trigger("reset");
    }
  );
}

/*
 * update the RESERVE button including the text and disable/ enable the button
 * depends on the FORM Submitting status
 *
 * @param: status: Boolean.
 *
 */
function updateReserveButton(status) {
  // if the form is sending data to server
  if (status) {
    $("#reservation-submit-btn").val("SENDING...");
    $("#reservation-submit-btn").attr("disabled", "true");
  } else {
    $("#reservation-submit-btn").val("RESERVE");
    $("#reservation-submit-btn").removeAttr("disabled");
  }
}

////////////////////////////////////////////

$(document).ready(function() {
  heroSectionHeightJustify();

  // reserve a table
  $("#reservation-form").on("submit", e => {
    e.preventDefault();
    submitReservation();
  });
});
