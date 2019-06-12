!function($){
    class xuanran{
        constructor(){
            this.xrbox1=$('#f3 .dianqi1');
            this.xrbox2=$('#f3 .dianqi2');
            this.xrbox3=$('#f3 .dianqi3');
            this.xrbox4=$('#f3 .dianqi4');
             this.str1='';
             this.str2='';
             
        }

        init(){
           this.getdata();
        }

        getdata(){
            let _this=this;
            $.ajax({
                type:'get',
                url:'http://10.31.164.88/greemall/php/postdata.php',
                dataType: "json",
                success: function(data){
                   $(data).each(function(i){
                       if(data[i].family=='dianqi1'){
                        _this.str1+=`<ul> <li>
                       <a target="_blank" href="http://mall.gree.com/mall/zh-CN/zhuhai/A000200044"
                           class="floorConRightImg">
                           <img src="${data[i].src}"
                               class="errImg"
                               data-original="http://mall.gree.com/wcsstore/GreeStorefrontAssetStore/images/product/A000200044/220X220/A000200044_01.jpg"></a>
                       <a target="_blank" href="http://mall.gree.com/mall/zh-CN/zhuhai/A000200044"
                           class="title m20viga">
                           <label class="price m20viga">
                                ${data[i].price}
                           </label>
                       </a>
                   </li> </ul>`
                   _this.xrbox1.html(_this.str1);
                   _this.xrbox3.html(_this.str1);
                       }else if(data[i].family=='dianqi2'){        
                        _this.str2+=`<ul> <li>
                        <a target="_blank" href="http://mall.gree.com/mall/zh-CN/zhuhai/A000200044"
                            class="floorConRightImg">
                            <img src="${data[i].src}"
                                class="errImg"
                                data-original="http://mall.gree.com/wcsstore/GreeStorefrontAssetStore/images/product/A000200044/220X220/A000200044_01.jpg"></a>
                        <a target="_blank" href="http://mall.gree.com/mall/zh-CN/zhuhai/A000200044"
                            class="title m20viga">
                            <label class="price m20viga">
                                 ${data[i].price}
                            </label>
                        </a>
                    </li> </ul>`
                    _this.xrbox2.html(_this.str2);
                    _this.xrbox4.html(_this.str2);
                       }
                       
                   });
                   
                  }         
            })
        }
    }

    new xuanran().init();
}(jQuery);