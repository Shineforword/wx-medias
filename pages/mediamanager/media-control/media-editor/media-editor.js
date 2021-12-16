// pages/mediamanager/media-control/media-editor/media-editor.js
var manager = require('../media-manager.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
   //media信息
    media:{
      type: Object,  
      value: {}
    },
    //下标
    index:{
      type: Number,
      value:0
    }
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
    _editorActionDelete:function(e){
      console.log("editor-delete")
      manager.mdeia_del_index = e.currentTarget.dataset.index;
      console.log(manager)
      this.triggerEvent("editorActionDelete")
    },
    _editorActionPreview:function(e){
      console.log("editor-prew")
      manager.mdeia_pre_index = e.currentTarget.dataset.index;
      console.log(manager)
      this.triggerEvent("editorActionPreview")
    },
    _editorActionPicAdd:function(e){
      this.triggerEvent("editorActionPicAdd")
    }
  }
})
