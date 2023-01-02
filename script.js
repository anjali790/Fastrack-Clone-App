// --------------------------------------- Header Starts Here -------------------------------- //

var tops = document.querySelector(".top");
var bottom = document.querySelector(".bottom");
const watch = document.getElementById("watch");
const audio = document.getElementById("audio");
const eyewear = document.getElementById("eyewear");
const bags = document.getElementById("bags");
const perfumes = document.getElementById("perfumes");
const offers = document.getElementById("offers");
const watch_hover = document.getElementById("watch_hover");
const audio_hover = document.getElementById("audio_hover");
const bags_hover = document.getElementById("bags_hover");
const perfumes_hover = document.getElementById("perfumes_hover");
const offers_hover = document.getElementById("offers_hover");

watch.addEventListener("mouseover", function () {
  watch_hover.style.display = "flex";
  audio_hover.style.display = "none";
  bags_hover.style.display = "none";
  perfumes_hover.style.display = "none";
  offers_hover.style.display = "none";
});

watch_hover.addEventListener("mouseleave", function () {
  this.style.display = "none";
});

audio.addEventListener("mouseover", function () {
  watch_hover.style.display = "none";
  audio_hover.style.display = "flex";
  bags_hover.style.display = "none";
  perfumes_hover.style.display = "none";
  offers_hover.style.display = "none";
});

audio_hover.addEventListener("mouseleave", function () {
  this.style.display = "none";
});

bags.addEventListener("mouseover", function () {
  watch_hover.style.display = "none";
  audio_hover.style.display = "none";
  bags_hover.style.display = "flex";
  perfumes_hover.style.display = "none";
  offers_hover.style.display = "none";
});

bags_hover.addEventListener("mouseleave", function () {
  this.style.display = "none";
});

perfumes.addEventListener("mouseover", function () {
  watch_hover.style.display = "none";
  audio_hover.style.display = "none";
  bags_hover.style.display = "none";
  perfumes_hover.style.display = "flex";
  offers_hover.style.display = "none";
});

perfumes_hover.addEventListener("mouseleave", function () {
  this.style.display = "none";
});

offers.addEventListener("mouseover", function () {
  watch_hover.style.display = "none";
  audio_hover.style.display = "none";
  bags_hover.style.display = "none";
  perfumes_hover.style.display = "none";
  offers_hover.style.display = "flex";
});

offers_hover.addEventListener("mouseleave", function () {
  this.style.display = "none";
});

// --------------------------------------- Header Ends Here -------------------------------- //

// ------------------------- Section on click Search Starts Here --------------------------- //

const searchClick = document.querySelector(".search-click");
const searchIcon = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const myInput = document.querySelector("#myInput");
const main = document.querySelector(".main");
const main2 = document.querySelector(".main2");

searchIcon.addEventListener("click", function () {
  searchClick.style.display = "block";
  this.style.display = "none";
  cancelBtn.style.display = "block";
  main.style.display = "none";
  main2.style.display = "block";

  myInput.addEventListener("keyup", (e) => {
    const searchString = e.target.value;
    const filteredProducts = allProducts.filter((oneData) => {
      return oneData.Name.toLowerCase().includes(searchString.toLowerCase());
    });
    displayProducts(filteredProducts);
  });

  const loadProducts = async () => {
    try {
      // const res = await fetch(`https://avish-test-api.herokuapp.com/watches`);
      const res = await fetch('db.json');
      allProducts = await res.json();
      displayProducts(allProducts);
    } catch (err) {
      console.log(err);
    }
  };

  const displayProducts = (oneData) => {
    const html = oneData
      .map((oneData) => {
        return `
          <div class="prod-div">
          <img id="cartImg" src=${oneData.urlImg} />
          <h2 id="prod-head">${oneData.Name}</h2>
          <h3 id="prod-price"><span>₹${oneData.offerPrice}</span> Was <span style="text-decoration: line-through">₹${oneData.price}</span></h3>
          <button class="cart-btn" onclick="add_to_cart(event)" id=${oneData.id}>Add to Cart</button>
          </div>
          `;
      })
      .join("");
    main2.innerHTML = html;
  };
  loadProducts();
});

// ==========================================================
var cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartNumber = document.querySelector(".cart-number");
cartNumber.innerHTML = `<sup class="cart-count">${cart.length}<sup>`;
var data = [];

async function add_to_cart(e) {
  // let response = await fetch(`https://avish-test-api.herokuapp.com/watches`);
  let response = await fetch('db.json');
  let data = await response.json();
  // console.log(e.target.id)
  let idd = e.target.id;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == idd) {
      // cart[j].id == idd then dont add else add.
      cart.push(data[i]);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  let cartNumber = document.querySelector(".cart-number");
  cartNumber.innerHTML = `<sup class="cart-count">${cart.length}<sup>`;
}

async function cart_button() {
  main.style.display = "none";

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += parseInt(cart[i].price);
  }
  // console.log(total);

  // =================================================================

  // =================================================================

  main2.innerHTML = `
  <div class="cartt">
  <p class="billShow">Total Bill : <span class="money">₹${total}</span></p>
  <button class="checkout-btn" onclick="checkout(event)">Checkout</button>
  </div>`;

  let cart_div = document.querySelector(".cartt");
  cart.map((oneData) => {
    cart_div.innerHTML += `<div id="${oneData.id}" class="itemInCart">
    <img class="cartImage" src=${oneData.urlImg}>
    <div class="product-detail-div"><h2 class="productName">${oneData.Name}</h2>
    <h3 class="productDescription">${oneData.description.para}</h3>
    <span class="product-offerPrice"> &#8377 ${oneData.price}</span>
    <span class="product-discount">(${oneData.discount}% Off)</span>
    <button class="remove_btn" onclick="removeFromCart(${oneData.id})">Remove</button>
    </div>
    </div>
    `;
  });
  const checkOutBtn = document.querySelector(".checkout-btn");
  if (cart.length == 0) {
    checkOutBtn.style.display = 'none';
    cart_div.innerHTML += `<h1 class="empty-cart-heading">Your cart is empty!!</h1>`;
    // checkoutBtn.style.display = 'none';
  }
}
const deliveryCont = document.querySelector(".delivery-main-container");

function checkout(e) {
  let cart_div = document.querySelector(".cartt"); // change
  e.target.style.display = "none"; // change
  deliveryCont.style.display = "block";
  cart_div.style.display = "none"; // change

  const deliveryFname = document.getElementById("delivery-fname");
  const deliveryLname = document.getElementById("delivery-lname");
  const deliveryEmail = document.getElementById("delivery-email");
  const deliveryAddress = document.getElementById("delivery-address");
  const deliverySubmitBtn = document.querySelector(".butn");
  const billBtn = document.querySelector("#billBtn");
  const totalAmnt = document.querySelector("#totalAmnt");

  deliverySubmitBtn.addEventListener("click", () => {
    if (
      deliveryFname.value == "" ||
      deliveryLname.value == "" ||
      deliveryEmail.value == "" ||
      deliveryAddress.value == ""
    ) {
      alert("please enter your details properly");
    } else {
      alert("pay the bill");
      // deliveryCont.style.display = "none";
      billBtn.style.display = "block";
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += parseInt(cart[i].price);
      }
      totalAmnt.innerHTML = `₹${total}`;
    }
  });
}

function billPayment() {
  alert("Your order has been successfully placed");
  localStorage.clear();
}

// let removeBtn = document.querySelector(".remove_btn");

function removeFromCart(itemId) {
  console.log(itemId);
  cart = cart.filter((item) => item.id != itemId);
  localStorage.setItem("cart", JSON.stringify(cart));
  let cartNumber = document.querySelector(".cart-number");
  cartNumber.innerHTML = `<sup class="cart-count">${cart.length}<sup>`;
  const removedItem = document.getElementById(itemId);
  removedItem.remove();
}

// ==========================================================

cancelBtn.addEventListener("click", function () {
  searchClick.style.display = "none";
  this.style.display = "none";
  searchIcon.style.display = "block";
  main.style.display = "block";
  main2.style.display = "none";
});

// ------------------------- Section on click Search Ends Here --------------------------- //

// ---------------------------- Section on click "BRANDS" starts here ------------------------- //

const brands = document.getElementById("brands");
const brands_click = document.getElementById("brands_click");

brands.addEventListener("click", function () {
  this.style.color = "white";
  window.open("./Brands/brands.html");
});

// ---------------------------- Section on click "BRANDS" ends here ------------------------- //

// --------------------- Section on click "CURRENCY SELECTOR" starts here ------------------ //

const currency = document.getElementById("currency");
const currency_click = document.getElementById("currency_click");
const down_icon = document.querySelector(".down");
const up_icon = document.querySelector(".up");

currency.addEventListener("click", function () {
  if (up_icon.style.display === "none") {
    this.style.color = "white";
    currency_click.style.display = "block";
    tops.style.position = "relative";
    tops.style.top = "197px";
    bottom.style.position = "relative";
    bottom.style.top = "197px";
    down_icon.style.display = "none";
    up_icon.style.display = "inline-block";
    up_icon.style.color = "white";
    watch_hover.style.top = "333px";
    audio_hover.style.top = "333px";
    bags_hover.style.top = "333px";
    perfumes_hover.style.top = "333px";
    offers_hover.style.top = "333px";
  } else {
    this.style.color = "rgb(175, 173, 173)";
    currency_click.style.display = "none";
    tops.style.top = "0";
    bottom.style.top = "0";
    down_icon.style.display = "inline-block";
    up_icon.style.display = "none";
    watch_hover.style.top = "136px";
    audio_hover.style.top = "136px";
    bags_hover.style.top = "136px";
    perfumes_hover.style.top = "136px";
    offers_hover.style.top = "136px";
  }
});

// ---------------------- Section on click "CURRENCY SELECTOR" ends here ------------------- //

// ---------------------------- Section on click "LOGIN" starts here ---------------------------- //

const login = document.getElementById("login");
const login_click = document.getElementById("login_click");
const signup_btn = document.querySelector(".signup_btn");
const signup_click = document.getElementById("signup_click");
const otpLogin = document.querySelector(".otp_login");
const otpLoginInside = document.querySelector(".otp_login_inside");
const otpAnchor = document.querySelector(".otp_anchor");
const plus = document.querySelector(".plus");
const passwordLogin = document.querySelector(".password_login");
const passwordLoginInside = document.querySelector(".password_login_inside");
const passwordAnchor = document.querySelector(".password_anchor");
const plusPassword = document.querySelector(".plus_password");
const fbLogin = document.querySelector(".fb_login");
const fbAnchor = document.querySelector(".fb_anchor");
const plusFb = document.querySelector(".plus_fb");
const heading = document.querySelector(".heading");
// const main = document.querySelector(".main");
const footer = document.getElementById("footer");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const section3 = document.querySelector(".section3");
const section4 = document.querySelector(".section4");
const slider = document.querySelector(".slider");

login.addEventListener("click", function () {
  login_click.style.display = "block";
  tops.style.display = "none";
  bottom.style.display = "none";
  main.style.display = "none";
  footer.style.display = "none";
  brands_click.style.display = "none";
});

otpLogin.addEventListener("click", function () {
  this.style.border = "none";
  otpLoginInside.style.display = "block";
  otpAnchor.style.display = "none";
  plus.style.display = "none";
  passwordLogin.style.border = "1px solid black";
  passwordLoginInside.style.display = "none";
  passwordAnchor.style.display = "block";
  plusPassword.style.display = "block";
  fbLogin.style.border = "1px solid black";
  fbAnchor.style.display = "block";
  plusFb.style.display = "block";
  heading.style.display = "none";
});

passwordLogin.addEventListener("click", function () {
  this.style.border = "none";
  passwordLoginInside.style.display = "block";
  passwordAnchor.style.display = "none";
  plusPassword.style.display = "none";
  otpLogin.style.border = "1px solid black";
  otpLoginInside.style.display = "none";
  otpAnchor.style.display = "block";
  plus.style.display = "block";
  fbLogin.style.border = "1px solid black";
  fbAnchor.style.display = "block";
  plusFb.style.display = "block";
  heading.style.display = "none";
});

fbLogin.addEventListener("click", function () {
  this.style.border = "none";
  fbAnchor.style.display = "none";
  plusFb.style.display = "none";
  heading.style.display = "block";
  otpLogin.style.border = "1px solid black";
  otpLoginInside.style.display = "none";
  otpAnchor.style.display = "block";
  plus.style.display = "block";
  passwordLogin.style.border = "1px solid black";
  passwordLoginInside.style.display = "none";
  passwordAnchor.style.display = "block";
  plusPassword.style.display = "block";
});

signup_btn.addEventListener("click", function () {
  login_click.style.display = "none";
  signup_click.style.display = "block";
});

// ---------------------------- Section on click "LOGIN" ends here ---------------------------- //

// ------------------------ Section on click "Request OTP" Starts Here ------------------------- //

const otpVerifyBtn = document.querySelector(".verify-OTP-Btn");
const otpInput = document.querySelector(".otp-input");
const otpBtn = document.querySelector("#otp_btn");
const otpContainer = document.querySelector(".otp-container");
const phoneNo = document.querySelector(".phone").value;

otpBtn.addEventListener("click", function () {
  // if (phoneNo) {
  localStorage.setItem("phone", phoneNo);
  otpContainer.style.display = "block";
  login_click.style.display = "none";
  // } else {
  //   alert("Please enter a phone number");
  // }
});

otpVerifyBtn.addEventListener("click", () => {
  let obj = {
    otpInput: otpInput.value,
  };
  if (otpInput.value === "1234") {
    let login = document.getElementById("login");
    // console.log(login);
    localStorage.setItem("otp", otpInput.value);
    alert("OTP verified");
    otpContainer.style.display = "none";
    tops.style.display = "block";
    bottom.style.display = "block";
    main.style.display = "block";
    // debugger;
    footer.style.display = "block";
    login.innerHTML = "LOGOUT";
    // tops.style.width = "100vw";
    // bottom.style.width = "100vw";
  } else {
    alert("invalid OTP");
  }
});

// ------------------------ Section on click "Request OTP" Ends Here ------------------------- //

// ---------------------------- Section on click "SIGN UP NOW" starts here ----------------- //

const registerBtn = document.querySelector("#register");
const firstName = document.querySelector("#first_name");
const lastName = document.querySelector("#last_name");
const mobNo = document.querySelector("#mobile_no");
const email = document.querySelector("#email");
const password = document.querySelector(".password");

registerBtn.addEventListener("click", () => {
  let obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    mobileNo: mobNo.value,
    emailId: email.value,
    pass: password.value,
  };

  if (password.value.length > 15) {
    alert("Max of 15");
  } else {
    let data = JSON.parse(localStorage.getItem("data")) || [];

    console.log(data);
    let flag = true;
    for (let i = 0; i < data.length; i++) {
      if (
        obj.mobileNo === data[i].mobileNo ||
        obj.emailId === data[i].emailId
      ) {
        flag = false;
        break;
      }
    }
    if (!flag) {
      alert("already user");
    } else {
      data.push(obj);
      localStorage.setItem("data", JSON.stringify(data));
      alert("registered successfully");
      signup_click.style.display = "none";
      tops.style.display = "block";
      bottom.style.display = "block";
      main.style.display = "block";
    }
  }
});

// localStorage.clear();

// ---------------------------- Section on click "SIGN UP NOW" ends here ----------------- //

// ----------------------- Section on click "BOOK MY APPOINTMENT" starts here ----------------- //

const asdf = document.querySelector(".bookMyApmt");

asdf.addEventListener("click", function () {
  window.open("./Book My Apmt/book.html");
});

// ----------------------- Section on click "BOOK MY APPOINTMENT" ends here ----------------- //

// ---------------------------------- Slider(just after header) Starts Here -------------------- //

var counter = 1;

setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 7) {
    counter = 1;
  }
}, 5000);

// ---------------------------------- Slider(just after header) Ends Here ------------------- //

// ------------------------------------ Fastrack Essentials Starts Here --------------------- //

const trendingWatchImage = document.querySelectorAll(".trending_watch_image");
const trendingPreBtn = document.querySelectorAll(".trending-prev-btn");
const trendingNxtBtn = document.querySelectorAll(".trending-next-btn");
const prevBtn = document.querySelectorAll(".prev-btn");
const nextBtn = document.querySelectorAll(".next-btn");

trendingWatchImage.forEach((item, i) => {
  let a = item.getBoundingClientRect();
  let b = a.width;

  trendingPreBtn[i].addEventListener("click", () => {
    item.scrollLeft -= b;
  });

  trendingNxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += b;
  });

  prevBtn[i].addEventListener("click", () => {
    item.scrollLeft -= b;
  });

  nextBtn[i].addEventListener("click", () => {
    item.scrollLeft += b;
  });
});

// ------------------------------------ Fastrack Essentials Ends Here --------------------- //

// ----------------------------------- Trending Products Starts Here ---------------------- //

const trendingProductsImg = document.querySelectorAll(
  ".trending-products-images"
);
const trendingPrevBtn = document.querySelectorAll(".trendingProductButton1");
const trendingNextBtn = document.querySelectorAll(".trendingProductButton2");

trendingProductsImg.forEach((item, i) => {
  let c = item.getBoundingClientRect();
  let d = c.width;

  trendingPrevBtn[i].addEventListener("click", () => {
    item.scrollLeft -= d;
  });

  trendingNextBtn[i].addEventListener("click", () => {
    item.scrollLeft += d;
  });
});

// ----------------------------------- Trending Products Ends Here ---------------------- //

// ------------------------------------ Store Starts Here ---------------------- //

const storePage = document.querySelector(".location");

storePage.addEventListener("click", function () {
  window.open("./Store/store.html");
});

// ------------------------------------- Store Ends Here ----------------------- //
