$(document).ready(function () {
  $.getJSON("employees.json", function (data) {
    data.forEach(function (employee) {
      const cardHtml = `
          <div class="card">
            <img src="${employee.avatar}" alt="${employee.name}" />
            <div class="content">
              <h2>${employee.name}</h2>
              <p>Age: ${employee.age}</p>
              <p>Position: ${employee.position}</p>
            </div>
          </div>
        `;
      $("#employee-cards").append(cardHtml);
    });
  });
});
