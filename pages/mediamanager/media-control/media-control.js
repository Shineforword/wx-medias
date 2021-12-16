// pages/mediamanager/media-control/media-control.js
Component({
  /**
   * 组件生命周期
   */
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    show: function() {
      // 页面被展示

    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //medias信息
    medias:[]
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _controlActionDelete:function(e){
      console.log("control-delete")
      this.triggerEvent("controlActionDelete")
    },
    _controlActionPreview:function(e){
      console.log("control-preview")
      this.triggerEvent("controlActionPreview")

    },
    _controlActionPicAdd:function(e){
      console.log("control-add")
      this.triggerEvent("controlActionPicAdd")
    }
  }
})
