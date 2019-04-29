import axios from 'axios';
import wx from 'weixin-js-sdk'

const ua = window.navigator.userAgent.toLowerCase();

//封装的微信分享的初始化方式
function wxInit(shareData, config) {
  wx.config({
    debug: true, //
    appId: config.appId, // 公众号的唯一标识
    timestamp: config.timestamp, //生成签名的时间戳
    nonceStr: config.nonceStr, //生成签名的随机串
    signature: config.signature,//
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
  });
  wx.checkJsApi({
    jsApiList: [
      'onMenuShareTimeline', 'onMenuShareAppMessage'
    ]
  });
  wx.ready(function () {
    wx.onMenuShareTimeline(shareData);//分享到朋友圈
    wx.onMenuShareAppMessage(shareData);//分享给朋友
  });
}


let Share = {
  /**
   * 微信分享组件
   * */
  weixin(title, desc, url, cover, callback) {
    title = title ? title : "我的鸟窝，您在马尼拉的专业租售房APP!";
    desc = desc ? desc : "专注马尼拉市场，做贴心的管家式服务。";
    url = url ? url : window.location.href;
    url = url.split('#')[0];
    cover = cover ? cover : "//cdn.ohmynest.com/static/images/logo.png";
    let shareData = {
      "title": title,  // 分享标题
      "desc": desc,    // 分享描述
      "imgUrl": cover, // 分享显示的缩略图地址 ,根据自己情况而定
      "link": url,     // 分享地址
    };
    axios.get('https://api.dev.ohmynest.com/api/shares/token' + '?url=' + encodeURIComponent(url))
      .then(res => {
        if (res && res.data) {
          wxInit(shareData, res);
        }
        callback && callback(res);
      });
  }

};
export default Share;
