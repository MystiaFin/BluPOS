$(document).ready(function () {
  // load menu data from JSON
  $.getJSON("./menus.json", function (data) {
    data.forEach(function (item) {
      const cardHtml = `
          <div class="card">
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
              <h2>${item.name}</h2>
              <p>Price: $${item.price.toFixed(2)}</p>
              <div class="quantity">
                <button class="decrement">-</button>
                <span class="count">0</span>
                <button class="increment">+</button>
              </div>
            </div>
          </div>
        `;
      $(".card-wrapper").append(cardHtml);
    });

    // increase quantity
    $(".card-wrapper").on("click", ".increment", function () {
      const countElement = $(this).siblings(".count");
      let count = parseInt(countElement.text());
      count++;
      countElement.text(count);
      updateOrder($(this).closest(".card").find("h2").text(), count);
    });

    // decrease quantity
    $(".card-wrapper").on("click", ".decrement", function () {
      const countElement = $(this).siblings(".count");
      let count = parseInt(countElement.text());
      if (count > 0) {
        count--;
        countElement.text(count);
        updateOrder($(this).closest(".card").find("h2").text(), count);
      }
    });

    // updating checkout menu
    function updateOrder(itemName, count) {
      const order = $(".orders").find(`.order:contains('${itemName}')`);
      const itemPrice = data.find((item) => item.name === itemName).price;
      if (count > 0) {
        if (order.length > 0) {
          // update existing order
          order.find(".quantity").text(`${count}x`);
          order.find(".price").text(`$${(itemPrice * count).toFixed(2)}`);
        } else {
          // add new order if order doesn't exist
          const newOrderHtml = `
                  <div class="order">
                    <div class="order-item name">${itemName}</div>
                    <div class="order-item quantity">${count}x</div>
                    <div class="order-item price">$${(
                      itemPrice * count
                    ).toFixed(2)}</div>
                  </div>
                `;
          $(".orders").prepend(newOrderHtml);
        }
      } else {
        // remove order if count quantity reaches 0
        order.remove();
      }
      updateTotalBill();
    }

    // Calculate and update the total bill
    function updateTotalBill() {
      let totalBill = 0;
      $(".orders .order").each(function () {
        const itemPrice = parseFloat(
          $(this).find(".price").text().substring(1)
        );
        totalBill += itemPrice;
      });
      $(".bill-total span:last-child").text(`$${totalBill.toFixed(2)}`);
    }

    // handle the pay button click event
    $(".confirm").click(function () {
      const promoCode = $("#promoCode").val().trim();
      const promoCodeAlert = $("#promoCodeAlert");

      if (promoCode === "promo-code") {
        promoCodeAlert.html(
          "<span class='success-message'>Valid promo code applied!</span>"
        );
        alert("Checkout successful with promo code!");
      } else if (promoCode === "") {
        alert("Checkout successful!");
      } else {
        promoCodeAlert.html(
          "<span class='error-message' style='color: red;'>Invalid promo code</span>"
        );
        return;
      }

      // reset quantities
      $(".count").text("0");
      $(".orders .order").remove();
      $(".bill-total span:last-child").text("$0.00");
      $("#promoCode").val("");
      promoCodeMessage.text("");
    });
  });

  // toggle show checkout for mobile
  $("#showCheckout").click(function () {
    $(".checkout").addClass("show");
    $(".checkout-overlay").addClass("show");
    $("body").css("overflow", "hidden"); // Prevent scrolling when checkout is open
  });

  // toggle close checkout for mobile
  $("#closeCheckout, .checkout-overlay").click(function () {
    $(".checkout").removeClass("show");
    $(".checkout-overlay").removeClass("show");
    $("body").css("overflow", ""); // Re-enable scrolling
  });
});
