
// Hide Header on on scroll down

var didScroll;
var lastScrollTop = 0;
var fivePixel = 5;
var navbarHeight = $('header').outerHeight();
var navup = $("#menu").outerHeight();
var headerup = $('header').outerHeight();


$(window).on("scroll", (function () {
    didScroll = true;
}));

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function getNeg(val) {
    return Math.abs(val) * -1;
};

//function hasScrolled() {
//    var st = $(this).scrollTop();
//    if (Math.abs(lastScrollTop - st) <= fivePixel)
//        return;
//    if (st > lastScrollTop && st > navbarHeight) {
//        // Scroll Down
//        if ($(".mobileMenu").hasClass('activeMenu')) {
//            return;
//        }

//        if ($('.stMenu > li > a').hasClass('hoverList')) {
//            return;
//        }
//        $('header').removeClass('nav-down').addClass('nav-up');
//        // $('navup').css(getNeg(headerup));
//        // $('header').css('top', navup + 200);
//        $('.stMobileMenu').slideUp(200);



//    } else {
//        // Scroll Up
//        if (st + $(window).height() < $(document).height()) {
//            $('header').removeClass('nav-up').addClass('nav-down');
//        }
//    }

//    lastScrollTop = st;
//}








$(document).ready(function () {
    'use strict';
    var textIndentAmount = 15; // number controls the text indent for the sub menus
    var transitionWidth = 768;
    var animationClickHandler;
    var windowHeight = $(window).height();
    var mvcProject = false;

    var menuType = "2";		// 1 = click
    // 2 = hover
    // 3 = hover with overview text	

    var resizeTimeout;
    var sw = viewport().width;

    animationClickHandler = function (event) {
        var target = $(event.target);
        var parent = target.parent();

        if (parent.hasClass("closed-img")) {
            parent.removeClass("closed closed-img").addClass("active open-img");
            target.siblings("ul").slideDown("fast");
            parent.siblings().removeClass("active").addClass("closed");
        } else if (parent.hasClass("open-img")) {
            parent.removeClass("active open-img").addClass("closed closed-img");
            target.siblings("ul").slideUp("fast");
            parent.siblings().removeClass("active").addClass("closed");
        }
    };

    function viewport() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    }

    init();
    function init() {
        $(".menu > ul").addClass("stMenu");
        $(".menu > ul.stMenu").clone().addClass("stMobileMenu").appendTo($('.menu')).removeClass('stMenu');
        setStMenu();
        setStMobileMenu();
    }

    function reEval() {
        setStMenuControls();
        setStMobileMenuControls();
    }

    function urlCheck() {
        var homePages = ['0', 'home', 'index.html', 'default.aspx'];
        var url = window.location.pathname;

        function GetURLParameter() {
            var sPageURL = window.location.href.toLowerCase();
            var indexOfLastSlash = sPageURL.lastIndexOf("/");

            if (indexOfLastSlash > 0 && sPageURL.length - 1 !== indexOfLastSlash) {
                return sPageURL.substring(indexOfLastSlash + 1);
            } else {
                return 0;
            }
        }

        if (GetURLParameter() == '0' || homePages.indexOf(GetURLParameter('0')) > -1) {
            $("body .menu").addClass("placeholder");
            //return 0;

        }

        if (mvcProject === true) {
            $(".stMobileMenu a").each(function () {
                if (url === $(this).attr("href") || url === $(this).attr("href") + "#") {
                    $(this).addClass("activePg");
                }
            });
        } else {
            $(".stMobileMenu a").each(function () {
                if (GetURLParameter("0") === $(this).attr("href").toLowerCase() || GetURLParameter("0") === $(this).attr("href").toLowerCase() + "#") {
                    $(this).addClass("activePg");
                }
            });
        }
    }

    function setStMobileMenu() {
        $(".menu").prepend("<div class='mobileMenu'></div>");
        $(".menu > ul.stMobileMenu").hide();
        recurse($("ul.stMobileMenu li ul li").children("ul"), 1);
        setStMobileMenuControls();
    }

    function setStMobileMenuControls() {
        urlCheck();
        mobileMenuBtn();
        disableActionLink();
        viewSubMenu();
        resetList();
    }

    function mobileMenuBtn() {
        $(".mobileMenu").on("click", function (event) {


            if ($(this).hasClass("activeMenu")) {
                $(this).removeClass("activeMenu");
                $(this).siblings(".stMobileMenu").stop(true, true).hide("slide", { direction: "right" }, 300);
                $(this).siblings(".stMobileMenu li.active").addClass("closed").removeClass("active");
                $(this).siblings(".stMobileMenu li.closed").children("ul").hide();
                $(this).siblings(".stMobileMenu li.open-img").removeClass("open-img").addClass("closed-img");
                //$('.shadow').removeClass('active').removeAttr('style');
                jQuery('body').unbind('touchmove');
                
                $('body').removeClass('stop-scrolling');
         
            } else {
            var currentScrollPos = $('body').scrollTop();
                $(this).addClass("activeMenu");
                $(this).siblings(".stMobileMenu").stop(true, true).show("slide", { direction: "right" }, 300);
                $(this).siblings(".stMobileMenu li.open-img").addClass("open-img").removeClass("closed-img");
                $(this).siblings(".stMobileMenu li.closed").children("ul").show();
               jQuery('body').bind('touchmove', function (e) { e.preventDefault() });
                $('body').addClass('stop-scrolling');
             
            }


            if ($(".stMobileMenu > li").hasClass("closed-img")) {
                $(".stMobileMenu > li.open-img ul").hide();
                $(".stMobileMenu > li.open-img").removeAttr("class");
            }


            $(".stMobileMenu ul.Parent").show();
            $(".stMobileMenu a.activePg").siblings().children("li.closed").parent().parent().removeClass("closed closed-img").addClass("active open-img");
        });
    }

    function disableActionLink() {
        $("a.activePg, a.activePg a").click(function (event) {
            event.preventDefault();
        });
    }

    function viewSubMenu() {
        $(".stMobileMenu li a.activePg").click(animationClickHandler).find("ul").hide();

        if ($("a.activePg").parent().parent() !== $("ul").hasClass("stMobileMenu")) {
            $("a.activePg").parentsUntil("ul.stMobileMenu").addClass("Parent");
            $("ul.stMobileMenu li").removeAttr("class");
            $(".stMobileMenu ul.Parent").siblings("a").parent().addClass("open-img");
            $(".stMobileMenu ul.Parent").hide();
        }
        $('ul.stMobileMenu').css('max-height', windowHeight * .75);
        $('ul.stMobileMenu').css('overflow-y', 'auto');
    }

    function resetList() {
        $(".stMobileMenu a.activePg").parent().removeClass("active").addClass("closed");
        $(".stMobileMenu a.activePg").siblings().slideUp("fast").parent().removeClass("open-img").addClass("closed-img");
    }

    function setStMenu() {
        recurse($("ul.stMenu li ul li").children("ul"), 1);
        setStMenuControls();
    }

    function recurse(elem, index) {
        $(elem).css("text-indent", textIndentAmount * index);

        if ($(elem).find("ul").length > 0) {
            return recurse($(elem).find("ul"), ++index);
        } else {
            return;
        }
    }

    function setStMenuControls() {
        urlCheck();
        $("ul.stMenu > li ul").show();
        $("ul.stMenu > li > ul").hide();

        if (menuType == '1') {
            createOverviews();

            $("ul.stMenu li.dropdown > a").click(function (event) {
                event.preventDefault();
            });

            $("ul.stMenu > li.dropdown").click(function () {
                $(this).siblings().children("ul").stop(true, true).slideUp("fast");
                $(this).siblings().children("ul").parent().removeClass('shown');
                $(this).children("ul").stop(true, true).slideToggle("fast");
                $(this).children("ul").parent().toggleClass('shown');
            });
        } else if (menuType == '2') {
            $("ul.stMenu > li").hover(
                function () {
                $(this).children("ul").stop(true, false).fadeToggle(150);
                }
			);
        } else {
            createOverviews();
            $('ul.stMenu > li.dropdown').addClass("noPlus");

            $("ul.stMenu > li").hover(
				function () {
				    $(this).children("ul").hide().stop(true, true).slideDown("fast").show();
				},
				function () {
				    $(this).children("ul").show().stop(true, true).slideUp("fast");
				}
			);
        }
    }

    function createOverviews() {
        $('ul.stMenu .ddChild').detach();
        $('ul.stMenu > li > ul').parent().addClass("dropdown");

        $('ul.stMenu li.dropdown').each(function () {
            var ddChildren = $(this).children('ul');
            $(this).clone().removeClass('dropdown').addClass('ddChild').prependTo(ddChildren);
        });

        $('.ddChild ul').detach();
        $('.ddChild a').html('Overview');

    }

    function clearLayoutStyles() {
        if ($(".menu").hasClass("homePg") === false) {
            $(".stMobileMenu").slideUp().fadeOut("fast");
        }

        $('.mobileMenu').removeClass("activeMenu");
        $('.mobileMenu').siblings(".stMobileMenu").stop(true, true).hide();
        $('.mobileMenu').siblings(".stMobileMenu li.active").addClass("closed").removeClass("active");
        $('.mobileMenu').siblings(".stMobileMenu li.closed").children("ul").hide();
        $('.mobileMenu').siblings(".stMobileMenu li.open-img").removeClass("open-img").addClass("closed-img");


        $('.stMenu li').removeClass("shown");
        $('.stMobileMenu li, .stMobileMenu li a').removeAttr("class");

        setStMenuControls();

        $(".stMenu li, .stMenu a, .stMobileMenu li, .stMobileMenu a").unbind();
    }

    $(window).resize(function () {
        var nsw = viewport().width;
        setMobileMenuControls();
        if (sw !== nsw) {
            sw = nsw;
            clearLayoutStyles();
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                reEval();
            }, 150);
        }
    });
});






