/**
 * managerAddPic 图片添加
 * @medias 初始值
 * @success 成功回调
 */
function managerAddPic(medias,success) {
  var max = 9 - medias.length + 1
  console.log(max)
  wx.chooseMedia({
  count: max,
  mediaType: ['image','video'],
  sourceType: ['album', 'camera'],
  success(res) {
    medias.pop()
    res.tempFiles.forEach(element => {
      medias.push(element)
    });
    if(medias.length < 9){
      medias.push({})
    }
    success(medias)
  }
  }) 
}
/**
 * managerDeletePic 图片删除
 * @medias 初始数组
 * @index  删除下标
 * @success 成功回调
 */
function managerDeletePic(medias,index,success) {
  console.log("删除")
  medias.splice(index, 1)
  if(medias[medias.length-1].tempFilePath){
    medias.push({})
  }
  success(medias)
}
/**
 * managerPreviewPic 图片预览单张
 * @medias 初始数组
 * @index  下标
 */
function managerPreviewPic(medias,index) {

  var url = medias[index].tempFilePath;
  wx.previewImage({
    current: url, 
    urls: [medias[index].tempFilePath] 
  })
}
/**
 * managerPreviewPics 图片预览组
 * @medias 初始数组
 * @index  下标
 */
function managerPreviewPics(medias,index) {
  var url = medias[index].tempFilePath;
  var urls = []
  medias.forEach(element => {
    //排空
    if(element.tempFilePath){
      urls.push(element.tempFilePath)
    }
  });
  wx.previewImage({
    current: url, 
    urls: urls 
  })
}
/**
 * managerPreviewMedia 混合预览
 * @medias 初始数组
 * @index  下标
 */
function managerPreviewMedia(medias,index) {
  var source_list = []
  medias.forEach(element => {
    var dic = {}
    //排空
    if(element.thumbTempFilePath){
      dic['url'] = element.tempFilePath;
      dic['type'] = 'video';
      dic['poster'] = element.thumbTempFilePath;
      source_list.push(dic)
    }
    if(!element.thumbTempFilePath){
      if(element.tempFilePath){
        dic['url'] = element.tempFilePath;
        dic['type'] = 'image';
        source_list.push(dic)
      }
    }
  });
  console.log(source_list)
  wx.previewMedia({
    sources:source_list,
    current:index,
    success:function (res) {
      
    },
    fail:function (res) {
      
    },
    complete:function (res) {
      
    },
  })
}



///////////////////////////////////////////////////////上传////////////////////////////////////////////////////////
/**
 * managerUploadMedias 上传
 * @medias 数组
 */
function managerUploadMedias(medias,uploadMedias){
  // console.log(medias)
  //筛选数据
  var uploadFilePaths = []
  medias.forEach(element => {
    if(element.tempFilePath){
      uploadFilePaths.push(element.tempFilePath)
    }
  });
  // console.log(uploadFilePaths)
  //获取令牌
  let params = {
    systemType: 'COLLECTION_ADMIN'
  }
  var formData = {}
  // app.okhttp.get('/imageFile/getToken', params).then(res=>{
  //   formData = res.data
  //   //微信当前仅支持单文件上传(递归)
  //   var success = 0;
  //   var fail = 0;
  //   var length = uploadFilePaths.length;
  //   var count = 0; 
  //   var results = []
  //   uploadFileRecursion(uploadFilePaths,count,length,success,fail,formData,results,function (list) {
  //     for (let index = 0; index < medias.length; index++) {
  //         const element = medias[index];
  //         if(element.tempFilePath){
  //           element.uploadFilePath = list[index].path;
  //           element.fileType = list[index].fileType;
  //         }
  //     }
  //     uploadMedias(medias)
  //   });
  // })
}
/**
 * uploadFileRecursion 图片上传
 * @filePaths 初始数组
 * @count 第N张
 * @length 总张数
 * @success 成功张数
 * @fail 失败张数
 * @formData 失败张数
 */
function uploadFileRecursion(filePaths,count,length,success,fail,formData,results,resultlist){
  formData.type = "COLLECTION_ADD_FILE"
  wx.uploadFile({
    url: request.serverUrl + '/imageFile/upload', 
    filePath: filePaths[count],
    name: 'file',
    formData:formData,
    success:function(res){
      success++;
      wx.showToast({
        title: '上传成功(' + success+')',
        icon: 'none',
        duration: 1000
      })
      var jsonObject =  JSON.parse(res.data)
      var media = {
        fileType:jsonObject.data.fileType,
        path:jsonObject.data.path
      }
      results.push(media)
      if(success == length){
        resultlist(results)
      }
    },
    fail:function(error){
      fail++;
      wx.showToast({
        title: '上传失败(' + fail +')',
        icon: 'none',
        duration: 1000
      })
    },
    complete:function(res){
      count++;
      if(count == length){
        //上传完毕，作一下提示
        return;
      }else{
        //递归调用
        uploadFileRecursion(filePaths,count,length,success,fail,formData,results,resultlist);
      }
    }
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * managerDirectAdd 直接添加
 * @success 视频图片数组
 */
function managerDirectAdd(success) {
  var medias = []
  wx.chooseMedia({
  count: 9,
  mediaType: ['image','video'],
  sourceType: ['album', 'camera'],
  success(res) {
    res.tempFiles.forEach(element => {
      medias.push(element)
    });
    if(medias.length < 9){
      medias.push({})
    }
    success(medias)
  }
  }) 
}
///////////////////////////////////////////////////////外部////////////////////////////////////////////////////////
//   预览/删除 下标
var  mdeia_pre_index;
var  mdeia_del_index;

module.exports = {
  mdeia_del_index:mdeia_del_index,
  mdeia_pre_index:mdeia_pre_index,  
  mediaAdd: managerAddPic,
  mediaDelete: managerDeletePic,
  mediaPreviewPic:managerPreviewPic,
  mediaPreviewPics:managerPreviewPics,
  mediaPreviewMedia:managerPreviewMedia,
  mediaDirectAdd: managerDirectAdd,
};