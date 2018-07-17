$(document).ready(function () {
    //
    setTimeout(function () {
        showAllItemsAnimation();
    },200);
    //
    $(document).on({
        click:function (e) {
            hideRightMenu(e);
            modalClose(e);
            searchBlockClose(e);
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
    $(".category").click(function (e) {
        if(!~location.pathname.indexOf("category")) {
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
        }
    });
    //
    $(".home").click(function () {
        if(!~location.pathname.indexOf("index")) {
            hideAllItemsAnimation();
            setTimeout(function () {
                location = "index.html";
            },500);
        }
    });
    //
    $(".single").click(function () {
        if(!~location.pathname.indexOf("single")) {
            hideAllItemsAnimation();
            setTimeout(function () {
                location = "single.html";
            },500);
        }
    });
    //
    $(".cart").click(function () {
        $(".not-ready").css({"opacity":"1","transform":"translate(-50%,-50%) scale(1.1)"});
        setTimeout(function () {
            $(".not-ready").css({"opacity":"0","transform":"translate(-50%,-50%) scale(.5)"});
        },1000);
    });
    //
    $("aside .logo img").click(function () {
        variables.rotate += 360;
        $("aside .logo img").css({"transform":"rotate("+ variables.rotate +"deg"});
    });
    //
    $(".burger-menu").click(function (e) {
        if(variables.menuOpened == 0) {
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
        }
    });
    //
    $(".plus").click(function () {
        var x = $("input.number").val();
        $("input.number").val(+ x + 1);
        inputValidate();
    });
    //
    $(".minus").click(function () {
        var x = $("input.number").val();
        $("input.number").val(+ x - 1);
        inputValidate();
    });
    //
    $(".look").click(function (e) {
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
            $(".modal-window").addClass("modal-active");
        },200);
    });
    //
    $(".search-input-clear").click(function () {
        $(".search-input").val("").focus();
        $(".search-result-item").css({"opacity":"0","transform":"translateY(300%)"});
        $(".search-result-sum").css({"opacity":"0","transform":"translateX(-100px)"});
    });
    //
    (function modalImgHeight () {  // max-heigth of modal image = 90% from screen heigth
        var heigth = $(window).height() / 100 * 90;
        $(".modal-img img").css({"max-height":heigth + "px"});
    }());
    //
    function showAllItemsAnimation() {
        $(".animated-item").addClass("start-animation");
        $(".burger-menu").css({"transform":"skew(0) translateX(0)"});
        $(".content").css({"opacity":"1"});
        $("aside").css({"transform":"translateX(0)"});
    };
    //
    function hideAllItemsAnimation() {
        $(".animated-item").removeClass("start-animation");
        $(".burger-menu").css({"transform":"skew(-25deg) translateX(160%)"});
        $(".content").css({"opacity":"0"});
        $("aside").css({"transform":"translateX(-100%)"});
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
    function modalClose(e) {
        if($(".modal-active").length) {
            if (e.target.closest(".modal-close") || !e.target.closest("img"))  {
                $(".modal-window").css({
                    "opacity":"0",
                    "z-index":"0",
                    "transform":"scale(0)"
                });
                $(".modal-img img").stop().animate({opacity:0},300);
                $(".modal-close").stop().css({"opacity":"0"});
                $(".modal-window").removeClass("modal-active");
            }
        }
    };
    //
    $(".search-show").click(function () {
        if(variables.searchOpened == 0) {
            $(".search-input").focus();
            $(".search").css({"transform":"translateX(0)","opacity":"1"});
            $(".search-show img.active").css({"opacity":"1"});
            setTimeout(function () {
                variables.searchOpened = 1;
            },100)
        }
    });
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