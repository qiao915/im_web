<!-- -->
<template>
  <div class="upfloadCon">
    <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
      </div>
</template>
<script>
    import OSS from 'ali-oss'
    import axios from 'axios'
    export default {
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        methods:{
            beforeAvatarUpload(file) {
                let fileName = new Array(0)
                fileName = file.name.split('.')
                const imageType = ['png', 'jpg', 'jpeg']
                const isJPG = imageType.indexOf(fileName[fileName.length - 1])
                const isLt5M = file.size / 1024 / 1024 < 5;
                let isUpload = true
                if (isJPG === -1) {
                    this.$message.error(this.$t('Upload_avatar'));
                    return false
                }
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
                        accessKeyId: result.AccessKeyId,          //key
                        accessKeySecret: result.AccessKeySecret,  //密码
                        stsToken: result.SecurityToken,           //token
                        endpoint: 'oss-cn-beijing.aliyuncs.com',
                        bucket: 'dc-exchanges'                    //文件夹
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
<style lang="less" scoped>

</style>
