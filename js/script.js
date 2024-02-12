"use strict";

/**
 * Elements
 */
const body = document.body;
const header = document.querySelector(".m-header");
const nav = document.querySelector(".c-navigation");
const mobileBtn = document.querySelector(".c-navigation__mobile-btn");

/**
 * Constants
 */
const headerHeight = nav.getBoundingClientRect().height;

/**
 * Sticky navigation
 */
const observerCallback = (entries) => {
  const entry = entries.at(0);
  header.style.paddingTop = entry.isIntersecting ? 0 : `${headerHeight}px`;
  nav.classList.toggle("c-navigation--sticky", !entry.isIntersecting);
};

const observerOptions = {
  root: null,
  rootMargin: `-${headerHeight}px`,
  threshold: 0,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(header);

/**
 * Open / close mobile menu.
 */
const toggleMenu = () => {
  header.classList.toggle("menu-open");
};
mobileBtn.addEventListener("click", toggleMenu);

/**
 * Smooth scrolling.
 */
body.addEventListener("click", (e) => {
  const clickedLink = e.target.closest("a[href^='#']");
  if (!clickedLink) return;

  e.preventDefault();
  header.classList.remove("menu-open");

  const id = clickedLink.hash.slice(1);
  const element = document.getElementById(id) || body;

  window.scroll({
    behavior: "smooth",
    top: window.scrollY + element.getBoundingClientRect().y - headerHeight,
  });
});
