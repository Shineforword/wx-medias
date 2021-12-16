// pages/mediamanager/mediamanager.js
var manager = require('./media-control/media-manager.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    medias:[{}],
  },
  mediamanagerAdd:function(e){
    var that = this
    manager.mediaAdd(that.data.medias,function(res) {
      console.log("添加-------------------------")
      console.log(res)
      that.setData({
        medias:res
      })
    })
  },
  mediamanagerDelete:function(e){
    console.log("删除-------------------------")
    var that = this
    var index = manager.mdeia_del_index;
    wx.showModal({
      cancelColor: '#999999',
      confirmColor: '#017FC5',
      title: '您确定删除？',
      success(res) {
        if (res.confirm) {
            manager.mediaDelete(that.data.medias,index,function (res) {
              console.log(res)
              that.setData({
                medias:res
              })
            })
        }
      }
    })
  },
  mediamanagerPreview:function(e){
    console.log(manager)
    var that = this
    var index = manager.mdeia_pre_index;
    console.log("预览-------------------------")
    //单张预览
    // manager.mediaPreviewPic(that.data.medias,index)
    //多张预览
    // manager.mediaPreviewPics(that.data.medias,index)
    //混合预览
    // console.log(that.data.medias)
    manager.mediaPreviewMedia(that.data.medias,index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var medias =  manager.scan_commit_medias
    console.log(medias)
    var that = this 
    if(medias.length > 1){
        that.setData({
            medias: medias,
        })
    }
  },

})