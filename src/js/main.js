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
  legacySupport();
  initaos();
  _window.on("resize", debounce(setBreakpoint, 200));

  // on transition change
  // getPaginationSections();
  // pagination();
  // _window.on("scroll", throttle(pagination, 50));
  // _window.on("resize", debounce(pagination, 250));

  function pageReady() {
    initMasks();
    initSelectric();
    initValidations();
    initSlider();
    initPopup();
    initQuantity();
    initZoom();
  }

  // this is a master function which should have all functionality
  pageReady();

  //////////
  // COMMON
  //////////

  function initaos() {
    AOS.init();
  }

  function legacySupport() {
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }

  // Prevent # behavior
  _document
    .on("click", '[href="#"]', function(e) {
      e.preventDefault();
    })
    .on("click", 'a[href^="#section"]', function(e) {
      // section scroll
      var el = $(this).attr("href");
      scrollToSection($(el));
      return false;
    })

    ///
    /// toggle class на странице карточки товара справа кнопка "Полное описание"

    .on("click", "[js-thumb-toggle]", function(e) {
      e.preventDefault();
      $("[js-thumb-toggle]").removeClass("is-active");
      $(this).toggleClass("is-active");
    })

    /// toggle class на странице карточки товара справа кнопка "Полное описание"
    ///

    ///
    /// toggle class на странице карточки товара справа кнопка "Полное описание"

    .on("click", "[js-show-full]", function(e) {
      e.preventDefault();
      $(this)
        .parent()
        .toggleClass("show-info");
    })

    /// toggle class на странице карточки товара справа кнопка "Полное описание"
    ///

    ///
    /// toggle class на странице карточки товара выбор цвета

    .on("click", "[js-choose-color]", function(e) {
      e.preventDefault();
      $("[js-choose-color]").removeClass("is-active");
      $(this).toggleClass("is-active");
    })

    /// toggle class на странице карточки товара выбор цвета
    ///

    ///
    /// toggle class на странице карточки товара выбор цвета

    .on("click", "[js-choose-shop]", function(e) {
      e.preventDefault();
      $("[js-choose-shop]").removeClass("is-active");
      $(this).toggleClass("is-active");
    })

    /// toggle class на странице карточки товара выбор цвета
    ///

    ///
    /// можно удалять, для того  что бы показать цифры у иконок

    .on("click", "[js-show-points]", function(e) {
      e.preventDefault();
      $(this).toggleClass("show-points");
    })

    /// можно удалять, для того  что бы показать цифры у иконок
    ///

    ///
    /// активная иконка в таблице на странице размеры

    .on("click", ".sizes__table td", function(e) {
      e.preventDefault();
      $(this).toggleClass("is-active");
    })

    /// активная иконка в таблице на странице размеры
    ///

    ///
    /// на странице Personal клик по чекбоксу что бы выбрать другой город

    .on("click", "[js-checkbox]", function(e) {
      e.preventDefault();
      $("[js-checkbox-label]").click();
    })

    /// на странице Personal клик по чекбоксу что бы выбрать другой город
    ///

    ///
    /// табы

    .on("click", "[js-top-button]", function(e) {
      e.preventDefault();
      var $self = $(this),
        tabIndex = $self.index();
      $self.siblings().removeClass("is-active");
      $self.addClass("is-active");
      // $(".top10__tab").removeClass("is-active");
      $(".top10__tab")
        .removeClass("is-active")
        .css("display", "none")
        .eq(tabIndex)
        .fadeIn();
    })

    /// табы
    ///

    ///
    /// табы на странице ORDERS + CARD

    .on("click", "[js-order-btn]", function(e) {
      e.preventDefault();
      var $self = $(this),
        tabIndex = $self.index();
      $self.siblings().removeClass("is-active");
      $self.addClass("is-active");
      // $(".top10__tab").removeClass("is-active");
      $(".orders__tab")
        .removeClass("is-active")
        .css("display", "none")
        .eq(tabIndex)
        .fadeIn();
    })

    /// табы на странице ORDERS + CARD
    ///

    ///
    /// табы на странице CARD внизу страницы

    .on("click", "[js-order-btn2]", function(e) {
      e.preventDefault();
      var $self = $(this),
        tabIndex = $self.index();
      $self.siblings().removeClass("is-active");
      $self.addClass("is-active");
      // $(".top10__tab").removeClass("is-active");
      $(".card-bottom__tab")
        .removeClass("is-active")
        .css("display", "none")
        .eq(tabIndex)
        .fadeIn();
    })

    /// табы на странице CARD внизу страницы
    ///

    ///
    /// открытие элемента фильтра на странице CATALOG LIST

    .on("click", "[js-open-filter]", function(e) {
      e.preventDefault();
      $(this)
        .parent()
        .toggleClass("is-active");
      $(this).toggleClass("is-active");
    })

    /// открытие элемента фильтра на странице CATALOG LIST
    ///

    ///
    /// выбор элемента фильтра на странице CATALOG LIST

    .on("click", "[js-choose-filter]", function(e) {
      e.preventDefault();
      $(this).toggleClass("is-active");
    })

    /// выбор элемента фильтра на странице CATALOG LIST
    ///

    ///
    /// удаление элемента фильтра на странице CATALOG LIST

    .on("click", "[js-remove-filter]", function(e) {
      e.preventDefault();
      $(this)
        .parent()
        .remove();
    });

  /// удаление элемента фильтра на странице CATALOG LIST
  ///

  ///
  /// +/- на странице shop card

  function initQuantity() {
    _document.ready(function() {
      $(".minus").click(function() {
        var $input = $(this)
          .parent()
          .find("input");
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
      });
      $(".plus").click(function() {
        var $input = $(this)
          .parent()
          .find("input");
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
      });
    });
  }

  /// +/- на странице shop card
  ///

  function scrollToSection(el) {
    var headerHeight = $(".header").height();
    var targetScroll = el.offset().top - headerHeight;

    TweenLite.to(window, 1, {
      scrollTo: targetScroll,
      ease: easingSwing
    });
  }

  ////////////////////
  // MAGNIFIC POPUPS
  ////////////////////

  function initPopup() {
    // Image popups
    $("[js-popup-image]").magnificPopup({
      type: "image",
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup
          this.st.image.markup = this.st.image.markup.replace(
            "mfp-figure",
            "mfp-figure mfp-with-anim"
          );
          this.st.mainClass = this.st.el.attr("data-effect");
        }
      },
      closeOnContentClick: true,
      midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });

    // Video popups
    $("[js-popup-video]").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }

  ////////////////////
  // SLIDERS
  ////////////////////

  function personalInfoSliderInit() {
    if ($(document).width() > 768) {
      if ($("[js-mobile-slider]").hasClass("slick-initialized"))
        $("[js-mobile-slider]").slick("unslick");
    } else {
      if (!$("[js-mobile-slider]").hasClass("slick-initialized")) {
        $("[js-mobile-slider]").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        });
      }
    }
  }

  personalInfoSliderInit();

  $(window).resize(function() {
    personalInfoSliderInit();
  });

  function initZoom() {
    $(document).ready(function() {
      $(".xzoom, .xzoom-gallery").xzoom({
        zoomWidth: 500,
        zoomHeight: 500,
        title: true,
        tint: "#333",
        Xoffset: 15
      });

      //Integration with hammer.js
      var isTouchSupported = "ontouchstart" in window;

      if (isTouchSupported) {
        //If touch device
        $(".xzoom").each(function() {
          var xzoom = $(this).data("xzoom");
          xzoom.eventunbind();
        });

        $(".xzoom").each(function() {
          var xzoom = $(this).data("xzoom");
          $(this)
            .hammer()
            .on("tap", function(event) {
              event.pageX = event.gesture.center.pageX;
              event.pageY = event.gesture.center.pageY;
              var s = 1,
                ls;

              xzoom.eventmove = function(element) {
                element.hammer().on("drag", function(event) {
                  event.pageX = event.gesture.center.pageX;
                  event.pageY = event.gesture.center.pageY;
                  xzoom.movezoom(event);
                  event.gesture.preventDefault();
                });
              };

              xzoom.eventleave = function(element) {
                element.hammer().on("tap", function(event) {
                  xzoom.closezoom();
                });
              };
              xzoom.openzoom(event);
            });
        });
      } else {
      }
    });
  }

  function initSlider() {
    $("[js-firstscreen-slider]").slick({
      dots: true,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      pauseOnFocus: false,
      speed: 500
      // fade: true,
      // cssEase: "linear"
    });

    $("[js-card-slider]").slick({
      dots: false,
      arrows: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 788,
          settings: {
            dots: true,
            arrows: false
          }
        }
      ]
    });

    $("[js-awards-slider]").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      loop: true,
      infinite: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 788,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: true
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true
          }
        }
      ]
    });
  }

  // HAMBURGER TOGGLER
  _document.on("click", "[js-hamburger]", function() {
    $(this).toggleClass("is-active");
    $("nav").toggleClass("is-open");
    $(".header__calc").toggleClass("is-open");
    $("body").toggleClass("is-fixed");
    $("html").toggleClass("is-fixed");
  });

  ////////////////////
  // SHOW PASSWORD TOGGLE
  ////////////////////

  // Masked input
  function initMasks() {
    $("[js-dateMask]").mask("99.99.99", { placeholder: "ДД.ММ.ГГ" });
    $("input[type='tel']").mask("(000) 000-0000", {
      placeholder: "+7 (___) ___-____"
    });
  }

  // selectric
  function initSelectric() {
    $("select").selectric({
      maxHeight: 300,
      disableOnMobile: false,
      nativeOnMobile: false
    });
  }

  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org
  function initValidations() {
    // GENERIC FUNCTIONS
    var validateErrorPlacement = function(error, element) {
      error.addClass("ui-input__validation");
      error.appendTo(element.parent("div"));
    };
    var validateHighlight = function(element) {
      $(element)
        .parent("div")
        .addClass("has-error");
    };
    var validateUnhighlight = function(element) {
      $(element)
        .parent("div")
        .removeClass("has-error");
    };
    var validateSubmitHandler = function(form) {
      $(form).addClass("loading");
      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: $(form).serialize(),
        success: function(response) {
          $(form).removeClass("loading");
          var data = $.parseJSON(response);
          if (data.status == "success") {
            // do something I can't test
          } else {
            $(form)
              .find("[data-error]")
              .html(data.message)
              .show();
          }
        }
      });
    };

    var validatePhone = {
      required: true,
      normalizer: function(value) {
        var PHONE_MASK = "(XXX) XXX-XXXX";
        if (!value || value === PHONE_MASK) {
          return value;
        } else {
          return value.replace(/[^\d]/g, "");
        }
      },
      minlength: 11,
      digits: true
    };

    ////////
    // FORMS

    /////////////////////
    // REGISTRATION FORM
    ////////////////////

    $(".js-form-want").validate({
      errorPlacement: validateErrorPlacement,
      highlight: validateHighlight,
      unhighlight: validateUnhighlight,
      submitHandler: validateSubmitHandler,
      rules: {
        name: "required",
        phone: "required",
        mail: "required"
      },
      messages: {
        name: "Заполните это поле",
        phone: "Заполните это поле",
        mail: "Заполните это поле"
      }
    });
  }

  // some plugins get bindings onNewPage only that way
  function triggerBody() {
    $(window).scroll();
    $(window).resize();
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
