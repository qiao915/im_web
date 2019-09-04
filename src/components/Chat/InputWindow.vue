<template >
  <div class="text chatInput">
    <div class="emoji">
      <div class="flex-dir" @click="chooseEmoji()">
        <i class="icon-c iconbiaoqing" title="表情"></i>
        <span class="icon_text">表情</span>
      </div>
      <div class="flex-dir">
        <el-upload
          class="upload-demo"
          action="/api/im/chat/uploadFileFromWeb.do"
          multiple
          :limit="1"
          ref="upload"
          accept=".jpg, .jpeg, .png, .bmp, .psd, .tga, .tiff"
          :file-list="fileList"
          :http-request="uploadImage"
          :auto-upload="true"
          :show-file-list="false"
        >
          <i class="icon-c iconbiaoqing3" title="图片"></i>
        </el-upload>
        <span class="icon_text">图片</span>
      </div>
      <div class="flex-dir">
        <el-upload
          class="upload-demo"
          action="/api/im/chat/uploadFileFromWeb.do"
          :multiple="false"
          :limit="1"
          ref="upload-file"
          accept=".xls, .xlsx, .ppt, .pptx, .pdf, .txt, .apk, .zip, .rar, .key, .doc, .docx"
          :file-list="fileList"
          :http-request="uploadFile"
          :auto-upload="true"
          :show-file-list="false"
        >
          <i class="icon-c iconwenjian1" title="文件"></i>
        </el-upload>
        <span class="icon_text">文件</span>
      </div>

      <!-- 视频 -->
      <div class="flex-dir">
        <el-upload
          class="upload-demo"
          action="/api/im/chat/uploadFileFromWeb.do"
          multiple
          accept=".mp4"
          :beforeUpload="beforeAvatarUpload"
          :file-list="fileList"
          :http-request="uploadVideo"
          :auto-upload="true"
          :show-file-list="false"
        >
          <i class="icon-c iconshipin1" title="视频"></i>
        </el-upload>
        <span class="icon_text">视频</span>
      </div>
       <div class="flex-dir" @click="chooseVerbalTrick()">
        <i class="icon-c iconduihua" title="话术"></i>
        <span class="icon_text">话术</span>
      </div>
      <div class="flex-dir" @click="chooseActivity()">
        <i class="icon-c iconhuodong" title="活动"></i>
        <span class="icon_text">活动</span>
      </div>
      <div class="flex-dir" @click="chooseApplet()">
        <i class="icon-c iconxiaochengxu" title="小程序"></i>
        <span class="icon_text">小程序</span>
      </div>
      <div class="flex-dir" @click="chooseTencent()">
        <i class="icon-c icongongzhonghao" title="公众号">
        </i><span class="icon_text">公众号</span>
      </div>

      <div class="flex-dir" @click="chooseCard()">
        <i class="icon-c iconmingpian" title="名片"></i><span class="icon_text">名片</span>
      </div>
      <div class="flex-dir" @click="chooseTrusteeship()">
        <i class="icon-c iconjiqiren" title="托管"></i><span class="icon_text">托管</span>
      </div>

      <div class="flex-dir" @click="chooseRedPacket()">
        <i class="icon-c iconhongbao" title="红包"></i><span class="icon_text">红包</span>
      </div>
      <div class="flex-dir" @click="chooseTransferAccount()">
        <i class="icon-c iconzhuanzhang" title="转账"></i><span class="icon_text">转账</span>
      </div>
      <div class="flex-dir" @click="chooseMaterial()">
        <i class="icon-c iconsucai1" title="素材"></i><span class="icon_text">素材</span>
      </div>
      <div class="flex-dir" @click="chooseMap()">
        <i class="icon-c iconweizhi" title="位置"></i><span class="icon_text">位置</span>
      </div>
      <div class="flex-dir" @click="chooseMaterialLibrary()">
        <i class="icon-c iconsucai1" title="素材库"></i><span class="icon_text">素材库</span>
      </div>
      <div class="flex-dir" @click="chooseCoupon()">
        <i class="icon-c iconyouhuiquan1" title="优惠券"></i><span class="icon_text">优惠券</span>
      </div>

      <!--表情弹窗  -->
      <transition name="showbox">

        <div class="emojiBox" v-show="showEmoji">
          <Expression @onFaceClick="sendEmoji"></Expression>
        </div>
      </transition>
      <!-- 截图 -->
      <!-- 小程序弹窗 -->
      <transition name="showbox">
        <div class="tencentBox" v-show="showApplet">
          <div class="tencent_title">
            <span class="head_title ml-20">小程序</span>
            <span class="head_input mr-20">
              <input type="text" placeholder="请输入关键词" v-model="searchAppletName">
            </span>
          </div>
          <div class="tencent_body">
            <ul style="height:350px;overflow:auto;">
              <li v-for="(item, index) in appletListData" :key="index" @click="sendApplet(item)">
                <span style="margin-left:10px;">
                  <img class="tencent_img" :src="item.spLogo">
                  <span class="tencent_text">{{item.spName}}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <!-- 地图弹窗 -->
      <transition name="showbox">
        <div class="tencentBox" v-show="showMap">
          <div class id="container" style="width:100%;height:400px;">
            <iframe id="mapPage" width="100%" height="100%" frameborder="0" :src="mapSrc"></iframe>
          </div>
        </div>
      </transition>
      <!-- 名片 -->
      <transition name="showbox">
        <div class="cardBox" v-show="showSmallCard">
          <!-- <p class="card_text">个人名片</p> -->
          <p @click="checkAddressList()">通讯录名片</p>
        </div>
      </transition>
      <!-- 通讯录名片 -->
      <transition name="showbox">
        <div class="tencentBox" v-show="showAddressList">
          <div class="tencent_title">
            <span class="head_title ml-20">通讯录名片</span>
            <span class="head_input mr-20">
              <input type="text" placeholder="请输入微信昵称" v-model="searchAddressListName">
            </span>
          </div>
          <div class="tencent_body">
            <ul style="height:310px;overflow:auto;">
              <li v-for="(item, index) in addressListData" :key="index">
                <span style="margin-left:10px;">
                  <input type="radio" name="radio" :value="item" v-model="checkAddressListData">
                  <img class="tencent_img" :src="item.headAddress">
                  <span class="tencent_text">{{item.nickNameRemarkWx || item.memberName}}</span>
                </span>
              </li>
            </ul>
          </div>
          <div class="tencent_bottom">
            <el-button type="success" size="mini" @click="sendAddressList()">发送</el-button>
          </div>
        </div>
      </transition>
      <!-- 话术弹窗 -->
      <transition name="showbox">
        <div class="tencentBox" v-show="showVerbalTrick">
          <!-- 普通话术列表 -->
          <div class="tencent_title">
            <span class="head_title ml-20">
              <el-tabs @tab-click="changeVerbal" v-model="VerbalTrickActiveName">
                <el-tab-pane name="default" label="默认话术"></el-tab-pane>
                <el-tab-pane name="common" label="公共话术"></el-tab-pane>
                <el-tab-pane name="person" label="个人话术"></el-tab-pane>
              </el-tabs>
            </span>
            <span class="head_input mr-20">
              <input type="text" placeholder="请输入话术" v-model="searchVerbalTrick_simple" @keyup.enter="VerbalTrick_default">
            </span>
          </div>
          <div class="tencent_body" v-if="VerbalTrickActiveName == 'default'">
            <ul style="height:310px;overflow:auto;">
              <li v-for="(item, index) in VerbalTrickList_default" :key="index" :title="item.content">
                <label style="margin-left:10px;">
                  <input type="radio" name="radio" :value="item" v-model="checkVerbalTrick">
                  <span class="tencent_text" style="margin-left:10px;">{{item.content}}</span>
                </label>
              </li>
            </ul>
          </div>

          <div class="sucai_box" v-if="VerbalTrickActiveName != 'default'">
            <ul style="height:310px;overflow:auto;">
              <li v-for="(item, index) in VerbalTrickList_common" :key="index">
                <p class="tencent_text" style="margin-left:10px;cursor:pointer" @click="showVer_list(item, index)">{{item.typeName}}</p>
                <div class="sucai_list" v-for="(list, ind) in item.wordsList" :key="ind" v-if="item.showVer">
                  <label style="margin-left:10px;">
                    <input type="radio" name="radio" :value="list" v-model="checkVerbalTrick">
                    <span >{{list.content}}</span>
                  </label>
                </div>

              </li>
            </ul>
          </div>

          <div class="tencent_bottom">
            <el-button type="success" size="mini" @click="sendVerbalStrick()">发送</el-button>
            <!-- <el-button  size="mini" @click="closeTencentBox()">取消</el-button> -->
          </div>
        </div>
      </transition>
      <!-- 托管弹窗 -->
      <span v-if="is_autoReply">
        <div class="trusteeshipBox" >您的账号已经开启托管功能，系统会自动为您回复！
          <el-button type="success" size="mini" @click="cancleTrusteeship()">取消托管</el-button>
        </div>
      </span>


      <!-- 素材弹窗 -->
      <transition>
        <div class="tencentBox" v-show="showMaterial">
          <div class="tabBox" style="padding-left:10px;">
            <span class="materialInput_box">
              <input
                type="text"
                placeholder="请输入活动名称"
                v-model="searchMaterialName"
                @input="checkCommonMaterialImg = '' ; checkPersonMaterialImg = '' "
              >
            </span>
            <el-tabs v-model="MaterialActiveName" @tab-click="handleClick">
              <el-tab-pane name="first" label="公共素材">
                <div class="tencent_body" style="display:flex;">
                  <ul class="ulBox">
                    <el-collapse v-model="collapseCtiveName1" accordion>
                      <el-collapse-item v-for="(item, index) in commonMaterialList" :title="item.materialTypeName" :name="index" :key="index">
                        <p class="liChild"
                        v-for="(list, ind) in item.datas"
                        @click="checkMaterialDetail(list, ind)"
                        >{{list.title}}</p>

                      </el-collapse-item>
                    </el-collapse>
                  </ul>
                  <div class="rightBox">
                    <div class>
                      <p>素材详情图</p>
                      <img :src="checkCommonMaterialImg" alt>
                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane name="second" label="个人素材">
                <div class="tencent_body" style="display:flex;">
                  <ul class="ulBox">
                    <el-collapse v-model="collapseCtiveName2" accordion>
                      <el-collapse-item v-for="(item, index) in personMaterialList" :title="item.materialTypeName" :name="index" :key="index">
                        <p class="liChild"
                        v-for="(list, ind) in item.datas"
                        @click="checkMaterialDetail(list, ind)"
                        >{{list.title}}</p>

                      </el-collapse-item>
                    </el-collapse>
                  </ul>
                  <div class="rightBox">
                    <div class>
                      <p>素材详情图</p>
                      <img :src="checkPersonMaterialImg" alt>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="tencent_bottom">
            <el-button type="success" size="mini" @click="sendMaterial()">发送</el-button>
            <!-- <el-button  size="mini" @click="closeTencentBox()">取消</el-button> -->
          </div>
        </div>
      </transition>

      <!-- 活动弹窗 -->
      <transition name="showbox">
        <div class="tencentBox" v-show="showActivity">
          <div class="tencent_title">
            <span class="head_title ml-20">活动</span>
            <span class="head_input mr-20">
              <input
                type="text"
                placeholder="请输入活动名称"
                v-model="searchActivityName"
                @input="checkActivityImg = ''"
              >
            </span>
          </div>
          <div class="tencent_body" style="display:flex;">
            <ul class="ulBox">
              <li
                v-for="(item, index) in activityListData"
                :key="index"
                @click="checkActivityDetail(item,index)"
                :class="{actived: changeActived == index}"
              >
                <span class="tencent_text" :title="item.title">{{item.title}}</span>
              </li>
            </ul>
            <div class="rightBox">
              <div class>
                <p>活动详情图</p>
                <img :src="checkActivityImg" alt>
              </div>
            </div>
          </div>
          <div class="tencent_bottom">
            <el-button type="success" size="mini" @click="sendActivity()">发送</el-button>
            <!-- <el-button  size="mini" @click="closeTencentBox()">取消</el-button> -->
          </div>
        </div>
      </transition>
      <!-- 红包弹窗 -->
      <transition name="showbox">
        <div class="tencentBox redPacketsBox" v-show="showRedPacket">
          <div class="tencent_title">
            <span class="head_title ml-20">红包</span>
            <span class="back mr-20" v-if="redPackets_steps == 2" @click="back_sendMoney">返回</span>
          </div>
          <div class="redPacket_body">
            <div v-if="redPackets_steps == 1">
              <div class="redPacketNumber_box">
                <span class="jine">金额</span>
                <span>
                  <input
                    class="redPacketNumber"
                    type="number"
                    v-model="redPacketNumber"
                    placeholder="0.00"
                    @input="limitMoney_input"
                    @keyup="inpnumup"
                    ref="redpackInput_focus"
                  >
                  <span class="yuan">元</span>
                </span>
              </div>
              <textarea class="redPacketText" v-model="redPacketText" placeholder="恭喜发财！大吉大利！"></textarea>
              <div class="showMoney">
                <span class>￥：{{redPacketNumber ? redPacketNumber : '0.00'}}</span>
              </div>
              <div class="sendBtn">
                  <div class="success-btn" @click="sendMoney()">塞钱进红包</div>
              </div>
          </div>
          <div v-if="redPackets_steps == 2">
              <p class="red_title">微信红包</p>
              <div class="showMoney">
                <span class>￥：{{redPacketNumber ? redPacketNumber : '0.00'}}</span>
              </div>
              <div class="input_pwd_box">
                <div style="display: inline-flex;">
                  <!-- <input type="password" class="input_pwd_input" maxlength="6" ref="pwd" autocomplete="off" v-model="redPacketsPwd" @input="input_redPackets_pwd()">
                  <input type="password" class="input_pwd_input" maxlength="6" ref="pwd" autocomplete="false" v-model="redPacketsPwd" @input="input_redPackets_pwd()"> -->
                  <input type="password" class="input_pwd_input" maxlength="6" ref="pwd" autocomplete="new-password" v-model="redPacketsPwd" @input="input_redPackets_pwd()">

                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>

                </div>

              </div>

          </div>
        </div>
        </div>
      </transition>
      <!-- 转账弹窗 -->
      <transition name="showbox">
        <div class="tencentBox redPacketsBox" v-show="showTransferAccount">
          <div class="tencent_title">
            <span class="head_title ml-20">转账</span>
            <span class="back mr-20" v-if="transferAccount_steps == 2" @click="back_transferAccount">返回</span>
          </div>
          <div class="redPacket_body">
            <div v-if="transferAccount_steps == 1">
              <div class="redPacketNumber_box">
                <span class="jine">金额</span>
                <span>
                  <input
                    class="redPacketNumber"
                    type="number"
                    v-model="TransferAccountNumber"
                    placeholder="0.00"
                    @input="limitAccount_input"
                    @keyup="inpnumup"
                    ref="transferInput_focus"
                  >
                  <span class="yuan">元</span>
                </span>
              </div>
              <!-- <textarea class="redPacketText" v-model="redPacketText" placeholder="恭喜发财！大吉大利！"></textarea> -->
              <!-- <div class="showMoney">
                <span class>￥：{{TransferAccountNumber ? TransferAccountNumber : '0.00'}}</span>
              </div> -->
              <div class="sendBtn">
                <div class="success-btn" @click="submit_transferAccount()">转账</div>
              </div>
          </div>
          <div v-if="transferAccount_steps == 2">
              <p class="red_title">转账金额</p>
              <div class="showMoney">
                <span class>￥：{{TransferAccountNumber ? TransferAccountNumber : '0.00'}}</span>
              </div>
              <div class="input_pwd_box">
                <div style="display: inline-flex;">
                  <input type="password" class="input_pwd_input" maxlength="6" ref="transPwd" autocomplete="new-password" v-model="TransferAccountPwd" @input="input_transferAccount_pwd()">
                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>
                  <span class="input_pwd_item"></span>
                </div>
              </div>
          </div>
        </div>
        </div>
      </transition>
      <!-- 公众号弹窗 -->
      <transition name="showbox">
        <div class="tencentBox" v-show="showTencent">
          <div class="tencent_title">
            <span class="head_title ml-20">公众号</span>
            <span class="head_input mr-20">
              <input type="text" placeholder="请输入关键词" v-model="searchTencentName">
            </span>
          </div>
          <div class="tencent_body">
            <ul style="height:310px;overflow:auto;">
              <li v-for="(item, index) in tencentListData" :key="index">
                <span style="margin-left:10px;">
                  <input type="radio" name="radio" :value="item" v-model="checkTencent">
                  <img class="tencent_img" :src="redirectUrl(item.paLogo)">
                  <span class="tencent_text">{{item.paName}}</span>
                </span>
              </li>
            </ul>
          </div>
          <div class="tencent_bottom">
            <el-button type="success" size="mini" @click="sendCheckTencent()">发送</el-button>
          </div>
        </div>
      </transition>

      <!-- 优惠券弹窗 -->
      <transition name="showbox">
        <div class="tencentBox" v-show="showCoupon">
          <div class="tencent_title">
            <span class="head_title ml-20">优惠券</span>
            <!-- <span class="head_input mr-20">
              <input type="text" placeholder="请输入关键词" v-model="searchCoupon">
            </span> -->
          </div>
          <div class="tencent_body">
            <ul style="height:310px;overflow:auto;">
              <li v-for="(item, index) in couponList" :key="index">
                <span style="margin-left:10px;">
                  <input type="radio" name="radio" :value="item" v-model="checkCoupon">
                  <!-- <img class="tencent_img" :src="redirectUrl(item.paLogo)"> -->
                  <span class="tencent_text">{{item.couponName}}</span>
                </span>
              </li>
            </ul>
          </div>
          <div class="tencent_bottom">
            <el-button type="success" size="mini" @click="sendCheckCoupon()">发送</el-button>
          </div>
        </div>
      </transition>

      <!-- 素材库弹窗 -->
      <transition name="showbox">
        <div class="tencentBox" v-show="showMaterialLibrary">
          <!-- 素材库列表 -->
          <div class="tencent_title">
            <span class="head_title ml-20">
              <el-tabs @tab-click="changematerialLibrary" v-model="materialLibraryActiveName">
                <el-tab-pane name="pictureLibrary" label="图片库"></el-tab-pane>
                <el-tab-pane name="videoLibrary" label="视频库"></el-tab-pane>
                <el-tab-pane name="linkUrlLibrary" label="链接库"></el-tab-pane>
                <el-tab-pane name="textLibrary" label="文本库"></el-tab-pane>
              </el-tabs>
            </span>
            <span v-if="steps != 0" @click="returnPrev()" class="cursor">返回</span>
          </div>

          <div class="material_box">
            <!-- 视频 -->
            <ul v-if="materialLibraryActiveName == 'videoLibrary'" class="paddBox">
              <li class="ul_list" v-for="(item, index) in materialVideoArr"
               @click="checkMaterialVideo_Detail(item)">
               <span v-if="item.folderName">
                 <i class="iconfont iconwenjianjia"></i>
                 <p>{{item.folderName}}</p>
               </span>
              <span  v-if="!item.folderName">
                <label ><input type="radio"  :value="item" v-model="material_video"/></label>
                <img :src="returnUrl(item.firstView)" class="img_item">
                <!-- <i class="iconfont iconshipin2"></i> -->
                <p>{{item.videoName}}</p>
              </span>
              </li>
              <span class="noresult" v-if="!materialVideoArr.length">暂无数据</span>
            </ul>

            <!-- 图片库 -->
            <ul v-if="materialLibraryActiveName == 'pictureLibrary'" class="paddBox">
              <li class="ul_list"
                v-for="(item, index) in materialPhotoArr"
                :key="index"
                @click="checkMateriaPhoto_Detail(item)"
                >
                <span v-if="item.folderName">
                  <i class="iconfont iconwenjianjia"></i>
                  <p>{{item.folderName}}</p>
                </span>
               <span  v-if="!item.folderName">
                 <label ><input type="radio"  :value="item" v-model="material_picture"/></label>
                 <img :src="returnUrl(item.smallPhotoLocation)" class="img_item">
                 <p>{{item.photoName}}</p>
               </span>
              </li>
              <span class="noresult" v-if="!materialPhotoArr.length ">暂无数据</span>
            </ul>

            <!-- 文本  -->
            <ul v-if="materialLibraryActiveName == 'textLibrary'">
              <li class="ul_list_item" v-for="(item, index) in materialTextArr" :key="index" :title="item.content">
                <label><input type="radio"  :value="item" v-model="material_text"/></label>
                <p >{{item.content}}</p>
              </li>
              <span class="noresult" v-if="!materialTextArr.length ">暂无数据</span>
            </ul>

            <!-- 链接  -->
            <ul v-if="materialLibraryActiveName == 'linkUrlLibrary'">
              <li class="ul_list_item" v-for="(item, index) in materialLinkUrl" :key="index">
                <label><input type="radio"  :value="item" v-model="material_linkUrl"/></label>
                <p><span class="linkTitle">{{item.title}}</span> <span class="linkUrl">{{item.url}}</span></p>
              </li>
              <span class="noresult" v-if="!materialLinkUrl.length ">暂无数据</span>
            </ul>
          </div>

          <div class="tencent_bottom">
            <el-button  size="mini" @click="showMaterialLibrary = false">取消</el-button>
            <el-button type="success" size="mini" @click="submitMaterial()">发送</el-button>
          </div>
        </div>
      </transition>
    </div>

    <div class="propBox" ref="propBox" v-if="showRemindBox">
      <ul>
        <li v-for="(item, index) in groupMembersList" :key="index" @click="handleRemind(item)" :title="item.memberName">
          <input type="checkbox" :value="item.userName" v-model="remindList"/>
          <img class="headImg" :src="item.headUrl">
          <p>{{item.memberName}}</p>
        </li>
      </ul>
    </div>
    <section class="textarea-con">
      <chat-input
        ref="text"
        v-model="content"
        @click="hideTransition"
        @enter="onEnter"
        @paste="onPaste"
        @input="onInput"
      ></chat-input>
    </section>

    <div class="send" @click="send('emoji')">
      <span>发送(ent)</span>
    </div>
    <transition name="appear">
      <div class="warn" v-show="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { guid } from '@/utils'
import { mapGetters, mapState } from 'vuex'
import domUtils from '@/utils/domUtils.js'
import { chatUtils } from '@/utils/chatUtils'
import ChatInput from './ChatInput.vue'
import Expression from './Expression.vue'
import { createUploadUrl } from '@/tools/resourceTool'
import emoticon from '../../utils/emoticon'
import qs from 'qs'

var clickEmjiEvent = null
var clickPreWordEvent = null
var clickActivityEvent = null

export default {
  components: {
    ChatInput,
    Expression
  },

  data () {
    return {
      urlParams:this.$route.params,
      flockMemberList:[],//群组下面的分群合集
      dataURL: '',
      content: '',
      frequency: 0,
      warn: false,
      changeActived: null, // 活动点击
      showEmoji: false, // 表情包弹窗
      showApplet: false, // 程序弹窗
      searchAppletName: '', // 程序搜索
      showSmallCard: false, // 名片
      showAddressList: false, // 通讯录名片
      searchAddressListName: '', // 搜索通讯录昵称
      checkAddressListData: '', // 选中的名片通讯录值
      VerbalTrickActiveName: 'common',
      showVerbalTrick: false, // 话术弹窗
      searchVerbalTrick_simple: '', // 搜索话术名称 列表结构
      VerbalTrickList_default: [], // 默认话术
      VerbalTrickList_common: [], // 公共话术
      checkVerbalTrick: '', // 话术值
      showTrusteeshipBox: '', // 弹窗
      redPackets_steps: 1,
      showRedPacket: false, // 红包弹窗
      redPacketNumber: '', // 红包金额
      redPacketText: '', // 红包吉言
      redPacketsPwd:'', //红包密码
      showTransferAccount: false, //转账弹窗
      TransferAccountNumber: '',//转账金额
      TransferAccountPwd:'',  //转账密码
      transferAccount_steps: 1,
      showMaterial: '', // 展示素材弹窗
      MaterialActiveName: 'first',
      searchMaterialName: '', // 搜索素材名称
      sendMaterialArr: [], // 点击素材列表数据
      checkCommonMaterialImg: '', // 显示公公素材图片
      checkPersonMaterialImg: '', // 显示个人素材图片
      showActivity: '', // 活动弹窗
      searchActivityName: '', // 搜索活动名称
      checkActivityImg: '', // 显示活动名片
      sendActivedArr: [], // 点击活动列表的数据
      showTencent: false, // 公众号弹窗
      checkTencent: '', // 公众号选中的值
      searchTencentName: '', // 公众号搜索
      appletList: [],   // 小程序数组
      tencentList: [],  //公众号数组
      addressList: [],  // 通讯录列表
      activityList: [], // 活动列表
      commonMaterialList: [],// 公共素材
      personMaterialList: [],// 个人素材
      showMap: false,
      mapSrc: '',
      loc: '',
      fileList: [],
      baseUrl: '',
      collapseCtiveName1: '0',
      collapseCtiveName2: '0',
      //
      showMaterialLibrary: false, //显示素材库弹窗
      materialLibraryActiveName: 'pictureLibrary',
      materialVideoArr: [],  //视频库
      materialPhotoArr: [], //图片库
      materialTextArr:[],  //文本库
      materialLinkUrl: [],//链接库列表

      material_text: {},
      material_video: {},
      material_picture: {},
      material_linkUrl: {},
      steps: 0,

      showCoupon: false,  //显示优惠券
      searchCoupon: '',
      couponList: [],
      checkCoupon: '',
      showRemindBox: false, //@弹出框
      remindList: [],     //提醒合集

    }
  },

  computed: {
    ...mapState(['selectId']),
    ...mapGetters(['sendMessage', 'emojis', 'currentPersonMember', 'userInfo', 'is_autoReply', 'groupMembersList']),

    //模糊搜索小程序
    appletListData: function() {
      var self = this;
      var appletListData = []
      if(!self.searchAppletName){
        return self.appletList
      }
      return self.appletList.filter(function(item) {
         return item.spName.toLowerCase().indexOf(self.searchAppletName.toLowerCase()) !== -1;
      })
    },
    // 模糊搜索通讯录
    addressListData () {
      var self = this
      var addressListData = []
      if(!self.searchAddressListName){
        return self.addressList
      }
      return self.addressList.filter(function (item) {
        return (
          item.memberName
            .toLowerCase()
            .indexOf(self.searchAddressListName.toLowerCase()) !== -1
        )
      })
    },
    // 迷糊搜索公共素材
    // commonMaterialListData: function () {
    //   var self = this
    //   var commonMaterialListData = []
    //   if(!self.searchMaterialName){
    //     return self.commonMaterialList
    //   }
    //   return self.commonMaterialList.filter(function (item) {
    //     return (
    //       item.materialTypeName
    //         .toLowerCase()
    //         .indexOf(self.searchMaterialName.toLowerCase()) !== -1
    //     )
    //   })
    // },
    // 模糊搜索个人素材
    // personMaterialListData: function () {
    //   var self = this
    //   var personMaterialListData = []
    //   if(!self.searchMaterialName){
    //     return self.personMaterialList
    //   }
    //   return self.personMaterialList.filter(function (item) {
    //     return (
    //       item.materialTypeName
    //         .toLowerCase()
    //         .indexOf(self.searchMaterialName.toLowerCase()) !== -1
    //     )
    //   })
    // },

    // 模糊搜索活动
    activityListData: function () {
      var self = this
      var activityListData = []
      if(!self.searchActivityName){
        return self.activityList
      }
      return self.activityList.filter(function (item) {
        return (
          item.title
            .toLowerCase()
            .indexOf(self.searchActivityName.toLowerCase()) !== -1
        )
      })
    },

    // 模糊搜索公众号
    tencentListData: function () {
      var self = this
      var tencentListData = []
      if(!self.searchTencentName){
        return self.tencentList
      }
      var _searchTencentName = self.searchTencentName.toLowerCase()
      return self.tencentList.filter(function (item) {
        return (
          item.paName.indexOf(_searchTencentName) !== -1
        )
      })
    },

  },

  created () {
    this.baseUrl = this.userInfo.uploadUrl
  },

  mounted () {
    this.getAutoReplyStatus()
    this.getGroupMemberList()
    this.$refs.text.focus() // 在进入的时候 聚焦输入框
    var self = this

    // 绑定事件
    domUtils.addEvent(
      document,
      'mouseup',
      (clickEmjiEvent = e => {
        if (!domUtils.isContains(self.$el, e.target)) {
          // 隐藏搜索结果！
          self.showEmoji = false
        }
      })
    )

    // 绑定事件
    domUtils.addEvent(
      document,
      'mouseup',
      (clickPreWordEvent = e => {
        if (!domUtils.isContains(self.$el, e.target)) {
          // 隐藏搜索结果！
          self.showVerbalTrick = false
        }
      })
    )

    domUtils.addEvent(
      document,
      'mouseup',
      (clickActivityEvent = e => {
        if (!domUtils.isContains(self.$el, e.target)) {
          // 隐藏搜索结果！
          self.showActivity = false
        }
      })
    )
  },

  watch: {
    $route(){
      this.urlParams = this.$route.params
      // this.getAutoReplyStatus()
    },

    // 在选择其它对话的时候 聚焦输入框
    selectId () {
      setTimeout(() => {
        this.$refs.text.focus()
      }, 0)
    },

  },

  methods: {
    chooseEmoji () {
      this.showEmoji = !this.showEmoji
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showRedPacket = false // 关闭红包框
      this.showTransferAccount = false  // 关闭转账
      this.showApplet = false // 关闭小程序窗口
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showMaterial = false // 关闭素材
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.showCoupon = false   //关闭优惠券
    },
    // 地图
    chooseMap () {
      window.removeEventListener("message", this.sendMapFunc,false);
      let that = this
      that.showMap = true
      that.mapSrc =
        'http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=LDRBZ-J2ARV-AN5PY-UZKPL-EDT7V-OAFLY&referer=myKey'
      // that.getMyLocation()
      window.addEventListener('message',that.sendMapFunc,false)
    },
    //
    sendMapFunc (event) {
      let that = this
      that.loc = event.data // 接收位置信息
      if (that.loc && that.loc.module === 'locationPicker') {
        // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        if (that.loc) {
          that.showMap = false
          //console.log(that.loc)
          let params = {
            label: that.loc.poiaddress,
            lng:  that.loc.latlng.lng,
            lat: that.loc.latlng.lat,
            scale: 13,
            poiname: that.loc.poiname
          }
          let jsonParams = JSON.stringify(params)
          //发消息
          let isGroupChat = that.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
          let isPmCode = that.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
          let chatInfo = that.currentPersonMember

          if (isGroupChat) {
              //群聊
            if(!isPmCode){
              that.sendChatMessage(48, chatInfo.noWx, that.urlParams.roomCode, jsonParams)
            }else{
              //群组聊天
              that.flockMemberList.forEach( (item)=>{
                that.sendChatMessage(48, item.chatRoomName, item.code, jsonParams)
              })
            }
          } else {
            //单聊
            that.sendChatMessage(48, chatInfo.noWx, chatInfo.memberNo, jsonParams)
          }

        }
      }
    },


    sendEmoji (val, type) {
      let code, tmp
      if (type === 'emoji') {
        tmp = `<${val}>`
        code = emoticon.getCodeByText(tmp)
        if (!code) {
          val = `[${val}]`
        } else {
          code = `0x${code}`
          val = String.fromCodePoint(code)
        }
      }
      this.content += val
      //this.showEmoji = false
      this.$refs.text.focus()
    },
    // 按回车发送信息
    onKeyup (e) {
      if (e.keyCode === 13 && !e.ctrlKey) {
        this.send('emoji')
      }
    },

    onEnter () {
      this.send('emoji')
    },
    onPaste (event) {
      var fileObj = {}
      if (event.clipboardData || event.originalEvent) {
        // not for ie11  某些chrome版本使用的是event.originalEvent
        var clipboardData =
          event.clipboardData || event.originalEvent.clipboardData
        if (clipboardData.items) {
          // for chrome
          let items = clipboardData.items
          let len = items.length
          let blob = null

          // 在items里找粘贴的image,据上面分析,需要循环
          for (var i = 0; i < len; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              // getAsFile() 此方法只是living standard firefox ie11 并不支持
              blob = items[i].getAsFile()
              fileObj.file = blob
              // 阻止默认行为即不让剪贴板内容在div中显示出来
              event.preventDefault()
              // uploadImgFromPaste(blob, 'paste', isChrome);
              this.uploadImage(fileObj)
            }
          }
        } else {
          // for firefox
          setTimeout(function () {
            // 设置setTimeout的原因是为了保证图片先插入到div里，然后去获取值
            let imgList = document.querySelectorAll('#aaa img')
            let len = imgList.length
            let srcStr = ''
            let i
            for (i = 0; i < len; i++) {
              if (imgList[i].className !== 'my_img') {
                // 如果是截图那么src_str就是base64 如果是复制的其他网页图片那么src_str就是此图片在别人服务器的地址
                srcStr = imgList[i].src
                break
              }
            }
            // uploadImgFromPaste(src_str, 'paste', isChrome);
            if (srcStr) {
              // 阻止默认行为即不让剪贴板内容在div中显示出来
              event.preventDefault()
              fileObj.file = srcStr
              this.uploadImage(fileObj)
            }
          }, 1)
        }
      } else {
        // for ie11
        setTimeout(function () {
          let imgList = document.querySelectorAll('#aaa img')
          let len = imgList.length
          let srcStr = ''
          let i
          for (i = 0; i < len; i++) {
            if (imgList[i].className !== 'my_img') {
              srcStr = imgList[i].src
              break
            }
          }
          // uploadImgFromPaste(src_str, 'paste', isChrome);
          if (srcStr) {
            // 阻止默认行为即不让剪贴板内容在div中显示出来
            event.preventDefault()
            fileObj.file = srcStr
            this.uploadImage(fileObj)
          }
        }, 1)
      }
    },

    //监听输入@群成员
    onInput (e) {
      let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
      if (e.data == "@" && isGroupChat) {
          this.showRemindBox = true
      }

    },

    //点击需要@的成员
    handleRemind (item) {
      this.showRemindBox = false
      this.content += item.memberName
      this.remindList = this.remindList.concat(item)
    },


    // 点击发送按钮发送信息
    send (sendType) {
      if (!this.content || this.content.trim().length === 0) {
        this.warn = true
        setTimeout(() => {
          this.warn = false
        }, 1000)

        return
      }
      this.content = emoticon.formatSendContent(this.content)

      let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
      let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
      let chatInfo = this.currentPersonMember

      if (isGroupChat) {
          //群聊
        if(!isPmCode){
          this.sendChatMessage(1, chatInfo.noWx, this.urlParams.roomCode, this.content)
        }else{
          //群组聊天
          this.flockMemberList.forEach( (item)=>{
            this.sendChatMessage(1, item.chatRoomName, item.code, this.content)
          })
        }
      } else {
        //单聊
        this.sendChatMessage(1, chatInfo.noWx, chatInfo.memberNo, this.content)
      }



      this.content = ''
    },
    // 显示名片
    chooseCard () {
      this.showSmallCard = !this.showSmallCard
      this.showApplet = false // 关闭小程序
      this.showEmoji = false // 关闭表情框
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showRedPacket = false // 关闭红包框
      this.showTransferAccount = false  // 关闭转账
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showMaterial = false // 关闭素材
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.showCoupon = false   //关闭优惠券
    },
    // 示通讯录列表
    checkAddressList () {
      this.showSmallCard = false
      this.showAddressList = true
      let flag = this.$cfg.userInfo.adminUserId
      // 获取通讯录名片列表
      this.$http.post('/api/im/contacts/findFriends.do',{
        adminUserId: flag,
        merchantNo: this.$cfg.userInfo.memberNoMerchant,
        noWxGm: this.$cfg.nowSelectInfo.noWx,
        version: '1',
        start: '',
        sortBy: '',
        limit: 9999999
      }).then(res=>{
        // console.log(res)
        if(res.data.result && res.data.returnObject.rows){
          this.addressList = res.data.returnObject.rows
        }
      })

    },
    // 发送通讯录名片
    sendAddressList () {
      if (!this.checkAddressListData) {
        this.$message({
          type: 'error',
          message: '请先选择要发送的名片'
        })
      } else {
        // console.log(this.checkAddressListData)

        let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        let chatInfo = this.currentPersonMember

        if (isGroupChat) {
            //群聊
          if(!isPmCode){
            this.sendChatMessage(42, chatInfo.noWx, this.urlParams.roomCode, this.checkAddressListData, 0)
          }else{
            //群组聊天
            this.flockMemberList.forEach( (item)=>{
              this.sendChatMessage(42, item.chatRoomName, item.code, this.checkAddressListData, 0)
            })
          }
        } else {
          //单聊
          this.sendChatMessage(42, chatInfo.noWx, chatInfo.memberNo, this.checkAddressListData, 0)
        }
        this.showSmallCard = false
        this.showAddressList = false
      }
    },
    // 显示话术
    chooseVerbalTrick () {
      this.showVerbalTrick = !this.showVerbalTrick
      this.showApplet = false // 关闭小程序
      this.showEmoji = false // 关闭表情框
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showRedPacket = false // 关闭红包框
      this.showTransferAccount = false  // 关闭转账
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showMaterial = false // 关闭素材
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.VerbalTrickActiveName = 'default'
      this.VerbalTrick_default()
      this.showCoupon = false   //关闭优惠券
    },

    // 发送话术
    sendVerbalStrick () {
      // console.log(this.checkVerbalTrick)
      if(this.checkVerbalTrick){
        let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        let chatInfo = this.currentPersonMember

        if (isGroupChat) {
            //群聊
          if(!isPmCode){
            this.sendChatMessage(1, chatInfo.noWx, this.urlParams.roomCode, this.checkVerbalTrick.content) // 话术及文本消息
          }else{
            //群组聊天
            this.flockMemberList.forEach( (item)=>{
              this.sendChatMessage(1, item.chatRoomName, item.code, this.checkVerbalTrick.content) // 文本消息
            })
          }
        } else {
          //单聊
          this.sendChatMessage(1, chatInfo.noWx, chatInfo.memberNo, this.checkVerbalTrick.content)
        }
        this.showVerbalTrick = false
      } else {
        this.$message.error('请先选择话术')
      }

    },

    //切换话术
    changeVerbal (tab, event) {
      this.VerbalTrickList_default = []
      this.VerbalTrickList_common = []

      if(this.VerbalTrickActiveName == 'default'){
        this.VerbalTrick_default()
      } else if(this.VerbalTrickActiveName == 'common') {
        //公共
        this.VerbalTrick_com_per(1)
      } else {
        //个人
        this.VerbalTrick_com_per(2)
      }
    },


    // 显示小程序弹窗
    chooseApplet () {
      this.showApplet = !this.showApplet
      this.getAppletList()

      this.showEmoji = false // 关闭表情框
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showRedPacket = false // 关闭红包框
      this.showTransferAccount = false  // 关闭转账
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showMaterial = false // 关闭素材
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.showCoupon = false   //关闭优惠券
    },
    // 发送小程序
    sendApplet (list) {
      let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
      let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
      let chatInfo = this.currentPersonMember

      if (isGroupChat) {
          //群聊
        if(!isPmCode){
          this.sendChatMessage(494, chatInfo.noWx, this.urlParams.roomCode, list)
          //群组聊天
          this.flockMemberList.forEach( (item)=>{
            this.sendChatMessage(494, item.chatRoomName, item.code, list)
          })
        }
      } else {
        //单聊
        this.sendChatMessage(494, chatInfo.noWx, chatInfo.memberNo, list)
      }

      this.showApplet = false
    },
    // 显示素材
    chooseMaterial () {
      this.showMaterial = !this.showMaterial
      this.showApplet = false // 关闭小程序
      this.showEmoji = false // 关闭表情框
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showRedPacket = false // 关闭红包框
      this.showTransferAccount = false  // 关闭转账
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.get_emoji_material_card_activity('MATERIAL')
      this.showCoupon = false   //关闭优惠券
    },
    // 换素材
    handleClick (tab, event) {
      // tab 清空显示
      this.checkPersonMaterialImg = ''
      this.checkCommonMaterialImg = ''
      this.searchMaterialName = '' // 清空搜索条件
    },
    // 查看素材
    checkMaterialDetail (item, index) {
      if (this.MaterialActiveName === 'first') {
        // 公共素材
        this.checkCommonMaterialImg = createUploadUrl(item.imgAddr,this.userInfo.uploadUrl)
      } else {
        // 个人素材
        this.checkPersonMaterialImg = createUploadUrl(item.imgAddr,this.userInfo.uploadUrl)
      }

      this.sendMaterialArr = item // 点击的当前列表的数据
    },
    // 发送素材
    sendMaterial () {
      // let nowT = new Date().getTime()
      // let startT = new Date(this.sendMaterialArr.startTime).getTime()
      // let endT = new Date(this.sendMaterialArr.endTime).getTime()
      //
      // if (nowT < startT || nowT > endT) {
      //   this.$message.error('该素材不在有效期内')
      //   return false
      // }

      let arr = Object.keys(this.sendMaterialArr)
      if(arr.length == 0){
          this.$message.error('请先选择素材')
          return
      }

      let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
      let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
      let chatInfo = this.currentPersonMember

      if (isGroupChat) {
          //群聊
        if(!isPmCode){
          this.sendChatMessage(490, chatInfo.noWx, this.urlParams.roomCode)
        }else{
          //群组聊天
          this.flockMemberList.forEach( (item)=>{
            this.sendChatMessage(490, item.chatRoomName, item.code)
          })
        }
      } else {
        //单聊
        this.sendChatMessage(490, chatInfo.noWx, chatInfo.memberNo)
      }
      this.showMaterial = false
      this.sendMaterialArr = []





    },
    // 显示活动
    chooseActivity () {
      this.showActivity = !this.showActivity
      this.showApplet = false
      this.showEmoji = false // 关闭表情框
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showRedPacket = false // 关闭红包框
      this.showTransferAccount = false  // 关闭转账
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showMaterial = false // 关闭素材
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.get_emoji_material_card_activity('ACTIVITY')
      this.showCoupon = false   //关闭优惠券
    },

    // 看活动
    checkActivityDetail (item, index) {
      this.changeActived = index
      this.sendActivedArr = item // 点击的当前列表的数据
      this.checkActivityImg = createUploadUrl(
        item.showImgAddr,
        this.userInfo.uploadUrl
      )
    },

    // 发送活动
    sendActivity () {
      let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
      let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
      let chatInfo = this.currentPersonMember

      if (isGroupChat) {
          //群聊
        if(!isPmCode){
          this.sendChatMessage(492, chatInfo.noWx, this.urlParams.roomCode)
        }else{
          //群组聊天
          this.flockMemberList.forEach( (item)=>{
            this.sendChatMessage(492, item.chatRoomName, item.code)
          })
        }
      } else {
        //单聊
        this.sendChatMessage(492, chatInfo.noWx, chatInfo.memberNo)
      }

      this.showActivity = false
    },

    // 显示红包
    chooseRedPacket () {
      this.showRedPacket = !this.showRedPacket
      this.redPackets_steps = 1
      this.redPacketNumber = '' //红包金额
      this.redPacketsPwd = ''   //红包密码
      this.redPacketText = ''   //红包吉言
      this.showEmoji = false // 关闭表情框
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showTransferAccount = false  // 关闭转账
      this.showApplet = false // 关闭小程序窗口
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showMaterial = false // 关闭素材
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.showCoupon = false   //关闭优惠券
    },
    // 发红包
    sendMoney () {
      if (!this.redPacketNumber) {
        this.$message({
          type: 'error',
          message: '请输入红包金额'
        })
      } else if (this.redPacketNumber > 200) {
        this.$message.error('红包金额不能超过200元')
        this.$refs.redpackInput_focus.focus()
      }
      else {
        if (!this.redPacketText) {
          this.redPacketText = '恭喜发财！大吉大利！'
        }
        this.redPackets_steps = 2
        this.redPacketsPwd = ''
        // console.log(this.redPacketsPwd.length)
      }

    },

    //确定输入红包密码
    input_redPackets_pwd () {
      if(this.redPacketsPwd.length != 6){
        return
      }

      if(this.redPacketsPwd.length === 6){
        this.$refs.pwd.blur()
         //console.log(this.redPacketNumber)

        let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        let chatInfo = this.currentPersonMember

        if (isGroupChat) {
            //群聊
          if(!isPmCode){
            this.sendChatMessage(436207665, chatInfo.noWx, this.urlParams.roomCode, this.redPacketText, this.redPacketNumber)
          }else{
            //群组聊天
            this.flockMemberList.forEach( (item)=>{
              this.sendChatMessage(436207665, item.chatRoomName, item.code, this.redPacketText,  this.redPacketNumber)
            })
          }
        } else {
          //单聊
          this.sendChatMessage(436207665, chatInfo.noWx, chatInfo.memberNo, this.redPacketText,  this.redPacketNumber)
        }

        this.showRedPacket = false
        this.redPackets_steps = 1
        this.redPacketNumber = ''
        this.redPacketText = ''
        this.redPacketsPwd = ''
      }
    },

    //
    back_sendMoney(){
      this.redPackets_steps = 1
      this.redPacketsPwd = ''
      //this.redPacketText = ''
    },

    // 监听红包输入的值
    limitMoney_input () {
      var regStrs = [
        ['[^\\d\\.]+$', ''], // 禁止录入任何非数字和点
        ['\\.(\\d?)\\.+', '.$1'], // 禁止录入两个以上的点
        ['^(\\d+\\.\\d{2}).+', '$1'] // 禁止录入小数点后两位以上
      ]
      for (var i = 0; i < regStrs.length; i++) {
        var reg = new RegExp(regStrs[i][0])
        this.redPacketNumber = this.redPacketNumber.replace(reg, regStrs[i][1])
      }
    },
    inpnumup (e) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/^\./g, '') // 验证第一个字符是数字而不是
      e.target.value = e.target.value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
    },

    //显示转账
    chooseTransferAccount(){
      this.showTransferAccount = !this.showTransferAccount
      this.transferAccount_steps = 1
      this.TransferAccountNumber = ''
      this.TransferAccountPwd = ''
      this.showRedPacket = false
      this.showEmoji = false // 关闭表情框
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showRedPacket = false
      this.showApplet = false // 关闭小程序窗口
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showMaterial = false // 关闭素材
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.showCoupon = false   //关闭优惠券
    },

    back_transferAccount(){
      this.transferAccount_steps = 1
      this.TransferAccountPwd = ''
      //this.redPacketText = ''
    },

    // 监听红包输入的值
    limitAccount_input () {
      var regStrs = [
        ['[^\\d\\.]+$', ''], // 禁止录入任何非数字和点
        ['\\.(\\d?)\\.+', '.$1'], // 禁止录入两个以上的点
        ['^(\\d+\\.\\d{2}).+', '$1'] // 禁止录入小数点后两位以上
      ]
      for (var i = 0; i < regStrs.length; i++) {
        var reg = new RegExp(regStrs[i][0])
        this.TransferAccountNumber = this.TransferAccountNumber.replace(reg, regStrs[i][1])
      }
    },

    // 转账
    submit_transferAccount () {
      if (!this.TransferAccountNumber) {
        this.$message({
          type: 'error',
          message: '请输入转账金额'
        })
      } else if (this.TransferAccountNumber > 10000) {
        this.$message.error('转账金额不能超过10000元')
        this.$refs.transferInput_focus.focus()
      } else {
        this.transferAccount_steps = 2
      }
    },

    //确定输入转账密码
    input_transferAccount_pwd () {
      if(this.TransferAccountPwd.length === 6){
        this.$refs.transPwd.blur()
         //console.log(this.TransferAccountPwd)

        let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        let chatInfo = this.currentPersonMember

        if (isGroupChat) {
            //群聊
          if(!isPmCode){
            this.sendChatMessage(419430449, chatInfo.noWx, this.urlParams.roomCode, '恭喜发财,大吉大利', this.TransferAccountNumber )
          }else{
            //群组聊天
            this.flockMemberList.forEach( (item)=>{
              this.sendChatMessage(419430449, item.chatRoomName, item.code, '恭喜发财,大吉大利',  this.TransferAccountNumber)
            })
          }
        } else {
          //单聊
          this.sendChatMessage(419430449, chatInfo.noWx, chatInfo.memberNo, '恭喜发财,大吉大利',  this.TransferAccountNumber )
        }

        this.showTransferAccount = false
        this.transferAccount_steps = 1
        this.TransferAccountNumber = ''
        this.TransferAccountPwd = ''
      }
    },


    // 显示公众号
    chooseTencent () {
      if (this.showTencent) {
        this.checkTencent = [] // 清空选择
      }
      this.getTencentList()

      this.showTencent = !this.showTencent
      this.showEmoji = false // 关闭表情框
      this.showRedPacket = false // 关闭红包框
      this.showTransferAccount = false  // 关闭转账
      this.showApplet = false // 关闭小程序窗口
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showMaterial = false // 关闭素材
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.showCoupon = false   //关闭优惠券
    },
    // 发送公众号
    sendCheckTencent () {
      if (!this.checkTencent) {
        this.$message.error('请先选择公众号')
      } else {
        //console.log(this.checkTencent) // 选中的公众号信息
        let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        let chatInfo = this.currentPersonMember
        if (isGroupChat) {
            //群聊
          if(!isPmCode){
            this.sendChatMessage(42, chatInfo.noWx, this.urlParams.roomCode, this.checkTencent, 1)
          }else{
            //群组聊天
            this.flockMemberList.forEach( (item)=>{
              this.sendChatMessage(42, item.chatRoomName, item.code, this.checkTencent, 1)
            })
          }
        } else {
          //单聊
          this.sendChatMessage(42, chatInfo.noWx, chatInfo.memberNo, this.checkTencent, 1)
        }
        this.showTencent = false
      }
    },
    // 托管
    chooseTrusteeship () {
      let userInfo = this.$cfg.userInfo

      this.$http.post('/api/imh5/ai/merchantPreProblem/insertGmAutoStatus.do',{
        merchantNo: userInfo.memberNoMerchant,
        memberNoGm: userInfo.memberNoGuid,
        memberNameGm: userInfo.memberNameGuid
      }).then(res=>{
        if(res.data.result){
          this.$message.success('托管成功')
          this.$store.dispatch('is_autoReply', true)
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })


    },
    // 取消托管
    cancleTrusteeship () {
      let userInfo = this.$cfg.userInfo

      this.$http.post('/api/imh5/ai/merchantPreProblem/deleteAutoReply.do',{
        memberNoGm: userInfo.memberNoGuid,
      }).then(res=>{
        if(res.data.result){
          this.$message.success('已取消托管')
          this.$store.dispatch('is_autoReply', false)
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    //显示素材库
    chooseMaterialLibrary () {
      this.steps = 0
      this.emptyCheckedMaterial()
      this.materialLibraryActiveName = 'pictureLibrary'
      this.materialPhotoList()
      this.showMaterialLibrary = !this.showMaterialLibrary
      this.showEmoji = false // 关闭表情框
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showRedPacket = false // 关闭红包框
      this.redPacketText = ''
      this.showTransferAccount = false  // 关闭转账
      this.showApplet = false // 关闭小程序窗口
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showMaterial = false // 关闭素材
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showCoupon = false   //关闭优惠券
    },

    //切换素材库
    changematerialLibrary (tab, event) {
      this.emptyCheckedMaterial()
      if (this.materialLibraryActiveName == 'pictureLibrary') {
          this.materialPhotoList()

      } else if(this.materialLibraryActiveName == 'videoLibrary'){
          this.materialVideoList()

      } else if(this.materialLibraryActiveName == 'linkUrlLibrary'){
          this.materialLinkList()

      } else {
          this.materialTextList()

      }
    },


      //查看视频子级
      checkMaterialVideo_Detail (item) {
        if(item.folderName){
          //获取二级素材详情
          this.steps = 1
          this.materialVideoList(item.code)
        } else {
          this.material_video = item
        }
      },

      //查看图片子级
      checkMateriaPhoto_Detail (item) {

        if(item.folderName){
          //获取二级素材详情
          this.steps = 1
          this.materialPhotoList(item.code)
        } else {
           this.material_picture = item
        }
        // console.log(this.material_picture)
      },

      //返回上一层
      returnPrev () {
        if(this.materialLibraryActiveName == 'videoLibrary') {
          this.materialVideoList()
        } else if(this.materialLibraryActiveName == 'pictureLibrary') {
          this.materialPhotoList()
        }
        this.steps = 0
      },

      //确认发送素材
      submitMaterial () {
        let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        let chatInfo = this.currentPersonMember

        if(this.materialLibraryActiveName == 'videoLibrary'){

          let videoUrl = createUploadUrl(this.material_video.videoLocation, this.baseUrl)
          if (isGroupChat) {
              //群聊
            if(!isPmCode){
              this.sendChatMessage(43, chatInfo.noWx, this.urlParams.roomCode,videoUrl , this.material_video.videoName)
            }else{
              //群组聊天
              this.flockMemberList.forEach( (item)=>{
                this.sendChatMessage(43, item.chatRoomName, item.code,videoUrl , this.material_video.videoName)
              })
            }
          } else {
            //单聊
            this.sendChatMessage(43, chatInfo.noWx, chatInfo.memberNo,videoUrl , this.material_video.videoName)
          }

        } else if(this.materialLibraryActiveName == 'pictureLibrary') {
          let url = createUploadUrl(this.material_picture.photoLocation, this.baseUrl)

          //发送图片
          if (isGroupChat) {
              //群聊
            if(!isPmCode){
              this.sendChatMessage(3, chatInfo.noWx, this.urlParams.roomCode,url)
            }else{
              //群组聊天
              this.flockMemberList.forEach( (item)=>{
                this.sendChatMessage(3, item.chatRoomName, item.code,url)
              })
            }
          } else {
            //单聊
            this.sendChatMessage(3, chatInfo.noWx, chatInfo.memberNo,url)
          }

        } else if(this.materialLibraryActiveName == 'linkUrlLibrary'){

          //当活动类型发送
          this.sendActivedArr = {
            title: this.material_linkUrl.title,
            linkUrl: this.material_linkUrl.url,
            startDate: this.material_linkUrl.title,
            showImgAddr: createUploadUrl(
                this.material_linkUrl.photo,
                 this.baseUrl
              )
          }

          if (isGroupChat) {
              //群聊
            if(!isPmCode){
              this.sendChatMessage(492, chatInfo.noWx, this.urlParams.roomCode)
            }else{
              //群组聊天
              this.flockMemberList.forEach( (item)=>{
                this.sendChatMessage(492, item.chatRoomName, item.code)
              })
            }
          } else {
            //单聊
            this.sendChatMessage(492, chatInfo.noWx, chatInfo.memberNo)
          }

        } else {

          if (isGroupChat) {
              //群聊
            if(!isPmCode){
              this.sendChatMessage(1, chatInfo.noWx, this.urlParams.roomCode, this.material_text.content)
            }else{
              //群组聊天
              this.flockMemberList.forEach( (item)=>{
                this.sendChatMessage(1, item.chatRoomName, item.code, this.material_text.content)
              })
            }
          } else {
            //单聊
            this.sendChatMessage(1, chatInfo.noWx, chatInfo.memberNo, this.material_text.content)
          }

        }
        this.showMaterialLibrary = false
      },

      emptyCheckedMaterial () {
        this.material_video = {}
        this.material_picture = {}
        this.material_linkUrl = {}
        this.material_text = {}
      },

      //显示优惠券
      chooseCoupon () {
        this.getCouponList()
        this.showCoupon = !this.showCoupon
        this.showMaterialLibrary = false
        this.showEmoji = false // 关闭表情框
        this.showTencent = false // 关闭公众号弹窗
        this.checkTencent = [] // 清空公众号选项
        this.showRedPacket = false // 关闭红包框
        this.redPacketText = ''
        this.showTransferAccount = false  // 关闭转账
        this.showApplet = false // 关闭小程序窗口
        this.showSmallCard = false // 关闭小名片
        this.showAddressList = false // 关闭名片通讯录列表
        this.showVerbalTrick = false // 关闭话术弹窗
        this.showMaterial = false // 关闭素材
        this.showActivity = false // 关闭活动弹窗
        this.showMap = false // 关闭地图弹窗
      },

      // 发送优惠券
      sendCheckCoupon () {

        // if (!this.checkCoupon) {
        //   this.$message.error('请先选择优惠券')
        // } else {
        //   //console.log(this.checkCoupon) // 选中的优惠券信息
        //   let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        //   let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        //   let chatInfo = this.currentPersonMember
        //   if (isGroupChat) {
        //       //群聊
        //     if(!isPmCode){
        //       this.sendChatMessage(491 , chatInfo.noWx, this.urlParams.roomCode, this.checkCoupon, 1)
        //     }else{
        //       //群组聊天
        //       this.flockMemberList.forEach( (item)=>{
        //         this.sendChatMessage(491 , item.chatRoomName, item.code, this.checkCoupon, 1)
        //       })
        //     }
        //   } else {
        //     //单聊
        //     this.sendChatMessage(491 , chatInfo.noWx, chatInfo.memberNo, this.checkCoupon, 1)
        //   }
        //   this.showCoupon = false
        // }
      },

    hideTransition () {
      this.showEmoji = false // 关闭表情框
      this.showTencent = false // 关闭公众号弹窗
      this.checkTencent = [] // 清空公众号选项
      this.showRedPacket = false // 关闭红包框
      this.redPacketText = ''
      this.showTransferAccount = false  // 关闭转账
      this.showApplet = false // 关闭小程序窗口
      this.showSmallCard = false // 关闭小名片
      this.showAddressList = false // 关闭名片通讯录列表
      this.showVerbalTrick = false // 关闭话术弹窗
      this.showMaterial = false // 关闭素材
      this.showActivity = false // 关闭活动弹窗
      this.showMap = false // 关闭地图弹窗
      this.showMaterialLibrary = false // 关闭素材库弹窗
      this.showCoupon = false   //关闭优惠券
      this.showRemindBox = false  //关闭 @弹窗
    },
    beforeAvatarUpload (file) {
      let fileName = new Array(0)
      fileName = file.name.split('.')
      const videoType = ['mp4']
      const isVideo = videoType.indexOf(fileName[fileName.length - 1])
      const isLt2M = file.size / 1024 / 1024 < 10
      if (isVideo === -1) {
        this.$message({
          message: '暂时只支持 mp4 格式!',
          type: 'error'
        })
        return false
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10M',
          type: 'error'
        })
        return false
      }
    },

    // 获取 聊天表情/优惠券/活动/个人名片/素材/VR素材
    get_emoji_material_card_activity (type) {
      let chatInfo = this.currentPersonMember
      let params =
        'memberNo=' +
        chatInfo.memberNo +
        '&memberNoGm=' +
        chatInfo.memberNoGm +
        '&merchantNo=' +
        chatInfo.merchantNo +
        '&shopNo=' +
        chatInfo.shopNo +
        '&type=' +
        type +
        '&limit=1000'

        if(type == 'MATERIAL') {
          params = params + '&requestFrom=1'
        }

      this.$http
        .post('/api/imh5/index/expressionPackage.do?' + params)
        .then(res => {
          if (type === 'ACTIVITY') {
            this.activityList = res.data.returnObject

          }
          if (type === 'MATERIAL') {
            // 素材
            this.commonMaterialList = res.data.returnObject.materialCommenGroup
            this.personMaterialList = res.data.returnObject.materialGroup

          }
          if (type === 'GUID_CARD') {
            // 名片
            console.log('GUID_CARD')
          }
        })
    },

    // 发送聊天内容
    sendChatMessage (type, chatCode, code, content, name) {
      // console.log(code)
    //  console.log(this.$route.params)
      var groupChat = this.$route.params
      var chatInfo = this.currentPersonMember

      var msgId = guid() // 随机生成消息id

      let isGroupChat = groupChat.hasOwnProperty('roomCode')//是否是群聊或群组

      let message = {
        noWx: chatCode,
        memberNo: code,
        msgId,
        memberHeadUrl: this.$cfg.nowSelectInfo.headAddress
      }

      if (isGroupChat) {
        //群聊
        message.chatroomType = 2
      } else {
        //单聊
        message.chatroomType = 1
        message.memberNoGm = chatInfo.memberNoGm
      }

      message.type = type

      if (type === 1) {
        if(this.remindList.length > 0) {
          let userNames = []
          this.remindList.forEach( e =>{
            userNames.push(e.userName)
          })
          Object.assign(message, {
            type: 1,
            content,
            remind: userNames.join(',')
          })
        } else {
          Object.assign(message, {
            type: 1,
            content,
          })
        }

      } else if (type === 492) {
        // 活动
        Object.assign(message, {
          type: 492,
          shareTitle: this.sendActivedArr.title,
          shareUrl: this.sendActivedArr.linkUrl,
          resources: createUploadUrl(
            this.sendActivedArr.showImgAddr,
            this.userInfo.uploadUrl
          ),
          shareDes: this.sendActivedArr.startDate
        })
      } else if (type === 490) {
        // 素材
        Object.assign(message, {
          type: 490,
          shareTitle: this.sendMaterialArr.title,
          shareUrl: this.sendMaterialArr.linkUrl,
          resources: createUploadUrl(
            this.sendMaterialArr.imgAddr,
            this.userInfo.uploadUrl
          ),
          shareDes: this.sendMaterialArr.brief
        })
      } else if (type === 3) {
        // 文件
        Object.assign(message, {
          type: 3,
          resources: content
        })
      } else if (type === 495) {
        Object.assign(message, {
          type: 495,
          shareTitle: name,
          resources: content
        })
      } else if (type === 43) {
        Object.assign(message, {
          type: 43,
          shareTitle: name,
          resources: content
        })
      } else if (type === 48) {
        //位置 地图
        Object.assign(message, {
          type: 48,
          content: content
        })
      } else if (type === 494) {
        //小程序
        Object.assign(message, {
          type: 494,
          code: content.code,
          //后台不需要下面参数  加上只是 方便前端插入消息显示
          shareTitle: content.spName,
          resources: content.spLogo
        })
      } else if (type === 42) {
        if(name === 0){// 通讯录名片
          Object.assign(message, {
            type: 42,
            code: content.codePm,
            flag: name,
            //后台不需要下面参数  加上只是 方便前端插入消息显示
            shareTitle: content.nickNameWx || content.memberName,
            resources: content.headAddress
          })
        }
        if(name === 1){//公众号
          Object.assign(message, {
            type: 42,
            code: content.code,
            flag: name,
            //后台不需要下面参数  加上只是 方便前端插入消息显示
            shareTitle: content.paName,
            resources: content.paLogo
          })
        }
      } else if (type === 436207665) {
        //红包
        Object.assign(message, {
          type: 436207665,
          content: content,
          amount: name,
          pwd: this.redPacketsPwd
          // noWx: chatCode
        })
      } else if (type === 419430449) {
        //转账
        Object.assign(message, {
          type: 419430449,
          content: content,
          amount: name,
          pwd: this.TransferAccountPwd
          // noWx: chatCode
        })
      }
      console.log(message)
      chatUtils.sendMessageAsync(message)
      this.remindList = []

    },

    // 上传图片 文件
    async uploadSectionFile (param, flag) {
    //  let chatInfo = this.currentPersonMember
      var merchantNo = this.$cfg.userInfo.memberNoMerchant
      let fileObj = param.file
      const fileSizeM = fileObj.size / 1024 / 1024

      if(flag){
        if (fileSizeM > 100) {
          let errMessage = '上传文件大小不能超过 100M'
          this.$message({
            type: 'error',
            message: errMessage
          })

          this.fileList = []
          throw new Error(errMessage)
        }
      } else {
        if (fileSizeM > 10) {
          let errMessage = '上传文件大小不能超过 10M'
          this.$message({
            type: 'error',
            message: errMessage
          })

          this.fileList = []
          throw new Error(errMessage)
        }
      }


      var form = new FormData()
      form.append('file', fileObj)
      form.append('merchantNo', merchantNo)
    //  console.log(form.get('file'))

      return this.$http.post('/api/im/chat/uploadFileFromWeb.do',form).then(res => {
          if (res.data.result) {
            this.$message({
              type: 'success',
              message: '上传成功'
            })
            this.fileList = []
            return res
          } else {
            this.$message({
              type: 'error',
              message: res.data.errorMessage
            })

            this.fileList = []
            throw new Error(res.data.errorMessage)
          }
        })
    },

    uploadImage (param) {
      this.uploadSectionFile(param).then(res => {
        let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        let chatInfo = this.currentPersonMember

        if (isGroupChat) {
            //群聊
          if(!isPmCode){
            this.sendChatMessage(3, chatInfo.noWx, this.urlParams.roomCode,res.data.returnObject)
          }else{
            //群组聊天
            this.flockMemberList.forEach( (item)=>{
              this.sendChatMessage(3, item.chatRoomName, item.code,res.data.returnObject)
            })
          }
        } else {
          //单聊
          this.sendChatMessage(3, chatInfo.noWx, chatInfo.memberNo,res.data.returnObject)
        }


      })
    },

    uploadFile (param) {
      this.uploadSectionFile(param, true).then(res => {
        let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        let chatInfo = this.currentPersonMember

        if (isGroupChat) {
            //群聊
          if(!isPmCode){
            this.sendChatMessage(495, chatInfo.noWx, this.urlParams.roomCode, res.data.returnObject, param.file.name)
          }else{
            //群组聊天
            this.flockMemberList.forEach( (item)=>{
              this.sendChatMessage(495, item.chatRoomName, item.code, res.data.returnObject, param.file.name)
            })
          }
        } else {
          //单聊
          this.sendChatMessage(495, chatInfo.noWx, chatInfo.memberNo,res.data.returnObject, param.file.name)
        }

      })
    },

    uploadVideo (param) {
      this.uploadSectionFile(param).then(res => {
        let isGroupChat = this.urlParams.hasOwnProperty('roomCode')//是否是群聊或群组
        let isPmCode = this.urlParams.hasOwnProperty("pmCode")//是否是群组聊天
        let chatInfo = this.currentPersonMember

        if (isGroupChat) {
            //群聊
          if(!isPmCode){
            this.sendChatMessage(43, chatInfo.noWx, this.urlParams.roomCode, res.data.returnObject, param.file.name)
          }else{
            //群组聊天
            this.flockMemberList.forEach( (item)=>{
              this.sendChatMessage(43, item.chatRoomName, item.code, res.data.returnObject, param.file.name)
            })
          }
        } else {
          //单聊
          this.sendChatMessage(43, chatInfo.noWx, chatInfo.memberNo,res.data.returnObject, param.file.name)
        }

      })
    },
    //获取群组下面的 分群
    getGroupMemberList () {
      var info = this.$route.params
      this.$http.post('/api/im/chatroom/findChatRoomByPmCode.do', {
        pmCode:info.pmCode,
      }).then(res => {
        //  console.log(res)
        if (res.data.result) {
          this.flockMemberList = res.data.returnObject.rows
          //console.log(this.flockMemberList)
        }
      })
    },

    //获取小程序列表
    getAppletList(){
        this.$http.post('/api/imh5/smallprogram/list',{
          pageNo: 1,
          pageSize: 99999,
          status: 1, //1已收藏  0未收藏
          paName: '', //搜索名称
          merchantNo: this.$cfg.userInfo.memberNoMerchant
        }).then(res=>{
        //  console.log(res.data)
          if(res.data.result) {

            let list = res.data.returnObject.dataMap.page.rows
            if(list) {
              this.appletList = res.data.returnObject.dataMap.page.rows
            }

          }
        })
    },

    //获取公众号列表
    getTencentList(){
        this.$http.post('/api/imh5/publicaccount/list',{
          pageNo: 1,
          pageSize: 99999,
          status: 1,
          paName: '',
          merchantNo: this.$cfg.userInfo.memberNoMerchant
        }).then(res=>{
          if(res.data.result && res.data.returnObject.page.rows){
            this.tencentList = res.data.returnObject.page.rows
          }
        })
    },

    //
    VerbalTrick_default(){
      var params = {
        memberNoGm: this.userInfo.memberNoGuid,
        merchantNo: this.userInfo.memberNoMerchant
      }
      let url
      if(this.searchVerbalTrick_simple){
        url = '/api/imh5/index/wordsSearch.do'     //搜索话术
        params.content = this.searchVerbalTrick_simple
      } else {
        url = '/api/imh5/index/wordsSelect.do'    //获取默认话术
      }

      this.$http.post(url, params).then(res => {
        if (res.data.result) {
          this.VerbalTrickList_default = res.data.returnObject
        }
      })
    },

    //个人话术  公共话术
    VerbalTrick_com_per(code){
      var params = {
        memberNoGm: this.userInfo.memberNoGuid,
        merchantNo: this.userInfo.memberNoMerchant,
        code: code    //1公共 2个人
       }
      this.$http.post('/api/imh5/index/findWords.do', params).then(res => {
        if (res.data.result && res.data.returnObject) {
          let data = res.data.returnObject
          data.forEach( (e) =>{
            e.showVer = false
          })
          this.VerbalTrickList_common = data
        }
      })
    },

    //
    showVer_list (item, index) {
      item.showVer = !item.showVer
    },

    //查询是否开启托管
    getAutoReplyStatus(){
      this.$http.post('/api/imh5/ai/merchantPreProblem/isEnable.do',{
        merchantNo: this.userInfo.memberNoMerchant,
        memberNoGm: this.userInfo.memberNoGuid,
      }).then(res=>{
        if(res.data.result){
          if(res.data.returnObject){
            this.$store.dispatch('is_autoReply', res.data.returnObject)
          }
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    //图片二次加载
    redirectUrl(url){
      if(url){
        return url
      }
      clearTimeout(this.timer)
      this.timer = setTimeout( ()=>{
        return url
      },3000)
    },

    //获取视频库列表
    materialVideoList (id) {
      let params = {
        merchantNo: this.userInfo.memberNoMerchant,
        parentId: id,
        start:0,
        limit: 99999
      }
      this.$http.post('/api/imh5/imMaterial/materialVideoList.do',params)
        .then(res=>{
          if(res.data.result){
            this.materialVideoArr = res.data.returnObject.rows
          }

        })
    },

    //获取图片库列表
    materialPhotoList (id) {
      let params = {
        merchantNo: this.userInfo.memberNoMerchant,
        parentId: id,
        start:0,
        limit: 99999
      }
      this.$http.post('/api/imh5/imMaterial/materialPhotoList.do',params)
        .then(res=>{
          if(res.data.result){
            this.materialPhotoArr = res.data.returnObject.rows
          }
        })
    },

    //获取链接库列表
    materialLinkList (id) {
      let params = {
        merchantNo: this.userInfo.memberNoMerchant,
        parentId: id,
        start:0,
        limit: 99999
      }
      this.$http.post('/api/imh5/imMaterial/materialLinkList.do',params)
        .then(res=>{
          if(res.data.result){
            this.materialLinkUrl = res.data.returnObject.rows
          }
        })
    },

    //获取文本库列表
    materialTextList (id) {
      let params = {
        merchantNo: this.userInfo.memberNoMerchant,
        parentId: id,
        start:0,
        limit: 99999
      }
      this.$http.post('/api/imh5/imMaterial/materialTextList.do',params)
        .then(res=>{
          if(res.data.result){
            this.materialTextArr = res.data.returnObject.rows
          }
        })
    },

    //获取优惠券列表
    getCouponList () {
      this.$http.post('/api/coupon/findCouponList.do',{
        couponStatus : 'UNUSED',
        merchantNo: this.$cfg.userInfo.memberNoMerchant,
      }).then(res=>{
        if(res.data.result) {
          let list = res.data.returnObject
          if(list) {
            this.couponList = res.data.returnObject
          }

        }
      })
    },



    returnUrl(url){
        if (!url) {
          return ''
        }
        url = url.trim()
        if (!url.startsWith('http')) {
          return this.baseUrl + url
        }

        return url
    },

  },

  // 销毁
  beforeDestroy: function () {
    // 移除事件
    domUtils.removeEvent(document, 'mouseup', clickEmjiEvent)
    domUtils.removeEvent(document, 'mouseup', clickPreWordEvent)
    domUtils.removeEvent(document, 'mouseup', clickActivityEvent)
  }
}
</script>

<style lang="less" scoped>
.text {
  position: relative;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .emoji {
    position: relative;
    width: 100%;
    height: 40px;
    font-size: 12px;
    padding: 10px;
    box-sizing: border-box;
    color: #7c7c7c;
    margin-bottom: 10px;
    background: none;

    .flex-dir {
      display: inline-flex;
      flex-direction: column;
      justify-content: space-around;
      margin-right: 3px;
      align-items: center;
      cursor: pointer;
      .icon_text {
        line-height: 1;
        margin-top: 3px;
      }
    }

    .icon-c {
      width: 16px;
      height: 16px;

      &::before {
        font-family: iconfont;
        width: 16px;
        height: 16px;
        font-size: 16px;
        display: inline-block;
      }

      &:hover {
        &::before {
          color: #08a406;
        }
      }
    }
    .emojiBox {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      z-index: 1;
      top: -267px;
      left: 25px;
      /*width: 483px;
      height: 210px;*/
      /*padding: 5px;*/
      background-color: #fff;
    }
    .showbox-enter-active,
    &.showbox-leave-active {
      transition: all 0.5s;
    }
    // .showbox-enter,&.showbox-leave-active{
    //   opacity: 0;
    // }
  }
  .propBox {
    position: absolute;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #c7c7c7;
    box-sizing: border-box;
    z-index: 999;
    min-width: 160px;
    height: 160px;
    overflow-y: auto;
    left: 0;
    top: -160px;

    ul li {
      display: -webkit-box;
      flex: 1;
      padding: 5px 0;
      box-sizing: border-box;
      width: 100%;
      min-width: 60px;
      white-space: nowrap;
      &:hover {
        cursor: pointer;
        background-color: #d1d1d1;
        color: #333;
      }
      input[type='checkbox'] {
        display: none;
      }
      .headImg{
        width: 20px;
        height: 20px;
        border-radius: 2px;
        margin: 0 5px;
        vertical-align: middle;
      }
    }

  }
  .textarea-con {
    width: 100%;
    height: 1px;
    flex: 1;
    overflow: hidden;
    background-color: #fff;

    > textarea {
      width: 100%;
      height: 100%;
    }
  }
  .redPacketsBox{
    width: 520px!important;
  }
  .tencentBox {
    position: absolute;
    top: -430px;
    right: 30%;
    width: 90%;
    max-width: 600px;
    height: 410px;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 2px;
    box-shadow: 0 1px 2px 1px #d1d1d1;
    box-sizing: border-box;
    z-index: 100;
    .redPacket_body {
      padding: 15px 30px 0 30px;
      box-sizing: border-box;
      .redPacketNumber_box {
        width: 100%;
        height: 45px;
        line-height: 45px;
        border: 1px solid #d1d1d1;
        padding: 0 10px;
        text-align: right;
        box-sizing: border-box;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        .jine,
        .yuan {
          color: #000;
          font-size: 14px;
        }
        .redPacketNumber {
          border: none;
          height: 30px;
          line-height: 30px;
          text-align: right;
          font-size: 16px;
        }
      }
      .redPacketText {
        width: 100%;
        height: 80px;
        margin-top: 20px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        text-align: left;
        padding: 5px 10px;
        font-size: 14px;
      }
      .showMoney {
        font-size: 30px;
        color: #000;
        text-align: center;
        margin-top: 10px;
      }
      .sendBtn {
        text-align: center;
        margin-top: 40px;
        .success-btn{
          width: 80%;
          max-width: 400px;
          margin: 0 auto;
          line-height: 40px;
          height: 40px;
          color: #fff;
          background-color: red;
          border-radius: 8px;
          &:hover{
            cursor: pointer;
            background-color: #ff1616;
          }
        }
      }

      .red_title{
        text-align: center;
        font-size: 16px;
        color: #333;
        margin: 30px 0 20px 0;
      }
      .input_pwd_box{
        position: relative;
        text-align: center;
        margin: 0 auto;
        margin-top: 50px;
        .input_pwd_item{
            display: inline-block;
            border: 1px solid #d4d3d3;
            width: 50px;
            height: 50px;
            border-right: none;
            &:last-child{
              border-right: 1px solid #d4d3d3
            }
        }

        .input_pwd_input{
          position: absolute;
          left: 79px;
          top: 0;
          width: 350px;
          height: 50px;
          border:none;
          background: transparent;
          color: #333!important;
          letter-spacing: 44px;
          padding-left: 20px;
        }

      }
    }
    .tencent_title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d1d1d1;
      height: 50px;
      line-height: 50px;
      .head_title {
        font-size: 14px;
        color: #333;
      }
      .back{
        font-size: 14px;
        &:hover{
          cursor: pointer;
          color: #08A406;
        }
      }
      .head_input input {
        height: 28px;
        line-height: 28px;
        border-radius: 5px;
        border: 1px solid #d1d1d1;
        text-indent: 10px;
        width: 180px;
      }
    }
    .tencent_body {
      ul li {
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d1d1d1;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          background-color: #f1f1f1;
          cursor: pointer;
        }

        label {
          width: 100%;
          height: 100%;
          padding-right:10px;
          box-sizing: border-box;
        }

        .tencent_img {
          width: 40px;
          height: 40px;
          vertical-align: middle;
          margin: 0 20px 0 10px;
        }
        .tencent_text {
          font-size: 14px;
          color: #333;
        }
        .star {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 30px;
        }
      }
      ul.ulBox {
        width: 100%;
        border-right: 1px solid #d1d1d1;
        height: 310px;
        overflow: auto;
        display: inline-block;
        padding-left: 5px;
        box-sizing: border-box;
        li {
          padding-left: 10px;
          box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          .tencent_text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            cursor: pointer;
          }
        }

        .actived {
          background-color: #f1f1f1;
        }

        .liChild {
          line-height: 30px;
          border-bottom: 1px solid #f1f1f1;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-left: 10px;
          box-sizing: border-box;
          color: #333;
          &:hover{
            cursor: pointer;
            background-color: #f2f2f2;
          }
        }

      }
      .rightBox {
        display: inline-block;
        width: 100%;
        padding: 5px 20px;
        box-sizing: border-box;
        & > div {
          margin: 0 auto;
          text-align: center;
          img {
            width: 100%;
            height: 100%;
            max-width: 300px;
            max-height: 260px;
          }
        }
      }
    }
    .tencent_bottom {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      border-top: 1px solid #d1d1d1;
      padding-right: 20px;
      box-sizing: border-box;
    }
  }
  textarea {
    box-sizing: border-box;
    padding: 10px 20px;
    height: 105px;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
  .send {
    position: absolute;
    bottom: 10px;
    right: 30px;
    width: 75px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background: #f5f5f5;
    font-size: 14px;
    color: #7c7c7c;
    cursor: pointer;
    &:hover {
      background: rgb(18, 150, 17);
      color: #fff;
    }
  }
  .warn {
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 110px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    box-shadow: 0 1px 5px 1px #bdbdbd;
    &.appear-enter-active,
    &.appear-leave-active {
      transition: all 1s;
    }
    &.appear-enter,
    &.appear-leave-active {
      opacity: 0;
    }
    &:before {
      content: " ";
      position: absolute;
      top: 100%;
      right: 20px;
      border: 7px solid transparent;
      border-top-color: #fff;
      filter: drop-shadow(1px 3px 2px #bdbdbd);
    }
  }
  .cardBox {
    position: absolute;
    top: -42px;
    right: 40%;
    width: 30%;
    height: 40px;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 2px;
    box-shadow: 0 1px 2px 1px #d1d1d1;
    z-index: 88;
    p {
      font-size: 14px;
      padding-left: 20px;
      color: #333;
      cursor: pointer;
      height: 38px;
      line-height: 38px;
    }
    .card_text {
      border-bottom: 1px solid #d1d1d1;
    }
  }
  .trusteeshipBox {
    width: 100%;
    position: absolute;
    top: -45px;
    background-color: #f1f37a;
    padding: 0 20px;
    left: 0;
    box-sizing: border-box;
    line-height: 40px;
    z-index: 99;
  }
}
.materialInput_box input {
  height: 28px;
  line-height: 28px;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  text-indent: 10px;
  width: 200px;
  position: absolute;
  right: 20px;
  top: 4px;
  z-index: 999999999;
}
.vertalStrickInput {
  position: absolute;
  right: 20px;
  top: 4px;
  z-index: 99999;
}
.verbalStrickBox {
  height: 310px;
  overflow: auto;
  padding: 10px 20px;
  box-sizing: border-box;
}

.sucai_box{
  ul li {
    line-height: 40px;
    border-bottom: 1px solid #d1d1d1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .tencent_text {
      font-size: 14px;
      color: #333;
    }
    .sucai_list{
      padding-left: 20px;
      &:hover {
        background-color: #f1f1f1;
        cursor: pointer;
      }

      span{
        padding-left: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

    }
  }
}

  .material_box{
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    overflow: auto;
    ul.paddBox{
      padding: 0 20px;
      .ul_list{
      float: left;
      width: 85px;
      height: 100px;
      margin:0 15px 15px 0;
      box-sizing: border-box;
      text-align: center;
      &:hover{
        cursor: pointer;
      }
      .img_item{
        width: 70px;
        height: 70px;
        display: inline-block;
        margin-bottom: 14px;
      }
      label{
          position: relative;
          top: 18px;
          right: 34px;
      }
      .iconwenjianjia{
        color: #ffcb05;
        margin-top: 20px;
      }
      .iconshipin2{
        color: #3a8ee6;
      }
      .iconfont{
        font-size: 70px;
        margin-bottom: 10px;
        display: inline-block;
      }
      p{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

     ul .ul_list_item{
       line-height: 50px;
       display: -webkit-box;
       flex:1;
       border-bottom: 1px solid #e2e2e2;
       padding: 0 15px;
       vertical-align: middle;
       box-sizing: border-box;

       p{
         width: 92%;
         margin-left: 30px;
         display: flex;
         justify-content: space-between;
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         cursor: pointer;

         .linkTitle{
           width: 50%;
           overflow: hidden;
         }

         .linkUrl{
           width: 45%;
           overflow: hidden;
           color: #409EFF;
         }
       }
     }
  }
  .noresult{
    text-align: center;
    margin-top: 20px;
    display: block;
  }
  .cursor{
    margin-right: 30px;
    font-size: 14px;
      cursor: pointer;
      &:hover{
        color: #3a8ee6;
      }
    }
</style>
