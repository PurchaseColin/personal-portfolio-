"use strict";
// PRELOADER

// add event listener on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoader", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// NAVBAR
// navbar toggle for mobile

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

// header active when the window scrolls to 100 px

const header = document.querySelector("[data-header");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

// SLIDER

const sliders = document.querySelectorAll("[data-slider]");
const initSlider = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector(
    "[data-slider-container]"
  );
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(
    getComputedStyle(currentSlider).getPropertyValue("--slider-items")
  );
  let totalSlideableItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  };

  // NEXT SLIDER

  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlideableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }
    moveSliderItem();
  };
  sliderNextBtn.addEventListener("click", slideNext);

  // PREV SLIDER

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlideableItems;
    } else {
      currentSlidePos--;
    }
    moveSliderItem();
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlideableItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }

  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) sliderNext();
    if (event.shiftKey && event.deltaY > 0) sliderPrev();
  });

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(
      getComputedStyle(currentSlider).getPropertyValue("--slider-items")
    );
    totalSlideableItems =
      sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });
};
for (let i = 0, len = sliders.length; i < len; i++) {
  initSlider(sliders[i]);
}
