const liItem = document.querySelectorAll("ul li");
const divItem = document.querySelectorAll(".product div");
const gur = document.querySelector(".gurgoan");

liItem.forEach((li) => {
  gur.style.display = "block";
  li.onclick = function () {
    //Filter
    const value = li.textContent;
    divItem.forEach((div) => {
      div.style.display = "none";

      if (div.getAttribute("data-filter") == value.toLowerCase()) {
        div.style.display = "block";
      }
    });
  };
});
