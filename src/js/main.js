$(document).ready(function() {
  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);
  var easingSwing = [0.02, 0.01, 0.47, 1]; // default jQuery easing for anime.js
  var lastClickEl;

  ////////////
  // READY - triggered when PJAX DONE
  ////////////

  // single time initialization
  _window.on("resize", debounce(setBreakpoint, 200));

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

  // FILTER REMOVE CLASS IS ACTIVE WHEN FOCUS ANOTHER ELEMENT

  _document.on("click", function(e) {
    if (!$(e.target).closest(".filter__row--double").length > 0) {
      $(".filter__row--double").removeClass("is-active");
    }
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

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint() {
    var wHost = window.location.host.toLowerCase();
    var displayCondition =
      wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0;
    if (displayCondition) {
      var wWidth = _window.width();

      var content = "<div class='dev-bp-debug'>" + wWidth + "</div>";

      $(".page").append(content);
      setTimeout(function() {
        $(".dev-bp-debug").fadeOut();
      }, 1000);
      setTimeout(function() {
        $(".dev-bp-debug").remove();
      }, 1500);
    }
  }
});
