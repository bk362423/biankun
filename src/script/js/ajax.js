// 首页的渲染
!function ($) {
    class xuanran {
        constructor() {
            this.xrbox1 = $('#f3 .dianqi1');
            this.xrbox2 = $('#f3 .dianqi2');
            this.xrbox3 = $('#f3 .dianqi3');
            this.xrbox4 = $('#f3 .dianqi4');
            this.str1 = '';
            this.str2 = '';
            this.str3 = '';
            this.str4 = '';
        }

        init() {
            this.getdata();
        }

        getdata() {
            let _this = this;
            $.ajax({
                type: 'get',
                url: 'http://10.31.164.88/greemall/php/postdata.php',
                dataType: "json",
                success: function (data) {
                    $(data).each(function (i) {
                        if (data[i].family == 'dianqi1') {
                            _this.str1 += `
                                    <ul>
                                             <li>
                                                    <a target="_blank" href="http://10.31.164.88/greemall/src/details.html?sid=${data[i].sid}"
                                                        class="floorConRightImg">
                                                        <img style="width:216px;height:216px;" data-original="${data[i].src}"
                                                            class="errImg lazy"
                                                            ></a>
                                                    <a                                    
                                                        class="title m20viga">
                                                        <label class="price m20viga">
                                                           ${data[i].price}
                                                        </label>
                                                    </a>
                                                </li>
                                                </ul>`


                        } else if (data[i].family == 'dianqi2') {
                            _this.str2 += `<ul> <li >
                                <a  target="_blank" href="http://10.31.164.88/greemall/src/details.html?sid=${data[i].sid}"
                                    class="floorConRightImg">
                                    <img style="width:216px;height:216px;" data-original="${data[i].src}"
                                        class="errImg lazy" ></a>
                                    <label class="price m20viga">
                                         ${data[i].price}
                                    </label>
                                </a>
                            </li> </ul>`

                        } else if (data[i].family == 'dianqi3') {
                            _this.str3 += `<ul> <li id="${data[i].sid}">
                                <a  target="_blank" href="http://10.31.164.88/greemall/src/details.html?sid=${data[i].sid}"
                                    class="floorConRightImg">
                                    <img style="width:216px;height:216px;" data-original="${data[i].src}"
                                        class="errImg lazy" ></a>
                                    <label class="price m20viga">
                                         ${data[i].price}
                                    </label>
                                </a>
                            </li> </ul>`

                        } else if (data[i].family == 'dianqi4') {
                            _this.str4 += `<ul> <li id="${data[i].sid}">
                                <a  target="_blank" href="http://10.31.164.88/greemall/src/details.html?sid=${data[i].sid}"
                                    class="floorConRightImg">
                                    <img style="width:216px;height:216px;" data-original="${data[i].src}"
                                        class="errImg lazy" ></a>
                                    <label class="price m20viga">
                                         ${data[i].price}
                                    </label>
                                </a>
                            </li> </ul>`

                        }
                        _this.xrbox1.html(_this.str1);
                        _this.xrbox2.html(_this.str2);
                        _this.xrbox3.html(_this.str3);
                        _this.xrbox4.html(_this.str4);
                    });
                    //懒加载
                    $(function () { ////和拼接的元素放在一起
                        $("img.lazy").lazyload({
                            effect: "fadeIn",  //图片显示方式 淡入
                        })
                    });

                }
            })
        }
    }

    new xuanran().init();
}(jQuery);
