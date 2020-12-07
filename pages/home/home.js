// pages/home/home.js
Page({
  data: {
    currentIndex: 0,
    recommendArray: [],
    videoArray: [],
    imageArray: [],
    winHeight:0,
    pages:10,
    page_recommend: 1,
    page_video: 1,
    page_image: 1
  },
  swiperNav: function (e) {
    var id = e.currentTarget.id;
    if (id == 0) {
      this.setHeight(this.data.recommendArray.length);
    }
    if (id == 1) {
      this.setHeight(this.data.videoArray.length);
    }
    if (id == 2) {
      this.setHeight(this.data.imageArray.length);
    }
    this.setData({
      currentIndex:id
    });
  },
  // 设置动态高度
  setHeight:function(len){
    var page = this;
    wx.getSystemInfo({
      success: (result) => {
        page.setData({
          winHeight:result.windowHeight * len / 1.7
        });
      },
    });
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    page.loadRecommend(page.data.page_recommend);
    page.loadVideo(page.data.page_video)
    page.loadImage(page.data.page_image)
  },
  // 加载推荐页面
  loadRecommend: function (pageNow) {
    wx.showNavigationBarLoading();
    var page = this;
    wx.request({
      url: 'http://m2.qiushibaike.com/article/list/text?type=refresh&page='+pageNow,
      method: 'GET',
      dataType: 'json',
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var recommendArray = page.data.recommendArray;
        var page_recommend = page.data.page_recommend;
        page.setData({recommendArray:recommendArray.concat(res.data.items),page_recommend:pageNow})
        page.setHeight(page.data.recommendArray.length)
        wx.hideNavigationBarLoading();
      }
    })
  },
  // 加载视频页面
  loadVideo:function(pageNow){
    wx.showNavigationBarLoading();
    var page = this;
    var url = "http://m2.qiushibaike.com/article/list/video?type=refresh&count=12&page="+pageNow;
    wx.request({
      url: url,
      method:'GET',
      dataType:'json',
      header:{'Content-type':'json'},
      success:function(res){
        var videoJson = res.data;
        let video_array = page.data.videoArray;
        video_array = video_array.concat(videoJson.items);
        page.setData({
          videoArray:video_array,
          page_video:pageNow
        });
        page.setHeight(page.data.videoArray.length);
        wx.hideNavigationBarLoading();
      }
    });
  },
// 加载图片页面
loadImage: function(pageNow){
  wx.showNavigationBarLoading();
  var page = this;
  var url = "http://m2.qiushibaike.com/article/list/image?type=refresh&count=12&page="+pageNow;
  wx.request({
    url: url,
    method:'GET',
    dataType:'json',
    header:{'Content-type':'json'},
    success:function(res){
      var imageJson = res.data;
      let image_array = page.data.imageArray;
      image_array = image_array.concat(imageJson.items);
      page.setData({
        imageArray:image_array,
        page_image:pageNow
      });
      page.setHeight(page.data.imageArray.length);
      wx.hideNavigationBarLoading();
    }
  });
},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this;
    if (page.data.currentIndex == 0 ) {
      if (page.data.page_recommend<page.data.pages) {
        page.loadRecommend(page.data.page_recommend+1)
      }else {
        wx.showToast({
          title: '已经刷新到底了，请休息一下眼睛',
        });
      }
    } 
    if (page.data.currentIndex == 1 ) {
      if (page.data.page_video<page.data.pages) {
        page.loadVideo(page.data.page_video+1)
      }else {
        wx.showToast({
          title: '已经刷新到底了，请休息一下眼睛',
        });
      }
    }
    if (page.data.currentIndex == 2 ) {
      if (page.data.page_image<page.data.pages) {
        page.loadImage(page.data.page_image+1)
      }else {
        wx.showToast({
          title: '已经刷新到底了，请休息一下眼睛',
        });
      }
    }
  },
  onShareAppMessage: function () {
    return {
      title:'糗事百科',
      desc:'这里有最搞笑的娱乐段子',
      path:'/pages/home/home'
    }
  }
})