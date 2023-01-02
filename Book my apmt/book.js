const video = document.querySelector(".video");
const visit = document.querySelector(".visit");
const video_call = document.querySelector(".videoCall");
const visit_store = document.querySelector(".visitStore");

video.style.borderBottom = "2px solid orangered";

video.addEventListener("click", function () {
  video_call.style.display = "block";
  visit_store.style.display = "none";
  this.style.borderBottom = "2px solid orangered";
  visit.style.borderBottom = "none";
});

visit.addEventListener("click", function () {
  video_call.style.display = "none";
  visit_store.style.display = "block";
  this.style.borderBottom = "2px solid orangered";
  video.style.borderBottom = "none";
});

const submitBtn = document.querySelector(".submitBtn");
const personName = document.querySelector(".name");
const phoneNumber = document.querySelector(".phoneNumber");
const state = document.querySelector(".state");

submitBtn.addEventListener("click", () => {
  let obj = {
    personName: personName.value,
    phoneNumber: phoneNumber.value,
    state: state.value,
  };
  if (personName.value == "") {
    alert("Invaild input");
  } else if (phoneNumber.value == "") {
    alert("Invalid input");
  } else if (state.option == "") {
    alert("Invalid input");
  } else {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    data.push(obj);
    localStorage.setItem("data", JSON.stringify(data));
    alert("Appointment Booked");
  }
});

// =================================== Visit Store =================================== //

const visitBtn = document.querySelector(".btnVisit");
const personVisit = document.querySelector("#name");
const phoneVisit = document.querySelector("#phone");
const city = document.querySelector(".city");
const personEmail = document.querySelector(".userEmail");
const store = document.querySelector(".store");
const date = document.querySelector(".date");
const time = document.querySelector(".time");

visitBtn.addEventListener("click", () => {
  let obj = {
    personVisit: personVisit.value,
    phoneVisit: phoneVisit.value,
    city: city.value,
    personEmail: personEmail.value,
    store: store.value,
    date: date.value,
    time: time.value,
  };
  if (personVisit.value == "") {
    alert("Invaild input");
  } else if (phoneVisit.value == "") {
    alert("Invalid input");
  } else if (city.option == "") {
    alert("Invalid input");
  } else if (store.option == "") {
    alert("Invalid input");
  } else if (date.value == "") {
    alert("Invalid input");
  } else if (time.option == "") {
    alert("Invalid input");
  } else {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    data.push(obj);
    // console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    alert("Appointment Booked");
  }
});
