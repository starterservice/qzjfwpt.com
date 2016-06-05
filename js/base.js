;(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if(typeof(clientWidth)=='number' && clientWidth<750 && clientWidth>319){
                docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
            }else if(typeof(clientWidth)=='number' && clientWidth>750){
                docEl.style.fontSize = '40'+'px'
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



$(function(){
    // h5 显示隐藏导航
    var menuHeadle = $('#menuHeadle'),
        menuBox = menuHeadle.next();

    menuHeadle.click(function(){
        menuBox.toggle()
    });

    function historyBack(){
        history.back()
    }
    var $return  = $('#topReturn');
    $return.click(historyBack);


    //$('.eventRight').click(function(){
    //    $(this).toggleClass('on').parent().next().toggle(200)
    //});

    $('.insuranceContent').find('dt').bind('click',function(){
        $(this).find('a').toggleClass('on');
        $(this).next().fadeToggle(200)
    })

    $('.helpPage').find('.tit').bind('click',function(){
        $(this).find('a').toggleClass('on');
        $(this).next().fadeToggle(200)
    })


    var $product = $('#productContentH5'),
        $pHandle = $product.find('.byPrice .items li'),
        $pIntro = $product.find('.byPriceItems .item'),
        productReturn = function(){
            $product.removeClass('goIntro');
            $return.unbind('click').bind('click',historyBack)
        };
    $pHandle.click(function(){
        var index = $(this).index();

        $product.addClass('goIntro');
        $pIntro.hide().eq(index).show();

        $return.unbind('click').bind('click',productReturn)
    });



    function pcMethod(){
        // 显示二维码
        $('.toScan').hover(function(){
            $(this).find('.showQRcode').stop().fadeToggle(200)
        },function(){
            $(this).find('.showQRcode').stop().fadeToggle(200)
        });

    }
    function h5Method(){
        var $i = menuHeadle.find('i');
        $(document).bind("click", function(e){
            var $target=$(e.target);
            if(!($target.is(menuHeadle) ||$target.is($i) || $target.closest(menuBox)[0])){
                $(menuBox).hide();
            }
        })
    }
    var timer;
    var reSizeFun = function(){
        document.documentElement.clientWidth >= 1000 ?pcMethod():h5Method()
    };
    timer=setTimeout(function(){
        reSizeFun();
    },200);
    $(window).resize(function(){
        clearTimeout(timer);
        timer=setTimeout(reSizeFun(),200);
    })
});