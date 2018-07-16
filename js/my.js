$(document).ready(function () {
    //
    setTimeout(function () {
        showAllItemsAnimation();
    },200);
    //
    $(document).on({
        click:function (e) {
            showRightMenu(e);
            hideRightMenu(e);
            valuePlus(e);
            valueMinus(e);
            modalClose(e);
            modalOpen(e);
            clearSearchInput(e);
            searchBlockOpen(e);
            searchBlockClose(e);
            logoClick(e);
            setLocation(e);
            basketNotReady(e);
        }
    });
    //
    $("input.number").on({
        input : function () {
            inputValidate();
        }
    });
    //
    $(".search-input").on({
        input : function () {
            searchResultVisibility();
        }
    });
    //
    function getCheckVariables() {
        this.menuOpened = 0;
        this.searchOpened = 0;
        this.rotate = 0;
    };
    var variables = new getCheckVariables();
    //
    function setLocation(e) {
        if(e.target.closest(".home") && !~location.pathname.indexOf("index")) {
            hideAllItemsAnimation();
            setTimeout(function () {
                location = "index.html";
            },500);
        };
        //
        if(e.target.closest(".category") && !~location.pathname.indexOf("category")) {
            if(e.target.closest("li.category")) { // let rigth menu time to close
                setTimeout(function () {
                    hideAllItemsAnimation();
                    setTimeout(function () {
                        location = "category.html";
                    },500);
                },500);
            } else {
                hideAllItemsAnimation();
                setTimeout(function () {
                    location = "category.html";
                },500);
            }
        };
        //
        if(e.target.closest(".single") && !~location.pathname.indexOf("single")) {
            hideAllItemsAnimation();
            setTimeout(function () {
                location = "single.html";
            },500);
        };
    };
    //
    function basketNotReady(e) {
        if(e.target.closest(".cart")) {
            $(".basket").css({"transform":"translateX(0)","opacity":"1"});
            setTimeout(function () {
                $(".basket").css({"transform":"translateX(-50px)","opacity":"0"});
            },1000);
        }
    };
    //
    (function modalImgHeight () {  // max-heigth of modal image = 90% from screen heigth
        var heigth = $(window).height() / 100 * 90;
        $(".modal-img img").css({"max-height":heigth + "px"});
    }());
    //
    function showAnimateItem(element) {
        element.css({"transform":"translate(0,0)"});
    };
    function hideAnimateToBottom(element) {
        element.css({"transform":"translate(0,100%)"})
    }
    function hideAnimateToTop(element) {
        element.css({"transform":"translate(0,-100%)"})
    };
    function hideAnimateToRight(element) {
        element.css({"transform":"translate(100%,0)"})
    };
    function hideAnimateToLeft(element) {
        element.css({"transform":"translate(-100%,0)"})
    };
    //
    function showAllItemsAnimation() {
        showAnimateItem($(".content-header"));
        showAnimateItem($(".category-content-header h2"));
        showAnimateItem($(".category-logo"));
        showAnimateItem($(".products-item:nth-child(1)"));
        showAnimateItem($(".products-item:nth-child(2)"));
        showAnimateItem($(".products-item:nth-child(3)"));
        showAnimateItem($(".products-item:nth-child(4)"));
        showAnimateItem($(".products-item:nth-child(5)"));
        showAnimateItem($(".single-content-img"));
        showAnimateItem($(".likes"));
        showAnimateItem($(".single-content-manage"));
        showAnimateItem($(".recomended-item"));
        showAnimateItem($(".single-content-info h2"));
        showAnimateItem($(".p-info"));
        $(".burger-menu").css({"transform":"skew(0) translateX(0)"});
        $(".content").css({"opacity":"1"});
        $("aside").css({"transform":"translateX(0)"});
    };
    //
    function hideAllItemsAnimation() {
        hideAnimateToTop($(".content-header"));
        hideAnimateToLeft($(".category-content-header h2"));
        hideAnimateToRight($(".category-logo"));
        hideAnimateToLeft($(".products-item:nth-child(1)"));
        hideAnimateToTop($(".products-item:nth-child(2)"));
        hideAnimateToLeft($(".products-item:nth-child(3)"));
        hideAnimateToBottom($(".products-item:nth-child(4)"));
        hideAnimateToRight($(".products-item:nth-child(5)"));
        hideAnimateToLeft($(".single-content-img"));
        hideAnimateToTop($(".likes"));
        hideAnimateToTop($(".single-content-info h2"));
        hideAnimateToTop($(".p-info"));
        hideAnimateToBottom($(".single-content-manage"));
        hideAnimateToBottom($(".recomended-item"));
        $(".burger-menu").css({"transform":"skew(-25deg) translateX(160%)"});
        $(".content").css({"opacity":"0"});
        $("aside").css({"transform":"translateX(-100%)"});
    };
    //
    function logoClick(e) {
        if(e.target.closest("aside .logo img")) {
            variables.rotate += 360;
            $("aside .logo img").css({"transform":"rotate("+ variables.rotate +"deg"});
        }
    };
    //
    function showRightMenu(e) {
        if(e.target.closest(".burger-menu") && variables.menuOpened == 0) {
            $(".active-right-menu").css({"opacity":".2","transform":"translateX(0)"});
            $(".burger-menu-disable").css({"z-index":"30"});
            $(".burger-menu-item:first-child").css({"opacity":"0"});
            $(".burger-menu-item:nth-child(2)").css({"transform":"translateX(-50%) rotate(45deg)"});
            $(".burger-menu-item:last-child").css({"transform":"translate(-50%, 0px) rotate(-45deg)"});
            $(".right-menu").css({"transform":"skew(0) translateX(0)"});
            //
            setTimeout(function () {
                (function iterate(i) { // show menu items with interval
                    if(i < $(".right-menu-list li").length) {
                        $(".right-menu-list li:eq("+ i +")").css({
                            "transform":"translateX(0)",
                            "opacity":"1"
                        });
                        setTimeout(function () {
                            iterate(i + 1);
                        },100);
                    }
                })(0);
                variables.menuOpened = 1;
            },200);
            //
            setTimeout(function () {
                $(".burger-menu-disable").css({"z-index":"0"});
                $("a.show-all").css({"transform":"translate(-50%,0)","opacity":"1"});
            },700);
        };
    };
    //
    function hideRightMenu (e) {
        if(variables.menuOpened == 1) {
            if(e.target.closest(".burger-menu") || !e.target.closest(".right-menu") || e.target.closest(".right-menu-list li") || e.target.closest(".show-all")) {
                $(".burger-menu-disable").css({"z-index":"30"});
                $("a.show-all").css({"transform":"translate(-50%,230%)","opacity":"0"});
                //
                (function iterate(i) { // hide menu items with interval
                    if(i < $(".right-menu-list li").length) {
                        $(".right-menu-list li:eq("+ i +")").css({
                            "transform":"translateX(100%)",
                            "opacity":"0"
                        });
                        setTimeout(function () {
                            iterate(i + 1);
                        },100);
                    }
                })(0);
                //
                setTimeout(function () {
                    $(".right-menu").css({"transform":"skew(15deg) translateX(140%)"});
                },800);
                setTimeout(function () {
                    $(".active-right-menu").css({"opacity":"0","transform":"translateX(100%)"});
                    $(".burger-menu-item:first-child").css({"opacity":"1"});
                    $(".burger-menu-item:nth-child(2)").css({"transform":"translateX(-50%) rotate(0)"});
                    $(".burger-menu-item:last-child").css({"transform":"translate(-50%, 5px) rotate(0deg)"});
                    $(".right-menu").css({"transform":"skew(-15deg) translateX(140%)"});
                    variables.menuOpened = 0;
                },400);
                setTimeout(function () {
                    $(".burger-menu-disable").css({"z-index":"0"});
                },800)
            }
        }
    };
    //
    function inputValidate() {
        if($("input.number").val() < 1) {
            $("input.number").val(1);
        } else  if ($("input.number").val() > 99) {
            $("input.number").val(99);
        }
    };
    //
    function valuePlus(e) {
        if(e.target.closest(".plus")) {
            var x = $("input.number").val();
            $("input.number").val(+ x + 1);
            inputValidate();
        }
    };
    //
    function valueMinus(e) {
        if(e.target.closest(".minus")) {
            var x = $("input.number").val();
            $("input.number").val(+ x - 1);
            inputValidate();
        }
    };
    //
    function modalOpen(e) {
        if(e.target.closest(".look")) {
            var a = $(e.target.closest(".look"));
            var src = a.siblings("img").attr("src");
            $(".modal-img img").attr("src",src);
            $(".modal-window").css({
                "opacity":"1",
                "z-index":"100",
                "transform":"scale(1)"
            });
            setTimeout(function () {
                $(".modal-img img").stop().animate({opacity:1},300);
                $(".modal-close").stop().css({"opacity":"1"});
            },200);
        }
    };
    //
    function modalClose(e) {
        if (e.target.closest(".modal-close") || !e.target.closest("img"))  {
            $(".modal-window").css({
                "opacity":"0",
                "z-index":"0",
                "transform":"scale(0)"
            });
            $(".modal-img img").stop().animate({opacity:0},300);
            $(".modal-close").stop().css({"opacity":"0"});
        }
    };
    //
    function searchBlockOpen(e) {
        if(e.target.closest(".search-show") && variables.searchOpened == 0) {
            $(".search-input").focus();
            $(".search").css({"transform":"translateX(0)","opacity":"1"});
            $(".search-show img.active").css({"opacity":"1"});
            setTimeout(function () {
                variables.searchOpened = 1;
            },100)
        }
    };
    //
    function searchBlockClose(e) {
        if(variables.searchOpened != 0) {
            if(e.target.closest("aside") || e.target.closest(".close-search") || e.target.closest(".burger-menu") || e.target.closest(".search-result-item")) {

                $(".search-input").blur();
                $(".search").css({"transform":"translateX(-100%)","opacity":"0"});
                $(".search-show img.active").css({"opacity":"0"});
                setTimeout(function () {
                    variables.searchOpened = 0;
                },100)
            }
        }
    };
    //
    function clearSearchInput(e) {
        if(e.target.closest(".search-input-clear")) {
            $(".search-input").val("").focus();
            $(".search-result").css({"opacity":"0"});
            $(".search-result-sum").css({"opacity":"0","transform":"translateX(-100px)"});
        }
    };
    //
    function searchResultVisibility() {
        if($(".search-input").val().match(/\w{3}/)) {
            $(".search-result").css({"opacity":"1"});
            $(".search-result-item").css({"opacity":"1","transform":"translateX(0)"});
            $(".search-result-sum").css({"opacity":"1","transform":"translateX(0)"});
        } else {
            $(".search-result").css({"opacity":"0"});
            $(".search-result-item").css({"opacity":"0","transform":"translateY(300%)"});
            $(".search-result-sum").css({"opacity":"0","transform":"translateY(100px)"});
        }
    };
});