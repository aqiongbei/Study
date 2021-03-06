function Tab() {
    this.$box = $('#box');
    this.$innerBox = this.$box.find('.boxInner');
    this.$aDiv = null; //jQuery中没有DOM映射
    this.$aImg = null;
    this.$ul = this.$box.find('ul');
    this.$aLi = null;
    this.$left = this.$box.find('.left');
    this.$right = this.$box.find('.right');
    this.data = null;
    this.timer = null;
    this.n = 0;
    this.init();
}
Tab.prototype = {
    constructor: Tab,
    init: function() {
        var _this = this;
        //1.获取数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.延迟加载
        this.lazyImg();
        //4.图片渐隐渐现
        clearInterval(this.timer);
        this.timer = setInterval(function() {
                _this.autoMove();
            }, 2000)
            //5.焦点自动轮播
            //6.移入停止，移出继续
        this.overout();
        //7.点击焦点手动切换
        this.handleChange();
        //8.点击左右按钮进行切换
        this.leftRight();
    },
    getData: function() {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'json/data.txt',
            async: false,
            dataType: 'json',
            success: function(val) {
                _this.data = val;
            }
        })
    },
    bind: function() {
        var strDiv = '';
        var strLi = '';
        $.each(this.data, function(index, item) {
            strDiv += '<div><img src="" realImg="' + item.imgSrc + '" alt=""></div>';
            strLi += index == 0 ? '<li class="on"></li>' : '<li></li>';
        })
        this.$innerBox.html(strDiv);
        this.$ul.html(strLi);
    },
    lazyImg: function() {
        var _this = this;
        this.$aDiv = this.$innerBox.children('div');
        this.$aImg = this.$innerBox.find('img');
        this.$aLi = this.$ul.find('li');
        $.each(this.$aImg, function(index, item) {
            var tmpImg = new Image;
            tmpImg.src = item.getAttribute('realImg');
            tmpImg.onload = function() {
                item.src = this.src;
                tmpImg = null;
                var $div1 = _this.$aDiv.eq(0);
                $div1.css('zIndex', 1).fadeIn();
            }
        })
    },
    autoMove: function() {
        if (this.n >= this.$aDiv.length - 1) {
            this.n = -1;
        }
        this.n++;
        this.setBanner();
    },
    setBanner: function() {
        var _this = this;
        $.each(this.$aDiv, function(index, item) {
            if (index == _this.n) {
                // $(item).css('zIndex',1).fadeIn().siblings().fadeOut(300);
                $(item).css('zIndex', 1).siblings().css('zIndex', 0);
                $(item).fadeIn(500, function() {
                    $(this).siblings().fadeOut()
                });
            }

        });
        this.bannerTip();
    },
    bannerTip: function() {
        var _this = this;
        $.each(this.$aLi, function(index, item) {
            item.className = index == _this.n ? 'on' : null;
        })
    },
    overout: function() {
        var _this = this;
        this.$box.mouseover(function() {
            clearInterval(_this.timer);
            _this.$left.show();
            _this.$right.show();
        })
        this.$box.mouseout(function() {
            _this.timer = setInterval(function() {
                _this.autoMove();
            }, 2000)
            _this.$left.hide();
            _this.$right.hide();
        })
    },
    handleChange: function() {
        var _this = this;
        this.$aLi.click(function() {
            _this.n = $(this).index();
            _this.setBanner();
        })
    },
    leftRight: function() {
        var _this = this;
        this.$right.click(function() {
            _this.autoMove();
        });
        this.$left.click(function() {
            if (_this.n <= 0) {
                _this.n = _this.$aLi.length;
            }
            _this.n--;
            _this.setBanner();
        })
    }
}
