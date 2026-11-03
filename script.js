/* =========================================
   FARAMILK - script.js
   This file makes the page DO things:
     1. Add a crate to the cart
     2. Show the cart and the total
     3. Remove a crate
     4. Place the order
   ========================================= */

// ----- Settings -----
var DEPOSIT = 3;   // refundable deposit charged for each crate

// The cart is a list. Each item has a "label" (name + size) and a "price".
var cart = [];


// ===== 1. ADD A CRATE TO THE CART =====
// 'name'     = the drink name
// 'selectId' = the id of the size box (12 or 24 bottles) on that card
function addToCart(name, selectId) {
  var sizeBox = document.getElementById(selectId);

  var price = Number(sizeBox.value);                         // e.g. 14
  var size = sizeBox.options[sizeBox.selectedIndex].text;    // e.g. "12 bottles ($14)"

  cart.push({ label: name + " - " + size, price: price });   // put it in the list

  showCart();                                                // update the page
}


// ===== 2. SHOW THE CART ON THE PAGE =====
function showCart() {
  var html = "";       // we build the list of items as text
  var subtotal = 0;    // total price of the crates

  // go through every item in the cart, one by one
  for (var i = 0; i < cart.length; i++) {
    subtotal = subtotal + cart[i].price;
    html = html + '<div class="item"><span>' + cart[i].label + '</span>' +
           '<button onclick="removeItem(' + i + ')">Remove</button></div>';
  }

  // if the cart is empty, say so
  if (cart.length === 0) {
    html = "<p>Your cart is empty. Add a crate above.</p>";
  }

  var deposit = cart.length * DEPOSIT;
  var total = subtotal + deposit;

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("cartCount").innerHTML = cart.length;

  if (cart.length === 0) {
    document.getElementById("cartTotals").innerHTML = "";
  } else {
    document.getElementById("cartTotals").innerHTML =
      '<p class="total">Crates: $' + subtotal +
      '<br>Refundable deposit: $' + deposit +
      '<br>Delivery: Free' +
      '<br>Total: $' + total + '</p>';
  }
}


// ===== 3. REMOVE A CRATE =====
function removeItem(position) {
  cart.splice(position, 1);   // delete 1 item at this position
  showCart();
}


// ===== 4. PLACE THE ORDER =====
function placeOrder() {
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var address = document.getElementById("address").value;
  var message = document.getElementById("message");

  // Check 1: is the cart empty?
  if (cart.length === 0) {
    message.className = "error";
    message.innerHTML = "Your cart is empty. Add a crate first.";
    return;   // stop here
  }

  // Check 2: did the person fill in every box?
  if (name === "" || phone === "" || address === "") {
    message.className = "error";
    message.innerHTML = "Please fill in your name, phone number and address.";
    return;   // stop here
  }

  // Everything is fine: confirm the order and empty the cart
  message.className = "";
  message.innerHTML = "Thank you, " + name + "! Your order is confirmed. We will call you to arrange delivery.";
  cart = [];
  showCart();
}


// Show the (empty) cart when the page first opens
showCart();
