jQuery(document).ready(function ($) {
    document.getElementsByTagName("h1")[0].style.fontSize = "6vw";
    var menuButton = $("div.header-button a#megamenu-toggle");
    menuButton.on("click tap", function () {
      var megaMenu = $("div.trentham-megamenu");
      if (!megaMenu.is(":visible")) {
        megaMenu.css({ display: "block" });
      } else {
        megaMenu.css({ display: "none" });
      }
    });
  
    var desktopMenuItem = $(
      ".l-header .header .section-nav .department-nav li.d-none"
    );
    var dropdownMenu = $(
      ".l-header .header .section-nav .department-nav li.d-none ul"
    );
    var menuHoverState = {
      isHovering: false,
      isDropDownOpen: false,
      isMouseInDropDown: false,
    };
  
    function removeMenu(menuHoverState) {
      menuHoverState.isHovering = false;
      menuHoverState.isMouseInDropDown = false;
      if (!menuHoverState.isHovering && !menuHoverState.isMouseInDropDown) {
        desktopMenuItem.removeClass("hover-active");
        menuHoverState.isDropDownOpen = false;
      }
    }
  
    function handleMenu(element, menuHoverState) {
      var target = $(element).parent();
      /**
       * When going from L > R on the menu
       * Hover state picks up the UL wrapper
       * So change target to the context
       */
      if (target[0].nodeName == "UL") {
        target = target.context;
      }
  
      // when hover, show dropdown
      if (!$(target).hasClass("hover-active")) {
        $(target).addClass("hover-active");
        menuHoverState.isDropDownOpen = true;
      }
    }
  
    desktopMenuItem.mouseenter(function (event) {
      // Only allow the function to run if the hovered node
      // is a LI or an A tag
      // When moving down to the megamenu it causes problems due to nesting
      if (
        $(event.target)[0].nodeName == "A" ||
        $(event.target)[0].nodeName == "LI"
      ) {
        console.log("mouseenter desktopMenuItem");
        var menu = $("ul.department-nav");
        menu.children().removeClass("hover-active");
        menuHoverState.isDropDownOpen = false;
        menuHoverState.isHovering = true;
        console.log($(event.target));
  
        handleMenu(event.target, menuHoverState);
      }
    });
  
    dropdownMenu
      .mouseenter(function () {
        menuHoverState.isMouseInDropDown = true;
      })
      .mouseleave(function () {
        removeMenu(menuHoverState);
      });
  });
  