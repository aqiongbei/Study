var pcAlertQRCode = 'http://olh2gw43o.bkt.clouddn.com/QQmusic.png';
var pcAlertstr = '<div class="pcAlertBoxHeader"><h3>Yeah！有人来看我DEMO了！</h3></div><div class="pcAlertBoxContent"><img src="' + pcAlertQRCode + '" alt=""><p>这是一份移动端DEMO哦~</p><p>在手机上看效果才好呢！</p><p>赶紧掏出微信扫描二维码吧！</p></div><div class="pcAlertBoxFooter"><span class="pcAlertBoxFooterLeft">好哒，这就去扫</span><span class="pcAlertBoxFooterRight">破事多，不看了</span></div>';
var dBody = document.body;
(function() {
    if (isPC()) {
        pcAlert();
    } else {
        go()
    }
}())
// 移动端弹窗提示
function pcAlert() {
    document.body.innerHTML = '';
    var pcAlert = document.createElement('div');
    var mask = document.createElement('div');
    mask.className = 'mask';
    pcAlert.className = 'pcAlertBoxWrap comeIn';
    pcAlert.innerHTML = pcAlertstr;
    dBody.appendChild(mask);
    dBody.appendChild(pcAlert);
    var yesBtn = document.querySelector('.pcAlertBoxFooterLeft');
    var noBtn = document.querySelector('.pcAlertBoxFooterRight');
    yesBtn.onclick = function() {
        noBtn.className = 'pcAlertBoxFooterRight toRightSmall';
        yesBtn.className = 'pcAlertBoxFooterLeft toRightBig';
        noBtn.innerHTML = '';
        yesBtn.innerHTML = '谢谢！你真是个好人！';
    }
    noBtn.onclick = function() {
        yesBtn.className = 'toLeftSmall';
        noBtn.className = 'toLeftBig';
        yesBtn.innerHTML = '';
        noBtn.innerHTML = '你确定不扫一下吗？恩！？';
    }
}
// 判断是否是PC端
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


function go() {
    (function() {
        var winW = document.documentElement.clientWidth,
            desW = 640,
            htmlFont = winW / 640 * 100;
        if (winW >= 640) {
            $('.musicBox').css({
                width: desW,
                margin: '0 auto',
            });
            window.htmlFont = 100;
            return;
        }
        window.htmlFont = htmlFont;
        document.documentElement.style.fontSize = htmlFont + "px";
    }());
    ~ function() {
        var winH = document.documentElement.clientHeight,
            headerH = $('.header')[0].offsetHeight,
            footerH = $('.footer')[0].offsetHeight;
        $('.main').css('height', winH - headerH - footerH - htmlFont * .8);
    }();
    var musicRender = (function() {
        var $musicPlan = $.Callbacks(),
            $lyric = $('.lyric'),
            $current = $('.current'),
            $duration = $('.duration'),
            $timeLineSpan = $('.timeLine>span'),
            $musicBtn = $('.musicBtn'),
            $musicBtnPlay = $musicBtn.eq(0),
            $musicBtnPause = $musicBtn.eq(1);
        var musicAudio = $('#musicAudio')[0],
            musicTimer = null,
            step = 0; //记录当前展示到第几行

        function formatTime(second) {
            var minute = Math.floor(second / 60);
            second = Math.floor(second % 60);
            minute < 10 ? minute = '0' + minute : null;
            second < 10 ? second = '0' + second : null;
            return minute + ':' + second;
        }
        //数据绑定
        $musicPlan.add(function(data) {
            var str = '';
            $.each(data, function(index, item) {
                str += '<p id="lyric' + item.id + '" data-minute="' + item.minute + '" data-second="' + item.second + '">' + item.content + '</p>';
            })
            $lyric.html(str);

        });
        // 控制音频自动播放
        $musicPlan.add(function() {
            musicAudio.play();
            musicAudio.addEventListener('canplay', function() {
                // 显示总时间
                $duration.html(formatTime(musicAudio.duration));

                $musicBtnPlay.css('display', 'none');
                $musicBtnPause.css('display', 'block');
            })
        });
        // 控制按钮的播放暂停
        $musicPlan.add(function() {
            // 移动端可以使用click事件,代表单击,
            // 所以在触发后都会等待300ms才能判断是否为单机事件
            $musicBtn.tap(function() {
                if (musicAudio.paused) {
                    musicAudio.play();
                    $musicBtnPlay.css('display', 'none');
                    $musicBtnPause.css('display', 'block');
                    return;
                } else {
                    musicAudio.pause();
                    $musicBtnPlay.css('display', 'block');
                    $musicBtnPause.css('display', 'none');
                }
            });
        });
        // 追踪播放状态
        $musicPlan.add(function() {
            musicTimer = window.setInterval(function() {
                if (musicAudio.currentTime >= musicAudio.duration) {
                    window.clearInterval(musicTimer);
                    $musicBtnPlay.css('display', 'block');
                    $musicBtnPause.css('display', 'none');
                    $lyric.css('top', 0);
                    $timeLineSpan.css('width', 0);
                }
                // 获取当前已经播放时间,显示并且控制进度条改变
                $current.html(formatTime(musicAudio.currentTime));
                $timeLineSpan.css('width', musicAudio.currentTime / musicAudio.duration * 100 + '%');
                // 控制歌词滚动
                // 控制对应行有选中样式:通过当前播放时间与p标签上的时间
                var timeR = formatTime(musicAudio.currentTime),
                    minute = timeR.split(':')[0],
                    second = timeR.split(':')[1];
                var $lyricList = $lyric.children('p');
                var $tar = $lyricList.filter('[data-minute="' + minute + '"]').filter('[data-second="' + second + '"]');
                $tar.addClass('bg').siblings().removeClass('bg');
                var n = $tar.index();
                if (n >= 3) {
                    $lyric.css('top', -.84 * (n - 2) + 'rem');
                }
            }, 1000);
        });

        return {
            init: function() {
                $.ajax({
                    url: 'lyric.json',
                    type: 'get',
                    dataType: 'json',
                    cache: false,
                    success: function(result) {
                        if (result) {
                            result = result.lyric || '';
                            result = result.replace(/&#(\d+);/g, function() {
                                var num = Number(arguments[1]),
                                    val = arguments[0];
                                switch (num) {
                                    case 32:
                                        val = ' ';
                                        break;
                                    case 40:
                                        val = '(';
                                        break;
                                    case 41:
                                        val = ')';
                                        break;
                                    case 45:
                                        val = '-';
                                        break;
                                }
                                return val;
                            });
                            var data = [],
                                reg = /\[(\d{2})&#58;(\d{2})&#46;(?:\d{2})\]([^&#]+)(?:&#10;)?/g,
                                index = 0;
                            result.replace(reg, function() {
                                data.push({
                                    id: ++index,
                                    minute: arguments[1],
                                    second: arguments[2],
                                    content: arguments[3]
                                });
                            });
                            // 通知事件执行
                            $musicPlan.fire(data);

                        }
                    }

                });
            }
        }
    }());
    musicRender.init();
}
