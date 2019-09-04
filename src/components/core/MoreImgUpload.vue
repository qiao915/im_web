<template>
  <div class="MoreImgUpload">
    <el-upload
      ref="uploadImg"
      action="/api/im/chat/uploadFileFromWeb.do"
      list-type="picture-card"
      accept=".jpg, .jpeg, .png, .bmp, .psd, .tga, .tiff"
      :file-list="fileList_copy"
      :http-request="uploadSectionFile"
      :limit="limitNumber"
      :on-exceed="exceedNum"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      multiple
      >
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Bus from '../Data/bus.js'

  export default {
    props:{
      limitNumber:{
        type: Number,
        default: 9
      },
      dialogImageUrl:{
        type: String,
        default: ''
      },
      fileList:{
        type:Array,
        default:()=>[]
      }

    },
    data () {
      return {
        dialogVisible: false,
        fileList_copy: []
      }
    },
    watch :{
      fileList(value){
        this.fileList_copy = value
      }
    },
    mounted(){
        this.fileList_copy = this.fileList
      // Bus.$on('emptyUploadList', (e)=>{
      //   this.$refs.uploadImg.clearFiles()
      //   this.fileList_copy = []
      //   console.log(this.fileList_copy)
      //   console.log(this.fileList)
      // })
    },
    methods: {
      // 上传图片 文件
      uploadSectionFile (param) {
        var merchantNo = this.$cfg.userInfo.memberNoMerchant
        var fileObj = param.file
        var form = new FormData()
        const fileSizeM = fileObj.size / 1024 / 1024

        if (fileSizeM > 10) {
          let errMessage = '上传文件大小不能超过 10M'
          this.$message({
            type: 'error',
            message: errMessage
          })
          this.fileList_copy = []
          return false
        }

        form.append('file', fileObj)
        form.append('merchantNo', merchantNo)
        this.$http.post('/api/im/chat/uploadFileFromWeb.do', form, {
          noEncryption: true,
          noStringify: true
        }).then(res => {
          if (res.data.result === true) {
            this.$message({
              type: 'success',
              message: '上传成功'
            })
            fileObj.url = res.data.returnObject
            this.fileList_copy.push(fileObj)
          } else {
            this.$message({
              type: 'error',
              message: res.data.errorMessage
            })
            this.fileList_copy = []
          }
        })
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      exceedNum (file) {
        this.$message({
          type: 'danger',
          message: '最多上传' + this.limitNumber + '张图片'
        })
      },

      handleRemove (file) {
        let index = this.fileList_copy.indexOf(file)
        if (index > -1) {
          this.fileList_copy.splice(index, 1)
        }
      }
    },
    beforeDestroy () {
      // console.log(this.fileList_copy)
      //this.fileList_copy = []
    }
}
</script>

<style lang="less">
.MoreImgUpload .el-upload-list--picture-card .el-upload-list__item,.MoreImgUpload .el-upload--picture-card{width: 80px;height: 80px;}
.MoreImgUpload .el-upload--picture-card i{position: relative;bottom: 30px;right: 0;}

</style>
