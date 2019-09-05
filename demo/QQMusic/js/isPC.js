var pcAlertstr = '<div class="pcAlertBoxHeader"><h3>Yeah！有人来看我简历了！</h3></div><div class="pcAlertBoxContent"><img src="http://olh2gw43o.bkt.clouddn.com/QQmusic.png" alt=""><p>这是一份移动端DEMO哦~</p><p>在手机上看效果才好呢！</p><p>赶紧掏出微信扫描二维码吧！</p></div><div class="pcAlertBoxFooter"><span class="pcAlertBoxFooterLeft">好哒，这就去扫</span><span class="pcAlertBoxFooterRight">破事多，不看了</span></div>';
var dBody = document.body;
(function() {
    if (isPC()) {
        pcAlert();
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
