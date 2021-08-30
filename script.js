//nowy js

//////////////////////
//page navigation smooth
document
  .querySelector(".main-navigation-list")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains("main-navigation-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

//////////////
//menu fade animation

const nav = document.querySelector(".main-navigation");

const handleHover = function (e) {
  if (e.target.classList.contains("main-navigation-link")) {
    const link = e.target;
    const siblings = link
      .closest(".main-navigation")
      .querySelectorAll(".main-navigation-link");
    const logo = link.closest(".main-navigation").querySelector(".logo");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//////////////////////
////////sticky navigation

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
