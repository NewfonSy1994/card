Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航栏图片路径
    navList: [
      '../../images/docard.png',
      '../../images/integral.png',
      '../../images/mall.png',
      '../../images/recommend.png',
      '../../images/speed.png'
    ],
    // tabbar标题
    tabbarTitleList: [],
    // 当前点击索引
    currentIndex: 0,
    discountList: [],
    // 集合信息
    discount: [],
    card: [],
    welfare: [],
    home: [],
    buy: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用小程序的网络请求API
    wx.request({
      url: 'http://rw.mission-sd.com/backstage/0511/index.php/dashboard/front/banner',
      success: (res) => {
        this.setData({
          swiperList: res.data.data
        })
      }
    });
    // 进入页面获取优惠活动数据
    wx.request({
      url: 'http://rw.mission-sd.com/backstage/0511/index.php/dashboard/front/item',
      data: {
        type_id: 1
      },
      success: (res) => {
        this.setData({
          discountList: res.data.data
        })
      }
    })
    // 获取tabbar标题数据
    wx.request({
      url: 'http://rw.mission-sd.com/backstage/0511/index.php/dashboard/front/item_type',
      success: (res) => {
        this.setData({
          tabbarTitleList: res.data.data
        })
      }
    });
  },
  selectItem(ev) {
    // 获取当前点击元素的索引
    const idx = ev.currentTarget.dataset.idx
    this.setData({
      currentIndex: idx
    })
    // 获取集合信息
    wx.request({
      url: 'http://rw.mission-sd.com/backstage/0511/index.php/dashboard/front/item',
      data: {
        type_id: idx + 1
      },
      success: (res) => {
        switch (idx + 1) {
          case 1:
            this.getData('discount', res);
            break;
          case 2:
            this.getData('card', res);
            break;
          case 3:
            this.getData('welfare', res);
            break;
          case 4:
            this.getData('home', res);
            break;
          case 5:
            this.getData('buy', res);
            break;
        }
      }
    })
  },
  getData(type, res) {
    this.setData({
      [type]: res.data.data
    })
    console.log(res.data.data)
  }
})