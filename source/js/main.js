'use strict';

(function () {
  let body;
  let nav;
  let menuToggle;

  if (document.querySelector(`.page-body`)) {
    body = document.querySelector(`.page-body`);

    if (body.querySelector(`.main-nav`)) {
      nav = body.querySelector(`.main-nav`);

      if (nav.querySelector(`.main-nav__button`)) {
        menuToggle = nav.querySelector(`.main-nav__button`);
      }
    }
  }

  const hideMenu = () => {
    nav.classList.remove(`main-nav--open`);
    body.removeEventListener(`keydown`, onMenuToggleEscape);
    // body.removeEventListener(`click`, onOverlayClick); TODO
  };

  const onMenuToggleEscape = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideMenu();
    }
  };

  // const onOverlayClick = (evt) => {
  //   console.log(evt.target.parentElement);
  // };

  const showMenu = () => {
    nav.classList.add(`main-nav--open`);
    body.addEventListener(`keydown`, onMenuToggleEscape);
    // body.addEventListener(`click`, onOverlayClick);
  };

  const toggleMenu = () => {
    if (nav.classList.contains(`main-nav--open`)) {
      hideMenu();
    } else {
      showMenu();
    }
  };

  const onMenuTogglePress = (evt) => {
    evt.preventDefault();
    toggleMenu();
  };

  menuToggle.addEventListener(`click`, onMenuTogglePress);

  window.menu = {
    body
  };
})();

(function () {
  let paymentItems;

  if (window.menu.body.querySelectorAll(`.payment-item`)) {
    paymentItems = window.menu.body.querySelectorAll(`.payment-item`);
  }

  const closeAllItems = () => {
    paymentItems.forEach((item) => {
      item.classList.remove(`payment-item--open`);
    });
  };

  const onPaymentHeaderClick = (element) => {
    if (element.classList.contains(`payment-item--open`)) {
      element.classList.remove(`payment-item--open`);
    } else {
      closeAllItems();
      element.classList.add(`payment-item--open`);
    }
  };

  for (let paymentItem of paymentItems) {
    paymentItem.querySelector(`h3`).addEventListener(`click`, onPaymentHeaderClick.bind(undefined, paymentItem));
  }
})();
