//navbar
function toggleNavbarMenu() {
  const menu = document.getElementById("navbarMenu");
  menu.classList.toggle("show");
}

const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.closest(".accordion-item"); // safer than parentElement
    const isActive = item.classList.contains("active");

    document
      .querySelectorAll(".accordion-item")
      .forEach((i) => i.classList.remove("active"));

    if (!isActive) item.classList.add("active");
  });
});


// courosell 
const members = document.querySelectorAll(".team-member");
const leftBtn = document.querySelector('[aria-label="Previous"]');
const rightBtn = document.querySelector('[aria-label="Next"]');
const dotsContainer = document.querySelector(".dots-container");
const grid = document.querySelector(".team-grid");

let index = 0;
let autoSlide;


const getPerSlide = () => window.innerWidth <= 480 ? 1 : 4;


function updateCarousel() {
  const perSlide = getPerSlide();
  members.forEach((el, i) => {
    el.style.display = (i >= index && i < index + perSlide) ? "block" : "none";
  });


  const totalDots = Math.ceil(members.length / perSlide);
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === Math.floor(index / perSlide) ? " active-dot" : "");
    dotsContainer.appendChild(dot);
  }
}


const next = () => {
  index += getPerSlide();
  if (index >= members.length) index = 0;
  updateCarousel();
};

const prev = () => {
  index -= getPerSlide();
  if (index < 0) index = 0;
  updateCarousel();
};


function setupCarousel() {
  index = 0;
  if (window.innerWidth <= 480) {
    leftBtn.style.display = rightBtn.style.display = "none";
    autoSlide = setInterval(next, 3000);
  } else {
    leftBtn.style.display = rightBtn.style.display = "inline-block";
    clearInterval(autoSlide);
  }
  updateCarousel();
}


let startX = 0;
grid.addEventListener("touchstart", e => startX = e.touches[0].clientX);
grid.addEventListener("touchend", e => {
  let diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
});


leftBtn.onclick = prev;
rightBtn.onclick = next;
window.addEventListener("resize", setupCarousel);
document.addEventListener("DOMContentLoaded", setupCarousel);

