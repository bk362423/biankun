

// ****详情页/放大镜*****//
!function ($) {
    class scale {
        constructor() {
            this.sf = $('.zoomPup'); //小放
            this.bf = $('.zoomWindow'); //大放
            this.spic = $('.zoomPad'); //小图
            this.bpic = $('.zoomWrapperImage'); //大图div 找大图bpic.find('img')
            this.wrap = $('.preview'); //整个box            
            this.left_btn = $('.SmallPrev'); //左箭头
            this.right_btn = $('.SmallNext');//右箭头
            this.listul = $('#spec-list'); //多张图片ul
            this.num=0;
            this.liwidth=0;
        }

        init() {
            var _this = this;
            this.spic.hover(function () {//鼠标划入小图，sf和bpic 显示
                _this.sf.show();
                _this.bf.show();
                $(this).on('mousemove', function (e) {
                    _this.sfmove(e);
                })
                _this.sfsize();//调用sfsize()
            }, function () {//鼠标划出小图，sf和bpic 隐藏
                _this.sf.hide();
                _this.bf.hide();
            });

            this.listul.on('click', 'li',function () { //事件委托 通过点击ul 到各个li
                var $imgsrc = $(this).find('img').attr('src');
                _this.spic.find('img').attr('src', $imgsrc);
                _this.bf.find('img').attr('src', $imgsrc);
            })

            this.num = 5;
            this.liwidth = this.listul.find('li').eq(0).outerWidth(true);
            this.right_btn.on('click', function () {
                _this.rightclick();

            })
            this.left_btn.on('click', function () {
                _this.leftclick();
            })
        }

        //求sf尺寸，求大图放大比例
        sfsize() {
            this.sf.css({//求sf尺寸   spic * bf / bpic(公式)
                width: this.spic.width() * this.bf.width() / this.bpic.find('img').width(),
                height: this.spic.height() * this.bf.height() / this.bpic.find('img').height(),
            });
            this.bili = this.bpic.find('img').outerWidth() / this.spic.outerWidth();//求sf比例，大图/小图，比例大于1
        }

        //sf在spic里移动
        sfmove(e) {
            var l = e.pageX - this.wrap.offset().left - this.sf.width() / 2;
            var t = e.pageY - this.wrap.offset().top - this.sf.height() / 2;
            if (l <= 0) {
                l = 0;
            } else if (l >= this.spic.outerWidth() - this.sf.outerWidth() - 2) {
                l = this.spic.outerWidth() - this.sf.outerWidth() - 1;
            }

            if (t <= 0) {
                t = 0;
            } else if (t >= this.spic.outerHeight() - this.sf.outerHeight() - 2) {
                t = this.spic.outerHeight() - this.sf.outerHeight() - 1;
            }

            this.sf.css({ //位置赋给sf
                left: l,
                top: t,
            });

            this.bpic.find('img').css({ //大图位置
                left: -l * this.bili,
                top: -t * this.bili
            })
        }

        rightclick() {
            var $n=this.listli.length;
            $(this.listli).each(function(i){
                this.listli.css('left',)
            })
        }

        leftclick() {
            this.listul.animate({
                left:this.liwidth
            });
        }
    }
    new scale().init();
}(jQuery);

