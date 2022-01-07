'use strict';
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
// const testing = document.querySelector('.testing');
// const testing2 = document.querySelector('.paragraphy');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// button scroll
btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect()); //measurement of our page the way we are viewing them. this include the height, width, top, bottom etc
  +(
    // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); //at this the scroll X/Y will be zero, because at the time of clicking the btnScrollTo the page is steady i.e it has not scroll to anywhere but if it where to be in another position where scrolling as already happens then definately the scroll X/Y will not be zero
    // console.log(
    //   'height/width viewport',
    //   document.documentElement.clientHeight,
    //   document.documentElement.clientWidth
    // ); //to check the height and width of the current viewport of our page
    //scrolling
    //one(but not efficient(only works when we are at the top))
    // window.scrollTo(s1coords.left, s1coords.top);
    //2(good but we can make it better(not smooth like we want)) (again we use this calculation because the top(Y) is relative to the viewpoint (i.e height of the screen at a certain point), so if we only specified the top like 👆🏾 then it will not work when we click the btn to scroll to the where we specify cos the height is relative to the viewport and not too the top of the page)
    // window.scrollTo(
    //   s1coords.left + window.pageXOffset,
    //   s1coords.top + window.pageYOffset //now we add the viewport and the to of our page together
    // );
    //3(smooth 👍(very smooth just like we want)(but still this is the old way and we dont like old ways 🤷‍♀ and we have to write a lot of codes and manual calculation ))
    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: 'smooth',
    // });
    //4(now thats what we are talking about 👌👍)
    section1.scrollIntoView({ behavior: 'smooth' })
  );
});

//Page navigatin
//normal way but not efficient
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//event delegation way
//1. Add event listener to common parent element
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();

  //Matching Strategies
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tab component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //closest help us find the parent element with the closest class name that we specified
  // console.log(clicked);

  // Guard Clause(in order to afford null value cos if the tab container is clicked it wil be null cos it has no closest parent element cos it is the parent that we are are using to get our tabs clicked(event delegation), so if the variable clicked is null it should return so the error is avoided and it wont go further to add the next line)(ignoring any click around our even listerner if the class is not found)
  if (!clicked) return;

  // Remove the active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // ACTIVE TAB
  clicked.classList.add('operations__tab--active');

  // Active Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); //for example here our scroll X/Y will not be zero, well actually Y will not be zero cos the only happens on the Y aixs. but no scrolling happens on the X aixs so it will still be zero.
});

// menu fake animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// sticky navigation

// //this method will do but its bad for performance
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API(allows our code to observe changes to the way that a certain target element intersect another element or the way it intersect the viewport)

// const obsCallback = function (entries) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; //getting the nav height so that the sticky nav can start as soon as the header height is the same as the nav height

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  //if the header is out of view(since we get the nav height it will be as soon as it the same height with the nav)then add the sticky nav
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header); //we are observing the header here so if the header is still in view it means its intersecting

//Revealing sections

const allSections = document.querySelectorAll('.section');

const reavealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; //because the isintersecting always start at the top, our first page will not be hidden but it will start initially so we need a way to avoid this, so the hidden is only remove when intersection start

  entry.target.classList.remove('section--hidden'); //removing the hidding
  observer.unobserve(entry.target); //to avoid repeatition
};

const sectionObserver = new IntersectionObserver(reavealSection, {
  root: null,
  threshold: 0.15, //the time it will take before the page shows
});

allSections.forEach(function (section) {
  //looping over the sections and adding hiiden to all of them
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading image

const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //replacing the image
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(function (img) {
  imageObserver.observe(img);
});

//slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0; //INITIALIZING THE FIRST SLIDE TO BE ZERO
  const maxSlide = slides.length; //SETTING THE MAXIMUM SLIDE SO THAT THE SLIDER DOES NOT GO PASS THE SLIDES LENGTH(REMEMBER ITS LIKE ARRAY SO ITS ZERO BASE I.E STARTING FROM 0[0,1,2......] SO WE NEED -1 OR + 1)

  //FUNCTIONS
  const createDots = function () {
    //WE LOOP OVER EACH SLIDE AND CREATE DOT FOR EACH OF THEM BY CREATING ANOTHER HTML ELEMENT (BUTTON)
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    //now we want to indicate that this is the picture we are looking at with the dot by adding active class to it(just some changes in css to make the active dot different from others)

    //we first remove the active class from then add it to the current one with the data attribute
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`) //TAKING THE SLIDES TO THE SIDE AND MAKING SURE THE CURRENT SLIDE IS HAVING 0%
    );
  };

  //next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      //WE ARE USING -1 AGAIN HERE BECAUSE MAXSLIDE IS ZERO BASE AND WE DONT WANT THAT
      //MAKING SURE THE SLIDER DOES NOT GO PASS THE SLIDES LENGTH AND RETURNING IT BACK TO THE FIRST SIDE
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide); //TAKING THE SLIDES TO THE SIDE AND MAKING SURE THE CURRENT SLIDE IS HAVING 0%

    activateDot(curSlide);
  };

  const prevSlide = function () {
    //SO HERE BECAUSE WE ARE MOVING TO THE PREVIOUS SLIDE(LEFT), THE END OF THE SLIDE WILL BE WHEN THE CURRENT SIDE IS 0, SO WE NEED TO TELL THE SLIDE TO STOP AND GO BACK TO THE FIRST SLIDE
    if (curSlide === 0) {
      curSlide = maxSlide - 1; //WE ARE USING -1 AGAIN HERE BECAUSE MAXSLIDE IS ZERO BASE AND WE DONT WANT THAT
    } else {
      curSlide--; //BECAUSE WE ARE MOVING TO THE OTHER SIDE NOW, WE ARE
    }
    goToSlide(curSlide);

    activateDot(curSlide);
  };

  //INITIALIZING THE FUNCTIONS
  const init = function () {
    createDots();

    goToSlide(0); // goToSlide(0) is the same as this (slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`)); //TAKING ALL THE SLIDE TO THE SIDE AND GIVING THEM EACH STYLE SO THAT THEY WONT BE ON TOP OF EACH OTHER(WE USE 100% BECAUSE THE WIDTH OF EACH IMAGE IS 100 SO IT WILL PUT EACH IMAGE AT THE END OF THE OTHER)) because we refactor our code to avoid repeatition, so i - 0 is still i

    activateDot(curSlide);
  };

  init();

  //EVENT HANDLERS
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);

    //1
    // if(e.key === 'ArrowLeft') prevSlide();
    // if(e.key === 'ArrowRight') nextSlide();

    //2
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();

    //3
    // e.key === 'ArrowLeft'
    //   ? prevSlide()
    //   : e.key === 'ArrowRight'
    //   ? nextSlide()
    //   : 'Invalid Key';
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log('not');
      const { slide } = e.target.dataset;
      goToSlide(slide);

      activateDot(slide);
    }
  });
};
slider();

const menuBtn = document.querySelector('.menu-button');
const burger = document.querySelector('.menu-button_burger');
const navLinks = document.querySelector('.nav__links');
const navItem = document.querySelectorAll('.nav__item');
const navLink = document.querySelectorAll('.nav__link');
let show = false;

function toggleMenu() {
  if (!show) {
    burger.classList.add('open');
    nav.classList.add('open');
    navLinks.classList.add('open');
    navItem.forEach(items => items.classList.add('open'));

    show = true;
  } else {
    burger.classList.remove('open');
    nav.classList.remove('open');
    navLinks.classList.remove('open');
    navItem.forEach(items => items.classList.remove('open'));

    show = false;
  }
}

menuBtn.addEventListener('click', toggleMenu);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

// const b = () => {
//   testing2.classList.add('hidden');
//   testing.innerHTML = 'wow';
// };
// const click = testing.addEventListener('click', () => {
//   if (testing.innerHTML === 'click') {
//     testing2.style.transition = 'all 2s';
//     testing2.style.backgroundColor = 'green';
//     testing2.style.color = 'pink';
//     testing2.classList.add('hidden');
//     testing.innerHTML = 'wow';
//   } else if (testing.innerHTML === 'wow') {
//     testing2.style.transition = 'all 5s';
//     testing2.style.backgroundColor = 'white';
//     testing2.style.color = 'purple';
//     testing2.classList.remove('hidden');
//     testing.innerHTML = 'click';
//   }
// });

// $('testing').click(() => {
//   $('paragraphy').css('background-color', 'black').css('color', '#fff');
// });
// console.log(document.documentElement);//will give you the entire html document
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');//returns HTML collections with all the buttons inside

console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// creating and inserting element

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">GOT it</button>';

// header.prepend(message); //will be the first child of the element we pend it to
header.append(message); //last child of the element we pend it to
// header.append(message.cloneNode(true)); //to make the message show both as the first and last child of the element we pend it to

// header.before(message);
// header.after(message);

// delete element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();

    message.parentElement.removeChild(message); //old way of doing it
  });

// styles(they are inline styles)
message.style.backgroundColor = '#37383d';
message.style.width = '120%'; //note: we can't read width properties because of the message.style but because they are inline style if we try to get styles that are not inline it will not work

console.log(message.style.height); //this will not work
console.log(message.style.backgroundColor);
console.log(message.style.color); //this will not work

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//atribute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); //absolute
console.log(logo.getAttribute('src')); //relative

//non-standard(they won't work because js will see as invalid attribute to element)
console.log(logo.designer); //here is non-standard cos designer is not an attribute of an image element

console.log(logo.getAttribute('designer')); //finding way to get the non-standard
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data Attribute
console.log(logo.dataset.versionNumber);


// classes

logo.classList.add()
logo.classList.remove()
logo.classList.toggle()
logo.classList.contains()

// dont use cos it override it
logo.className = 'jonas'



// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great You are reading the heading :D');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // stop propagation
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});


const h1 = document.querySelector('h1');

// going downwards
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'green';
h1.lastElementChild.style.color = 'orange';

// going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'yellow';
h1.closest('h1').style.background = 'blue';

// closest is use to get the parent

//querySelector is use for siblings

// going sideways: siblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});


document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page Fully loaded', e);
});
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
*/
