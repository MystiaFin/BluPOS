$(document).ready(function () {
  $("#login-form").submit(function (event) {
    event.preventDefault();

    const username = $("#username").val().trim();
    const password = $("#password").val().trim();
    const errorMsg = $("#error-msg");

    if (!username || !password) {
      errorMsg.text("Login credential is not valid").show();
    } else {
      window.location.href = "../home/home.html";
    }
  });
});
