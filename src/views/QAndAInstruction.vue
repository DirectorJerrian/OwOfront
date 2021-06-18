<template>
  <div id="QAndAInstruction">
    <el-container>
      <el-header style="padding: 0">
        <Header></Header>
      </el-header>
      <Banner></Banner>
    </el-container>
    <el-container>
      <el-main style="height: 100%; margin-bottom: 3%">
        <div class='typora-export-content'>
          <div id='write'  class=''><div align="center"><font color="#0099ff" size="7"><b>OwO智能问答说明书</b></font></div><p>&nbsp;</p><p>&nbsp;</p><div class='md-toc' mdtype='toc'><p class="md-toc-content" role="list"><span role="listitem" class="md-toc-item md-toc-h1" data-ref="n57"><a class="md-toc-inner" href="#一-正常问答">一、 正常问答</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n58"><a class="md-toc-inner" href="#11-询问用药">1.1 询问用药</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n65"><a class="md-toc-inner" href="#12-询问发病部位">1.2 询问发病部位</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n72"><a class="md-toc-inner" href="#13-询问发病人群">1.3 询问发病人群</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n79"><a class="md-toc-inner" href="#14-询问传染性">1.4 询问传染性</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n86"><a class="md-toc-inner" href="#15-询问治疗时间">1.5 询问治疗时间</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n93"><a class="md-toc-inner" href="#16-询问所属科">1.6 询问所属科</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n100"><a class="md-toc-inner" href="#17-询问检查项目">1.7 询问检查项目</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n107"><a class="md-toc-inner" href="#18-询问症状">1.8 询问症状</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n114"><a class="md-toc-inner" href="#19-询问并发症">1.9 询问并发症</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n121"><a class="md-toc-inner" href="#110-询问治疗方法">1.10 询问治疗方法</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n128"><a class="md-toc-inner" href="#111-询问治愈率">1.11 询问治愈率</a></span><span role="listitem" class="md-toc-item md-toc-h1" data-ref="n136"><a class="md-toc-inner" href="#二-异常问答">二、 异常问答</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n137"><a class="md-toc-inner" href="#21-知识图谱中找不到相关内容">2.1 知识图谱中找不到相关内容</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n142"><a class="md-toc-inner" href="#22-多种问题混合">2.2 多种问题混合</a></span><span role="listitem" class="md-toc-item md-toc-h2" data-ref="n147"><a class="md-toc-inner" href="#23-问题无法识别">2.3 问题无法识别</a></span></p></div><p>&nbsp;</p><h1 id='一-正常问答'><span>一、 正常问答</span></h1><h2 id='11-询问用药'><span>1.1 询问用药</span></h2><p><strong><span>规范：</span></strong></p><p><span>患了/得了XXX吃什么药/用什么药/买什么药？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：患了乙肝吃什么药？</span></p><p><span>答：乙肝，治疗需要使用以下药物：恩替卡韦分散片、碧云砂乙肝颗粒、注射用盐酸精氨。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%981.png" referrerpolicy="no-referrer"></p><h2 id='12-询问发病部位'><span>1.2 询问发病部位</span></h2><p><strong><span>规范：</span></strong></p><p><span>患了/得了XXX发病部位在哪里/哪里有问题/哪里不舒服？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：得了乙肝哪里不舒服？</span></p><p><span>答：乙肝，发病部位有肝。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%982.png" referrerpolicy="no-referrer"></p><h2 id='13-询问发病人群'><span>1.3 询问发病人群</span></h2><p><strong><span>规范：</span></strong></p><p><span>XXX什么时候发病/什么人发病/什么时候患病？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：哪些人会患乙肝？</span></p><p><span>答：乙肝，发病人群有所有人群、青少年。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%983.png" referrerpolicy="no-referrer"></p><h2 id='14-询问传染性'><span>1.4 询问传染性</span></h2><p><strong><span>规范：</span></strong></p><p><span>XXX传染性怎么样/会传染吗？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：乙肝传染性怎么样？</span></p><p><span>答：乙肝，有传染性。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%984.png" referrerpolicy="no-referrer"></p><h2 id='15-询问治疗时间'><span>1.5 询问治疗时间</span></h2><p><strong><span>规范：</span></strong></p><p><span>XXX需要治疗多久/多长时间/什么时候能够治好？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：乙肝需要治疗多久？</span></p><p><span>答：乙肝，治疗时间为3-6月。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%985.png" referrerpolicy="no-referrer"></p><h2 id='16-询问所属科'><span>1.6 询问所属科</span></h2><p><strong><span>规范：</span></strong></p><p><span>XXX属于什么科？得了XXX挂什么？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：乙肝属于哪个科？</span></p><p><span>答：乙肝，所属科为传染科。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%986.png" referrerpolicy="no-referrer"></p><h2 id='17-询问检查项目'><span>1.7 询问检查项目</span></h2><p><strong><span>规范：</span></strong></p><p><span>得了XXX需要检查什么/有什么检查项目/怎么检查？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：得了乙肝需要检查什么？</span></p><p><span>答：乙肝，需要检查以下项目：乙肝病毒学指标、凝血酶原时间、乙肝两对半、血清白蛋白与球蛋白比值、血清HBsAg免疫复合物、血清前S1蛋白、血清前S2蛋白、血清抗前S2蛋白、血清免疫球蛋白M、血清乙肝表面抗体。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%987.png" referrerpolicy="no-referrer"></p><h2 id='18-询问症状'><span>1.8 询问症状</span></h2><p><strong><span>规范：</span></strong></p><p><span>得了XXX有什么症状/症状有哪些/有什么表征？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：患了乙肝有什么症状？</span></p><p><span>答：乙肝，有以下症状：转氨酶增高、肝肿大、乙肝表面抗原（HBsAg）阳性、乙肝e抗原（HBeAg）阳性、肝功能异常。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%988.png" referrerpolicy="no-referrer"></p><h2 id='19-询问并发症'><span>1.9 询问并发症</span></h2><p><strong><span>规范：</span></strong></p><p><span>XXX有什么并发症/得了XXX还会得什么/XXX与什么一起发作？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：得了乙肝还会得什么？</span></p><p><span>答：乙肝，有以下并发症：肝性脑病、肝硬化、腹膜炎、消化道出血、肺炎。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%989.png" referrerpolicy="no-referrer"></p><h2 id='110-询问治疗方法'><span>1.10 询问治疗方法</span></h2><p><strong><span>规范：</span></strong></p><p><span>得了XXX怎么办/如何医治/怎么治？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：乙肝怎么治疗？</span></p><p><span>答：乙肝，治疗方法为药物治疗、饮食疗法。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%9810.png" referrerpolicy="no-referrer"></p><h2 id='111-询问治愈率'><span>1.11 询问治愈率</span></h2><p><strong><span>规范：</span></strong></p><p><span>XXX多大概率能治好/可以治好吗/会好吗？</span></p><p><strong><span>示例：</span></strong></p><p><span>问：乙肝治愈率怎么样？</span></p><p><span>答：乙肝，治愈率为0.00%。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%9811.png" referrerpolicy="no-referrer"></p><p>&nbsp;</p><h1 id='二-异常问答'><span>二、 异常问答</span></h1><h2 id='21-知识图谱中找不到相关内容'><span>2.1 知识图谱中找不到相关内容</span></h2><p><strong><span>示例：</span></strong></p><p><span>问：得了乙肝吃什么药？</span></p><p><span>答：知识图谱中未查找到以下内容：乙肝的用药。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%9812.png" referrerpolicy="no-referrer"></p><h2 id='22-多种问题混合'><span>2.2 多种问题混合</span></h2><p><strong><span>示例：</span></strong></p><p><span>问：什么人会患乙肝？要去检查什么？</span></p><p><span>答：乙肝，发病人群有所有人群、青少年。乙肝需要检查以下项目：乙肝病毒学指标、凝血酶原时间、乙肝两对半、血清白蛋白与球蛋白比值、血清HBsAg免疫复合物、血清前S1蛋白、血清前S2蛋白、血清抗前S2蛋白、血清免疫球蛋白M、血清乙肝表面抗体。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%9813.png" referrerpolicy="no-referrer"></p><h2 id='23-问题无法识别'><span>2.3 问题无法识别</span></h2><p><strong><span>示例：</span></strong></p><p><span>问：你在干嘛？</span></p><p><span>答：我不是太听得懂。。。</span></p><p><img src="https://ruangong2020.oss-cn-beijing.aliyuncs.com/pic/%E9%97%AE%E9%A2%9814.png" referrerpolicy="no-referrer"></p><p>&nbsp;</p></div></div>
      </el-main>
      <el-footer style="height: 180px">
        <el-row :gutter="10" class="footer-row">
          <el-col :span="4" :offset="6">
            <span style="font-size: 24px">帮助中心</span>
            <br/>
            <span style="font-size: 16px"
            ><a href="http://212.129.149.40/users/sign_in"> 版本更新 </a><br/>
                <a href="http://212.129.149.40/users/sign_in"> 联系我们</a>
              </span>
          </el-col>
          <el-col :span="4" :offset="6" class="footer-pic">
            <el-image class="logo" :src="logo_url"></el-image>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4" :offset="6">
            <span style="font-size: 16px">©OwO COIN</span>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Header from "@/components/header";
    export default {
      name: "QAndAInstruction",
      data() {
        return {
          logo_url: "http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/logo.png",
        };
      },
      components: {
        Header,
      },
    }
</script>

<style scoped>
  .logo {
    height: 50px;
    margin-right: 16px;
    border-style: none;
    cursor: pointer;
  }

  .mask {
    width: 75px;
    height: 30px;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 0.54);
    border-radius: 30px;
    position: absolute;
    margin-top: -60px;
    margin-left: 199px;
    font-weight: bold;
  }

  .el-header {
    /* background-color: #a191fc; */
    color: rgb(255, 255, 255);
    text-align: right;
    /* line-height: 60px; */
  }

  .el-footer {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.575);
    color: rgb(255, 255, 255);
  }

  .el-container {
    padding-bottom: 1px;
  }

  .el-main {
    /* background-color: #E9EEF3; */
    color: #606266;

  }

  #header {
    text-align: right;
  }

  .footer-row {
    margin-top: 20px;
    line-height: 30px;
  }
  </style>
<style scoped>
    .threeCard {
      height: 250px;
    }

  .threeCard div {
    text-align: left;
  }

  .bottom {
    line-height: 12px;
    bottom: 18px;
    position: absolute;
  }

  .button {
    padding: 0;
    float: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
  </style>
<style>
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  </style>
<style lang="less" scoped>
                       .section1 {
                         /* background-image: url(https://finclaw.oss-cn-shenzhen.aliyuncs.com/img/section02.png); */
                         /* background-repeat: no-repeat;*/
                         /* background-position: center center; */
                         /*background-size: 100% auto;*/
                       }

  .header-button {
    margin-left: 3%;
    background-color: transparent;
    color: white;
    border: 0;
    font-size: 180%;
  }

  .header-button:hover {
    background-color: white;
    color: #a191fc;
  }

  .button2 {
    /* height:40%; */
    font-size: 222%;
    background-color: #a191fc;
    border: 0;
    color: white;
  }

  .button2:hover {
    background-color: white;
    color: #a191fc;
  }

  /****** */

  #components-grid-demo-playground .projects {
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  #components-grid-demo-playground [class~="ant-col"] {
    background: transparent;
    border: 0;
  }

  #components-grid-demo-playground [class~="ant-col"] > div {
    /*background: #00a0e9;*/
    line-height: 300px;
    font-size: 13px;
  }

  h1 {
    font-size: 52px;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 8px;
  }

  h2 {
    font-size: 30px;
    color: #333333;
    line-height: 40px;
    font-weight: bold;

  em {
    color: #409eff;
  }
  }

  .meta-info {
    margin: 10px auto -10px auto;
  }

  #components-grid-demo-playground pre {
    background: #f9f9f9;
    border-radius: 6px;
    font-size: 13px;
    padding: 8px 16px;
  }
</style>
<style type='text/css'>
  html {overflow-x: initial !important;}:root { --bg-color:#ffffff; --text-color:#333333; --select-text-bg-color:#B5D6FC; --select-text-font-color:auto; --monospace:"Lucida Console",Consolas,"Courier",monospace; --title-bar-height:20px; }
.mac-os-11 { --title-bar-height:28px; }
html { font-size: 14px; background-color: var(--bg-color); color: var(--text-color); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
body { margin: 0px; padding: 0px; height: auto; bottom: 0px; top: 0px; left: 0px; right: 0px; font-size: 1rem; line-height: 1.42857; overflow-x: hidden; background: inherit; tab-size: 4; }
iframe { margin: auto; }
a.url { word-break: break-all; }
a:active, a:hover { outline: 0px; }
.in-text-selection, ::selection { text-shadow: none; background: var(--select-text-bg-color); color: var(--select-text-font-color); }
#write { margin: 0px auto; height: auto; width: inherit; word-break: normal; overflow-wrap: break-word; position: relative; white-space: normal; overflow-x: visible; padding-top: 36px; }
#write.first-line-indent p { text-indent: 2em; }
#write.first-line-indent li p, #write.first-line-indent p * { text-indent: 0px; }
#write.first-line-indent li { margin-left: 2em; }
.for-image #write { padding-left: 8px; padding-right: 8px; }
body.typora-export { padding-left: 30px; padding-right: 30px; }
.typora-export .footnote-line, .typora-export li, .typora-export p { white-space: pre-wrap; }
.typora-export .task-list-item input { pointer-events: none; }
@media screen and (max-width: 500px) {
  body.typora-export { padding-left: 0px; padding-right: 0px; }
  #write { padding-left: 20px; padding-right: 20px; }
  .CodeMirror-sizer { margin-left: 0px !important; }
  .CodeMirror-gutters { display: none !important; }
}
#write li > figure:last-child { margin-bottom: 0.5rem; }
#write ol, #write ul { position: relative; }
img { max-width: 100%; vertical-align: middle; image-orientation: from-image; }
button, input, select, textarea { color: inherit; font: inherit; }
input[type="checkbox"], input[type="radio"] { line-height: normal; padding: 0px; }
*, ::after, ::before { box-sizing: border-box; }
#write h1, #write h2, #write h3, #write h4, #write h5, #write h6, #write p, #write pre { width: inherit; }
#write h1, #write h2, #write h3, #write h4, #write h5, #write h6, #write p { position: relative; }
p { line-height: inherit; }
h1, h2, h3, h4, h5, h6 { break-after: avoid-page; break-inside: avoid; orphans: 4; }
p { orphans: 4; }
h1 { font-size: 2rem; }
h2 { font-size: 1.8rem; }
h3 { font-size: 1.6rem; }
h4 { font-size: 1.4rem; }
h5 { font-size: 1.2rem; }
h6 { font-size: 1rem; }
.md-math-block, .md-rawblock, h1, h2, h3, h4, h5, h6, p { margin-top: 1rem; margin-bottom: 1rem; }
.hidden { display: none; }
.md-blockmeta { color: rgb(204, 204, 204); font-weight: 700; font-style: italic; }
a { cursor: pointer; }
sup.md-footnote { padding: 2px 4px; background-color: rgba(238, 238, 238, 0.7); color: rgb(85, 85, 85); border-radius: 4px; cursor: pointer; }
sup.md-footnote a, sup.md-footnote a:hover { color: inherit; text-transform: inherit; text-decoration: inherit; }
#write input[type="checkbox"] { cursor: pointer; width: inherit; height: inherit; }
figure { overflow-x: auto; margin: 1.2em 0px; max-width: calc(100% + 16px); padding: 0px; }
figure > table { margin: 0px; }
tr { break-inside: avoid; break-after: auto; }
thead { display: table-header-group; }
table { border-collapse: collapse; border-spacing: 0px; width: 100%; overflow: auto; break-inside: auto; text-align: left; }
table.md-table td { min-width: 32px; }
.CodeMirror-gutters { border-right: 0px; background-color: inherit; }
.CodeMirror-linenumber { user-select: none; }
.CodeMirror { text-align: left; }
.CodeMirror-placeholder { opacity: 0.3; }
.CodeMirror pre { padding: 0px 4px; }
.CodeMirror-lines { padding: 0px; }
div.hr:focus { cursor: none; }
#write pre { white-space: pre-wrap; }
#write.fences-no-line-wrapping pre { white-space: pre; }
#write pre.ty-contain-cm { white-space: normal; }
.CodeMirror-gutters { margin-right: 4px; }
.md-fences { font-size: 0.9rem; display: block; break-inside: avoid; text-align: left; overflow: visible; white-space: pre; background: inherit; position: relative !important; }
.md-fences-adv-panel { width: 100%; margin-top: 10px; text-align: center; padding-top: 0px; padding-bottom: 8px; overflow-x: auto; }
#write .md-fences.mock-cm { white-space: pre-wrap; }
.md-fences.md-fences-with-lineno { padding-left: 0px; }
#write.fences-no-line-wrapping .md-fences.mock-cm { white-space: pre; overflow-x: auto; }
.md-fences.mock-cm.md-fences-with-lineno { padding-left: 8px; }
.CodeMirror-line, twitterwidget { break-inside: avoid; }
.footnotes { opacity: 0.8; font-size: 0.9rem; margin-top: 1em; margin-bottom: 1em; }
.footnotes + .footnotes { margin-top: 0px; }
.md-reset { margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: top; background: 0px 0px; text-decoration: none; text-shadow: none; float: none; position: static; width: auto; height: auto; white-space: nowrap; cursor: inherit; -webkit-tap-highlight-color: transparent; line-height: normal; font-weight: 400; text-align: left; box-sizing: content-box; direction: ltr; }
li div { padding-top: 0px; }
blockquote { margin: 1rem 0px; }
li .mathjax-block, li p { margin: 0.5rem 0px; }
li blockquote { margin: 1rem 0px; }
li { margin: 0px; position: relative; }
blockquote > :last-child { margin-bottom: 0px; }
blockquote > :first-child, li > :first-child { margin-top: 0px; }
.footnotes-area { color: rgb(136, 136, 136); margin-top: 0.714rem; padding-bottom: 0.143rem; white-space: normal; }
#write .footnote-line { white-space: pre-wrap; }
@media print {
  body, html { border: 1px solid transparent; height: 99%; break-after: avoid; break-before: avoid; font-variant-ligatures: no-common-ligatures; }
  #write { margin-top: 0px; padding-top: 0px; border-color: transparent !important; }
  .typora-export * { -webkit-print-color-adjust: exact; }
  .typora-export #write { break-after: avoid; }
  .typora-export #write::after { height: 0px; }
  .is-mac table { break-inside: avoid; }
  .typora-export-show-outline .typora-export-sidebar { display: none; }
}
.footnote-line { margin-top: 0.714em; font-size: 0.7em; }
a img, img a { cursor: pointer; }
pre.md-meta-block { font-size: 0.8rem; min-height: 0.8rem; white-space: pre-wrap; background: rgb(204, 204, 204); display: block; overflow-x: hidden; }
p > .md-image:only-child:not(.md-img-error) img, p > img:only-child { display: block; margin: auto; }
#write.first-line-indent p > .md-image:only-child:not(.md-img-error) img { left: -2em; position: relative; }
p > .md-image:only-child { display: inline-block; width: 100%; }
#write .MathJax_Display { margin: 0.8em 0px 0px; }
.md-math-block { width: 100%; }
.md-math-block:not(:empty)::after { display: none; }
.MathJax_ref { fill: currentcolor; }
[contenteditable="true"]:active, [contenteditable="true"]:focus, [contenteditable="false"]:active, [contenteditable="false"]:focus { outline: 0px; box-shadow: none; }
.md-task-list-item { position: relative; list-style-type: none; }
.task-list-item.md-task-list-item { padding-left: 0px; }
.md-task-list-item > input { position: absolute; top: 0px; left: 0px; margin-left: -1.2em; margin-top: calc(1em - 10px); border: none; }
.math { font-size: 1rem; }
.md-toc { min-height: 3.58rem; position: relative; font-size: 0.9rem; border-radius: 10px; }
.md-toc-content { position: relative; margin-left: 0px; }
.md-toc-content::after, .md-toc::after { display: none; }
.md-toc-item { display: block; color: rgb(65, 131, 196); }
.md-toc-item a { text-decoration: none; }
.md-toc-inner:hover { text-decoration: underline; }
.md-toc-inner { display: inline-block; cursor: pointer; }
.md-toc-h1 .md-toc-inner { margin-left: 0px; font-weight: 700; }
.md-toc-h2 .md-toc-inner { margin-left: 2em; }
.md-toc-h3 .md-toc-inner { margin-left: 4em; }
.md-toc-h4 .md-toc-inner { margin-left: 6em; }
.md-toc-h5 .md-toc-inner { margin-left: 8em; }
.md-toc-h6 .md-toc-inner { margin-left: 10em; }
@media screen and (max-width: 48em) {
  .md-toc-h3 .md-toc-inner { margin-left: 3.5em; }
  .md-toc-h4 .md-toc-inner { margin-left: 5em; }
  .md-toc-h5 .md-toc-inner { margin-left: 6.5em; }
  .md-toc-h6 .md-toc-inner { margin-left: 8em; }
}
a.md-toc-inner { font-size: inherit; font-style: inherit; font-weight: inherit; line-height: inherit; }
.footnote-line a:not(.reversefootnote) { color: inherit; }
.md-attr { display: none; }
.md-fn-count::after { content: "."; }
code, pre, samp, tt { font-family: var(--monospace); }
kbd { margin: 0px 0.1em; padding: 0.1em 0.6em; font-size: 0.8em; color: rgb(36, 39, 41); background: rgb(255, 255, 255); border: 1px solid rgb(173, 179, 185); border-radius: 3px; box-shadow: rgba(12, 13, 14, 0.2) 0px 1px 0px, rgb(255, 255, 255) 0px 0px 0px 2px inset; white-space: nowrap; vertical-align: middle; }
.md-comment { color: rgb(162, 127, 3); opacity: 0.8; font-family: var(--monospace); }
code { text-align: left; vertical-align: initial; }
a.md-print-anchor { white-space: pre !important; border-width: initial !important; border-style: none !important; border-color: initial !important; display: inline-block !important; position: absolute !important; width: 1px !important; right: 0px !important; outline: 0px !important; background: 0px 0px !important; text-decoration: initial !important; text-shadow: initial !important; }
.md-inline-math .MathJax_SVG .noError { display: none !important; }
.html-for-mac .inline-math-svg .MathJax_SVG { vertical-align: 0.2px; }
.md-fences-math .MathJax_SVG_Display, .md-math-block .MathJax_SVG_Display { text-align: center; margin: 0px; position: relative; text-indent: 0px; max-width: none; max-height: none; min-height: 0px; min-width: 100%; width: auto; overflow-y: visible; display: block !important; }
.MathJax_SVG_Display, .md-inline-math .MathJax_SVG_Display { width: auto; margin: inherit; display: inline-block !important; }
.MathJax_SVG .MJX-monospace { font-family: var(--monospace); }
.MathJax_SVG .MJX-sans-serif { font-family: sans-serif; }
.MathJax_SVG { display: inline; font-style: normal; font-weight: 400; line-height: normal; text-indent: 0px; text-align: left; text-transform: none; letter-spacing: normal; word-spacing: normal; overflow-wrap: normal; white-space: nowrap; float: none; direction: ltr; max-width: none; max-height: none; min-width: 0px; min-height: 0px; border: 0px; padding: 0px; margin: 0px; zoom: 90%; }
#math-inline-preview-content { zoom: 1.1; }
.MathJax_SVG * { transition: none 0s ease 0s; }
.MathJax_SVG_Display svg { vertical-align: middle !important; margin-bottom: 0px !important; margin-top: 0px !important; }
.os-windows.monocolor-emoji .md-emoji { font-family: "Segoe UI Symbol", sans-serif; }
.md-diagram-panel > svg { max-width: 100%; }
[lang="flow"] svg, [lang="mermaid"] svg { max-width: 100%; height: auto; }
[lang="mermaid"] .node text { font-size: 1rem; }
table tr th { border-bottom: 0px; }
video { max-width: 100%; display: block; margin: 0px auto; }
iframe { max-width: 100%; width: 100%; border: none; }
.highlight td, .highlight tr { border: 0px; }
mark { background: rgb(255, 255, 0); color: rgb(0, 0, 0); }
.md-html-inline .md-plain, .md-html-inline strong, mark .md-inline-math, mark strong { color: inherit; }
.md-expand mark .md-meta { opacity: 0.3 !important; }
mark .md-meta { color: rgb(0, 0, 0); }
@media print {
  .typora-export h1, .typora-export h2, .typora-export h3, .typora-export h4, .typora-export h5, .typora-export h6 { break-inside: avoid; }
}
.md-diagram-panel .messageText { stroke: none !important; }
.md-diagram-panel .start-state {}
.md-diagram-panel .edgeLabel rect { opacity: 1 !important; }
.md-require-zoom-fix foreignobject { font-size: var(--mermaid-font-zoom); }
.md-fences.md-fences-math { font-size: 1em; }
.md-fences-math .MathJax_SVG_Display { margin-top: 8px; cursor: default; }
.md-fences-advanced:not(.md-focus) { padding: 0px; white-space: nowrap; border: 0px; }
.md-fences-advanced:not(.md-focus) { background: inherit; }
.typora-export-show-outline .typora-export-content { max-width: 1440px; margin: auto; display: flex; flex-direction: row; }
.typora-export-sidebar { width: 300px; font-size: 0.8rem; margin-top: 80px; margin-right: 18px; }
.typora-export-show-outline #write { --webkit-flex:2; flex: 2 1 0%; }
.typora-export-sidebar .outline-content { position: fixed; top: 0px; max-height: 100%; overflow: hidden auto; padding-bottom: 30px; padding-top: 60px; width: 300px; }
@media screen and (max-width: 1024px) {
  .typora-export-sidebar, .typora-export-sidebar .outline-content { width: 240px; }
}
@media screen and (max-width: 800px) {
  .typora-export-sidebar { display: none; }
}
.outline-content li, .outline-content ul { margin-left: 0px; margin-right: 0px; padding-left: 0px; padding-right: 0px; list-style: none; }
.outline-content ul { margin-top: 0px; margin-bottom: 0px; }
.outline-content strong { font-weight: 400; }
.outline-expander { width: 1rem; height: 1.42857rem; position: relative; display: table-cell; vertical-align: middle; cursor: pointer; padding-left: 4px; }
.outline-expander::before { content: ""; position: relative; font-family: Ionicons; display: inline-block; font-size: 8px; vertical-align: middle; }
.outline-item { padding-top: 3px; padding-bottom: 3px; cursor: pointer; }
.outline-expander:hover::before { content: ""; }
.outline-h1 > .outline-item { padding-left: 0px; }
.outline-h2 > .outline-item { padding-left: 1em; }
.outline-h3 > .outline-item { padding-left: 2em; }
.outline-h4 > .outline-item { padding-left: 3em; }
.outline-h5 > .outline-item { padding-left: 4em; }
.outline-h6 > .outline-item { padding-left: 5em; }
.outline-label { cursor: pointer; display: table-cell; vertical-align: middle; text-decoration: none; color: inherit; }
.outline-label:hover { text-decoration: underline; }
.outline-item:hover { border-color: rgb(245, 245, 245); background-color: var(--item-hover-bg-color); }
.outline-item:hover { margin-left: -28px; margin-right: -28px; border-left: 28px solid transparent; border-right: 28px solid transparent; }
.outline-item-single .outline-expander::before, .outline-item-single .outline-expander:hover::before { display: none; }
.outline-item-open > .outline-item > .outline-expander::before { content: ""; }
.outline-children { display: none; }
.info-panel-tab-wrapper { display: none; }
.outline-item-open > .outline-children { display: block; }
.typora-export .outline-item { padding-top: 1px; padding-bottom: 1px; }
.typora-export .outline-item:hover { margin-right: -8px; border-right: 8px solid transparent; }
.typora-export .outline-expander::before { content: "+"; font-family: inherit; top: -1px; }
.typora-export .outline-expander:hover::before, .typora-export .outline-item-open > .outline-item > .outline-expander::before { content: "−"; }
.typora-export-collapse-outline .outline-children { display: none; }
.typora-export-collapse-outline .outline-item-open > .outline-children, .typora-export-no-collapse-outline .outline-children { display: block; }
.typora-export-no-collapse-outline .outline-expander::before { content: "" !important; }
.typora-export-show-outline .outline-item-active > .outline-item .outline-label { font-weight: 700; }


html {
  font-size: 19px;
}

html, body {
  margin: auto;
  background: #fefefe;
}
body {
  font-family: "Vollkorn", Palatino, Times;
  color: #333;
  line-height: 1.4;
  text-align: justify;
}

#write {
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 2em;
  line-height: 1.53;
  padding-top: 40px;
}

@media only screen and (min-width: 1400px) {
  #write {
    max-width: 1100px;
  }
}

@media print {
  html {
    font-size: 13px;
  }
}

/* Typography
-------------------------------------------------------- */

#write>h1:first-child,
h1 {
  margin-top: 1.6em;
  font-weight: normal;
}

h1 {
  font-size:3em;
}

h2 {
  margin-top:2em;
  font-weight: normal;
}

h3 {
  font-weight: normal;
  font-style: italic;
  margin-top: 3em;
}

h1,
h2,
h3{
  text-align: center;
}

h2:after{
  border-bottom: 1px solid #2f2f2f;
  content: '';
  width: 100px;
  display: block;
  margin: 0 auto;
  height: 1px;
}

h1+h2, h2+h3 {
  margin-top: 0.83em;
}

p,
.mathjax-block {
  margin-top: 0;
  -webkit-hypens: auto;
  -moz-hypens: auto;
  hyphens: auto;
}
ul {
  list-style: square;
  padding-left: 1.2em;
}
ol {
  padding-left: 1.2em;
}
blockquote {
  margin-left: 1em;
  padding-left: 1em;
  border-left: 1px solid #ddd;
}
code,
pre {
  font-family: "Consolas", "Menlo", "Monaco", monospace, serif;
  font-size: .9em;
  background: white;
}
.md-fences{
  margin-left: 1em;
  padding-left: 1em;
  border: 1px solid #ddd;
  padding-bottom: 8px;
  padding-top: 6px;
  margin-bottom: 1.5em;
}

a {
  color: #2484c1;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
a img {
  border: none;
}
h1 a,
h1 a:hover {
  color: #333;
  text-decoration: none;
}
hr {
  color: #ddd;
  height: 1px;
  margin: 2em 0;
  border-top: solid 1px #ddd;
  border-bottom: none;
  border-left: 0;
  border-right: 0;
}
.ty-table-edit {
  background: #ededed;
  padding-top: 4px;
}
table {
  margin-bottom: 1.333333rem
}
table th,
table td {
  padding: 8px;
  line-height: 1.333333rem;
  vertical-align: top;
  border-top: 1px solid #ddd
}
table th {
  font-weight: bold
}
table thead th {
  vertical-align: bottom
}
table caption+thead tr:first-child th,
table caption+thead tr:first-child td,
table colgroup+thead tr:first-child th,
table colgroup+thead tr:first-child td,
table thead:first-child tr:first-child th,
table thead:first-child tr:first-child td {
  border-top: 0
}
table tbody+tbody {
  border-top: 2px solid #ddd
}

.task-list{
  padding:0;
}

.md-task-list-item {
  padding-left: 1.6rem;
}

.md-task-list-item > input:before {
  content: '\221A';
  display: inline-block;
  width: 1.33333333rem;
  height: 1.6rem;
  vertical-align: middle;
  text-align: center;
  color: #ddd;
  background-color: #fefefe;
}

.md-task-list-item > input:checked:before,
.md-task-list-item > input[checked]:before{
  color: inherit;
}
.md-tag {
  color: inherit;
  font: inherit;
}
#write pre.md-meta-block {
  min-height: 35px;
  padding: 0.5em 1em;
}
#write pre.md-meta-block {
  white-space: pre;
  background: #f8f8f8;
  border: 0px;
  color: #999;

  width: 100vw;
  max-width: calc(100% + 60px);
  margin-left: -30px;
  border-left: 30px #f8f8f8 solid;
  border-right: 30px #f8f8f8 solid;

  margin-bottom: 2em;
  margin-top: -1.3333333333333rem;
  padding-top: 26px;
  padding-bottom: 10px;
  line-height: 1.8em;
  font-size: 0.9em;
  font-size: 0.76em;
  padding-left: 0;
}
.md-img-error.md-image>.md-meta{
  vertical-align: bottom;
}
#write>h5.md-focus:before {
  top: 2px;
}

.md-toc {
  margin-top: 40px;
}

.md-toc-content {
  padding-bottom: 20px;
}

.outline-expander:before {
  color: inherit;
  font-size: 14px;
  top: auto;
  content: "\f0da";
  font-family: FontAwesome;
}

.outline-expander:hover:before,
.outline-item-open>.outline-item>.outline-expander:before {
  content: "\f0d7";
}

/** source code mode */
#typora-source {
  font-family: Courier, monospace;
  color: #6A6A6A;
}

.html-for-mac #typora-sidebar {
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}

.cm-s-typora-default .cm-header,
.cm-s-typora-default .cm-property,
.CodeMirror.cm-s-typora-default div.CodeMirror-cursor {
  color: #428bca;
}

.cm-s-typora-default .cm-atom, .cm-s-typora-default .cm-number {
  color: #777777;
}

.typora-node .file-list-item-parent-loc,
.typora-node .file-list-item-time,
.typora-node .file-list-item-summary {
  font-family: arial, sans-serif;
}

.md-task-list-item>input {
  margin-left: -1.3em;
  margin-top: calc(1rem - 12px);
}

.md-mathjax-midline {
  background: #fafafa;
}

.md-fences .code-tooltip {
  bottom: -2em !important;
}

.dropdown-menu .divider {
  border-color: #e5e5e5;
}

:root {--mermaid-font-zoom:1.25em ;}
</style>
