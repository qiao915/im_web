<template>
    <div>
        <div class="thumbs" :id="id">

            <template v-for="(item, index) in imgData">
                 <!-- :style="'backgroundImage: url('+item.Url+')'" -->
                  <a :data-touch="item.Path ? true : false" :target-href="item.Url" :thumbs-list="id"
                    draggable="true" @dragstart="drag($event, item)" @drop="drop($event, index)" @dragover="$event.preventDefault();"
                    @mouseover="mouseOver($event, item)" @mouseout="mouseOut($event, item)">
                    <img :src="item.Url" alt="">
                    </a> 
            </template>
        </div>
        <div class="video-wrap">
            <template v-for="item in videoData">
                <video width="150" height="150" controls="controls" :src="item.Url"></video>
            </template>
        </div>
        <!-- <div class="other-wrap">
            <template v-for="item in otherData">
                <a class="link-txt" :href="item.Url">{{item.Name}}</a>
            </template>
        </div> -->
    </div>
</template>
<script>
    import './touchTouch.jquery'
    export default {
        name: 'touch',
        props: ['id', 'imgList', 'receiveChecked', 'isBorder'],
        data() {
            return {
                imgData: [],
                videoData: [],
                otherData: [],
                selectedImages: [],
            };
        },
        computed: {
        },
        methods: {
            touch() {
                this.$nextTick(_ => {
                    $('#gallery' + this.id).remove();
                    $('#' + this.id + " a[data-touch=true]").touchTouch(this.id);
                });
            },
            initData() {
                this.imgData = [];
                this.videoData = [];
                _.forEach(this.imgList, (item) => {
                    
                    if (!item.Name)
                        return
                    let type = item.Name.substring(item.Name.lastIndexOf('.') + 1).toUpperCase();
                    if (type == 'PNG' || type == 'JPEG' || type == 'JPG' || type == 'GIF') {

                        this.imgData.push(item);
                    }
                    else if(type == 'MP4' || type == 'RMVB' || type == 'AVI' || type == 'MPG'|| type == 'MPEG'){

                        this.videoData.push(item); // 视频格式
                    }
                    else
                    {
                        this.otherData.push(item);
                    }
                });
            },

            // 图片开始拖拽
            drag(event, item) {
                this.$emit("dragstart", event, item);
            },

            // 拖拽到目标位置时阻止默认事件
            allowDrop(event) {
            },

            // 拖拽成功后
            drop(event, index) {
                //传递拖拽目标对象的索引值
                this.$emit("drop", event, index);
            },

            // 鼠标滑过图片
            mouseOver($event, item) {
                if (item.AttachmentId) {
                    $($event.target).css({
                        'border': 'solid 1px #1588f7'
                    })
                }
            },

            // 鼠标移出
            mouseOut($event, item) {
                if (item.AttachmentId) {
                    $($event.target).css({
                        'border': 'solid 1px #fff'
                    })
                }
            },
        },
        watch: {
            imgList: function (val) {
                this.initData();
                this.touch();
            },
        },
        created() {
            this.initData();
            this.touch();
        },
        mounted: function () {
        },
        activated: function () {
        },
        updated: function () {
        },
        deactivated: function () {
        },
        components: {
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "./touchTouch.css";
    /*@import "~assets/css/static.less";*/

    video {
        margin: 6px;
    }
    .Img-box{
        width: 80px;
        height: 80px;    
    }

    .thumbs a {
        display: inline-block;
        margin: 4px;
        border: solid 1px rgba(0, 0, 0, 0);
        width: 150px;
        height: 150px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-position: bottom;
        cursor: pointer;
        position: relative;
    }

    .thumbs .check-img {
        margin-left: 131px;
        position: absolute;
        margin-top: 8px;
    }
    .other-wrap a{
        display: block;
        margin: 10px;
    }
</style>