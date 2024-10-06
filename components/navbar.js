(function ($) {
  $.fn.createSidebar = function () {
    const sidebarHtml = `
            <nav class="sidebar">
                <button class="hamburger-button">
                    <div class="hamburger-icon">
                      <span class="hamburger-line"></span>
                      <span class="hamburger-line"></span>
                    </div>
                </button>
                <div class="logo">
                    <img src="/assets/logo.svg" alt="logo"/>
                </div>
                <div class="menu">
                    <ul>
                        <li><a href="../home/home.html"><img src="/assets/navigations/home.svg"/>Home</a></li>
                        <li><a href="../menu/menu.html"><img src="/assets/navigations/menu.svg"/>Menu</a></li>
                        <li><a href="../order/order.html"><img src="/assets/navigations/order.svg"/>Orders</a></li>
                        <li><a href="../employees/employees.html"><img src="/assets/navigations/employee.svg"/>Employees</a></li>
                    </ul>
                </div>
                <div class="profile-section">
                  <img src="../../assets/avatar.png" alt="avatar" />
                  <div class="info">
                    <span>admin</span>
                    <a href="../login/login.html" class="logout"><u>Logout</u></a>
                  </div>
                </div>
            </nav>`;

    this.html(sidebarHtml);
    $("<style>")
      .text(
        `
        .sidebar {
          height: 100%;
          transition: left 0.3s ease;
          width: 250px;
        }
        .sidebar-visible {
          left: 0;
        }
      `
      )
      .appendTo("head");

    $(".hamburger-button").on("click", function () {
      $(".sidebar").toggleClass("sidebar-visible");
      $(this).toggleClass("open");
    });
    return this;
  };
})(jQuery);
