/*
* Customization and Configuration Scripts JS
*
*    
* @project Hotsite Theme
* @version 1.0
* @date 13/10/2016
* @package layout
* @company PRODEST
* @author Lucas Matias Caetano <lucas.caetano@prodest.es.gov.br>
*/


//<![CDATA[
+function ($) {


    /*========================================================
    *Scroll Up
    ========================================================== */

    $(function () {

        $.scrollUp({
            scrollName: 'scrollUp',      // Element ID
            scrollDistance: 30,         // Distance from top/bottom before showing element (px)
            scrollFrom: 'top',           // 'top' or 'bottom'
            scrollSpeed: 300,            // Speed back to top (ms)
            easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
            animation: 'fade',           // Fade, slide, none
            animationSpeed: 200,         // Animation speed (ms)
            scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
            scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
            scrollText: '<i class="fa fa-chevron-up"></i>', // Text for element, can contain HTML
            scrollTitle: 'Ir para o Topo',          // Set a custom <a> title if required.
            scrollImg: false,            // Set true to use image
            activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
            //zIndex: 2147483647           // Z-Index for the overlay
            zIndex: 1000
        });

    });

    /*========================================================
    * Data atual
    ========================================================== */
    var now = new Date();
    $(".year").each(function () {
        if (now.getFullYear() > 2016) {
            $(this).append("- " + now.getFullYear());
        }
    });

    /*========================================================
    *Smooth Scroll
    ========================================================== */
    $(function () {
        smoothScroll.init();
    });

    /*========================================================
    * Menu
    ========================================================== */

    $(function () {
        /*Hover dropdown*/
        $(window).on("load resize", function (e) {
            if ($(window).width() > 991) {
                $('#main-menu .nav li.dropdown').hover(function () {
                    $(this).addClass('open');
                }, function () {
                    $(this).removeClass('open');
                });
                /*Fixed Top*/

                $(".menu-site").sticky({ topSpacing: 0 });
            }
        });


    });




    /*========================================================
    * PGW Slider
    ========================================================== */
    $(function () {
        try {
            $('.pgwSlideshow').each(function () {
                $(this).pgwSlideshow({
                    maxHeight: 450
                });
            });
        } catch (err) {
            //We can also throw from try block and catch it here
        } finally {
            //code for finally block
        }

    });

    /*========================================================
    * Owl Carousel
    ========================================================== */

    $(function () {
        $('.owl-carousel-news').each(function () {

            var itemsPerPage = $(this).data("items-perpage");
            var autoPlayValue = true;
            var loopValue = true;
            var dotsValue = true;

            var totalItems = $(this).next('input[name=total-items]').val();
            if (totalItems <= itemsPerPage) {
                itemsPerPage = totalItems;
                autoPlayValue = false;
                loopValue = false;
                dotsValue = false;
            }

            $(this).owlCarousel({
                responsiveClass: true,
                autoplay: autoPlayValue,
                items: itemsPerPage,
                loop: loopValue,
                margin: 0,
                dots: dotsValue,
                autoplayHoverPause: true,
                responsive: {
                    // breakpoint from 0 up
                    // breakpoint from 480 up
                    0: {
                        items: 1,
                        autoplay: true,
                        loop: true,
                        dots: true
                    },
                    480: {
                        items: 2,
                        autoplay: true,
                        loop: true,
                        dots: true
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2,
                        autoplay: true,
                        loop: true,
                        dots: true
                    },
                    980: {
                        items: itemsPerPage
                    }
                }
            });
        });

        $(window).on("load resize", function (e) {
            equalHeightNewsCarousel();
        });


    });

    
    /*========================================================
    * Carousel Group News
    ========================================================== */

    function equalHeightNewsCarousel() {

        $(".owl-carousel").each(function () {
            maxHeight = 0;
            $(this).find(".recent-post").each(function () {
                if (maxHeight < $(this).height()) {
                    maxHeight = $(this).height();
                }
            });
            if (maxHeight > 0) {
                $(this).find(".recent-post").each(function () {
                    if ($(this).height() < maxHeight) {
                        var difHeight = maxHeight - $(this).height();
                        //difHeight += 10;
                        $(this).find(".learn-more").css("padding-top", difHeight + "px");
                    }
                });
            }

        });
    }

    /*========================================================
    * Google Maps
    ========================================================== */
    
    $(function () {

        $(".google-map").each(function () {
            google.maps.event.addDomListener(window, 'load', initMap($(this).attr("id")));
        });
        function initMap(idMap) {
            var nome = "";
            var endereco = "";
            var bairro = "";
            var cidade = "";
            var cep = "";
            var tel = "";
            var uf = "";
            var email = "";
            
            var mapCanvas = document.getElementById(idMap);

            var location = new google.maps.LatLng(parseFloat(mapCanvas.getAttribute('data-lat')), parseFloat(mapCanvas.getAttribute('data-lng')));/*-20.313506, -40.296551*/

            var mapOptions = {
                center: location,
                zoom: 17,
                panControl: false,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(mapCanvas, mapOptions);

            var marker = new google.maps.Marker({
                position: location,
                map: map,
            });

            if(mapCanvas.getAttribute('data-nome') != ""){
                nome = '<h3>' + mapCanvas.getAttribute('data-nome')+'</h3>';
            }
            if(mapCanvas.getAttribute('data-endereco') != ""){
                endereco = mapCanvas.getAttribute('data-endereco');
            }
            if(mapCanvas.getAttribute('data-bairro') != ""){
                bairro = ' - ' + mapCanvas.getAttribute('data-bairro');
            }
            if(mapCanvas.getAttribute('data-cidade') != ""){
                cidade = ' - ' + mapCanvas.getAttribute('data-cidade');
            }
            if(mapCanvas.getAttribute('data-cep') != ""){
                cep = '<br />CEP: ' + mapCanvas.getAttribute('data-cep');
            }
            if (mapCanvas.getAttribute('data-uf') != "") {
                uf = ' / ' + mapCanvas.getAttribute('data-uf');
            }
            if (mapCanvas.getAttribute('data-tel') != "") {
                tel = '<br />Tel.: ' + mapCanvas.getAttribute('data-tel');
            }
            if (mapCanvas.getAttribute('data-email') != "") {
                email = '<br />E-mail: <a title=/"Enviar e-mail/" style=/"text-decoration:underline;/" href=/"mailto:' + mapCanvas.getAttribute('data-email') + '/" target=/"_top/">' +
                    mapCanvas.getAttribute('data-email') + '</a>';
            }

            
            if (endereco != "" || bairro != "" || cep != "" || cidade != "" || uf != "" || tel != "" || email != "") {
                var contentString = '<div class="info-window">' +
                        nome +
                        '<div class="info-content">' +
                            '<p>' + endereco + bairro + cep + cidade + uf + tel + email + '</p>' +
                        '</div>' +
                        '</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 400
                });

                infowindow.open(map, marker);

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            }
            

        }

        
    });

    
    /*========================================================
    *Thumbnail Hover
    ========================================================== */

    $(function () {


        if (Modernizr.touch) {
            // show the close overlay button
            $(".close-overlay").removeClass("hidden");
            // handle the adding of hover class when clicked
            $(".img").click(function (e) {
                if (!$(this).hasClass("hover")) {
                    $(this).addClass("hover");
                }
            });
            // handle the closing of the overlay
            $(".close-overlay").click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).closest(".img").hasClass("hover")) {
                    $(this).closest(".img").removeClass("hover");
                }
            });
        } else {
            // handle the mouseenter functionality
            $(".img").mouseenter(function () {
                $(this).addClass("hover");
            })
            // handle the mouseleave functionality
            .mouseleave(function () {
                $(this).removeClass("hover");
                $('.selected .img').addClass("hover");
            });
        }



    });


    /*========================================================
    * prettyPhoto
    ========================================================== */

    $(function () {

        $("area[rel^='prettyPhoto']").prettyPhoto();

        $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'normal', theme: 'pp_default', slideshow: 3000, autoplay_slideshow: false, social_tools: false });

        $(".gallery").each(function () {

            $(this).find("a[rel^='prettyVideo']").prettyPhoto({
                animation_speed: 'normal',
                theme: 'video',
                slideshow: 3000,
                autoplay_slideshow: false,
                social_tools: false,
                default_width: 850,
                default_height: 480,
                callback: function () {
                    $(".video-item").each(function () {
                        if ($(this).find(".video-play").hasClass("fa-pause")) {
                            $(this).find(".video-play").removeClass("fa-pause");
                            $(this).find(".video-play").addClass("fa-play");
                        }
                    });
                }
            });

        });

        $(".video-item").each(function () {
            $(this).click(function () {
                $(this).find(".video-play").addClass("fa-pause");
                $(this).find(".video-play").removeClass("fa-play");
            });
        });

    });




    /*========================================================
    * Table Sort
    ========================================================== */

    $(function () {

        $(".table-downloads").each(function () {
            $(this).tablesorter();
        });

    });


    /*========================================================
    * Eventos Accordion
    ========================================================== */

    $(function () {

        $(".panel-default .panel-collapse").each(function (i, val) {

            $("#" + $(this).attr("id")).on('show.bs.collapse', function () {
                $("a[href='#" + $(this).attr("id") + "'] .fa-plus").addClass('fa-minus');
                $("a[href='#" + $(this).attr("id") + "']").closest(".panel-heading").addClass("painel-ativo");
            });
            $("#" + $(this).attr("id")).on('hide.bs.collapse', function () {
                $("a[href='#" + $(this).attr("id") + "'] .fa-plus").removeClass('fa-minus');
                $("a[href='#" + $(this).attr("id") + "']").closest(".panel-heading").removeClass("painel-ativo");
            });

        });

    });


    /*========================================================
    * Fun Facts Counter
    ========================================================== */
    function iniciar_contador() {
        $('.box-statistic-counter').counterUp({
            delay: 10,
            time: 2000
        });
    }


    /*========================================================
    * Reveal Animations When Scrolling
    ========================================================== */
    var wow = new WOW({
        mobile: false, // trigger animations on mobile devices (default is true)
        callback: function (box) {
            if ($(box).hasClass("funfacts-counter")) {
                iniciar_contador();
            }
        },
    });
    wow.init();



    /*========================================================
    * Height 100% Layout Main Container
    ========================================================== */
    $(function () {
        $(window).on("load resize", function (e) {
            adjustHeightContent();
        });
    });
    function adjustHeightContent() {
        var heightWindow = $(window).height();
        var heightBody = $("body").height();
        var heightElements = 0;
        var elements = [".gov-header", ".gov-bar-container", ".menu-site", ".footer-container"];
        for (index = 0; index < elements.length; index++) {
            $(elements[index]).each(function () {
                heightElements += $(this).outerHeight();
            });
        }
        if (heightBody <= heightWindow) {
            $(".content-item").css("min-height", (heightWindow - heightElements -2 ) + "px")
        }
        else {
            $(".content-item").css("min-height", "");
        }
    }


    /*========================================================
    * Form
    ========================================================== */
    $(function () {
        $(".dynamic-form .form-control").each(function () {
            if ($(this).attr('data-val-required')) {
                $(this).parent().find("label").append("<span>*</span>");
            } else {
                // href is blank
            }
        });
    });


    /*========================================================
    * Loading image
    ========================================================== */

    var opts = {
        lines: 11 // The number of lines to draw
    , length: 0 // The length of each line
    , width: 24 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 0.35 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
    }
    var target = document.getElementById('loading-image');
    var spinner = new Spinner(opts).spin(target);

    /*========================================================
    * Pagination
    ========================================================== */

    function setPagination(pagination) {
        pagination.jPages({
            containerID: pagination.data("container"),
            minHeight: true,
            perPage: 10
        });
    };
    function destroyPagination(pagination) {
        pagination.jPages("destroy");
    };

    $(".album-pagination").each(function () {
        $(this).jPages({
            containerID: $(this).data("container"),
            minHeight: true,
            perPage: 20
        });
        if ($(this).contents().length > 1) {
            $(this).addClass("pager-list")
        }
    });

    $(".list-pagination").each(function () {
        $(this).jPages({
            containerID: $(this).data("container"),
            minHeight: true,
            perPage: 10

        });
        if ($(this).contents().length > 1) {
            $(this).addClass("pager-list")
        }
    });


    /*========================================================
    * Filter Cards
    ========================================================== */

    if ($("#filter-cards").data("orchard-pagination") || $('#filter-cards .filter-submit').data("enable-paging")) {
        
        $(".filter-pagination").each(function () {
            pagination = $(this);
            setPagination(pagination);

            var ft = $.filtrify(pagination.data("container"), "placeHolder", {
                close: true,
                callback: function (query, match, mismatch) {
                    /*Legend*/
                    if (!mismatch.length) {
                        $("#quant-founds").html("<i></i>");
                    } else {
                        qtdFounds = "<i>" + match.length + " ite" + (match.length !== 1 ? "ns" : "m") + " encontrado" + (match.length !== 1 ? "s" : "") + "</i>";
                        $("#quant-founds").html(qtdFounds); 
                    }
                    /*Reset filter*/
                    if ( mismatch.length ) $("div#reset").show();
                    else $("div#reset").hide();
                    /*Reset pagination*/
                    destroyPagination(pagination);
                    setPagination(pagination);
                }
            });

            $("div#reset span").click(function () {
                ft.reset();
            });

            if(ft._order.length == 0) {
                $(".filter-licitacao").hide();
            }
            else {
                $(".pager").each(function () { $(this).hide(); });
                $(".pager.filter-pagination").removeClass("ocult");
                $(".pager.filter-pagination").show();
            }

        });

    }


    /*========================================================
    * Font Size (Zoom in / Out) 
    ========================================================== */

    $(function () {

        var fontSizeBootstrap = [];
        fontSizeBootstrap[0] = "xx-small";
        fontSizeBootstrap[1] = "x-small";
        fontSizeBootstrap[2] = "small";
        fontSizeBootstrap[3] = "medium";
        fontSizeBootstrap[4] = "large";
        fontSizeBootstrap[5] = "x-large";
        //fontSizeBootstrap[6] = "xx-large";
        var index = 3;



        if (typeof $.cookie('font-size') !== "undefined") {
            if ($.cookie('font-size') !== 'null') {
                index = $.cookie('font-size');
                $('body').addClass(fontSizeBootstrap[index]);
            }
        }

        $(".jfontsize-d2").each(function () {
            $(this).click(function () {
                $('body').removeClass(fontSizeBootstrap[index]);

                if ($.cookie('font-size') != 'null') {
                    $("#layout-header").css({
                        "background": "none"
                    });
                    $(".col-gov-bar-navigation .menu li a").css("color", "black");
                }
                $.cookie('font-size', 'null');
                index = 3;
                setTimeout(function () {
                    $("#layout-header").css("background", "");
                    $(".col-gov-bar-navigation .menu li a").css("color", "");
                    window.dispatchEvent(new Event('resize'));
                }, 300);

            });
        });

        $(".jfontsize-p2").each(function () {
            $(this).click(function () {
                if (index < 5) {

                    var newIndex = index + 1;
                    zoomFontSize(index + 1);
                }
            });
        });

        $(".jfontsize-m2").each(function () {
            $(this).click(function () {
                if (index > 0) {
                    var newIndex = index - 1;
                    zoomFontSize(newIndex);
                }
            });
        });

        function zoomFontSize(newIndex) {

            $('body').removeClass(fontSizeBootstrap[index]);
            $('body').addClass(fontSizeBootstrap[newIndex]);
            $.cookie('font-size', newIndex);
            index = newIndex;

            $("#layout-header").css({
                "background": "none"
            });
            $(".col-gov-bar-navigation .menu li a").css("color", "black");
            setTimeout(function () {
                $("#layout-header").css("background", "");
                $(".col-gov-bar-navigation .menu li a").css("color", "");
                window.dispatchEvent(new Event('resize'));
            }, 300);

        }


    });

    fontsize = function () {
        if ($(window).width() < 360) {
            var fontSize = $(".mobile-content .logo-governo  .container-img-logo-governo").width() * 0.048; // 4,4% of container width
            var top = $(".mobile-content .logo-governo  .container-img-logo-governo").width() * 0.235; // 23,5% of container width
            var right = $(".mobile-content .logo-governo  .container-img-logo-governo").width() * 0.39; // 39% of container width
            $(".mobile-content .logo-governo  .container-img-logo-governo .name-secretariat").css('font-size', fontSize);
            $(".mobile-content .logo-governo  .container-img-logo-governo .name-secretariat").css('top', top);
            $(".mobile-content .logo-governo  .container-img-logo-governo .name-secretariat").css('right', right);
        }
    };
    $(window).resize(fontsize);
    $(document).ready(fontsize);


}(jQuery);
//]]>