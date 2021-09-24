'use strict';
//nowy js

//////////////////////
//page navigation smooth main nav
document
  .querySelector('.main-navigation')
  .addEventListener('click', function (e) {
    if (!e.target.classList.contains('btn-nav')) e.preventDefault();
    // Matching strategy
    if (
      e.target.classList.contains('main-navigation-link') ||
      e.target.classList.contains('logo')
    ) {
      const id = e.target.getAttribute('href');
      console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      header.classList.remove('nav-open');
    }
  });

//////////////
//menu fade animation

const nav = document.querySelector('.main-navigation');

const handleHover = function (e) {
  if (e.target.classList.contains('main-navigation-link')) {
    const link = e.target;
    const siblings = link
      .closest('.main-navigation')
      .querySelectorAll('.main-navigation-link');
    const logo = link.closest('.main-navigation').querySelector('.logo');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////
////////sticky navigation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////
//Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

///////////////////////
//Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider-btn--left');
  const btnRight = document.querySelector('.slider-btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlides = slides.length;

  //functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots-dot" aria-label="dot-button" data-slide="${i}"></button>`
        //lighthouse aria-label="dot-button"
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots-dot')
      .forEach(dot => dot.classList.remove('dots-dot--active'));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add('dots-dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //next slide
  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
  ///Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots-dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector('.years');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});
///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

///////////////////////////////////////////////////////////
//page hs icon navigation

const hsIcon = document.querySelector('#logo');

hsIcon.addEventListener('click', function (e) {
  e.preventDefault();
  headerEl.scrollIntoView({ behavior: 'smooth' });
});
