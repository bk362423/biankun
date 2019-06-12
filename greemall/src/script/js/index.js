!function ($) {
    //轮播图
    class imageplay {
        constructor() {
            this.oBox = $('.fullSlide');//大盒子
            this.picBox = $('.bd'); //图片盒子
            this.aImg = $('.bd li');//图片的li
            this.oBtnl = $('.prev'); //左箭头
            this.oBtnr = $('.next');//右箭头
            this.aLi = $('.hd ul li'); //按钮li
            this.num = 0;//索引
            this.timer = null; //定时器值         
        }

        //初始化    
        init() {
            var _this = this;
            this.aLi.on('click', function () {//点击按钮切换图片
                _this.num = $(this).index();
                _this.tab($(this), _this.aImg.eq(_this.num));

            });

            this.oBox.hover(function () {//鼠标划入box显示左右箭头，关定时器
                clearInterval(_this.timer);
                _this.oBtnr.fadeIn('normel');//show 方法显示              
                _this.oBtnl.fadeIn('normal');
            }, function () {//鼠标划出box隐藏左右箭头，开定时器
                _this.timer = setInterval(function () {
                    _this.tab_right();
                }, 2000);
                _this.oBtnr.fadeOut('normal');
                _this.oBtnl.fadeOut('normal');
            });

            this.oBtnl.on('click', function () { //调用左箭头函数
                _this.tab_left();
            });

            this.oBtnr.on('click', function () { //调用右箭头函数
                _this.tab_right();
            });

            this.timer = setInterval(function () { //进入页面自动轮播
                _this.tab_right();
            }, 2000)

        }

        //点击左箭头切换图片和按钮
        tab_left() {
            this.num--;
            if (this.num < 0) {
                this.num = this.aImg.length - 1;
            }
            this.tab(this.aLi.eq(this.num), this.aImg.eq(this.num));

        }

        //点击右箭头切换图片和按钮
        tab_right() {
            this.num++;
            if (this.num > this.aImg.length - 1) {
                this.num = 0;
            }
            this.tab(this.aLi.eq(this.num), this.aImg.eq(this.num))
        }

        //切换对应图片  按钮的颜色  
        tab(btn, pic) {
            this.aLi.removeClass('on');
            btn.addClass('on');
            this.aImg.fadeOut('normal');
            pic.fadeIn('normal');
        }
    }
    
new imageplay().init();
}(jQuery);

//******************************/
//导航栏
!function ($) {
    class topnav {
        constructor() {
            this.mainnav = $('.mainNav .categorysTitle');//第一个导航 全部商品分类
            this.nextnav = $('.mainNav .categorysCon'); //二级导航 
            this.connav = $('.mainNav .categorys');//导航区
            this.navmove = $('#navviga li');  //所有导航类 
            this.movebox = $('.movebox'); //移动盒子
            this.moveul=$('#navviga')
            // this.timer = null;
            this.speed = 0;
            this.num = null;
        }
        init() {
            var _this = this;
            this.mainnav.hover(function () {
                _this.nextnav.show();
            }, function () {
                _this.nextnav.hide();
                _this.nextnav.hover(function(){
                    _this.nextnav.show();
                },function(){
                    _this.nextnav.hide();
                })
            });

            this.navmove.on('mouseenter',function(){//滑过显示移动的块
                var $l=$(this).offset().left-_this.navmove.eq(0).offset().left;
                _this.move($l);
            });
            this.moveul.on('mouseleave',function(){//滑出隐藏移动的块
                _this.movebox.animate({
                    left:-100,
                })
            })
        }

        move(l){
            var _this=this;  
            this.movebox.animate({
                left:l,
            },150)
        }
        
    }
    new topnav().init();
}(jQuery);



/*****************************/
//楼梯
!function ($) {
    class stairs {
        constructor() {
            this.loutinav = $('#float'); //楼梯
            this.loutinava = $('#float a'); //楼梯层
            this.louceng = $('.floor1'); //楼层
            this.left_espot = $('.left_espot table') //左广告
            this.num = 0;
        }

        init() {
            var _this = this;

            $(window).on('scroll', function () {
                var $top = $(window).scrollTop();
                _this.shownav();//调用显示楼梯方法
                _this.hidenav();//调用隐藏楼梯方法
            });

            this.loutinava.on('click', function () {//调用liclick()
                _this.ltclick($(this));
            })
        }

        //显示楼梯
        shownav() {
            if ($(window).scrollTop() >= 400) {
                this.left_espot.show();
                this.left_espot.css({
                    top:100,
                })
                this.loutinav.show();
                this.loutinav.css({
                    top: 40,
                });

            }
        }
        //隐藏楼梯
        hidenav() {
            if ($(window).scrollTop() < 400) {
                this.loutinav.hide();
                this.left_espot.hide();
            }
        }

        //点击楼梯li切换对应内容
        ltclick(btn) { //btn:由调用者传的参数--当前点击的louti li
            var $dis_top = this.louceng.eq(btn.index()).offset().top;
            $('html,body').animate({
                scrollTop: $dis_top,
            });
        }
    }
    new stairs().init();
}(jQuery);




// **************//
//搜索框
!function ($) {
    class search {
        constructor() {
            this.search = $('#SimpleSearchForm_SearchTerm');//搜索框
            this.hotsearch = $('.hotWords a'); //热门搜索
            this.searchList = $('#searchList_ul');
            this.str = '';
        }

        init() {
            var _this = this;
            this.hotsearch.on('click', function () {
                var values = $(this).html();
                _this.search.prop('value', values);
            });
            this.getdata();
        }

        getdata() {
            var _this = this;
            this.search.on('input', function () {
                var $d = _this.search.val();
                $.ajax({
                    url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + $d + '&_ksTS=1559133600931_1948&callback=taobao',
                    dataType: "jsonp",
                    success: function (d) { //获取数据渲染结构
                        var $da = d.result;
                        $($da).each(function (i) {
                            _this.str += `<li>${$da[i][0]}</li>`

                        })
                        _this.searchList.html(_this.str);
                        _this.searchList.show();
                        _this.str = '';

                        _this.searchList.on('mouseover','li',function () { //滑过提示框内容的时候给提示行加背景
                            _this.searchList.show();
                            $(this).css('background', '#ccc').siblings().css('background','#fff') ;
                        })
                        _this.searchList.on('mouseout',function(){ //滑出隐藏提示框
                            _this.searchList.hide();
                        })
                        _this.searchList.on('click','li',function () { //点击对应内容，对应内容自动到搜索框
                            _this.search.prop('value',$(this).html());
                        })
                    },
                })
            })
        }

    }
    new search().init();
}(jQuery);

//*****************/
//回到顶部
!function ($) {
    class totop {
        constructor() {
            this.totop = $('#toTop');
            this.timer = null;
        }
        init() {
            var _this = this;
            $(window).on('scroll', function () {
                var $top = $(window).scrollTop();
                if ($top > 0) {
                    _this.totop.show();
                } else {
                    _this.totop.hide();
                    clearInterval(_this.timer);

                }
            });
            this.totop.on('click', function () {
                var $top = $(window).scrollTop();
                _this.timer = setInterval(function () {
                    $top *= 0.8;
                    $(window).scrollTop($top);
                }, 30);
            })
        }
    }
    new totop().init();
}(jQuery);









