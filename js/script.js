(function($) {

  "use strict";

  var initTexts = function(){
    // Wrap every letter in a span
    // var textWrapper = $('.txt-fx');

    $('.txt-fx').each(function(){
      this.innerHTML = this.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    });

    anime.timeline()
      .add({
        targets: '.txt-fx .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 100,
        delay: (el, i) => 0
      });
  }
  var animateTexts = function(){

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 30 * i
      });
  }

  var hideTexts = function(){

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 30 * i
      })
  }

  // initialize all the sliders
  var initSlider = function() {
    // homepage slider | slick slider
    $('.main-slider').slick({
        autoplay: false,
        autoplaySpeed: 4000,
        fade: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    });

    $('.main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      hideTexts();
      console.log('beforeChange');
    });

    $('.main-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
      animateTexts();
      console.log('afterChange');
    });
    
    initTexts();
    animateTexts();
  }

  // smooth scroll for one page nav
  var smoothScroll = function() {
    // navigation smooth scroll
    $('.smoothscroll').on('click', function (e) {
        const target = this.hash;
        const $target = $(target);
        var offset = $target.offset().top-100;

        e.preventDefault();
        e.stopPropagation();

        $('html, body').stop().animate({
            'scrollTop': offset
        }, 1000, 'easeInOutExpo').promise().done(function () {
            // window.location.hash = target;
            // return false;
        });
    });
  }

  // animate search box
  var searchButton = function() {
    // search box toggle
    $('#header-wrap').on('click', '.search-toggle', function(e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });


    // close when click off of container
    $(document).on('click touchstart', function (e){
      if (!$(e.target).is('.search-toggle, .search-toggle *, #header-wrap, #header-wrap *')) {
        $('.search-toggle').removeClass('active');
        $('#header-wrap').removeClass('show');
      }
    });
  }

  // initialize tabs
  var jsTabs = function() {
    // portfolio tabs
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
          tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
      })
    });
  }

  // stick header on the top
  var stickyHeader = function() {
    // header menu
    var StickyHeader = new hcSticky('#header.fixed', {
      stickTo: 'body',
      top: 0,
      bottomEnd: 200,
      responsive: {
        1024: {
          disable: true
        }
      }
    });
  }

  //Overlay Menu Navigation
  var overlayMenu = function () {

    if(!$('.nav-overlay').length) {
      return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
    };
    init();
  }

  // init Chocolat light box
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
    })
  }

  // init jarallax parallax
  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  $(document).ready(function(){

    stickyHeader();
    smoothScroll();
    searchButton();
    initSlider();
    jsTabs();
    initChocolat();
    overlayMenu();
    initJarallax();

  }); // End of document ready

})(jQuery);

(function($) {

  "use strict";

  var searchPopup = function() {
    // open search box
    $('#header-nav').on('click', '.search-button', function(e) {
      $('.search-popup').toggleClass('is-visible');
    });

    $('#header-nav').on('click', '.btn-close-search', function(e) {
      $('.search-popup').toggleClass('is-visible');
    });
    
    $(".search-popup-trigger").on("click", function(b) {
        b.preventDefault();
        $(".search-popup").addClass("is-visible"),
        setTimeout(function() {
            $(".search-popup").find("#search-popup").focus()
        }, 350)
    }),
    $(".search-popup").on("click", function(b) {
        ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
        $(this).removeClass("is-visible"))
    }),
    $(document).keyup(function(b) {
        "27" === b.which && $(".search-popup").removeClass("is-visible")
    })
  }

  var initProductQty = function(){

    $('.product-qty').each(function(){

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          if(quantity>0){
            $el_product.find('#quantity').val(quantity - 1);
          }
      });

    });

  }

  $(document).ready(function() {

    searchPopup();
    initProductQty();

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      navigation: {
        nextEl: ".swiper-arrow-prev",
        prevEl: ".swiper-arrow-next",
      },
    });         

    var swiper = new Swiper(".product-swiper", {
      slidesPerView: 4,
      spaceBetween: 10,
      pagination: {
        el: "#mobile-products .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        980: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      },
    });      

    var swiper = new Swiper(".product-watch-swiper", {
      slidesPerView: 4,
      spaceBetween: 10,
      pagination: {
        el: "#smart-watches .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        980: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      },
    }); 

    var swiper = new Swiper(".testimonial-swiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-arrow-prev",
        prevEl: ".swiper-arrow-next",
      },
    }); 

  }); // End of a document ready

})(jQuery);