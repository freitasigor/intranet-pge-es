/*
* Customization and Configuration Scripts JS
*
*    
* @project Secretariat Theme
* @version 1.0
* @date 03/09/2015
* @package layout
* @company PRODEST
* @author Lucas Matias Caetano <lucas.caetano@prodest.es.gov.br>
*/

//<![CDATA[
+function ($) {

    /*========================================================
    * Pop-up
    ========================================================== */
    $(function () {
        $(".modal-popup").each(function () {
            $(this).modal('show');
        });
    });


    /*========================================================
    * Data atual
    ========================================================== */
    var now = new Date();
    $(".year").each(function () {
        if (now.getFullYear() > 2015) {
            $(this).append("- " + now.getFullYear());
        }
    });

    /*========================================================
    * Tooltip
    ========================================================== */
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    /*========================================================
    * Services
    ========================================================== */
    $(".logo-service").each(function () {
        $(this).on("click", function () {
            var href = $(this).closest(".item-category-service").find(".btn").attr("href");
            var target = $(this).closest(".item-category-service").find(".btn").attr("target");
            window.open(href, target);
        });
    });


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
    * Fixed Top
    ========================================================== */

    $(function () {

        // Dock the header to the top of the window when scrolled past the banner.
        // This is the default behavior.
        //$(".fixed-top-header, .navbar-mobile").scrollToFixed();
        $(".fixed-top-header").scrollToFixed();

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
    * Carousel Slider
    ========================================================== */
    $(function () {

        /*Bootstrap Carousel*/
        $('.carousel-slider').carousel({ wrap: true })

        /*RP Carousel*/
        $.each($('.content-items-wrapper'), function () {
            var id = $(this).data('navigation');
            $('[id^=carousel-slider-' + id + ']').rpcarousel({
                carousel: $(this).data('carousel'),
                navigation: "NAV-ID-" + $(this).data('navigation'),
                speed: $(this).data('speed'),
                autoRotate: $(this).data('autorotate'),
                visible: $(this).data('visible'),
                itemMinWidth: 150,
                itemMargin: 10
            });

        });

        $(window).on("load resize", function (e) {
            equalHeightNewsCarousel();
            equalHeightAgenda();
        });

    });


    /*========================================================
    * Carousel Controls
    ========================================================== */

    $(function () {
        /*Click event control*/
        $(".carousel-slider .carousel-control.left").each(function () {
            $(this).click(function () {
                $('.carousel-slider').carousel('prev');
            });
        });
        $(".carousel-slider .carousel-control.right").each(function () {
            $(this).click(function () {
                $('.carousel-slider').carousel('next');
            });
        });


        /*Touch events*/
        $(".carousel-slider .item").each(function () {
            /*variables*/
            var touchStart;
            var currentX;

            /*touchstart*/
            $(this).on("touchstart", function (ev) {
                touchStart = ev.originalEvent.touches[0].clientX;
                currentX = touchStart;
            });

            /*touchmove*/
            $(this).on("touchmove", function (ev) {
                currentX = ev.originalEvent.touches[0].clientX;
            });

            /*touchend*/
            $(this).on("touchend", function (ev) {
                var moveX = touchStart - Math.abs(currentX);
                var percentageMove = (Math.abs(moveX) * 100) / touchStart;

                //console.log("currentX: " + currentX + " moveX: " + moveX + " percentageMove: " + percentageMove)
                if (percentageMove > 15) {
                    $('.carousel-slider').carousel('pause');
                    if (touchStart > currentX) {
                        $('.carousel-slider').carousel('next');
                    }
                    else if (touchStart < currentX) {
                        $('.carousel-slider').carousel('prev');
                    }
                }

            });

        });

    });

    
    //Hover event control
    /*
    $(function () {

        $('.carousel-news, .carousel-slider').each(function () {
            $(this).mouseover(function () {
                $(this).find(".carousel-control").each(function () {
                    $(this).removeClass("fade");
                });
            });
            $(this).mouseout(function () {
                $(this).find(".carousel-control").each(function () {
                    $(this).addClass("fade");
                });
            });

        });

    });
    */



    /*========================================================
    * Carousel Group News
    ========================================================== */

    function equalHeightNewsCarousel() {

        $(".rp-carousel-news").each(function () {
            maxHeight = 0;
            $(this).find(".item-carousel").each(function () {
                if (maxHeight < $(this).height()) {
                    maxHeight = $(this).height();
                }
            });
            if (maxHeight > 0) {
                $(this).find(".item-carousel").each(function () {
                    if ($(this).height() < maxHeight) {
                        var difHeight = maxHeight - $(this).height();
                        $(this).find(".learn-more").css("padding-top", difHeight + "px");
                    }
                });
            }

        });
    }


    /*========================================================
      * Equal Height Agenda
      ========================================================== */

    function equalHeightAgenda() {

        $(".agenda-item-container").each(function () {

            if ($(this).find(".agenda-date-double").outerHeight() > $(this).find(".event-description").outerHeight()) {
                $(this).find(".event-description").css("min-height", $(this).find(".agenda-date-double").outerHeight()+"px")

            }
            else {
                $(this).find(".event-description").css("min-height", $(this).find(".event-description").outerHeight() + "px")
            }

        });
    }

    /*========================================================
    * Adjusts embedded Posts Facebook
    ========================================================== */
    $(function () {
        $(window).on("load resize", function (e) {
            if ($(".fb-post").outerWidth() == 345) {
                $(".widget-responsive-post").addClass("overflow-hidden")
            }
            else { $(".widget-responsive-post").removeClass("overflow-hidden") }
        });
        
    });

    /*========================================================
    * Adjusts embedded Posts Facebook
    ========================================================== */
    /*
    $(function () {
        $(".bg-img-content").each(function () {
            *//*
            $(this).faceDetection({
                complete: function (faces) {
                    console.log(faces);
                }
            });
            */
    /*$(this).attr("style")
});
});
*/

    /*========================================================
    * Height 100% Layout Main Container
    ========================================================== */

    function adjustHeightContent() {
        var heightWindow = $(window).height();
        var heightBody = $("body").height();
        var heightElements = 0;
        var elements = [".gov-header", ".gov-bar-container", ".header-bar-container", ".navbar-mobile", ".footer-wrapper"];
        for (index = 0; index < elements.length; index++) {
            $(elements[index]).each(function () {
                heightElements += $(this).outerHeight();
            });
        }
        if (heightBody <= heightWindow) {
            $("#layout-main-container").css("min-height", (heightWindow - heightElements - 24) + "px")
        }
        else {
            $("#layout-main-container").css("min-height", "");
        }
    }



    /*========================================================
    * Adjust margin Header
    ========================================================== */

    function adjustSizeColumn() {

        /*if Desktop*/
        if($(window).width() > 991){
            
            /*------------- Define Width General Margin--------------*/
            var widthHeader = $(".gov-header .container").outerWidth();
            var marginHeader = ($(".gov-header").width() - widthHeader) / 2;
            var marginNavigation = marginHeader;

            var diferencaMargin = 0;
            var diferencaMarginFooter = 0;
            var diferencaWidth = 0;

            if (marginHeader - 60 > 30) {
                diferencaMargin = 60;
                diferencaMarginFooter = 75;
                diferencaWidth = diferencaMargin - 15;
                $(".col-gov-bar-left, .col-gov-bar-right").css("padding", "");
                $(".col-gov-bar-left, .col-gov-bar-right").css("display", "");
            } else {
                diferencaWidth = marginHeader - 15;
                marginHeader = 0;
                $(".col-gov-bar-left, .col-gov-bar-right").css("display", "none");
                $(".col-gov-bar-left, .col-gov-bar-right").css("padding", "0");
            }

            /*------------- Blue bar ------------- */
            $(".gov-bar-container .col-gov-bar-center").width(widthHeader + diferencaWidth);
            $(".footer-bar-container .col-gov-bar-center").width(widthHeader + diferencaWidth + diferencaMarginFooter);
            $(".gov-bar-container .col-gov-bar-right, .footer-bar-container .col-gov-bar-right").outerWidth(marginHeader - diferencaMargin -1);
            $(".gov-bar-container .col-gov-bar-left, .footer-bar-container .col-gov-bar-left").outerWidth(marginHeader - diferencaMargin);

            /*------------- Pink bar ------------- */
            /*margin and width*/
            //$(".header-bar-container .col-gov-bar-center").width(widthHeader);
            /*
            if (marginNavigation > 35) {
                $(".header-bar-container .col-gov-bar-left").outerWidth(marginNavigation);
                $(".header-bar-container .col-gov-bar-right").outerWidth(marginNavigation - diferencaMargin);
            }
            else {
                $(".header-bar-container .col-gov-bar-right, .header-bar-container .col-gov-bar-left").outerWidth(0);
            }
            
            if (marginNavigation > 0) {
                $(".header-bar-container .col-gov-bar-right, .header-bar-container .col-gov-bar-left").css("display", "");
            }
            */
            /*height*/
            /*
            var heightContent = $(".header-bar-container .col-gov-bar-navigation").height();
            if (heightContent > 60) {
                
                $(".header-bar-container .col-gov-bar-left, .header-bar-container .col-gov-bar-right, .header-bar-container .col-gov-bar-name").height(heightContent);
            } else {
                $(".header-bar-container .col-gov-bar-left, .header-bar-container .col-gov-bar-right, .header-bar-container .col-gov-bar-name").css("height", "");
            }
            */

        }
        else {
            $(".header-bar-container .col-gov-bar-name").css("height", "");

        }

        /*------------- Conclusion -------------*/
        $("html").addClass("visible");
    }

    $(function () {
        $(window).on("load resize", function (e) {
            adjustHeightContent();
            adjustSizeColumn();
        });
    });


    /*========================================================
    * Desktop Menu
    ========================================================== */

    $(".dropdown-toggle").each(function () {
        $(this).click(function (e) {
            $(this).find(".fa-angle-up").toggleClass("fa-angle-down");
            $(this).parent().toggleClass("open");
            e.stopPropagation();
        });
    });

    /*========================================================
    * Mobile Menu 
    * Desc.: Habilita o plugin jPushMenu que faz com que o menu se comporte igual ao de um dispositivo Mobile (abrindo em forma de coluna da esquerda para a direita)
    ========================================================== */
    $(function () {
        $('.toggle-menu').jPushMenu();

        /* background shadow menu*/
        $("body").on("pushMenu", function (event, open) {
            if (open) {
                $(".background-shadow").addClass("visible");
            }
            else {
                $(".background-shadow").removeClass("visible");
            }
        });

        /*Touch events*/
        $(window).each(function () {
            /*variables*/
            var navigation = ".cbp-spmenu-left.menu-open";
            var lastX = -240;
            var touchStart;
            var flag;

            /*touchstart*/
            $(this).on("touchstart", function (ev) {
                flag = false;
                touchStart = ev.originalEvent.touches[0].clientX;
            });

            /*touchmove*/
            $(this).on("touchmove", function (ev) {

                var currentX = ev.originalEvent.touches[0].clientX;
                if (flag) {
                    movedStart = touchStart - 240;
                    var movedX = currentX - 240;
                    if (currentX >= 0 && currentX <= 240) {
                        if (movedX < movedStart) { 
                            $(navigation).css("left", movedX.toString() + "px");
                            lastX = movedX;
                        }else { lastX = 0; }                      
                    }
                }
                flag = true;

            });

            /*touchend*/
            $(this).on("touchend", function (ev) {

                if (lastX > -120) {
                    $(navigation).css("left", "");
                }
                else {
                    if ($(ev.target).closest(".dropdown").length == 0) {
                        $(navigation).css("left", "");
                        $(navigation).trigger("click");
                    }
                }

            });
        });


    });

    /*========================================================
    * Search Mobile Menu 
    ========================================================== */

    $(function () {
        $(".btn-search-mobile").click(function () {
            
            $(".navbar-header-mobile").addClass("open-search");
        });
        $(".btn-close-search").click(function () {
            $(".navbar-header-mobile").removeClass("open-search");
            $(".navbar-header-mobile .search-mobile-container").css("display", "none");
            setTimeout(function () {
                $(".navbar-header-mobile .search-mobile-container").css("display", "");
            }, 300);
            
        });
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
    * Eventos Accordion
    ========================================================== */

    $(function () {


        function showCollapseElement(element, container, event) {
            $("a[href='#" + element.attr("id") + "'] .fa-plus").addClass('fa-minus');
            $("a[href='#" + element.attr("id") + "']").closest(".panel-heading").addClass("painel-ativo active");
            container.addClass("active");
            event.stopPropagation();
        }
        function hideCollapseElement(element, container, event) {
            $("a[href='#" + element.attr("id") + "'] .fa-plus").removeClass('fa-minus');
            $("a[href='#" + element.attr("id") + "']").closest(".panel-heading").removeClass("painel-ativo");
            $("a[href='#" + element.attr("id") + "']").closest(".panel-heading").removeClass("active");
            container.removeClass("active");
            event.stopPropagation();
        }


        $(".panel .panel-collapse").each(function (i, val) {
            var containerEl = $(this).closest(".panel");

            $("#" + $(this).attr("id")).on('show.bs.collapse', function (event) {
                showCollapseElement($(this), containerEl, event);
            });

            $("#" + $(this).attr("id")).on('hide.bs.collapse', function (event) {
                hideCollapseElement($(this), containerEl, event);
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
    * Page
    ========================================================== */
    $(function () {
        /*image margin align*/
        /*
        $(".content-item img").each(function () {
            if ($(this).css("float") == "left") {
                $(this).css("margin-right", "15px");
            }
            else if ($(this).css("float") == "right") {
                $(this).css("margin-left", "15px");
            }
            
        });
        */


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
    * Filter Events
    ========================================================== */


    $(function () {

        /*Override the existing .contains filter*/
        jQuery.expr[':'].contains = function (a, i, m) {
            return jQuery(a).text().toUpperCase()
                .indexOf(m[3].toUpperCase()) >= 0;
        };


        function filterList(filter, contentContainer, contentItem, panelActive, enablePaging) {

            $(filter + ", " + filter + " *").css("cursor", "not-allowed");
            $("body, body a").css("cursor", "wait");
            $(contentContainer + ", .pager").hide();
            $("#loading-image").show();

            if (enablePaging) {
                $(".filter-pagination").jPages("destroy");
            }

            setTimeout(function () {
                var count = 0;
                $(contentContainer).find(contentItem).each(function () {
                    var includeItem = true;
                    var filterEmpty = true;
                    /*palavra-chave*/
                    if ($("input[name=palavrachave]").val() != "" && includeItem == true && typeof $("input[name=palavrachave]").val() !== "undefined") {
                        filterEmpty = false;
                        $(this).find("[class$='-value']").each(function () {
                            $(this).css({ "background-color": "", "color": "" });
                        });

                        if ($(this).find("[class$='-value']:contains('" + $("input[name=palavrachave]").val() + "')").length > 0) {
                            includeItem = true;
                            $(this).find("[class$='-value']:contains('" + $("input[name=palavrachave]").val() + "')").css({ "background-color": "yellow", "color": "black" });
                        }
                        else {
                            includeItem = false;
                        }
                    }
                    else{
                        $(this).find("[class$='-value']").each(function () {
                            $(this).css({ "background-color": "", "color": "" });
                        });
                    }

                    /*num licitacao*/
                    if ($("input[name=numlicitacao]").val() != "" && includeItem == true && typeof $("input[name=numlicitacao]").val() !== "undefined") {
                        filterEmpty = false;
                        if ($(this).find("span.numlicitacao-value:contains('" + $("input[name=numlicitacao]").val() + "')").length > 0) {
                            includeItem = true;
                            $(this).find("span.numlicitacao-value").css({ "background-color": "yellow", "color": "black" });
                        }
                        else {
                            includeItem = false;
                            $(this).find("span.numlicitacao-value").css({ "background-color": "", "color": "" });
                        }
                    }
                    else {
                        $(this).find("span.numlicitacao-value").css({ "background-color": "", "color": "" });
                    }

                    /*data abertura*/
                    if ($("input[name=dataabertura]").val() != "" && includeItem == true && typeof $("input[name=dataabertura]").val() !== "undefined") {
                        filterEmpty = false;
                        if ($(this).find("span.dataabertura-value:contains('" + $("input[name=dataabertura]").val() + "')").length > 0) {
                            includeItem = true;
                            $(this).find("span.dataabertura-value").css({ "background-color": "yellow", "color": "black" });
                        }
                        else {
                            includeItem = false;
                            $(this).find("span.dataabertura-value").css({ "background-color": "", "color": "" });
                        }
                    }
                    else {
                        $(this).find("span.dataabertura-value").css({ "background-color": "", "color": "" });
                    }

                    /*modalidade*/
                    if ($("select[name=modalidade]").val() != "" && includeItem == true && typeof $("select[name=modalidade]").val() !== "undefined") {
                        filterEmpty = false;
                        if ($(this).find("span.modalidade-value:contains('" + $("select[name=modalidade]").val() + "')").length > 0) {
                            includeItem = true;
                            $(this).find("span.modalidade-value").css({ "background-color": "yellow", "color": "black" });
                        }
                        else {
                            includeItem = false;
                            $(this).find("span.modalidade-value").css({ "background-color": "", "color": "" });
                        }
                    } else {
                        $(this).find("span.modalidade-value").css({ "background-color": "", "color": "" });
                    }

                    /*situacao*/
                    if ($("select[name=situacao]").val() != "" && includeItem == true && typeof $("select[name=situacao]").val() !== "undefined") {
                        filterEmpty = false;
                        if ($(this).find("span.situacao-value:contains('" + $("select[name=situacao]").val() + "')").length > 0) {
                            includeItem = true;
                            $(this).find("span.situacao-value").css({ "background-color": "yellow", "color": "black" });
                        }
                        else {
                            includeItem = false
                            $(this).find("span.situacao-value").css({ "background-color": "", "color": "" });
                        }
                    } else {
                        $(this).find("span.situacao-value").css({ "background-color": "", "color": "" });
                    }

                    /*Collapse status*/
                    if (panelActive == false) {
                        if (filterEmpty == false) {
                            $(this).find(".panel-collapse").collapse('show');
                        }
                        else {
                            $(this).find(".panel-collapse").collapse('hide');
                        }
                    }

                    /*filtra o conteudo*/
                    if(includeItem == true) {
                        $(this).removeClass("jp-hidden");
                        $(this).css("display", "block");
                        count += 1;
                    } else {
                        $(this).addClass("jp-hidden");
                        $(this).css("display", "none");
                    }
                }).promise().done(function () {

                    $(filter + ", " + filter + " *").css("cursor", "");
                    $("body, body a").css("cursor", "");
                    $("#loading-image").hide();
                    $(contentContainer).show();

                    if (count == 0) {
                        if ($(contentContainer).find(".result-null").length == 0) {
                            $(contentContainer).append('<div class="result-null"><h4 class="text-center" style="margin-top: 24px;">Nenhum item encontrado</h4></div>');
                        }
                    } else {
                        $(contentContainer).find(".result-null").remove();
                    }

                    if (enablePaging) {
                        $(".filter-pagination").each(function () {
                            $(this).jPages({
                                containerID: $(this).data("container"),
                                minHeight: true,
                                perPage: 10
                            });
                            if ($(this).contents().length > 1) { $(this).addClass("pager-list") }
                        });
                        $(".pager.filter-pagination").show();
                    }

                });

            }, 200);


        }


        $('.filter-submit').on('click', function (e) {
            filterList($(this).data("filter"), $(this).data("content-container"), $(this).data("content-item"), $(this).data("panel-active"), $(this).data("enable-paging"));
        });

    });

    $(function () {
        $("#dataabertura").datepicker({
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: 'dd/mm/yy',
            dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
            dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
            dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
        });
    });
    
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
    * Otimization Page
    ========================================================== */
    //Load Facebook after load page
    $(function () {
        $(window).load(function () {
            $('.facebook_like_box').each(function () {
                urlFacebook = $(this).data("url-face");
                namePage = $(this).data("name");
                $(this).html(
                '<div class="fb-page" data-href="' + urlFacebook + '" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false" data-show-posts="true">' +
                    '<div class="fb-xfbml-parse-ignore">' +
                        '<blockquote cite="' + urlFacebook + '">' + namePage + '</blockquote>' +
                        '<div class="text-center loading-image-calendar color-tertiary-color"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><span class="sr-only">Carregando...</span></div>' +
                    '</div>' +
                '</div>' +
                '<script>' +
                '(function (d, s, id) {' +
                    'var js, fjs = d.getElementsByTagName(s)[0];' +
                    'if (d.getElementById(id)) return;' +
                    'js = d.createElement(s); js.id = id;' +
                    'js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.5";' +
                    'fjs.parentNode.insertBefore(js, fjs);' +
                '}(document, \'script\', \'facebook-jssdk\'));' +
                '</script>');

            });
        });
    });


    /*========================================================
    * Pagination
    ========================================================== */
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

   

    if ($("#filter-content").data("orchard-pagination") || $('.filter-submit').data("enable-paging")) {
        $(".filter-pagination").each(function () {
            $(this).jPages({
                containerID: $(this).data("container"),
                minHeight: true,
                perPage: 10
            });
        });
        $(".pager").each(function () { $(this).hide(); });
        $(".pager.filter-pagination").removeClass("ocult");
        $(".pager.filter-pagination").show();
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
        var index = 2;



        if (typeof $.cookie('font-size') !== "undefined") {
            if ($.cookie('font-size') !== 'null') {
                index = $.cookie('font-size');
                $('body').addClass(fontSizeBootstrap[index]);
            }
        }

        $(".jfontsize-d2").each(function(){
            $(this).click(function () {
                $('body').removeClass(fontSizeBootstrap[index]);

                if ($.cookie('font-size') != 'null') {
                    $("#layout-header").css({
                        "background": "none"
                    });
                    $(".col-gov-bar-navigation .menu li a").css("color", "black");
                }
                $.cookie('font-size', 'null');
                index = 2;
                adjustSizeColumn();
                setTimeout(function () {
                    $("#layout-header").css("background", "");
                    $(".col-gov-bar-navigation .menu li a").css("color", "");
                    window.dispatchEvent(new Event('resize'));
                }, 300);

            });
        });

        $(".jfontsize-p2").each(function(){
            $(this).click(function () {

                if (index < 5) {

                    var newIndex = index + 1;
                    zoomFontSize(index + 1);
                }
            });
        });

        $(".jfontsize-m2").each(function(){
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
            adjustSizeColumn();

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

    /*========================================================
    * @Name: Detect IE
    * @Description: returns version of IE or false, if browser is not Internet Explorer
    ========================================================== */
    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // IE 12 => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    $(function () {
        if (detectIE() != false) {
            var versionIE = detectIE();
            $("html").addClass('ie ie-' + versionIE)
            if (versionIE <= 8) {
                $(".bg-img-content").each(function(){
                    $(this).css("background-size", "cover");
                });
                
            }
            

        }

    });

    /*========================================================
    * @Name: Bug fix Internet Explorer 10 (IE10)
    * @Description: Correction width (responsiveness)
    ========================================================== */

    $(function () {
        // Copyright 2014-2015 Twitter, Inc.
        // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement('style')
            msViewportStyle.appendChild(
              document.createTextNode(
                '@-ms-viewport{width:auto!important}'
              )
            )
            document.querySelector('head').appendChild(msViewportStyle)
        }
    });

    /*========================================================
    * @Name: Bug Internet Explorer - Placeholder
    * @Description: O IE nao reconhece o attr "placeholder", o codigo abaixo corrige esse erro
    ========================================================== */
    $(function () {
        function add() { if ($(this).val() == '') { $(this).val($(this).attr('placeholder')).addClass('placeholder'); } }
        function remove() { if ($(this).val() == $(this).attr('placeholder')) { $(this).val('').removeClass('placeholder'); } }
        if (!('placeholder' in $('<input>')[0])) { // Create a dummy element for feature detection
            $('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add); // Select the elements that have a placeholder attribute
            $('form').submit(function () { $(this).find('input[placeholder], textarea[placeholder]').each(remove); }); // Remove the placeholder text before the form is submitted
        }
    });


}(jQuery);
//]]>
