<template>
  <div class="upfloadCon upupup">
    <el-upload class="upload-demo upload-demo_form" drag :disabled=true
      action="https://jsonplaceholder.typicode.com/posts/" multiple :before-upload="beforeAvatarUpload" :show-file-list=true>
        <!-- <i class="el-icon-upload"></i> -->
        <div class="el-upload__text">
          <i class="up_icon"></i>
          {{$t('Drag_the_files_here_or')}}
            <em>{{$t('Click_upload')}}</em>
        </div>
    </el-upload>
  </div>
</template>
<script>
    import OSS from 'ali-oss'
    import axios from 'axios'
    export default {
      data(){
        return{
          fileList: [],
        }
      },
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        methods:{
            beforeAvatarUpload(file) {
                // let fileName = new Array(0)
                // fileName = file.name.split('.')
                // const imageType = ['png', 'jpg', 'jpeg']
                // const isJPG = imageType.indexOf(fileName[fileName.length - 1])
                const isLt5M = file.size / 1024 / 1024 < 5;
                let isUpload = true
                // if (isJPG === -1) {
                //     this.$message.error(this.$t('Upload_avatar'));
                //     return false
                // }
                if (!isLt5M) {
                    this.$message.error(this.$t('not_exceed5'));
                    return false
                }
                this.alyOssUpload(file)
                return false
            },
            //阿里云上传
            alyOssUpload(file){
                let storeAs = file.name
                //console.log(file.name + ' => ' + storeAs);
                axios.get('http://www.appdown.vip/sts-server/dc-jys.php').then(res=>{
                    let result = res.data
                    let client = new OSS.Wrapper({
                        accessKeyId: result.AccessKeyId,
                        accessKeySecret: result.AccessKeySecret,
                        stsToken: result.SecurityToken,
                        endpoint: 'oss-cn-beijing.aliyuncs.com',
                        bucket: 'dc-exchanges'
                    })
                    client.multipartUpload(storeAs, file).then((result) => {
                        let imageUrl = 'http://dc-exchanges.oss-cn-beijing.aliyuncs.com/' + storeAs
                        this.$emit("input", imageUrl)
                    }).catch((err) => {
                        //console.log(err);
                    })
                })
            },
        }
    }
</script>
<style scoped>
.up_icon{width: 32px;height: 32px;display: inline-block;background: url('../../../static/img/huiixngzhen.png');background-size:100% 100%;vertical-align: middle;}
/* .upfloadCon>div{display: inline-block;width: 280px;height: 176px;}
.upfloadCon .upfloadBox{display: inline-block;width: 280px;height: 176px;} */
</style>
