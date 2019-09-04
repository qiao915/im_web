<template>
	<div class="expression">
		<ul class="exp_hd">
            <li class="exp_hd_item" :class="{'active':activeFaceType=='qq'}" @click='onTpyeClick("qq")'>
                <a href="javascript:;">QQ表情</a>
            </li>
            <li class="exp_hd_item" :class="{'active':activeFaceType=='emoji'}" @click='onTpyeClick("emoji")'>
                <a href="javascript:;">符号表情</a>
            </li>
        </ul>
        <div class="scroll-wrapper exp_bd ">
        	<div class="scroll-content exp_bd">
        		<div class="exp_cont">
					<div class="qq_face" :class="{show:activeFaceType=='qq',hide:activeFaceType=='emoji'}" @click='onFaceClick'>
					    <a title="微笑" type="qq" class="face qqface0">微笑</a> <a title="撇嘴" type="qq" class="face qqface1">撇嘴</a> <a title="色" type="qq" class="face qqface2">色</a> <a title="发呆" type="qq" class="face qqface3">发呆</a> <a title="得意" type="qq" class="face qqface4">得意</a> <a title="流泪" type="qq" class="face qqface5">流泪</a> <a title="害羞" type="qq" class="face qqface6">害羞</a> <a title="闭嘴" type="qq" class="face qqface7">闭嘴</a> <a title="睡" type="qq" class="face qqface8">睡</a> <a title="大哭" type="qq" class="face qqface9">大哭</a> <a title="尴尬" type="qq" class="face qqface10">尴尬</a> <a title="发怒" type="qq" class="face qqface11">发怒</a> <a title="调皮" type="qq" class="face qqface12">调皮</a> <a title="呲牙" type="qq" class="face qqface13">呲牙</a> <a title="惊讶" type="qq" class="face qqface14">惊讶</a> <a title="难过" type="qq" class="face qqface15">难过</a> <a title="酷" type="qq" class="face qqface16">酷</a> <a title="冷汗" type="qq" class="face qqface17">冷汗</a> <a title="抓狂" type="qq" class="face qqface18">抓狂</a> <a title="吐" type="qq" class="face qqface19">吐</a> <a title="偷笑" type="qq" class="face qqface20">偷笑</a> <a title="愉快" type="qq" class="face qqface21">愉快</a> <a title="白眼" type="qq" class="face qqface22">白眼</a> <a title="傲慢" type="qq" class="face qqface23">傲慢</a> <a title="饥饿" type="qq" class="face qqface24">饥饿</a> <a title="困" type="qq" class="face qqface25">困</a> <a title="惊恐" type="qq" class="face qqface26">惊恐</a> <a title="流汗" type="qq" class="face qqface27">流汗</a> <a title="憨笑" type="qq" class="face qqface28">憨笑</a> <a title="悠闲" type="qq" class="face qqface29">悠闲</a> <a title="奋斗" type="qq" class="face qqface30">奋斗</a> <a title="咒骂" type="qq" class="face qqface31">咒骂</a> <a title="疑问" type="qq" class="face qqface32">疑问</a> <a title="嘘" type="qq" class="face qqface33">嘘</a> <a title="晕" type="qq" class="face qqface34">晕</a> <a title="疯了" type="qq" class="face qqface35">疯了</a> <a title="衰" type="qq" class="face qqface36">衰</a> <a title="骷髅" type="qq" class="face qqface37">骷髅</a> <a title="敲打" type="qq" class="face qqface38">敲打</a> <a title="再见" type="qq" class="face qqface39">再见</a> <a title="擦汗" type="qq" class="face qqface40">擦汗</a> <a title="抠鼻" type="qq" class="face qqface41">抠鼻</a> <a title="鼓掌" type="qq" class="face qqface42">鼓掌</a> <a title="糗大了" type="qq" class="face qqface43">糗大了</a> <a title="坏笑" type="qq" class="face qqface44">坏笑</a> <a title="左哼哼" type="qq" class="face qqface45">左哼哼</a> <a title="右哼哼" type="qq" class="face qqface46">右哼哼</a> <a title="哈欠" type="qq" class="face qqface47">哈欠</a> <a title="鄙视" type="qq" class="face qqface48">鄙视</a> <a title="委屈" type="qq" class="face qqface49">委屈</a> <a title="快哭了" type="qq" class="face qqface50">快哭了</a> <a title="阴险" type="qq" class="face qqface51">阴险</a> <a title="亲亲" type="qq" class="face qqface52">亲亲</a> <a title="吓" type="qq" class="face qqface53">吓</a> <a title="可怜" type="qq" class="face qqface54">可怜</a> <a title="菜刀" type="qq" class="face qqface55">菜刀</a> <a title="西瓜" type="qq" class="face qqface56">西瓜</a> <a title="啤酒" type="qq" class="face qqface57">啤酒</a> <a title="篮球" type="qq" class="face qqface58">篮球</a> <a title="乒乓" type="qq" class="face qqface59">乒乓</a> <a title="咖啡" type="qq" class="face qqface60">咖啡</a> <a title="饭" type="qq" class="face qqface61">饭</a> <a title="猪头" type="qq" class="face qqface62">猪头</a> <a title="玫瑰" type="qq" class="face qqface63">玫瑰</a> <a title="凋谢" type="qq" class="face qqface64">凋谢</a> <a title="嘴唇" type="qq" class="face qqface65">嘴唇</a> <a title="爱心" type="qq" class="face qqface66">爱心</a> <a title="心碎" type="qq" class="face qqface67">心碎</a> <a title="蛋糕" type="qq" class="face qqface68">蛋糕</a> <a title="闪电" type="qq" class="face qqface69">闪电</a> <a title="炸弹" type="qq" class="face qqface70">炸弹</a> <a title="刀" type="qq" class="face qqface71">刀</a> <a title="足球" type="qq" class="face qqface72">足球</a> <a title="瓢虫" type="qq" class="face qqface73">瓢虫</a> <a title="便便" type="qq" class="face qqface74">便便</a> <a title="月亮" type="qq" class="face qqface75">月亮</a> <a title="太阳" type="qq" class="face qqface76">太阳</a> <a title="礼物" type="qq" class="face qqface77">礼物</a> <a title="拥抱" type="qq" class="face qqface78">拥抱</a> <a title="强" type="qq" class="face qqface79">强</a> <a title="弱" type="qq" class="face qqface80">弱</a> <a title="握手" type="qq" class="face qqface81">握手</a> <a title="胜利" type="qq" class="face qqface82">胜利</a> <a title="抱拳" type="qq" class="face qqface83">抱拳</a> <a title="勾引" type="qq" class="face qqface84">勾引</a> <a title="拳头" type="qq" class="face qqface85">拳头</a> <a title="差劲" type="qq" class="face qqface86">差劲</a> <a title="爱你" type="qq" class="face qqface87">爱你</a> <a title="NO" type="qq" class="face qqface88">NO</a> <a title="OK" type="qq" class="face qqface89">OK</a> <a title="爱情" type="qq" class="face qqface90">爱情</a> <a title="飞吻" type="qq" class="face qqface91">飞吻</a> <a title="跳跳" type="qq" class="face qqface92">跳跳</a> <a title="发抖" type="qq" class="face qqface93">发抖</a> <a title="怄火" type="qq" class="face qqface94">怄火</a> <a title="转圈" type="qq" class="face qqface95">转圈</a> <a title="磕头" type="qq" class="face qqface96">磕头</a> <a title="回头" type="qq" class="face qqface97">回头</a> <a title="跳绳" type="qq" class="face qqface98">跳绳</a> <a title="投降" type="qq" class="face qqface99">投降</a> <a title="激动" type="qq" class="face qqface100">激动</a> <a title="乱舞" type="qq" class="face qqface101">乱舞</a> <a title="献吻" type="qq" class="face qqface102">献吻</a> <a title="左太极" type="qq" class="face qqface103">左太极</a> <a title="右太极" type="qq" class="face qqface104">右太极</a>
					</div>

				  	<div class="emoji_face" :class="{show:activeFaceType=='emoji',hide:activeFaceType=='qq'}" @click='onEmojiClick'>
						<a title="笑脸" type="emoji" class="face emoji0">笑脸</a><a title="生病" type="emoji" class="face emoji1">生病</a><a title="破涕为笑" type="emoji" class="face emoji2">破涕为笑</a><a title="吐舌" type="emoji" class="face emoji3">吐舌</a><a title="脸红" type="emoji" class="face emoji4">脸红</a><a title="恐惧" type="emoji" class="face emoji5">恐惧</a><a title="失望" type="emoji" class="face emoji6">失望</a><a title="无语" type="emoji" class="face emoji7">无语</a><a title="嘿哈" type="qq" class="face emoji8">嘿哈</a><a title="捂脸" type="qq" class="face emoji9">捂脸</a><a title="奸笑" type="qq" class="face emoji10">奸笑</a><a title="机智" type="qq" class="face emoji11">机智</a><a title="皱眉" type="qq" class="face emoji12">皱眉</a><a title="耶" type="qq" class="face emoji13">耶</a><a title="鬼魂" type="emoji" class="face emoji14">鬼魂</a><a title="合十" type="emoji" class="face emoji15">合十</a><a title="强壮" type="emoji" class="face emoji16">强壮</a><a title="庆祝" type="emoji" class="face emoji17">庆祝</a><a title="礼物" type="emoji" class="face emoji18">礼物</a><a title="红包" type="qq" class="face emoji19">红包</a><a title="鸡" type="qq" class="face emoji20">鸡</a><a title="开心" type="emoji" class="face emoji21">开心</a><a title="大笑" type="emoji" class="face emoji22">大笑</a><a title="热情" type="emoji" class="face emoji23">热情</a><a title="眨眼" type="emoji" class="face emoji24">眨眼</a><a title="色" type="emoji" class="face emoji25">色</a><a title="接吻" type="emoji" class="face emoji26">接吻</a><a title="亲吻" type="emoji" class="face emoji27">亲吻</a><a title="露齿笑" type="emoji" class="face emoji28">露齿笑</a><a title="满意" type="emoji" class="face emoji29">满意</a><a title="戏弄" type="emoji" class="face emoji30">戏弄</a><a title="得意" type="emoji" class="face emoji31">得意</a><a title="汗" type="emoji" class="face emoji32">汗</a><a title="低落" type="emoji" class="face emoji33">低落</a><a title="呸" type="emoji" class="face emoji34">呸</a><a title="焦虑" type="emoji" class="face emoji35">焦虑</a><a title="担心" type="emoji" class="face emoji36">担心</a><a title="震惊" type="emoji" class="face emoji37">震惊</a><a title="悔恨" type="emoji" class="face emoji38">悔恨</a><a title="眼泪" type="emoji" class="face emoji39">眼泪</a><a title="哭" type="emoji" class="face emoji40">哭</a><a title="晕" type="emoji" class="face emoji41">晕</a><a title="心烦" type="emoji" class="face emoji42">心烦</a><a title="生气" type="emoji" class="face emoji43">生气</a><a title="睡觉" type="emoji" class="face emoji44">睡觉</a><a title="恶魔" type="emoji" class="face emoji45">恶魔</a><a title="外星人" type="emoji" class="face emoji46">外星人</a><a title="心" type="emoji" class="face emoji47">心</a><a title="心碎" type="emoji" class="face emoji48">心碎</a><a title="丘比特" type="emoji" class="face emoji49">丘比特</a><a title="闪烁" type="emoji" class="face emoji50">闪烁</a><a title="星星" type="emoji" class="face emoji51">星星</a><a title="叹号" type="emoji" class="face emoji52">叹号</a><a title="问号" type="emoji" class="face emoji53">问号</a><a title="睡着" type="emoji" class="face emoji54">睡着</a><a title="水滴" type="emoji" class="face emoji55">水滴</a><a title="音乐" type="emoji" class="face emoji56">音乐</a><a title="火" type="emoji" class="face emoji57">火</a><a title="便便" type="emoji" class="face emoji58">便便</a><a title="强" type="emoji" class="face emoji59">强</a><a title="弱" type="emoji" class="face emoji60">弱</a><a title="拳头" type="emoji" class="face emoji61">拳头</a><a title="胜利" type="emoji" class="face emoji62">胜利</a><a title="上" type="emoji" class="face emoji63">上</a><a title="下" type="emoji" class="face emoji64">下</a><a title="右" type="emoji" class="face emoji65">右</a><a title="左" type="emoji" class="face emoji66">左</a><a title="第一" type="emoji" class="face emoji67">第一</a><a title="吻" type="emoji" class="face emoji68">吻</a><a title="热恋" type="emoji" class="face emoji69">热恋</a><a title="男孩" type="emoji" class="face emoji70">男孩</a><a title="女孩" type="emoji" class="face emoji71">女孩</a><a title="女士" type="emoji" class="face emoji72">女士</a><a title="男士" type="emoji" class="face emoji73">男士</a><a title="天使" type="emoji" class="face emoji74">天使</a><a title="骷髅" type="emoji" class="face emoji75">骷髅</a><a title="红唇" type="emoji" class="face emoji76">红唇</a><a title="太阳" type="emoji" class="face emoji77">太阳</a><a title="下雨" type="emoji" class="face emoji78">下雨</a><a title="多云" type="emoji" class="face emoji79">多云</a><a title="雪人" type="emoji" class="face emoji80">雪人</a><a title="月亮" type="emoji" class="face emoji81">月亮</a><a title="闪电" type="emoji" class="face emoji82">闪电</a><a title="海浪" type="emoji" class="face emoji83">海浪</a><a title="猫" type="emoji" class="face emoji84">猫</a><a title="小狗" type="emoji" class="face emoji85">小狗</a><a title="老鼠" type="emoji" class="face emoji86">老鼠</a><a title="仓鼠" type="emoji" class="face emoji87">仓鼠</a><a title="兔子" type="emoji" class="face emoji88">兔子</a><a title="狗" type="emoji" class="face emoji89">狗</a><a title="青蛙" type="emoji" class="face emoji90">青蛙</a><a title="老虎" type="emoji" class="face emoji91">老虎</a><a title="考拉" type="emoji" class="face emoji92">考拉</a><a title="熊" type="emoji" class="face emoji93">熊</a><a title="猪" type="emoji" class="face emoji94">猪</a><a title="牛" type="emoji" class="face emoji95">牛</a><a title="野猪" type="emoji" class="face emoji96">野猪</a><a title="猴子" type="emoji" class="face emoji97">猴子</a><a title="马" type="emoji" class="face emoji98">马</a><a title="蛇" type="emoji" class="face emoji99">蛇</a><a title="鸽子" type="emoji" class="face emoji100">鸽子</a><a title="鸡" type="emoji" class="face emoji101">鸡</a><a title="企鹅" type="emoji" class="face emoji102">企鹅</a><a title="毛虫" type="emoji" class="face emoji103">毛虫</a><a title="章鱼" type="emoji" class="face emoji104">章鱼</a><a title="鱼" type="emoji" class="face emoji105">鱼</a><a title="鲸鱼" type="emoji" class="face emoji106">鲸鱼</a><a title="海豚" type="emoji" class="face emoji107">海豚</a><a title="玫瑰" type="emoji" class="face emoji108">玫瑰</a><a title="花" type="emoji" class="face emoji109">花</a><a title="棕榈树" type="emoji" class="face emoji110">棕榈树</a><a title="仙人掌" type="emoji" class="face emoji111">仙人掌</a><a title="礼盒" type="emoji" class="face emoji112">礼盒</a><a title="南瓜灯" type="emoji" class="face emoji113">南瓜灯</a><a title="圣诞老人" type="emoji" class="face emoji114">圣诞老人</a><a title="圣诞树" type="emoji" class="face emoji115">圣诞树</a><a title="铃" type="emoji" class="face emoji116">铃</a><a title="气球" type="emoji" class="face emoji117">气球</a><a title="CD" type="emoji" class="face emoji118">CD</a><a title="相机" type="emoji" class="face emoji119">相机</a><a title="录像机" type="emoji" class="face emoji120">录像机</a><a title="电脑" type="emoji" class="face emoji121">电脑</a><a title="电视" type="emoji" class="face emoji122">电视</a><a title="电话" type="emoji" class="face emoji123">电话</a><a title="解锁" type="emoji" class="face emoji124">解锁</a><a title="锁" type="emoji" class="face emoji125">锁</a><a title="钥匙" type="emoji" class="face emoji126">钥匙</a><a title="成交" type="emoji" class="face emoji127">成交</a><a title="灯泡" type="emoji" class="face emoji128">灯泡</a><a title="邮箱" type="emoji" class="face emoji129">邮箱</a><a title="浴缸" type="emoji" class="face emoji130">浴缸</a><a title="钱" type="emoji" class="face emoji131">钱</a><a title="炸弹" type="emoji" class="face emoji132">炸弹</a><a title="手枪" type="emoji" class="face emoji133">手枪</a><a title="药丸" type="emoji" class="face emoji134">药丸</a><a title="橄榄球" type="emoji" class="face emoji135">橄榄球</a><a title="篮球" type="emoji" class="face emoji136">篮球</a><a title="足球" type="emoji" class="face emoji137">足球</a><a title="棒球" type="emoji" class="face emoji138">棒球</a><a title="高尔夫" type="emoji" class="face emoji139">高尔夫</a><a title="奖杯" type="emoji" class="face emoji140">奖杯</a><a title="入侵者" type="emoji" class="face emoji141">入侵者</a><a title="唱歌" type="emoji" class="face emoji142">唱歌</a><a title="吉他" type="emoji" class="face emoji143">吉他</a><a title="比基尼" type="emoji" class="face emoji144">比基尼</a><a title="皇冠" type="emoji" class="face emoji145">皇冠</a><a title="雨伞" type="emoji" class="face emoji146">雨伞</a><a title="手提包" type="emoji" class="face emoji147">手提包</a><a title="口红" type="emoji" class="face emoji148">口红</a><a title="戒指" type="emoji" class="face emoji149">戒指</a><a title="钻石" type="emoji" class="face emoji150">钻石</a><a title="咖啡" type="emoji" class="face emoji151">咖啡</a><a title="啤酒" type="emoji" class="face emoji152">啤酒</a><a title="干杯" type="emoji" class="face emoji153">干杯</a><a title="鸡尾酒" type="emoji" class="face emoji154">鸡尾酒</a><a title="汉堡" type="emoji" class="face emoji155">汉堡</a><a title="薯条" type="emoji" class="face emoji156">薯条</a><a title="意面" type="emoji" class="face emoji157">意面</a><a title="寿司" type="emoji" class="face emoji158">寿司</a><a title="面条" type="emoji" class="face emoji159">面条</a><a title="煎蛋" type="emoji" class="face emoji160">煎蛋</a><a title="冰激凌" type="emoji" class="face emoji161">冰激凌</a><a title="蛋糕" type="emoji" class="face emoji162">蛋糕</a><a title="苹果" type="emoji" class="face emoji163">苹果</a><a title="飞机" type="emoji" class="face emoji164">飞机</a><a title="火箭" type="emoji" class="face emoji165">火箭</a><a title="自行车" type="emoji" class="face emoji166">自行车</a><a title="高铁" type="emoji" class="face emoji167">高铁</a><a title="警告" type="emoji" class="face emoji168">警告</a><a title="旗" type="emoji" class="face emoji169">旗</a><a title="男人" type="emoji" class="face emoji170">男人</a><a title="女人" type="emoji" class="face emoji171">女人</a><a title="O" type="emoji" class="face emoji172">O</a><a title="X" type="emoji" class="face emoji173">X</a><a title="版权" type="emoji" class="face emoji174">版权</a><a title="注册商标" type="emoji" class="face emoji175">注册商标</a><a title="商标" type="emoji" class="face emoji176">商标</a>
						<!--<a ng-repeat="item in EmojiList" title="{{item}}" type="emoji" class="face">{{item}}</a>-->
					</div>
        		</div>
        	</div>
        </div>
	</div>
</template>

<script>
import emoticon from '../../utils/emoticon'

export default {
	data(){
		return {
			activeFaceType: 'qq'

		}
	},
	methods: {
		onTpyeClick(faceType){
			this.activeFaceType = faceType;
		},
		onFaceClick(e){
			let content = e.target.text;
			// let result = emoticon.getEmoticonByText(content);
			// this.$emit('onFaceClick', result);
			let result = `[${content}]`
			this.$emit('onFaceClick', result, 'qq');
		},
		onEmojiClick(e){
			let content = e.target.text;
			// let result = emoticon.getEmoticonByText(content);
			// this.$emit('onFaceClick', result);
			let result = `${content}`
			this.$emit('onFaceClick', result, 'emoji');
		}
	}
}
</script>

<style>
.show {
    display: block;
}
.hide {
    display: none;
}
.expression {
    border: 1px solid #dedede;
}
.expression:after,.expression:before {
    content: "";
    position: absolute;
    left: 16px;
    top: 100%;
    margin-left: -7px;
}
.expression:before {
    border: 7px solid transparent;
    border-top-color: #cfcfcf;
}
.expression:after {
    margin-top: -1px;
    border: 7px solid transparent;
    border-top-color: #fff;
}
.exp_hd {
    padding: 8px 20px 0;
    overflow: hidden;
    background-color: #f2f2f2;
}
.exp_hd_item {
    float: left;
}
.exp_hd_item.active {
    background-color: #fff;
    border-top-left-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -webkit-border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    -moz-border-radius-topright: 4px;
    -webkit-border-top-right-radius: 4px;
}
.exp_hd_item a {
    display: block;
    text-decoration: none;
    color: #333;
    padding: 5px 20px;
    font-size: 14px;
}
.exp_bd {
    overflow: auto;
    background-color: #fff;
    height: 232px;
}
.scroll-wrapper {
    overflow: hidden!important;
    padding: 0!important;
    position: relative;
}
.scroll-wrapper>.scroll-content {
    border: none!important;
    box-sizing: content-box!important;
    height: 238px;
    left: 0;
    margin: 0;
    max-height: none!important;
    max-width: none!important;
    overflow: scroll!important;
    padding: 0;
    position: relative!important;
    top: 0;
    width: auto!important;
}
.exp_cont {
    margin: 15px 20px;
}
.qq_face {
	overflow: hidden;
	width: 435px;
	height: 202px;
	margin-right: -1px
}

.qq_face a {
	float: left;
	width: 28px;
	height: 28px;
	font-size: 0;
	text-indent: -999em;
	border-bottom: 1px solid #f0f0f0;
	border-right: 1px solid #f0f0f0;
	cursor: pointer;
	background: url(./img/15BPafa.png) no-repeat
}

@media (-webkit-min-device-pixel-ratio:2) {
	.qq_face a {
		background: url(./img/xBw_Qtm.png) no-repeat;
		background-size: 434px 202px
	}
}

.emoji_face {
	overflow: hidden;
	width: 435px;
	height: 360px;
	margin-right: -1px
}

.emoji_face a {
	float: left;
	width: 28px;
	height: 28px;
	font-size: 0;
	text-indent: -999em;
	border-bottom: 1px solid #f0f0f0;
	border-right: 1px solid #f0f0f0;
	cursor: pointer;
	background: url(./img/6AfH8-r.png) no-repeat
}

@media (-webkit-min-device-pixel-ratio:2) {
	.emoji_face a {
		background: url(./img/_PqsqBz.png) no-repeat;
		background-size: 480px 384px
	}
}


.emoji {
	background: url(./img/1BJVkIX.png) 0 0 no-repeat;
	width: 20px;
	height: 20px;
	display: inline;
	display: -moz-inline-stack;
	display: inline-block;
	vertical-align: top;
	zoom: 1;
	*display: inline
}

.emoji2600 {
	background-position: 0 -260px
}

.emoji2601 {
	background-position: 0 -20px
}

.emoji2614 {
	background-position: 0 -40px
}

.emoji26c4 {
	background-position: 0 -60px
}

.emoji26a1 {
	background-position: 0 -80px
}

.emoji1f300 {
	background-position: 0 -100px
}

.emoji1f301 {
	background-position: 0 -9200px
}

.emoji1f302 {
	background-position: 0 -120px
}

.emoji1f303 {
	background-position: 0 -920px
}

.emoji1f304 {
	background-position: 0 -160px
}

.emoji1f305 {
	background-position: 0 -180px
}

.emoji1f306 {
	background-position: 0 -200px
}

.emoji1f307 {
	background-position: 0 -220px
}

.emoji1f308 {
	background-position: 0 -240px
}

.emoji2744 {
	background-position: 0 -9200px
}

.emoji26c5 {
	background-position: 0 -260px
}

.emoji1f309 {
	background-position: 0 -920px
}

.emoji1f30a {
	background-position: 0 -900px
}

.emoji1f30b {
	background-position: 0 -9200px
}

.emoji1f30c {
	background-position: 0 -920px
}

.emoji1f30f,.emoji1f311 {
	background-position: 0 -9200px
}

.emoji1f313,.emoji1f314,.emoji1f319 {
	background-position: 0 -360px
}

.emoji1f315 {
	background-position: 0 -9200px
}

.emoji1f31b {
	background-position: 0 -360px
}

.emoji1f31f {
	background-position: 0 -10740px
}

.emoji1f320 {
	background-position: 0 -9200px
}

.emoji1f550 {
	background-position: 0 -380px
}

.emoji1f551 {
	background-position: 0 -400px
}

.emoji1f552 {
	background-position: 0 -420px
}

.emoji1f553 {
	background-position: 0 -440px
}

.emoji1f554 {
	background-position: 0 -460px
}

.emoji1f555 {
	background-position: 0 -480px
}

.emoji1f556 {
	background-position: 0 -500px
}

.emoji1f557 {
	background-position: 0 -520px
}

.emoji1f558 {
	background-position: 0 -540px
}

.emoji1f559 {
	background-position: 0 -620px
}

.emoji1f55a {
	background-position: 0 -580px
}

.emoji1f55b {
	background-position: 0 -600px
}

.emoji231a,.emoji231b {
	background-position: 0 -9200px
}

.emoji23f0 {
	background-position: 0 -620px
}

.emoji23f3 {
	background-position: 0 -9200px
}

.emoji2648 {
	background-position: 0 -640px
}

.emoji2649 {
	background-position: 0 -660px
}

.emoji264a {
	background-position: 0 -680px
}

.emoji264b {
	background-position: 0 -700px
}

.emoji264c {
	background-position: 0 -720px
}

.emoji264d {
	background-position: 0 -740px
}

.emoji264e {
	background-position: 0 -760px
}

.emoji264f {
	background-position: 0 -780px
}

.emoji2650 {
	background-position: 0 -800px
}

.emoji2651 {
	background-position: 0 -820px
}

.emoji2652 {
	background-position: 0 -840px
}

.emoji2653 {
	background-position: 0 -860px
}

.emoji26ce {
	background-position: 0 -880px
}

.emoji1f340 {
	background-position: 0 -1220px
}

.emoji1f337 {
	background-position: 0 -960px
}

.emoji1f331 {
	background-position: 0 -1220px
}

.emoji1f341 {
	background-position: 0 -1000px
}

.emoji1f338 {
	background-position: 0 -1020px
}

.emoji1f339 {
	background-position: 0 -1040px
}

.emoji1f342 {
	background-position: 0 -1060px
}

.emoji1f343 {
	background-position: 0 -1080px
}

.emoji1f33a {
	background-position: 0 -1100px
}

.emoji1f33b {
	background-position: 0 -1200px
}

.emoji1f334 {
	background-position: 0 -1140px
}

.emoji1f335 {
	background-position: 0 -1160px
}

.emoji1f33e {
	background-position: 0 -1180px
}

.emoji1f33d,.emoji1f330,.emoji1f344 {
	background-position: 0 -9200px
}

.emoji1f33c {
	background-position: 0 -1200px
}

.emoji1f33f {
	background-position: 0 -1220px
}

.emoji1f34c,.emoji1f352 {
	background-position: 0 -9200px
}

.emoji1f34e {
	background-position: 0 -1360px
}

.emoji1f34a {
	background-position: 0 -1260px
}

.emoji1f353 {
	background-position: 0 -1280px
}

.emoji1f349 {
	background-position: 0 -1300px
}

.emoji1f345 {
	background-position: 0 -1320px
}

.emoji1f346 {
	background-position: 0 -1340px
}

.emoji1f34d,.emoji1f347,.emoji1f348,.emoji1f351 {
	background-position: 0 -9200px
}

.emoji1f34f {
	background-position: 0 -1360px
}

.emoji1f440 {
	background-position: 0 -1380px
}

.emoji1f442 {
	background-position: 0 -1400px
}

.emoji1f443 {
	background-position: 0 -1420px
}

.emoji1f444 {
	background-position: 0 -1440px
}

.emoji1f445 {
	background-position: 0 -3000px
}

.emoji1f484 {
	background-position: 0 -1480px
}

.emoji1f485 {
	background-position: 0 -1500px
}

.emoji1f486 {
	background-position: 0 -1520px
}

.emoji1f487 {
	background-position: 0 -1540px
}

.emoji1f488 {
	background-position: 0 -1560px
}

.emoji1f464 {
	background-position: 0 -9200px
}

.emoji1f466 {
	background-position: 0 -1580px
}

.emoji1f467 {
	background-position: 0 -1600px
}

.emoji1f468 {
	background-position: 0 -1620px
}

.emoji1f469 {
	background-position: 0 -1640px
}

.emoji1f46a {
	background-position: 0 -9200px
}

.emoji1f46b {
	background-position: 0 -1660px
}

.emoji1f46e {
	background-position: 0 -1680px
}

.emoji1f46f {
	background-position: 0 -1700px
}

.emoji1f470 {
	background-position: 0 -9200px
}

.emoji1f471 {
	background-position: 0 -1720px
}

.emoji1f472 {
	background-position: 0 -1740px
}

.emoji1f473 {
	background-position: 0 -1760px
}

.emoji1f474 {
	background-position: 0 -1780px
}

.emoji1f475 {
	background-position: 0 -1800px
}

.emoji1f476 {
	background-position: 0 -1820px
}

.emoji1f477 {
	background-position: 0 -1840px
}

.emoji1f478 {
	background-position: 0 -1860px
}

.emoji1f47a,.emoji1f479 {
	background-position: 0 -9200px
}

.emoji1f47b {
	background-position: 0 -1880px
}

.emoji1f47c {
	background-position: 0 -1900px
}

.emoji1f47d {
	background-position: 0 -1920px
}

.emoji1f47e {
	background-position: 0 -1940px
}

.emoji1f47f {
	background-position: 0 -1960px
}

.emoji1f480 {
	background-position: 0 -1980px
}

.emoji1f481 {
	background-position: 0 -2000px
}

.emoji1f482 {
	background-position: 0 -2020px
}

.emoji1f483 {
	background-position: 0 -2040px
}

.emoji1f40c {
	background-position: 0 -9200px
}

.emoji1f40d {
	background-position: 0 -2620px
}

.emoji1f40e {
	background-position: 0 -6680px
}

.emoji1f414 {
	background-position: 0 -2640px
}

.emoji1f417 {
	background-position: 0 -2660px
}

.emoji1f42b {
	background-position: 0 -2680px
}

.emoji1f418 {
	background-position: 0 -2480px
}

.emoji1f428 {
	background-position: 0 -2500px
}

.emoji1f412 {
	background-position: 0 -2520px
}

.emoji1f411 {
	background-position: 0 -2540px
}

.emoji1f419 {
	background-position: 0 -2340px
}

.emoji1f41a {
	background-position: 0 -2360px
}

.emoji1f41b {
	background-position: 0 -2460px
}

.emoji1f41c,.emoji1f41d,.emoji1f41e {
	background-position: 0 -9200px
}

.emoji1f420 {
	background-position: 0 -2420px
}

.emoji1f421 {
	background-position: 0 -7360px
}

.emoji1f422 {
	background-position: 0 -9200px
}

.emoji1f424,.emoji1f425 {
	background-position: 0 -2140px
}

.emoji1f426 {
	background-position: 0 -2400px
}

.emoji1f423 {
	background-position: 0 -2140px
}

.emoji1f427 {
	background-position: 0 -2160px
}

.emoji1f429 {
	background-position: 0 -2720px
}

.emoji1f41f {
	background-position: 0 -7360px
}

.emoji1f42c {
	background-position: 0 -2380px
}

.emoji1f42d {
	background-position: 0 -2280px
}

.emoji1f42f {
	background-position: 0 -2240px
}

.emoji1f431 {
	background-position: 0 -2080px
}

.emoji1f433 {
	background-position: 0 -2300px
}

.emoji1f434 {
	background-position: 0 -2200px
}

.emoji1f435 {
	background-position: 0 -2320px
}

.emoji1f436 {
	background-position: 0 -2720px
}

.emoji1f437 {
	background-position: 0 -2780px
}

.emoji1f43b {
	background-position: 0 -2260px
}

.emoji1f439 {
	background-position: 0 -2440px
}

.emoji1f43a {
	background-position: 0 -2560px
}

.emoji1f42e {
	background-position: 0 -2580px
}

.emoji1f430 {
	background-position: 0 -2600px
}

.emoji1f438 {
	background-position: 0 -2700px
}

.emoji1f43e {
	background-position: 0 -6460px
}

.emoji1f43c,.emoji1f432 {
	background-position: 0 -9200px
}

.emoji1f43d {
	background-position: 0 -2780px
}

.emoji1f620 {
	background-position: 0 -2800px
}

.emoji1f629 {
	background-position: 0 -3860px
}

.emoji1f632 {
	background-position: 0 -2840px
}

.emoji1f61e {
	background-position: 0 -2860px
}

.emoji1f635 {
	background-position: 0 -3540px
}

.emoji1f630 {
	background-position: 0 -2900px
}

.emoji1f612 {
	background-position: 0 -2920px
}

.emoji1f60d {
	background-position: 0 -3660px
}

.emoji1f624 {
	background-position: 0 -3720px
}

.emoji1f61c {
	background-position: 0 -2980px
}

.emoji1f61d {
	background-position: 0 -3000px
}

.emoji1f60b {
	background-position: 0 -3220px
}

.emoji1f618 {
	background-position: 0 -3640px
}

.emoji1f61a {
	background-position: 0 -3060px
}

.emoji1f637 {
	background-position: 0 -3080px
}

.emoji1f633 {
	background-position: 0 -3100px
}

.emoji1f603 {
	background-position: 0 -3580px
}

.emoji1f605 {
	background-position: 0 -3260px
}

.emoji1f606 {
	background-position: 0 -3380px
}

.emoji1f601 {
	background-position: 0 -3720px
}

.emoji1f602 {
	background-position: 0 -3620px
}

.emoji1f60a {
	background-position: 0 -3220px
}

.emoji263a {
	background-position: 0 -3240px
}

.emoji1f604 {
	background-position: 0 -3260px
}

.emoji1f622 {
	background-position: 0 -3680px
}

.emoji1f62d {
	background-position: 0 -3300px
}

.emoji1f628 {
	background-position: 0 -3320px
}

.emoji1f623 {
	background-position: 0 -3540px
}

.emoji1f621 {
	background-position: 0 -3880px
}

.emoji1f60c {
	background-position: 0 -3380px
}

.emoji1f616 {
	background-position: 0 -10520px
}

.emoji1f614 {
	background-position: 0 -3860px
}

.emoji1f631 {
	background-position: 0 -3440px
}

.emoji1f62a {
	background-position: 0 -3460px
}

.emoji1f60f {
	background-position: 0 -3480px
}

.emoji1f613 {
	background-position: 0 -3500px
}

.emoji1f625 {
	background-position: 0 -3520px
}

.emoji1f62b {
	background-position: 0 -3540px
}

.emoji1f609 {
	background-position: 0 -3560px
}

.emoji1f63a {
	background-position: 0 -3580px
}

.emoji1f638 {
	background-position: 0 -3720px
}

.emoji1f639 {
	background-position: 0 -3620px
}

.emoji1f63d {
	background-position: 0 -3640px
}

.emoji1f63b {
	background-position: 0 -3660px
}

.emoji1f63f {
	background-position: 0 -3680px
}

.emoji1f63e {
	background-position: 0 -3880px
}

.emoji1f63c {
	background-position: 0 -3720px
}

.emoji1f640 {
	background-position: 0 -3860px
}

.emoji1f645 {
	background-position: 0 -3760px
}

.emoji1f646 {
	background-position: 0 -3780px
}

.emoji1f647 {
	background-position: 0 -3800px
}

.emoji1f64a,.emoji1f648,.emoji1f649 {
	background-position: 0 -9200px
}

.emoji1f64b {
	background-position: 0 -11240px
}

.emoji1f64c {
	background-position: 0 -3840px
}

.emoji1f64d {
	background-position: 0 -3860px
}

.emoji1f64e {
	background-position: 0 -3880px
}

.emoji1f64f {
	background-position: 0 -3900px
}

.emoji1f3e0,.emoji1f3e1 {
	background-position: 0 -3940px
}

.emoji1f3e2 {
	background-position: 0 -3960px
}

.emoji1f3e3 {
	background-position: 0 -3980px
}

.emoji1f3e5 {
	background-position: 0 -4000px
}

.emoji1f3e6 {
	background-position: 0 -4020px
}

.emoji1f3e7 {
	background-position: 0 -4040px
}

.emoji1f3e8 {
	background-position: 0 -4060px
}

.emoji1f3e9 {
	background-position: 0 -4080px
}

.emoji1f3ea {
	background-position: 0 -4100px
}

.emoji1f3eb {
	background-position: 0 -4120px
}

.emoji26ea {
	background-position: 0 -4140px
}

.emoji26f2 {
	background-position: 0 -4160px
}

.emoji1f3ec {
	background-position: 0 -4180px
}

.emoji1f3ef {
	background-position: 0 -4200px
}

.emoji1f3f0 {
	background-position: 0 -4220px
}

.emoji1f3ed {
	background-position: 0 -4240px
}

.emoji2693 {
	background-position: 0 -6920px
}

.emoji1f3ee {
	background-position: 0 -8800px
}

.emoji1f5fb {
	background-position: 0 -4300px
}

.emoji1f5fc {
	background-position: 0 -4320px
}

.emoji1f5fd {
	background-position: 0 -4340px
}

.emoji1f5fe,.emoji1f5ff {
	background-position: 0 -9200px
}

.emoji1f45e,.emoji1f45f {
	background-position: 0 -4400px
}

.emoji1f460 {
	background-position: 0 -4420px
}

.emoji1f461 {
	background-position: 0 -4440px
}

.emoji1f462 {
	background-position: 0 -4460px
}

.emoji1f463 {
	background-position: 0 -6460px
}

.emoji1f453 {
	background-position: 0 -9200px
}

.emoji1f455 {
	background-position: 0 -4620px
}

.emoji1f456 {
	background-position: 0 -9200px
}

.emoji1f451 {
	background-position: 0 -4500px
}

.emoji1f454 {
	background-position: 0 -4520px
}

.emoji1f452 {
	background-position: 0 -4540px
}

.emoji1f457 {
	background-position: 0 -4560px
}

.emoji1f458 {
	background-position: 0 -4580px
}

.emoji1f459 {
	background-position: 0 -4600px
}

.emoji1f45a {
	background-position: 0 -4620px
}

.emoji1f45b {
	background-position: 0 -9200px
}

.emoji1f45c {
	background-position: 0 -4960px
}

.emoji1f45d {
	background-position: 0 -9200px
}

.emoji1f4b0 {
	background-position: 0 -4720px
}

.emoji1f4b1 {
	background-position: 0 -4660px
}

.emoji1f4b9 {
	background-position: 0 -6380px
}

.emoji1f4b2 {
	background-position: 0 -4720px
}

.emoji1f4b3,.emoji1f4b4 {
	background-position: 0 -9200px
}

.emoji1f4b5 {
	background-position: 0 -4720px
}

.emoji1f4b8 {
	background-position: 0 -9200px
}

.emoji1f1e81f1f3 {
	background-position: 0 -4740px
}

.emoji1f1e91f1ea {
	background-position: 0 -4760px
}

.emoji1f1ea1f1f8 {
	background-position: 0 -4780px
}

.emoji1f1eb1f1f7 {
	background-position: 0 -4800px
}

.emoji1f1ec1f1e7 {
	background-position: 0 -4820px
}

.emoji1f1ee1f1f9 {
	background-position: 0 -4840px
}

.emoji1f1ef1f1f5 {
	background-position: 0 -4860px
}

.emoji1f1f01f1f7 {
	background-position: 0 -4880px
}

.emoji1f1f71f1fa {
	background-position: 0 -4900px
}

.emoji1f1fa1f1f8 {
	background-position: 0 -4920px
}

.emoji1f525 {
	background-position: 0 -5040px
}

.emoji1f526,.emoji1f527 {
	background-position: 0 -9200px
}

.emoji1f528 {
	background-position: 0 -4360px
}

.emoji1f52a,.emoji1f529 {
	background-position: 0 -9200px
}

.emoji1f52b {
	background-position: 0 -5020px
}

.emoji1f52e,.emoji1f52f {
	background-position: 0 -5080px
}

.emoji1f530 {
	background-position: 0 -9660px
}

.emoji1f531 {
	background-position: 0 -9680px
}

.emoji1f489 {
	background-position: 0 -5300px
}

.emoji1f48a {
	background-position: 0 -5320px
}

.emoji1f170 {
	background-position: 0 -5340px
}

.emoji1f171 {
	background-position: 0 -5360px
}

.emoji1f18e {
	background-position: 0 -5380px
}

.emoji1f17e {
	background-position: 0 -5400px
}

.emoji1f380 {
	background-position: 0 -5420px
}

.emoji1f381 {
	background-position: 0 -6080px
}

.emoji1f382 {
	background-position: 0 -5460px
}

.emoji1f384 {
	background-position: 0 -5480px
}

.emoji1f385 {
	background-position: 0 -5500px
}

.emoji1f38c {
	background-position: 0 -5520px
}

.emoji1f386 {
	background-position: 0 -5540px
}

.emoji1f388 {
	background-position: 0 -5560px
}

.emoji1f389 {
	background-position: 0 -5580px
}

.emoji1f38d {
	background-position: 0 -5600px
}

.emoji1f38e {
	background-position: 0 -5620px
}

.emoji1f393 {
	background-position: 0 -5640px
}

.emoji1f392 {
	background-position: 0 -5660px
}

.emoji1f38f {
	background-position: 0 -5680px
}

.emoji1f387 {
	background-position: 0 -5700px
}

.emoji1f390 {
	background-position: 0 -5720px
}

.emoji1f383 {
	background-position: 0 -5740px
}

.emoji1f38a,.emoji1f38b {
	background-position: 0 -9200px
}

.emoji1f391 {
	background-position: 0 -5760px
}

.emoji1f4df {
	background-position: 0 -9200px
}

.emoji1f4de,.emoji260e {
	background-position: 0 -5800px
}

.emoji1f4f1 {
	background-position: 0 -5820px
}

.emoji1f4f2 {
	background-position: 0 -5840px
}

.emoji1f4dd {
	background-position: 0 -6440px
}

.emoji1f4e0 {
	background-position: 0 -5880px
}

.emoji1f4e8,.emoji1f4e9,.emoji2709 {
	background-position: 0 -11200px
}

.emoji1f4ea,.emoji1f4eb {
	background-position: 0 -5980px
}

.emoji1f4ee {
	background-position: 0 -6000px
}

.emoji1f4f0 {
	background-position: 0 -9200px
}

.emoji1f4e2 {
	background-position: 0 -6020px
}

.emoji1f4e3 {
	background-position: 0 -6040px
}

.emoji1f4e1 {
	background-position: 0 -6060px
}

.emoji1f4e4,.emoji1f4e5 {
	background-position: 0 -9200px
}

.emoji1f4e6 {
	background-position: 0 -6080px
}

.emoji1f4e7 {
	background-position: 0 -11200px
}

.emoji1f520,.emoji1f521,.emoji1f522,.emoji1f523,.emoji1f524,.emoji2712 {
	background-position: 0 -9200px
}

.emoji1f4ba {
	background-position: 0 -6100px
}

.emoji1f4bb {
	background-position: 0 -6120px
}

.emoji270f {
	background-position: 0 -6440px
}

.emoji1f4ce {
	background-position: 0 -9200px
}

.emoji1f4bc {
	background-position: 0 -6160px
}

.emoji1f4bd,.emoji1f4be {
	background-position: 0 -6200px
}

.emoji1f4bf {
	background-position: 0 -7800px
}

.emoji1f4c0 {
	background-position: 0 -7820px
}

.emoji2702 {
	background-position: 0 -6220px
}

.emoji1f4cd {
	background-position: 0 -9200px
}

.emoji1f4c3,.emoji1f4c4 {
	background-position: 0 -6440px
}

.emoji1f4c1,.emoji1f4c2,.emoji1f4c5 {
	background-position: 0 -9200px
}

.emoji1f4d3,.emoji1f4d4,.emoji1f4d5,.emoji1f4d6,.emoji1f4d7,.emoji1f4d8,.emoji1f4d9,.emoji1f4da {
	background-position: 0 -6420px
}

.emoji1f4db,.emoji1f4dc {
	background-position: 0 -9200px
}

.emoji1f4cb {
	background-position: 0 -6440px
}

.emoji1f4c6 {
	background-position: 0 -9200px
}

.emoji1f4c8,.emoji1f4ca {
	background-position: 0 -6380px
}

.emoji1f4c9 {
	background-position: 0 -9200px
}

.emoji1f4c7 {
	background-position: 0 -6420px
}

.emoji1f4cc {
	background-position: 0 -9200px
}

.emoji1f4d2 {
	background-position: 0 -6420px
}

.emoji1f4cf,.emoji1f4d0 {
	background-position: 0 -9200px
}

.emoji1f4d1 {
	background-position: 0 -6440px
}

.emoji1f3bd {
	background-position: 0 -9200px
}

.emoji26be {
	background-position: 0 -6480px
}

.emoji26f3 {
	background-position: 0 -6500px
}

.emoji1f3be {
	background-position: 0 -6520px
}

.emoji26bd {
	background-position: 0 -6540px
}

.emoji1f3bf {
	background-position: 0 -6560px
}

.emoji1f3c0 {
	background-position: 0 -6580px
}

.emoji1f3c1 {
	background-position: 0 -6600px
}

.emoji1f3c2 {
	background-position: 0 -9200px
}

.emoji1f3c3 {
	background-position: 0 -6620px
}

.emoji1f3c4 {
	background-position: 0 -6640px
}

.emoji1f3c6 {
	background-position: 0 -6660px
}

.emoji1f3c8 {
	background-position: 0 -6700px
}

.emoji1f3ca {
	background-position: 0 -6720px
}

.emoji1f683 {
	background-position: 0 -6740px
}

.emoji1f687,.emoji24c2 {
	background-position: 0 -6780px
}

.emoji1f684 {
	background-position: 0 -6800px
}

.emoji1f685 {
	background-position: 0 -6820px
}

.emoji1f697 {
	background-position: 0 -6840px
}

.emoji1f699 {
	background-position: 0 -6860px
}

.emoji1f68c {
	background-position: 0 -6880px
}

.emoji1f68f {
	background-position: 0 -6900px
}

.emoji1f6a2 {
	background-position: 0 -6920px
}

.emoji2708 {
	background-position: 0 -6940px
}

.emoji26f5 {
	background-position: 0 -6960px
}

.emoji1f689 {
	background-position: 0 -7000px
}

.emoji1f680 {
	background-position: 0 -7020px
}

.emoji1f6a4 {
	background-position: 0 -7040px
}

.emoji1f695 {
	background-position: 0 -7060px
}

.emoji1f69a {
	background-position: 0 -7100px
}

.emoji1f692 {
	background-position: 0 -7120px
}

.emoji1f691 {
	background-position: 0 -7140px
}

.emoji1f693 {
	background-position: 0 -7260px
}

.emoji26fd {
	background-position: 0 -7180px
}

.emoji1f17f {
	background-position: 0 -7200px
}

.emoji1f6a5 {
	background-position: 0 -7220px
}

.emoji1f6a7 {
	background-position: 0 -9720px
}

.emoji1f6a8 {
	background-position: 0 -7260px
}

.emoji2668 {
	background-position: 0 -7280px
}

.emoji26fa {
	background-position: 0 -7300px
}

.emoji1f3a0 {
	background-position: 0 -9200px
}

.emoji1f3a1 {
	background-position: 0 -7320px
}

.emoji1f3a2 {
	background-position: 0 -7340px
}

.emoji1f3a3 {
	background-position: 0 -7360px
}

.emoji1f3a4 {
	background-position: 0 -7380px
}

.emoji1f3a5 {
	background-position: 0 -7400px
}

.emoji1f3a6 {
	background-position: 0 -7420px
}

.emoji1f3a7 {
	background-position: 0 -7440px
}

.emoji1f3a8 {
	background-position: 0 -7460px
}

.emoji1f3a9 {
	background-position: 0 -7540px
}

.emoji1f3aa {
	background-position: 0 -9200px
}

.emoji1f3ab {
	background-position: 0 -7500px
}

.emoji1f3ac {
	background-position: 0 -7520px
}

.emoji1f3ad {
	background-position: 0 -7540px
}

.emoji1f3ae {
	background-position: 0 -9200px
}

.emoji1f004 {
	background-position: 0 -7560px
}

.emoji1f3af {
	background-position: 0 -7580px
}

.emoji1f3b0 {
	background-position: 0 -7600px
}

.emoji1f3b1 {
	background-position: 0 -7620px
}

.emoji1f0cf,.emoji1f3b2,.emoji1f3b3,.emoji1f3b4 {
	background-position: 0 -9200px
}

.emoji1f3b5 {
	background-position: 0 -7640px
}

.emoji1f3b6 {
	background-position: 0 -7740px
}

.emoji1f3b7 {
	background-position: 0 -7680px
}

.emoji1f3b8 {
	background-position: 0 -7700px
}

.emoji1f3b9 {
	background-position: 0 -9200px
}

.emoji1f3ba {
	background-position: 0 -7720px
}

.emoji1f3bb {
	background-position: 0 -9200px
}

.emoji1f3bc {
	background-position: 0 -7740px
}

.emoji303d {
	background-position: 0 -7760px
}

.emoji1f4f7 {
	background-position: 0 -4940px
}

.emoji1f4f9 {
	background-position: 0 -7400px
}

.emoji1f4fa {
	background-position: 0 -7780px
}

.emoji1f4fb {
	background-position: 0 -7840px
}

.emoji1f4fc {
	background-position: 0 -7860px
}

.emoji1f48b {
	background-position: 0 -7900px
}

.emoji1f48c {
	background-position: 0 -11200px
}

.emoji1f48d {
	background-position: 0 -7940px
}

.emoji1f48e {
	background-position: 0 -7960px
}

.emoji1f48f {
	background-position: 0 -7980px
}

.emoji1f490 {
	background-position: 0 -8000px
}

.emoji1f491 {
	background-position: 0 -8020px
}

.emoji1f492 {
	background-position: 0 -8040px
}

.emoji1f51e {
	background-position: 0 -9860px
}

.emojia9 {
	background-position: 0 -9900px
}

.emojiae {
	background-position: 0 -9920px
}

.emoji2122 {
	background-position: 0 -9940px
}

.emoji2139 {
	background-position: 0 -9200px
}

.emoji2320e3 {
	background-position: 0 -8060px
}

.emoji3120e3 {
	background-position: 0 -8080px
}

.emoji3220e3 {
	background-position: 0 -8100px
}

.emoji3320e3 {
	background-position: 0 -8120px
}

.emoji3420e3 {
	background-position: 0 -8140px
}

.emoji3520e3 {
	background-position: 0 -8160px
}

.emoji3620e3 {
	background-position: 0 -8180px
}

.emoji3720e3 {
	background-position: 0 -8200px
}

.emoji3820e3 {
	background-position: 0 -8220px
}

.emoji3920e3 {
	background-position: 0 -8240px
}

.emoji3020e3 {
	background-position: 0 -8260px
}

.emoji1f51f {
	background-position: 0 -9200px
}

.emoji1f4f6 {
	background-position: 0 -8280px
}

.emoji1f4f3 {
	background-position: 0 -8300px
}

.emoji1f4f4 {
	background-position: 0 -8320px
}

.emoji1f354 {
	background-position: 0 -8340px
}

.emoji1f359 {
	background-position: 0 -8360px
}

.emoji1f370 {
	background-position: 0 -8380px
}

.emoji1f35c {
	background-position: 0 -8400px
}

.emoji1f35e {
	background-position: 0 -8420px
}

.emoji1f373 {
	background-position: 0 -8440px
}

.emoji1f366 {
	background-position: 0 -8460px
}

.emoji1f35f {
	background-position: 0 -8480px
}

.emoji1f361 {
	background-position: 0 -8500px
}

.emoji1f358 {
	background-position: 0 -8520px
}

.emoji1f35a {
	background-position: 0 -8540px
}

.emoji1f35d {
	background-position: 0 -8560px
}

.emoji1f35b {
	background-position: 0 -8580px
}

.emoji1f362 {
	background-position: 0 -8600px
}

.emoji1f363 {
	background-position: 0 -8620px
}

.emoji1f371 {
	background-position: 0 -8640px
}

.emoji1f372 {
	background-position: 0 -8660px
}

.emoji1f367 {
	background-position: 0 -8680px
}

.emoji1f36a,.emoji1f36b,.emoji1f36c,.emoji1f36d,.emoji1f36e,.emoji1f36f,.emoji1f355,.emoji1f356,.emoji1f357,.emoji1f360,.emoji1f364,.emoji1f365,.emoji1f368,.emoji1f369 {
	background-position: 0 -9200px
}

.emoji1f374 {
	background-position: 0 -8700px
}

.emoji2615 {
	background-position: 0 -8720px
}

.emoji1f378 {
	background-position: 0 -8860px
}

.emoji1f37a {
	background-position: 0 -8760px
}

.emoji1f375 {
	background-position: 0 -8780px
}

.emoji1f376 {
	background-position: 0 -8800px
}

.emoji1f377 {
	background-position: 0 -8860px
}

.emoji1f37b {
	background-position: 0 -8840px
}

.emoji1f379 {
	background-position: 0 -8860px
}

.emoji2197 {
	background-position: 0 -8960px
}

.emoji2198 {
	background-position: 0 -8980px
}

.emoji2196 {
	background-position: 0 -8920px
}

.emoji2199 {
	background-position: 0 -8940px
}

.emoji2934 {
	background-position: 0 -8960px
}

.emoji2935 {
	background-position: 0 -8980px
}

.emoji2194,.emoji2195 {
	background-position: 0 -9200px
}

.emoji2b06 {
	background-position: 0 -9000px
}

.emoji2b07 {
	background-position: 0 -9020px
}

.emoji27a1 {
	background-position: 0 -9040px
}

.emoji2b05 {
	background-position: 0 -11180px
}

.emoji25b6 {
	background-position: 0 -9080px
}

.emoji25c0 {
	background-position: 0 -9100px
}

.emoji23e9 {
	background-position: 0 -9120px
}

.emoji23ea {
	background-position: 0 -9140px
}

.emoji1f53a,.emoji1f53b,.emoji1f53c,.emoji1f53d,.emoji23eb,.emoji23ec {
	background-position: 0 -9200px
}

.emoji2b55 {
	background-position: 0 -9800px
}

.emoji274c,.emoji274e {
	background-position: 0 -10340px
}

.emoji2757 {
	background-position: 0 -9160px
}

.emoji203c,.emoji2049 {
	background-position: 0 -9200px
}

.emoji2753 {
	background-position: 0 -9180px
}

.emoji2754 {
	background-position: 0 -9200px
}

.emoji2755 {
	background-position: 0 -9220px
}

.emoji27b0,.emoji27bf,.emoji3030 {
	background-position: 0 -9200px
}

.emoji2764 {
	background-position: 0 -9240px
}

.emoji1f493 {
	background-position: 0 -9480px
}

.emoji1f494 {
	background-position: 0 -9280px
}

.emoji1f495,.emoji1f496 {
	background-position: 0 -9480px
}

.emoji1f497 {
	background-position: 0 -9340px
}

.emoji1f498 {
	background-position: 0 -9360px
}

.emoji1f499 {
	background-position: 0 -9380px
}

.emoji1f49a {
	background-position: 0 -9400px
}

.emoji1f49b {
	background-position: 0 -9420px
}

.emoji1f49c {
	background-position: 0 -9440px
}

.emoji1f49d {
	background-position: 0 -9460px
}

.emoji1f49e {
	background-position: 0 -9480px
}

.emoji1f49f {
	background-position: 0 -9500px
}

.emoji2665 {
	background-position: 0 -9520px
}

.emoji2660 {
	background-position: 0 -9540px
}

.emoji2666 {
	background-position: 0 -9560px
}

.emoji2663 {
	background-position: 0 -9580px
}

.emoji1f6ac {
	background-position: 0 -9600px
}

.emoji1f6ad {
	background-position: 0 -9620px
}

.emoji267f {
	background-position: 0 -9640px
}

.emoji1f6a9 {
	background-position: 0 -9200px
}

.emoji26a0 {
	background-position: 0 -9700px
}

.emoji26d4 {
	background-position: 0 -9720px
}

.emoji267b {
	background-position: 0 -9200px
}

.emoji1f6b2 {
	background-position: 0 -6980px
}

.emoji1f6b6 {
	background-position: 0 -7080px
}

.emoji1f6b9 {
	background-position: 0 -9740px
}

.emoji1f6ba {
	background-position: 0 -9760px
}

.emoji1f6c0 {
	background-position: 0 -5220px
}

.emoji1f6bb {
	background-position: 0 -5240px
}

.emoji1f6bd {
	background-position: 0 -5260px
}

.emoji1f6be {
	background-position: 0 -5280px
}

.emoji1f6bc {
	background-position: 0 -9780px
}

.emoji1f6aa,.emoji1f6ab,.emoji1f191,.emoji2714 {
	background-position: 0 -9200px
}

.emoji1f192 {
	background-position: 0 -10020px
}

.emoji1f193 {
	background-position: 0 -9200px
}

.emoji1f194 {
	background-position: 0 -11020px
}

.emoji1f195 {
	background-position: 0 -9980px
}

.emoji1f196 {
	background-position: 0 -9200px
}

.emoji1f197 {
	background-position: 0 -9880px
}

.emoji1f198 {
	background-position: 0 -9200px
}

.emoji1f199 {
	background-position: 0 -10000px
}

.emoji1f19a {
	background-position: 0 -9960px
}

.emoji1f201 {
	background-position: 0 -10060px
}

.emoji1f202 {
	background-position: 0 -10080px
}

.emoji1f232 {
	background-position: 0 -9200px
}

.emoji1f233 {
	background-position: 0 -10100px
}

.emoji1f234 {
	background-position: 0 -9200px
}

.emoji1f235 {
	background-position: 0 -10120px
}

.emoji1f236 {
	background-position: 0 -10140px
}

.emoji1f21a {
	background-position: 0 -10160px
}

.emoji1f237 {
	background-position: 0 -10180px
}

.emoji1f238 {
	background-position: 0 -10200px
}

.emoji1f239 {
	background-position: 0 -10220px
}

.emoji1f22f {
	background-position: 0 -10240px
}

.emoji1f23a {
	background-position: 0 -10260px
}

.emoji3299 {
	background-position: 0 -10280px
}

.emoji3297 {
	background-position: 0 -10300px
}

.emoji1f250 {
	background-position: 0 -10320px
}

.emoji1f251,.emoji2795,.emoji2796 {
	background-position: 0 -9200px
}

.emoji2716 {
	background-position: 0 -10340px
}

.emoji1f4a0,.emoji2797 {
	background-position: 0 -9200px
}

.emoji1f4a1 {
	background-position: 0 -10360px
}

.emoji1f4a2 {
	background-position: 0 -10380px
}

.emoji1f4a3 {
	background-position: 0 -10400px
}

.emoji1f4a4 {
	background-position: 0 -10420px
}

.emoji1f4a5 {
	background-position: 0 -9200px
}

.emoji1f4a6,.emoji1f4a7 {
	background-position: 0 -10460px
}

.emoji1f4a8 {
	background-position: 0 -10480px
}

.emoji1f4a9 {
	background-position: 0 -5000px
}

.emoji1f4aa {
	background-position: 0 -10500px
}

.emoji1f4ab {
	background-position: 0 -10520px
}

.emoji1f4ac {
	background-position: 0 -9200px
}

.emoji2728 {
	background-position: 0 -11000px
}

.emoji2734 {
	background-position: 0 -10560px
}

.emoji2733 {
	background-position: 0 -10580px
}

.emoji1f534,.emoji26aa,.emoji26ab {
	background-position: 0 -10640px
}

.emoji1f532,.emoji1f535 {
	background-position: 0 -10900px
}

.emoji1f533 {
	background-position: 0 -10980px
}

.emoji2b50 {
	background-position: 0 -10720px
}

.emoji2b1c {
	background-position: 0 -10980px
}

.emoji2b1b {
	background-position: 0 -10900px
}

.emoji25ab {
	background-position: 0 -10980px
}

.emoji25aa {
	background-position: 0 -10900px
}

.emoji25fd {
	background-position: 0 -10980px
}

.emoji25fe {
	background-position: 0 -10900px
}

.emoji25fb {
	background-position: 0 -10980px
}

.emoji25fc {
	background-position: 0 -10900px
}

.emoji1f536,.emoji1f537,.emoji1f538,.emoji1f539 {
	background-position: 0 -10980px
}

.emoji2747 {
	background-position: 0 -11000px
}

.emoji1f4ae,.emoji1f4af,.emoji1f503,.emoji21a9,.emoji21aa {
	background-position: 0 -9200px
}

.emoji1f50a {
	background-position: 0 -7880px
}

.emoji1f50b,.emoji1f50c {
	background-position: 0 -9200px
}

.emoji1f50d,.emoji1f50e {
	background-position: 0 -11060px
}

.emoji1f512 {
	background-position: 0 -11140px
}

.emoji1f513 {
	background-position: 0 -11100px
}

.emoji1f50f,.emoji1f510 {
	background-position: 0 -11140px
}

.emoji1f511 {
	background-position: 0 -11160px
}

.emoji1f514 {
	background-position: 0 -4980px
}

.emoji1f516,.emoji1f517,.emoji1f518,.emoji2611 {
	background-position: 0 -9200px
}

.emoji1f519 {
	background-position: 0 -11180px
}

.emoji1f51a,.emoji1f51b,.emoji1f51c {
	background-position: 0 -9200px
}

.emoji1f51d {
	background-position: 0 -10040px
}

.emoji2002,.emoji2003,.emoji2005,.emoji2705 {
	background-position: 0 -9200px
}

.emoji270a {
	background-position: 0 -11220px
}

.emoji270b {
	background-position: 0 -11240px
}

.emoji270c {
	background-position: 0 -11260px
}

.emoji1f44a {
	background-position: 0 -11280px
}

.emoji1f44d {
	background-position: 0 -11300px
}

.emoji261d {
	background-position: 0 -11320px
}

.emoji1f446 {
	background-position: 0 -11340px
}

.emoji1f447 {
	background-position: 0 -11360px
}

.emoji1f448 {
	background-position: 0 -11380px
}

.emoji1f449 {
	background-position: 0 -11400px
}

.emoji1f44b {
	background-position: 0 -11420px
}

.emoji1f44f {
	background-position: 0 -11440px
}

.emoji1f44c {
	background-position: 0 -11460px
}

.emoji1f44e {
	background-position: 0 -11480px
}

.emoji1f450 {
	background-position: 0 -11500px
}

.emoji_face .emoji0 {
	background-position: 2px 2px
}

.emoji_face .emoji1 {
	background-position: -30px 2px
}

.emoji_face .emoji2 {
	background-position: -62px 2px
}

.emoji_face .emoji3 {
	background-position: -94px 2px
}

.emoji_face .emoji4 {
	background-position: -126px 2px
}

.emoji_face .emoji5 {
	background-position: -158px 2px
}

.emoji_face .emoji6 {
	background-position: -190px 2px
}

.emoji_face .emoji7 {
	background-position: -222px 2px
}

.emoji_face .emoji8 {
	background-position: -254px 2px
}

.emoji_face .emoji9 {
	background-position: -286px 2px
}

.emoji_face .emoji10 {
	background-position: -318px 2px
}

.emoji_face .emoji11 {
	background-position: -350px 2px
}

.emoji_face .emoji12 {
	background-position: -382px 2px
}

.emoji_face .emoji13 {
	background-position: -414px 2px
}

.emoji_face .emoji14 {
	background-position: -446px 2px
}

.emoji_face .emoji15 {
	background-position: 2px -30px
}

.emoji_face .emoji16 {
	background-position: -30px -30px
}

.emoji_face .emoji17 {
	background-position: -62px -30px
}

.emoji_face .emoji18 {
	background-position: -94px -30px
}

.emoji_face .emoji19 {
	background-position: -126px -30px
}

.emoji_face .emoji20 {
	background-position: -158px -30px
}

.emoji_face .emoji21 {
	background-position: -190px -30px
}

.emoji_face .emoji22 {
	background-position: -222px -30px
}

.emoji_face .emoji23 {
	background-position: -254px -30px
}

.emoji_face .emoji24 {
	background-position: -286px -30px
}

.emoji_face .emoji25 {
	background-position: -318px -30px
}

.emoji_face .emoji26 {
	background-position: -350px -30px
}

.emoji_face .emoji27 {
	background-position: -382px -30px
}

.emoji_face .emoji28 {
	background-position: -414px -30px
}

.emoji_face .emoji29 {
	background-position: -446px -30px
}

.emoji_face .emoji30 {
	background-position: 2px -62px
}

.emoji_face .emoji31 {
	background-position: -30px -62px
}

.emoji_face .emoji32 {
	background-position: -62px -62px
}

.emoji_face .emoji33 {
	background-position: -94px -62px
}

.emoji_face .emoji34 {
	background-position: -126px -62px
}

.emoji_face .emoji35 {
	background-position: -158px -62px
}

.emoji_face .emoji36 {
	background-position: -190px -62px
}

.emoji_face .emoji37 {
	background-position: -222px -62px
}

.emoji_face .emoji38 {
	background-position: -254px -62px
}

.emoji_face .emoji39 {
	background-position: -286px -62px
}

.emoji_face .emoji40 {
	background-position: -318px -62px
}

.emoji_face .emoji41 {
	background-position: -350px -62px
}

.emoji_face .emoji42 {
	background-position: -382px -62px
}

.emoji_face .emoji43 {
	background-position: -414px -62px
}

.emoji_face .emoji44 {
	background-position: -446px -62px
}

.emoji_face .emoji45 {
	background-position: 2px -94px
}

.emoji_face .emoji46 {
	background-position: -30px -94px
}

.emoji_face .emoji47 {
	background-position: -62px -94px
}

.emoji_face .emoji48 {
	background-position: -94px -94px
}

.emoji_face .emoji49 {
	background-position: -126px -94px
}

.emoji_face .emoji50 {
	background-position: -158px -94px
}

.emoji_face .emoji51 {
	background-position: -190px -94px
}

.emoji_face .emoji52 {
	background-position: -222px -94px
}

.emoji_face .emoji53 {
	background-position: -254px -94px
}

.emoji_face .emoji54 {
	background-position: -286px -94px
}

.emoji_face .emoji55 {
	background-position: -318px -94px
}

.emoji_face .emoji56 {
	background-position: -350px -94px
}

.emoji_face .emoji57 {
	background-position: -382px -94px
}

.emoji_face .emoji58 {
	background-position: -414px -94px
}

.emoji_face .emoji59 {
	background-position: -446px -94px
}

.emoji_face .emoji60 {
	background-position: 2px -126px
}

.emoji_face .emoji61 {
	background-position: -30px -126px
}

.emoji_face .emoji62 {
	background-position: -62px -126px
}

.emoji_face .emoji63 {
	background-position: -94px -126px
}

.emoji_face .emoji64 {
	background-position: -126px -126px
}

.emoji_face .emoji65 {
	background-position: -158px -126px
}

.emoji_face .emoji66 {
	background-position: -190px -126px
}

.emoji_face .emoji67 {
	background-position: -222px -126px
}

.emoji_face .emoji68 {
	background-position: -254px -126px
}

.emoji_face .emoji69 {
	background-position: -286px -126px
}

.emoji_face .emoji70 {
	background-position: -318px -126px
}

.emoji_face .emoji71 {
	background-position: -350px -126px
}

.emoji_face .emoji72 {
	background-position: -382px -126px
}

.emoji_face .emoji73 {
	background-position: -414px -126px
}

.emoji_face .emoji74 {
	background-position: -446px -126px
}

.emoji_face .emoji75 {
	background-position: 2px -158px
}

.emoji_face .emoji76 {
	background-position: -30px -158px
}

.emoji_face .emoji77 {
	background-position: -62px -158px
}

.emoji_face .emoji78 {
	background-position: -94px -158px
}

.emoji_face .emoji79 {
	background-position: -126px -158px
}

.emoji_face .emoji80 {
	background-position: -158px -158px
}

.emoji_face .emoji81 {
	background-position: -190px -158px
}

.emoji_face .emoji82 {
	background-position: -222px -158px
}

.emoji_face .emoji83 {
	background-position: -254px -158px
}

.emoji_face .emoji84 {
	background-position: -286px -158px
}

.emoji_face .emoji85 {
	background-position: -318px -158px
}

.emoji_face .emoji86 {
	background-position: -350px -158px
}

.emoji_face .emoji87 {
	background-position: -382px -158px
}

.emoji_face .emoji88 {
	background-position: -414px -158px
}

.emoji_face .emoji89 {
	background-position: -446px -158px
}

.emoji_face .emoji90 {
	background-position: 2px -190px
}

.emoji_face .emoji91 {
	background-position: -30px -190px
}

.emoji_face .emoji92 {
	background-position: -62px -190px
}

.emoji_face .emoji93 {
	background-position: -94px -190px
}

.emoji_face .emoji94 {
	background-position: -126px -190px
}

.emoji_face .emoji95 {
	background-position: -158px -190px
}

.emoji_face .emoji96 {
	background-position: -190px -190px
}

.emoji_face .emoji97 {
	background-position: -222px -190px
}

.emoji_face .emoji98 {
	background-position: -254px -190px
}

.emoji_face .emoji99 {
	background-position: -286px -190px
}

.emoji_face .emoji100 {
	background-position: -318px -190px
}

.emoji_face .emoji101 {
	background-position: -350px -190px
}

.emoji_face .emoji102 {
	background-position: -382px -190px
}

.emoji_face .emoji103 {
	background-position: -414px -190px
}

.emoji_face .emoji104 {
	background-position: -446px -190px
}

.emoji_face .emoji105 {
	background-position: 2px -222px
}

.emoji_face .emoji106 {
	background-position: -30px -222px
}

.emoji_face .emoji107 {
	background-position: -62px -222px
}

.emoji_face .emoji108 {
	background-position: -94px -222px
}

.emoji_face .emoji109 {
	background-position: -126px -222px
}

.emoji_face .emoji110 {
	background-position: -158px -222px
}

.emoji_face .emoji111 {
	background-position: -190px -222px
}

.emoji_face .emoji112 {
	background-position: -222px -222px
}

.emoji_face .emoji113 {
	background-position: -254px -222px
}

.emoji_face .emoji114 {
	background-position: -286px -222px
}

.emoji_face .emoji115 {
	background-position: -318px -222px
}

.emoji_face .emoji116 {
	background-position: -350px -222px
}

.emoji_face .emoji117 {
	background-position: -382px -222px
}

.emoji_face .emoji118 {
	background-position: -414px -222px
}

.emoji_face .emoji119 {
	background-position: -446px -222px
}

.emoji_face .emoji120 {
	background-position: 2px -254px
}

.emoji_face .emoji121 {
	background-position: -30px -254px
}

.emoji_face .emoji122 {
	background-position: -62px -254px
}

.emoji_face .emoji123 {
	background-position: -94px -254px
}

.emoji_face .emoji124 {
	background-position: -126px -254px
}

.emoji_face .emoji125 {
	background-position: -158px -254px
}

.emoji_face .emoji126 {
	background-position: -190px -254px
}

.emoji_face .emoji127 {
	background-position: -222px -254px
}

.emoji_face .emoji128 {
	background-position: -254px -254px
}

.emoji_face .emoji129 {
	background-position: -286px -254px
}

.emoji_face .emoji130 {
	background-position: -318px -254px
}

.emoji_face .emoji131 {
	background-position: -350px -254px
}

.emoji_face .emoji132 {
	background-position: -382px -254px
}

.emoji_face .emoji133 {
	background-position: -414px -254px
}

.emoji_face .emoji134 {
	background-position: -446px -254px
}

.emoji_face .emoji135 {
	background-position: 2px -286px
}

.emoji_face .emoji136 {
	background-position: -30px -286px
}

.emoji_face .emoji137 {
	background-position: -62px -286px
}

.emoji_face .emoji138 {
	background-position: -94px -286px
}

.emoji_face .emoji139 {
	background-position: -126px -286px
}

.emoji_face .emoji140 {
	background-position: -158px -286px
}

.emoji_face .emoji141 {
	background-position: -190px -286px
}

.emoji_face .emoji142 {
	background-position: -222px -286px
}

.emoji_face .emoji143 {
	background-position: -254px -286px
}

.emoji_face .emoji144 {
	background-position: -286px -286px
}

.emoji_face .emoji145 {
	background-position: -318px -286px
}

.emoji_face .emoji146 {
	background-position: -350px -286px
}

.emoji_face .emoji147 {
	background-position: -382px -286px
}

.emoji_face .emoji148 {
	background-position: -414px -286px
}

.emoji_face .emoji149 {
	background-position: -446px -286px
}

.emoji_face .emoji150 {
	background-position: 2px -318px
}

.emoji_face .emoji151 {
	background-position: -30px -318px
}

.emoji_face .emoji152 {
	background-position: -62px -318px
}

.emoji_face .emoji153 {
	background-position: -94px -318px
}

.emoji_face .emoji154 {
	background-position: -126px -318px
}

.emoji_face .emoji155 {
	background-position: -158px -318px
}

.emoji_face .emoji156 {
	background-position: -190px -318px
}

.emoji_face .emoji157 {
	background-position: -222px -318px
}

.emoji_face .emoji158 {
	background-position: -254px -318px
}

.emoji_face .emoji159 {
	background-position: -286px -318px
}

.emoji_face .emoji160 {
	background-position: -318px -318px
}

.emoji_face .emoji161 {
	background-position: -350px -318px
}

.emoji_face .emoji162 {
	background-position: -382px -318px
}

.emoji_face .emoji163 {
	background-position: -414px -318px
}

.emoji_face .emoji164 {
	background-position: -446px -318px
}

.emoji_face .emoji165 {
	background-position: 2px -350px
}

.emoji_face .emoji166 {
	background-position: -30px -350px
}

.emoji_face .emoji167 {
	background-position: -62px -350px
}

.emoji_face .emoji168 {
	background-position: -94px -350px
}

.emoji_face .emoji169 {
	background-position: -126px -350px
}

.emoji_face .emoji170 {
	background-position: -158px -350px
}

.emoji_face .emoji171 {
	background-position: -190px -350px
}

.emoji_face .emoji172 {
	background-position: -222px -350px
}

.emoji_face .emoji173 {
	background-position: -254px -350px
}

.emoji_face .emoji174 {
	background-position: -286px -350px
}

.emoji_face .emoji175 {
	background-position: -318px -350px
}

.emoji_face .emoji176 {
	background-position: -350px -350px
}

.qqemoji {
	background: url(./img/3gXSfR9.png) 0 0 no-repeat;
	width: 20px;
	height: 20px;
	display: inline;
	display: -moz-inline-stack;
	display: inline-block;
	vertical-align: top;
	zoom: 1;
	*display: inline
}

@media (-webkit-min-device-pixel-ratio:2) {
	.qqemoji {
		background: url(./img/3shEflO.png) 0 0 no-repeat;
		width: 20px;
		height: 20px;
		display: inline;
		display: -moz-inline-stack;
		display: inline-block;
		vertical-align: top;
		background-size: 360px 192px
	}
}

.qqemoji0 {
	background-position: 0 0
}

.qqemoji1 {
	background-position: -24px 0
}

.qqemoji2 {
	background-position: -48px 0
}

.qqemoji3 {
	background-position: -72px 0
}

.qqemoji4 {
	background-position: -96px 0
}

.qqemoji5 {
	background-position: -120px 0
}

.qqemoji6 {
	background-position: -144px 0
}

.qqemoji7 {
	background-position: -168px 0
}

.qqemoji8 {
	background-position: -192px 0
}

.qqemoji9 {
	background-position: -216px 0
}

.qqemoji10 {
	background-position: -240px 0
}

.qqemoji11 {
	background-position: -264px 0
}

.qqemoji12 {
	background-position: -288px 0
}

.qqemoji13 {
	background-position: -312px 0
}

.qqemoji14 {
	background-position: -336px 0
}

.qqemoji15 {
	background-position: 0 -24px
}

.qqemoji16 {
	background-position: -24px -24px
}

.qqemoji17 {
	background-position: -48px -24px
}

.qqemoji18 {
	background-position: -72px -24px
}

.qqemoji19 {
	background-position: -96px -24px
}

.qqemoji20 {
	background-position: -120px -24px
}

.qqemoji21 {
	background-position: -144px -24px
}

.qqemoji22 {
	background-position: -168px -24px
}

.qqemoji23 {
	background-position: -192px -24px
}

.qqemoji24 {
	background-position: -216px -24px
}

.qqemoji25 {
	background-position: -240px -24px
}

.qqemoji26 {
	background-position: -264px -24px
}

.qqemoji27 {
	background-position: -288px -24px
}

.qqemoji28 {
	background-position: -312px -24px
}

.qqemoji29 {
	background-position: -336px -24px
}

.qqemoji30 {
	background-position: 0 -48px
}

.qqemoji31 {
	background-position: -24px -48px
}

.qqemoji32 {
	background-position: -48px -48px
}

.qqemoji33 {
	background-position: -72px -48px
}

.qqemoji34 {
	background-position: -96px -48px
}

.qqemoji35 {
	background-position: -120px -48px
}

.qqemoji36 {
	background-position: -144px -48px
}

.qqemoji37 {
	background-position: -168px -48px
}

.qqemoji38 {
	background-position: -192px -48px
}

.qqemoji39 {
	background-position: -216px -48px
}

.qqemoji40 {
	background-position: -240px -48px
}

.qqemoji41 {
	background-position: -264px -48px
}

.qqemoji42 {
	background-position: -288px -48px
}

.qqemoji43 {
	background-position: -312px -48px
}

.qqemoji44 {
	background-position: -336px -48px
}

.qqemoji45 {
	background-position: 0 -72px
}

.qqemoji46 {
	background-position: -24px -72px
}

.qqemoji47 {
	background-position: -48px -72px
}

.qqemoji48 {
	background-position: -72px -72px
}

.qqemoji49 {
	background-position: -96px -72px
}

.qqemoji50 {
	background-position: -120px -72px
}

.qqemoji51 {
	background-position: -144px -72px
}

.qqemoji52 {
	background-position: -168px -72px
}

.qqemoji53 {
	background-position: -192px -72px
}

.qqemoji54 {
	background-position: -216px -72px
}

.qqemoji55 {
	background-position: -240px -72px
}

.qqemoji56 {
	background-position: -264px -72px
}

.qqemoji57 {
	background-position: -288px -72px
}

.qqemoji58 {
	background-position: -312px -72px
}

.qqemoji59 {
	background-position: -336px -72px
}

.qqemoji60 {
	background-position: 0 -96px
}

.qqemoji61 {
	background-position: -24px -96px
}

.qqemoji62 {
	background-position: -48px -96px
}

.qqemoji63 {
	background-position: -72px -96px
}

.qqemoji64 {
	background-position: -96px -96px
}

.qqemoji65 {
	background-position: -120px -96px
}

.qqemoji66 {
	background-position: -144px -96px
}

.qqemoji67 {
	background-position: -168px -96px
}

.qqemoji68 {
	background-position: -192px -96px
}

.qqemoji69 {
	background-position: -216px -96px
}

.qqemoji70 {
	background-position: -240px -96px
}

.qqemoji71 {
	background-position: -264px -96px
}

.qqemoji72 {
	background-position: -288px -96px
}

.qqemoji73 {
	background-position: -312px -96px
}

.qqemoji74 {
	background-position: -336px -96px
}

.qqemoji75 {
	background-position: 0 -120px
}

.qqemoji76 {
	background-position: -24px -120px
}

.qqemoji77 {
	background-position: -48px -120px
}

.qqemoji78 {
	background-position: -72px -120px
}

.qqemoji79 {
	background-position: -96px -120px
}

.qqemoji80 {
	background-position: -120px -120px
}

.qqemoji81 {
	background-position: -144px -120px
}

.qqemoji82 {
	background-position: -168px -120px
}

.qqemoji83 {
	background-position: -192px -120px
}

.qqemoji84 {
	background-position: -216px -120px
}

.qqemoji85 {
	background-position: -240px -120px
}

.qqemoji86 {
	background-position: -264px -120px
}

.qqemoji87 {
	background-position: -288px -120px
}

.qqemoji88 {
	background-position: -312px -120px
}

.qqemoji89 {
	background-position: -336px -120px
}

.qqemoji90 {
	background-position: 0 -144px
}

.qqemoji91 {
	background-position: -24px -144px
}

.qqemoji92 {
	background-position: -48px -144px
}

.qqemoji93 {
	background-position: -72px -144px
}

.qqemoji94 {
	background-position: -96px -144px
}

.qqemoji95 {
	background-position: -120px -144px
}

.qqemoji96 {
	background-position: -144px -144px
}

.qqemoji97 {
	background-position: -168px -144px
}

.qqemoji98 {
	background-position: -192px -144px
}

.qqemoji99 {
	background-position: -216px -144px
}

.qqemoji100 {
	background-position: -240px -144px
}

.qqemoji101 {
	background-position: -264px -144px
}

.qqemoji102 {
	background-position: -288px -144px
}

.qqemoji103 {
	background-position: -312px -144px
}

.qqemoji104 {
	background-position: -336px -144px
}

.qqemoji105 {
	background-position: 0 -168px
}

.qqemoji106 {
	background-position: -24px -168px
}

.qqemoji107 {
	background-position: -48px -168px
}

.qqemoji108 {
	background-position: -72px -168px
}

.qqemoji109 {
	background-position: -96px -168px
}

.qqemoji110 {
	background-position: -120px -168px
}

.qqemoji111 {
	background-position: -144px -168px
}

.qqemoji112 {
	background-position: -168px -168px
}

.qq_face .qqface0 {
	background-position: 0 0
}

.qq_face .qqface1 {
	background-position: -29px 0
}

.qq_face .qqface2 {
	background-position: -58px 0
}

.qq_face .qqface3 {
	background-position: -87px 0
}

.qq_face .qqface4 {
	background-position: -116px 0
}

.qq_face .qqface5 {
	background-position: -145px 0
}

.qq_face .qqface6 {
	background-position: -174px 0
}

.qq_face .qqface7 {
	background-position: -203px 0
}

.qq_face .qqface8 {
	background-position: -232px 0
}

.qq_face .qqface9 {
	background-position: -261px 0
}

.qq_face .qqface10 {
	background-position: -290px 0
}

.qq_face .qqface11 {
	background-position: -319px 0
}

.qq_face .qqface12 {
	background-position: -348px 0
}

.qq_face .qqface13 {
	background-position: -377px 0
}

.qq_face .qqface14 {
	background-position: -406px 0
}

.qq_face .qqface15 {
	background-position: 0 -29px
}

.qq_face .qqface16 {
	background-position: -29px -29px
}

.qq_face .qqface17 {
	background-position: -58px -29px
}

.qq_face .qqface18 {
	background-position: -87px -29px
}

.qq_face .qqface19 {
	background-position: -116px -29px
}

.qq_face .qqface20 {
	background-position: -145px -29px
}

.qq_face .qqface21 {
	background-position: -174px -29px
}

.qq_face .qqface22 {
	background-position: -203px -29px
}

.qq_face .qqface23 {
	background-position: -232px -29px
}

.qq_face .qqface24 {
	background-position: -261px -29px
}

.qq_face .qqface25 {
	background-position: -290px -29px
}

.qq_face .qqface26 {
	background-position: -319px -29px
}

.qq_face .qqface27 {
	background-position: -348px -29px
}

.qq_face .qqface28 {
	background-position: -377px -29px
}

.qq_face .qqface29 {
	background-position: -406px -29px
}

.qq_face .qqface30 {
	background-position: 0 -58px
}

.qq_face .qqface31 {
	background-position: -29px -58px
}

.qq_face .qqface32 {
	background-position: -58px -58px
}

.qq_face .qqface33 {
	background-position: -87px -58px
}

.qq_face .qqface34 {
	background-position: -116px -58px
}

.qq_face .qqface35 {
	background-position: -145px -58px
}

.qq_face .qqface36 {
	background-position: -174px -58px
}

.qq_face .qqface37 {
	background-position: -203px -58px
}

.qq_face .qqface38 {
	background-position: -232px -58px
}

.qq_face .qqface39 {
	background-position: -261px -58px
}

.qq_face .qqface40 {
	background-position: -290px -58px
}

.qq_face .qqface41 {
	background-position: -319px -58px
}

.qq_face .qqface42 {
	background-position: -348px -58px
}

.qq_face .qqface43 {
	background-position: -377px -58px
}

.qq_face .qqface44 {
	background-position: -406px -58px
}

.qq_face .qqface45 {
	background-position: 0 -87px
}

.qq_face .qqface46 {
	background-position: -29px -87px
}

.qq_face .qqface47 {
	background-position: -58px -87px
}

.qq_face .qqface48 {
	background-position: -87px -87px
}

.qq_face .qqface49 {
	background-position: -116px -87px
}

.qq_face .qqface50 {
	background-position: -145px -87px
}

.qq_face .qqface51 {
	background-position: -174px -87px
}

.qq_face .qqface52 {
	background-position: -203px -87px
}

.qq_face .qqface53 {
	background-position: -232px -87px
}

.qq_face .qqface54 {
	background-position: -261px -87px
}

.qq_face .qqface55 {
	background-position: -290px -87px
}

.qq_face .qqface56 {
	background-position: -319px -87px
}

.qq_face .qqface57 {
	background-position: -348px -87px
}

.qq_face .qqface58 {
	background-position: -377px -87px
}

.qq_face .qqface59 {
	background-position: -406px -87px
}

.qq_face .qqface60 {
	background-position: 0 -116px
}

.qq_face .qqface61 {
	background-position: -29px -116px
}

.qq_face .qqface62 {
	background-position: -58px -116px
}

.qq_face .qqface63 {
	background-position: -87px -116px
}

.qq_face .qqface64 {
	background-position: -116px -116px
}

.qq_face .qqface65 {
	background-position: -145px -116px
}

.qq_face .qqface66 {
	background-position: -174px -116px
}

.qq_face .qqface67 {
	background-position: -203px -116px
}

.qq_face .qqface68 {
	background-position: -232px -116px
}

.qq_face .qqface69 {
	background-position: -261px -116px
}

.qq_face .qqface70 {
	background-position: -290px -116px
}

.qq_face .qqface71 {
	background-position: -319px -116px
}

.qq_face .qqface72 {
	background-position: -348px -116px
}

.qq_face .qqface73 {
	background-position: -377px -116px
}

.qq_face .qqface74 {
	background-position: -406px -116px
}

.qq_face .qqface75 {
	background-position: 0 -145px
}

.qq_face .qqface76 {
	background-position: -29px -145px
}

.qq_face .qqface77 {
	background-position: -58px -145px
}

.qq_face .qqface78 {
	background-position: -87px -145px
}

.qq_face .qqface79 {
	background-position: -116px -145px
}

.qq_face .qqface80 {
	background-position: -145px -145px
}

.qq_face .qqface81 {
	background-position: -174px -145px
}

.qq_face .qqface82 {
	background-position: -203px -145px
}

.qq_face .qqface83 {
	background-position: -232px -145px
}

.qq_face .qqface84 {
	background-position: -261px -145px
}

.qq_face .qqface85 {
	background-position: -290px -145px
}

.qq_face .qqface86 {
	background-position: -319px -145px
}

.qq_face .qqface87 {
	background-position: -348px -145px
}

.qq_face .qqface88 {
	background-position: -377px -145px
}

.qq_face .qqface89 {
	background-position: -406px -145px
}

.qq_face .qqface90 {
	background-position: 0 -174px
}

.qq_face .qqface91 {
	background-position: -29px -174px
}

.qq_face .qqface92 {
	background-position: -58px -174px
}

.qq_face .qqface93 {
	background-position: -87px -174px
}

.qq_face .qqface94 {
	background-position: -116px -174px
}

.qq_face .qqface95 {
	background-position: -145px -174px
}

.qq_face .qqface96 {
	background-position: -174px -174px
}

.qq_face .qqface97 {
	background-position: -203px -174px
}

.qq_face .qqface98 {
	background-position: -232px -174px
}

.qq_face .qqface99 {
	background-position: -261px -174px
}

.qq_face .qqface100 {
	background-position: -290px -174px
}

.qq_face .qqface101 {
	background-position: -319px -174px
}

.qq_face .qqface102 {
	background-position: -348px -174px
}

.qq_face .qqface103 {
	background-position: -377px -174px
}

.qq_face .qqface104 {
	background-position: -406px -174px
}

</style>