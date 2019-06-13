// 详情页的渲染
!function ($) {
    class details_xuanran {
        constructor() {
            this.spic = $('.spic'); //中图div
            this.bpic = $('.zoomWrapperImage');//大图div
            this.spiclist = $('#spec-list ul'); //小图ul
            this.picsrc = $('.floorConRight');
            this.id = null;
            this.str = '';
            this.str1 = '';
        }

        init() {
            let _this=this;
            this.picsrc.on('click', 'li', function () {    
                _this.postdt();
            })
            this.getdt();
        }

        postdt() { //发送ID
            let _this = this;
   
            $.ajax({
                type: 'get',
                url: 'http://10.31.164.88/greemall/php/detailsdata.php',
                dataType: "json",
            })
        }

        getdt(){ //获取数据
            let _this=this;
            let $sid=window.location.search.substring(5);
            console.log($sid);
            $.ajax({
                type:'get',
                url: 'http://10.31.164.88/greemall/php/detailsdata.php',
                dataType:'json',
                data:{sid:$sid},
                success:function(data){ 
                        _this.str = `<img src="${data.src}"					
                        width="400" height="400" id="midimg" title="" style="opacity: 1;">`;
                        _this.spic.html(_this.str);
                        _this.str = `<img src="${data.src}"
                        style="position: absolute; border: 0px; display: block; left: -578.333px; top: -600px;">`
                        _this.bpic.html(_this.str);
                        let $arr = data.srclist.split(',');
                        $($arr).each(function (i) {
                            _this.str1 += `<li><a href="javascript:void(0);"
                        rel="{gallery: 'gal1', smallimage: 'http://mall.gree.com/wcsstore/GreeStorefrontAssetStore/images/product/A7002007400D/400X400/A7002007400D_01.jpg',largeimage: 'http://mall.gree.com/wcsstore/GreeStorefrontAssetStore/images/product/A7002007400D/1000X1000/A7002007400D_01.jpg'}"><img
                            src="${$arr[i]}" />
                    </a></li>`
                        });
                        _this.spiclist.html(_this.str1);          
                }
            })
        }
    }

    new details_xuanran().init();
}(jQuery);

