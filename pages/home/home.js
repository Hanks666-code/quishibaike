// pages/home/home.js
Page({
  data: {
    currentIndex: 0
  },
  swiperNav: function (e) {
    this.setData({currentIndex:e.target.id})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})