$(document).ready(function() {
  //////////
  // Global variables
  //////////

  var _document = $(document);

  ////////////
  // READY - triggered when PJAX DONE
  ////////////

  // single time initialization

  function pageReady() {
    initSelectric();
  }

  // this is a master function which should have all functionality
  pageReady();

  //////////
  // COMMON
  //////////

  // Prevent # behavior
  _document.on("click", '[href="#"]', function(e) {
    e.preventDefault();
  });

  // HAMBURGER TOGGLER
  _document.on("click", "[js-hamburger]", function() {
    $(this).toggleClass("is-active");
    $(this)
      .parent()
      .toggleClass("is-active");
  });

  // CURRENCY TOGGLER
  _document.on("click", ".filter__currency a", function() {
    $(".filter__currency a").removeClass("is-active");
    $(this).toggleClass("is-active");
  });

  // FILTER FOCUS DROPDOWN
  _document.on("focus", "[js-focus]", function() {
    $(".filter__row--double").removeClass("is-active");
    $(this)
      .closest(".filter__row--double")
      .addClass("is-active");
  });

  _document.on("click", "[js-open-history-container]", function(e) {
    e.preventDefault();
    $(".edit-page__history-container").slideToggle();
  });

  // FILTER REMOVE CLASS IS ACTIVE WHEN FOCUS ANOTHER ELEMENT

  _document.on("click", function(e) {
    if (!$(e.target).closest(".filter__row--double").length > 0) {
      $(".filter__row--double").removeClass("is-active");
    }
  });

  // OPEN FILTER + TOGGLE CLASS BUTTON

  _document.on("click", "[js-open-filter]", function() {
    $(".filter").toggleClass("closed");
    $(this).toggleClass("closed");
  });

  ////////////////////
  // SHOW PASSWORD TOGGLE
  ////////////////////

  // selectric
  function initSelectric() {
    $("select").selectric({
      maxHeight: 300,
      disableOnMobile: false,
      nativeOnMobile: false
    });
  }
});
