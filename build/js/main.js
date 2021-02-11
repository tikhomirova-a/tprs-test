'use strict';

(function () {
  const ESCAPE = `Escape`;
  let body;
  let nav;

  if (document.querySelector(`.page-body`)) {
    body = document.querySelector(`.page-body`);

    if (body.querySelector(`.main-nav`)) {
      nav = body.querySelector(`.main-nav`);
    }
  }

  window.util = {
    ESCAPE,
    body,
    nav
  };
})();

(function () {
  let menuToggle;
  let menu;

  if (window.util.nav) {
    if (window.util.nav.querySelector(`.main-nav__button`)) {
      menuToggle = window.util.nav.querySelector(`.main-nav__button`);
    }

    if (window.util.nav.querySelector(`.menu`)) {
      menu = window.util.nav.querySelector(`.menu`);
    }
  }

  const hideMenu = () => {
    window.util.nav.classList.remove(`main-nav--open`);
    window.util.body.removeEventListener(`keydown`, onMenuEscape);
    window.modal.loginLink.removeEventListener(`click`, window.modal.onLoginLinkClick);
    menu.removeEventListener(`click`, onMenuClick);
    window.util.body.removeEventListener(`click`, onMenuOverlayClick);
  };

  const onMenuEscape = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideMenu();
    }
  };

  const onMenuClick = (evt) => {
    if (evt.target.tagName !== `A`) {
      evt.stopPropagation();
    }
  };

  const onMenuOverlayClick = (evt) => {
    if (evt.target !== menu) {
      hideMenu();
    }
  };

  const showMenu = () => {
    window.util.nav.classList.add(`main-nav--open`);
    window.util.body.addEventListener(`keydown`, onMenuEscape);
    window.modal.loginLink.addEventListener(`click`, window.modal.onLoginLinkClick);
    menu.addEventListener(`click`, onMenuClick);
    window.util.body.addEventListener(`click`, onMenuOverlayClick);
  };

  const toggleMenu = () => {
    if (window.util.nav.classList.contains(`main-nav--open`)) {
      hideMenu();
    } else {
      showMenu();
    }
  };

  const onMenuTogglePress = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    toggleMenu();
  };

  if (menuToggle) {
    menuToggle.addEventListener(`click`, onMenuTogglePress);
  }

  window.menu = {
    onMenuEscape,
    onMenuOverlayClick
  };
})();

(function () {
  let supportBlock;
  let supportLink;
  let supportDropdown;

  if (window.util.body.querySelector(`.main-nav__support`)) {
    supportBlock = window.util.body.querySelector(`.main-nav__support`);
  }

  if (window.util.body.querySelector(`.main-nav__support > a`)) {
    supportLink = window.util.body.querySelector(`.main-nav__support > a`);
  }

  const showDropdown = () => {
    supportBlock.classList.add(`main-nav__support--open`);
    supportDropdown = supportBlock.querySelector(`.main-nav__dropdown`);
    supportBlock.addEventListener(`click`, onSupportClick);
    supportDropdown.addEventListener(`click`, onSupportClick);
    window.util.body.addEventListener(`click`, onSupportOverlayClick);
  };

  const hideDropdown = () => {
    supportBlock.classList.remove(`main-nav__support--open`);
    supportBlock.removeEventListener(`click`, onSupportClick);
    supportDropdown.removeEventListener(`click`, onSupportClick);
    window.util.body.removeEventListener(`click`, onSupportOverlayClick);
  };

  const toggleSupportDropdown = () => {
    if (supportBlock.classList.contains(`main-nav__support--open`)) {
      hideDropdown();
    } else {
      showDropdown();
    }
  };

  const onSupportLinkClick = (evt) => {
    evt.preventDefault();
    toggleSupportDropdown();
  };

  const onSupportClick = (evt) => {
    if (evt.target.tagName !== `A` && evt.target.parentElement.className !== `main-nav__support-link`) {
      evt.stopPropagation();
    }
  };

  const onSupportOverlayClick = (evt) => {
    if (evt.target !== supportDropdown) {
      hideDropdown();
    }
  };

  if (supportLink) {
    supportLink.addEventListener(`click`, onSupportLinkClick);
  }
})();

(function () {
  let paymentItems;

  if (window.util.body.querySelectorAll(`.payment-item`)) {
    paymentItems = window.util.body.querySelectorAll(`.payment-item`);
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

(function () {
  let loginLink;
  let loginModal;
  let buttonClose;

  if (window.util.nav) {
    if (window.util.nav.querySelector(`.menu__user-nav a`)) {
      loginLink = window.util.nav.querySelector(`.menu__user-nav a`);
    }

    if (window.util.body.querySelector(`.modal-login`)) {
      loginModal = window.util.body.querySelector(`.modal-login`);

      if (loginModal.querySelector(`.modal-login__content > button`)) {
        buttonClose = loginModal.querySelector(`.modal-login__content > button`);
      }
    }
  }

  const hideModal = () => {
    loginModal.classList.remove(`modal-login--show`);
    window.util.body.classList.remove(`page-body--no-scroll`);
    buttonClose.removeEventListener(`click`, onButtonCloseClick);
    window.util.body.removeEventListener(`keydown`, onModalEsc);
    loginModal.removeEventListener(`click`, onModalOverlayClick);
    window.util.body.addEventListener(`keydown`, window.menu.onMenuEscape);
    window.util.body.addEventListener(`click`, window.menu.onMenuOverlayClick);
  };

  const onButtonCloseClick = () => {
    hideModal();
  };

  const onModalEsc = (evt) => {
    if (evt.key === window.util.ESCAPE) {
      evt.preventDefault();
      hideModal();
    }
  };

  const onModalOverlayClick = (evt) => {
    if (evt.target === loginModal) {
      hideModal();
    }
  };

  const showModal = () => {
    loginModal.classList.add(`modal-login--show`);
    window.util.body.classList.add(`page-body--no-scroll`);
    buttonClose.addEventListener(`click`, onButtonCloseClick);
    window.util.body.removeEventListener(`keydown`, window.menu.onMenuEscape);
    window.util.body.addEventListener(`keydown`, onModalEsc);
    loginModal.addEventListener(`click`, onModalOverlayClick);
    window.util.body.removeEventListener(`click`, window.menu.onMenuOverlayClick);
  };

  const onLoginLinkClick = (evt) => {
    evt.preventDefault();
    showModal();
  };

  window.modal = {
    loginLink,
    onLoginLinkClick
  };
})();
