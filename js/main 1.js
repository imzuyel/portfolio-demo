// Preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".preloader").classList.add("hide");
  }, 400);
});
//End Preloader

// Progress bar on-top start
(() => {
  const scrollline = document.querySelector(".scroll-line");
  function fillscrollline() {
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;
    const scrolled = window.scrollY;
    const percentScrolled = (scrolled / (fullHeight - windowHeight)) * 100;
    scrollline.style.width = percentScrolled + "%";
  }
  window.addEventListener("scroll", fillscrollline);
})();
//  Progress bar on-top end

// Custome cursor pointer
(() => {
  let cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: window.innerWidth / 2,
    endY: window.innerHeight / 2,
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector(".cursor-dot"),
    $outline: document.querySelector(".cursor-dot-outline"),

    init: function () {
      // Set up element sizes
      this.dotSize = this.$dot.offsetWidth;
      this.outlineSize = this.$outline.offsetWidth;

      this.setupEventListeners();
      this.animateDotOutline();
    },

    updateCursor: function (e) {
      let self = this;
      // Show the cursor
      self.cursorVisible = true;
      self.toggleCursorVisibility();

      // Position the dot
      self.endX = e.pageX;
      self.endY = e.pageY;
      self.$dot.style.top = self.endY + "px";
      self.$dot.style.left = self.endX + "px";
    },

    setupEventListeners: function () {
      let self = this;

      // Anchor hovering
      document.querySelectorAll("a").forEach((event) => {
        event.addEventListener("mouseover", function () {
          self.cursorEnlarged = true;
          self.toggleCursorSize();
        });
        event.addEventListener("mouseout", function () {
          self.cursorEnlarged = false;
          self.toggleCursorSize();
        });
      });

      // Click events
      document.addEventListener("mousedown", function () {
        self.cursorEnlarged = true;
        self.toggleCursorSize();
      });
      document.addEventListener("mouseup", function () {
        self.cursorEnlarged = false;
        self.toggleCursorSize();
      });

      document.addEventListener("mousemove", (e) => {
        // Show the cursor
        self.cursorVisible = true;
        self.toggleCursorVisibility();

        // Position the dot
        self.endX = e.pageX;
        self.endY = e.pageY;
        self.$dot.style.top = self.endY + "px";
        self.$dot.style.left = self.endX + "px";
      });

      // Hide/show cursor
      document.addEventListener("mouseenter", function (e) {
        self.cursorVisible = true;
        self.toggleCursorVisibility();
        self.$dot.style.opacity = 1;
        self.$outline.style.opacity = 1;
      });

      document.addEventListener("mouseleave", function (e) {
        self.cursorVisible = true;
        self.toggleCursorVisibility();
        self.$dot.style.opacity = 0;
        self.$outline.style.opacity = 0;
      });
    },

    animateDotOutline: function () {
      let self = this;

      self._x += (self.endX - self._x) / self.delay;
      self._y += (self.endY - self._y) / self.delay;
      self.$outline.style.top = self._y + "px";
      self.$outline.style.left = self._x + "px";

      requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
      let self = this;

      if (self.cursorEnlarged) {
        self.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
        self.$outline.style.transform = "translate(-50%, -50%) scale(1.5)";
      } else {
        self.$dot.style.transform = "translate(-50%, -50%) scale(1)";
        self.$outline.style.transform = "translate(-50%, -50%) scale(1)";
      }
    },

    toggleCursorVisibility: function () {
      let self = this;

      if (self.cursorVisible) {
        self.$dot.style.opacity = 1;
        self.$outline.style.opacity = 1;
      } else {
        self.$dot.style.opacity = 0;
        self.$outline.style.opacity = 0;
      }
    },
  };
  cursor.init();
})();
//End custome cursor pointer

// Nav menu start
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = document.querySelector(".close-nav-menu");
  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScroolingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScroolingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      // Make sure event target hash has a value before overriding default behavior
      if (event.target.hash !== "") {
        // prevent default behavior
        event.preventDefault();
        const hash = event.target.hash;
        // Deactive existing active link
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // active new section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // Deactive existing active navigation menu 'link-item'
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");

        // If clicked 'link item contained within the navigation menu
        if (navMenu.classList.contains("open")) {
          //  Active new navigation menu 'link-item'
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // Deactive the new navigation menu 'link-item'
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // Add hash (#) to url (#)
        window.location.hash = hash;
      }
    }
  });
})();
// Nav menu end


// About section start
(() => {
  aboutSection = document.querySelector(".about-section");
  tabscontainer = document.querySelector(".about-tabs");

  tabscontainer.addEventListener("click", (event) => {
    // if event target contains tab item class and not contains active class
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      // deactivate existing active 'tab-item'
      tabscontainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // Active new 'tab-item'
      event.target.classList.add("active", "outer-shadow");
      // deactivate existing active 'tab-contain'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // Active new 'tab-contain'
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();
// About section end

// Portfolio filter & popup section
(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = document.querySelector(".pp-prev"),
    nextBtn = document.querySelector(".pp-next"),
    closeBtn = document.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

  let itemIndex, slideIndex, screenShots;
  // Filter portfolio item
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // Deactive exiting active 'filter item'
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // Active new  'filter item'
      event.target.classList.add("outer-shadow", "active");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });
  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;
      // get the portfolio index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenShots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshot");
      // Convert  the screenshot into Array
      screenShots = screenShots.split(",");
      if (screenShots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });
  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });
  function popupToggle() {
    popup.classList.toggle("open");
    bodyScroolingToggle();
  }
  function popupSlideshow() {
    const imgSrc = screenShots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    //  Active loader until the popup image load
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      //  deactivate loader after load popup image
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenShots.length;
  }
  // next image load
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenShots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });
  // prev image load
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenShots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });
  function popupDetails() {
    // if portfolio-item details not exists
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return;
    }
    projectDetailsBtn.style.display = "block";
    // get the project details
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }
  // popup details
  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });
  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();
// Hide scrolling when 'protfolio item' showing
function bodyScroolingToggle() {
  document.body.classList.toggle("hide-scrolling");
}
//End  Portfolio filter & popup section

// Testimonial slider
(() => {
  const sliderContainer = document.querySelector(
    ".testimonial-slider-container"
  ),
    slides = sliderContainer.querySelectorAll(".testimonial-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testimonial-slider-nav .prev"),
    nextBtn = document.querySelector(".testimonial-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testimonial-item.active");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );
  //  Set width of all slideshow
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });

  // Set width of sliderContainer
  sliderContainer.style.width = slideWidth * slides.length + "px";
  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });
  function slider() {
    // Deactive existing active slide
    sliderContainer
      .querySelector(".testimonial-item.active")
      .classList.remove("active");
    // active new Slide
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }
  slider();
})();
//End Testimonial slider



$(document).ready(function () {
  typing(0, $(".typewriter-text").data("text"));

  function typing(index, text) {
    var textIndex = 1;

    var tmp = setInterval(function () {
      if (textIndex < text[index].length + 1) {
        $(".typewriter-text").text(text[index].substr(0, textIndex));
        textIndex++;
      } else {
        setTimeout(function () {
          deleting(index, text);
        }, 2000);
        clearInterval(tmp);
      }
    }, 150);
  }

  function deleting(index, text) {
    var textIndex = text[index].length;

    var tmp = setInterval(function () {
      if (textIndex + 1 > 0) {
        $(".typewriter-text").text(text[index].substr(0, textIndex));
        textIndex--;
      } else {
        index++;
        if (index == text.length) {
          index = 0;
        }
        typing(index, text);
        clearInterval(tmp);
      }
    }, 150);
  }
});
