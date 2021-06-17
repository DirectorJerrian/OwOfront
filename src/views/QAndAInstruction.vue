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
        <div>
          <div class="stl_02">
            <div class="view">
              <div class="stl_05 stl_06">
                <div class="stl_01 stl_13" style="top:33.7731em; left:10.6549em;"><span class="stl_14 stl_09 stl_10" style="font-weight:bold;">OwO</span><span class="stl_15 stl_16 stl_10" style="font-weight:bold;">智能问答说明书 &nbsp;</span></div>
              </div>
            </div>
          </div>
          <div class="stl_02">
            <div class="stl_03">
            </div>
            <div class="view">
              <div class="stl_05 stl_06">
                <div class="stl_01 stl_25" style="top:4.219em; left:6.2935em;"><span class="stl_26 stl_16 stl_10" style="font-weight:bold; word-spacing:0.0098em;">一、 正常问答 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:7.3226em; left:6.2935em;"><span class="stl_28 stl_09 stl_10" style="font-weight:bold; word-spacing:0em;">1.1 </span><span class="stl_29 stl_16 stl_10" style="font-weight:bold; word-spacing:0em;">询问用药 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:10.1089em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:11.9761em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">患了</span><span class="stl_24 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">得了</span><span class="stl_24 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">吃什么药</span><span class="stl_24 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">用什么药</span><span class="stl_24 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">买什么药？ &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:13.9232em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:15.7991em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：患了乙肝吃什么药？ &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:17.7375em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，治疗需要使用以下药物：恩替卡韦分散片、碧云砂乙肝颗粒、注射用盐酸精氨。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:35.5232em; left:6.2935em;"><span class="stl_28 stl_09 stl_33" style="font-weight:bold;">1.2</span><span class="stl_29 stl_16 stl_33" style="font-weight:bold;">询问发病部位 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:38.3095em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:40.1767em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">患了</span><span class="stl_24 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">得了</span><span class="stl_24 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">发病部位在哪里</span><span class="stl_24 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">哪里有问题</span><span class="stl_24 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">哪里不舒服？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:42.1238em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:43.9997em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：得了乙肝哪里不舒服？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:45.9381em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，发病部位有肝。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:59.0966em; left:6.2935em;"><span class="stl_28 stl_09 stl_33" style="font-weight:bold;">1.3</span><span class="stl_29 stl_16 stl_33" style="font-weight:bold;">询问发病人群 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:61.883em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:63.7501em; left:6.2935em;"><span class="stl_24 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">什么时候发病</span><span class="stl_24 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">什么人发病</span><span class="stl_24 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">什么时候患病？ &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:65.6972em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
              </div>
            </div>
          </div>
          <div class="stl_02">
            <div class="view">
              <div class="stl_05 stl_06">
                <div class="stl_01 stl_30" style="top:2.4178em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：哪些人会患乙肝？ &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:4.2937em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，发病人群有所有人群、青少年。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:19.9534em; left:6.2935em;"><span class="stl_34 stl_09 stl_10" style="font-weight:bold; word-spacing:0em;">1.4 </span><span class="stl_29 stl_16 stl_10" style="font-weight:bold; word-spacing:0em;">询问传染性 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:22.7398em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:24.6069em; left:6.2935em;"><span class="stl_35 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">传染性怎么样</span><span class="stl_35 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">会传染吗？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:26.5541em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:28.4299em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：乙肝传染性怎么样？ &nbsp;</span></div>
                <div class="stl_01 stl_12" style="top:30.3058em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，有传染性。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:43.5269em; left:6.2935em;"><span class="stl_34 stl_09 stl_33" style="font-weight:bold;">1.5</span><span class="stl_29 stl_16 stl_33" style="font-weight:bold;">询问治疗时间 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:46.3132em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:48.1804em; left:6.2935em;"><span class="stl_35 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">需要治疗多久</span><span class="stl_35 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">多长时间</span><span class="stl_35 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">什么时候能够治好？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:50.1275em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:52.0034em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：乙肝需要治疗多久？ &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:53.8705em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，治疗时间为</span><span class="stl_35 stl_09 stl_10">3-6</span><span class="stl_32 stl_16 stl_10">月。 &nbsp;</span></div>
              </div>
            </div>
          </div>
          <div class="stl_02">
            <div class="view">
              <div class="stl_05 stl_06">
                <div class="stl_01 stl_27" style="top:2.1952em; left:6.2935em;"><span class="stl_36 stl_09 stl_10" style="font-weight:bold; word-spacing:0em;">1.6 </span><span class="stl_29 stl_16 stl_10" style="font-weight:bold; word-spacing:0em;">询问所属科 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:4.9815em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:6.8486em; left:6.2935em;"><span class="stl_37 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">属于什么科？得了</span><span class="stl_37 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">挂什么？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:8.7958em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:10.6717em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：乙肝属于哪个科？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:12.6101em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，所属科为传染科。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:25.7061em; left:6.2935em;"><span class="stl_36 stl_09 stl_33" style="font-weight:bold;">1.7</span><span class="stl_29 stl_16 stl_33" style="font-weight:bold;">询问检查项目 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:28.4925em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:30.3596em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">得了</span><span class="stl_37 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">需要检查什么</span><span class="stl_37 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">有什么检查项目</span><span class="stl_37 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">怎么检查？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:32.3067em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:34.1826em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：得了乙肝需要检查什么？ &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:36.121em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，需要检查以下项目：乙肝病毒学指标、凝血酶原时间、乙肝两对半、血清白蛋白与球蛋白比 &nbsp;</span></div>
                <div class="stl_01 stl_38" style="top:37.3628em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">值、血清</span><span class="stl_37 stl_09 stl_10">HBsAg</span><span class="stl_32 stl_16 stl_10">免疫复合物、血清前</span><span class="stl_37 stl_09 stl_10">S1</span><span class="stl_32 stl_16 stl_10">蛋白、血清前</span><span class="stl_37 stl_09 stl_10">S2</span><span class="stl_32 stl_16 stl_10">蛋白、血清抗前</span><span class="stl_37 stl_09 stl_10">S2</span><span class="stl_32 stl_16 stl_10">蛋白、血清免疫球蛋白</span><span class="stl_37 stl_09 stl_10">M</span><span class="stl_32 stl_16 stl_10">、血 &nbsp;</span></div>
                <div class="stl_01 stl_38" style="top:38.6222em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">清乙肝表面抗体。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:64.0364em; left:6.2935em;"><span class="stl_36 stl_09 stl_39" style="font-weight:bold;">1.8</span><span class="stl_29 stl_16 stl_39" style="font-weight:bold;">询问症状 &nbsp;</span></div>
              </div>
            </div>
          </div>
          <div class="stl_02">
            <div class="view">
              <div class="stl_05 stl_06">
                <div class="stl_01 stl_30" style="top:2.4178em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:4.285em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">得了</span><span class="stl_40 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">有什么症状</span><span class="stl_40 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">症状有哪些</span><span class="stl_40 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">有什么表征？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:6.2321em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:8.108em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：患了乙肝有什么症状？ &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:10.0377em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，有以下症状：转氨酶增高、肝肿大、乙肝表面抗原（</span><span class="stl_40 stl_09 stl_10">HBsAg</span><span class="stl_32 stl_16 stl_10">）阳性、乙肝</span><span class="stl_40 stl_09 stl_10">e</span><span class="stl_32 stl_16 stl_10">抗原（</span><span class="stl_40 stl_09 stl_10">HBeAg</span><span class="stl_32 stl_16 stl_10">） &nbsp;</span></div>
                <div class="stl_01 stl_38" style="top:11.297em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">阳性、肝功能异常。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:30.9585em; left:6.2935em;"><span class="stl_41 stl_09 stl_10" style="font-weight:bold; word-spacing:0em;">1.9 </span><span class="stl_29 stl_16 stl_10" style="font-weight:bold; word-spacing:0em;">询问并发症 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:33.7449em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:35.612em; left:6.2935em;"><span class="stl_40 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">有什么并发症</span><span class="stl_40 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">得了</span><span class="stl_40 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">还会得什么</span><span class="stl_40 stl_09 stl_10">/XXX</span><span class="stl_32 stl_16 stl_10">与什么一起发作？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:37.5592em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:39.4351em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：得了乙肝还会得什么？ &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:41.3735em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，有以下并发症：肝性脑病、肝硬化、腹膜炎、消化道出血、肺炎。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:57.7835em; left:6.2935em;"><span class="stl_41 stl_09 stl_10" style="font-weight:bold; word-spacing:0em;">1.10 </span><span class="stl_29 stl_16 stl_10" style="font-weight:bold; word-spacing:0em;">询问治疗方法 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:60.5699em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:62.437em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">得了</span><span class="stl_40 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">怎么办</span><span class="stl_40 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">如何医治</span><span class="stl_40 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">怎么治？ &nbsp;</span></div>
                <div class="stl_01 stl_11" style="top:64.3841em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:66.26em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：乙肝怎么治疗？ &nbsp;</span></div>
              </div>
            </div>
          </div>
          <div class="stl_02">
            <div class="view">
              <div class="stl_05 stl_06">
                <div class="stl_01 stl_30" style="top:2.4179em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，治疗方法为药物治疗、饮食疗法。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:17.2647em; left:6.2935em;"><span class="stl_42 stl_09 stl_10" style="font-weight:bold; word-spacing:0em;">1.11 </span><span class="stl_29 stl_16 stl_10" style="font-weight:bold; word-spacing:0em;">询问治愈率 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:20.0511em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">规范： &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:21.9807em; left:6.2935em;"><span class="stl_43 stl_09 stl_10">XXX</span><span class="stl_32 stl_16 stl_10">多大概率能治好</span><span class="stl_43 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">可以治好吗</span><span class="stl_43 stl_09 stl_10">/</span><span class="stl_32 stl_16 stl_10">会好吗？ &nbsp;</span></div>
                <div class="stl_01 stl_12" style="top:23.8654em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:25.8038em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：乙肝治愈率怎么样？ &nbsp;</span></div>
                <div class="stl_01 stl_12" style="top:27.6709em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：乙肝，治愈率为</span><span class="stl_43 stl_09 stl_10">0.00%</span><span class="stl_32 stl_16 stl_10">。 &nbsp;</span></div>
                <div class="stl_01 stl_07" style="top:41.6774em; left:6.2935em;"><span class="stl_43 stl_09 stl_10">ꢀ</span></div>
                <div class="stl_01 stl_25" style="top:43.4873em; left:6.2935em;"><span class="stl_26 stl_16 stl_10" style="font-weight:bold; word-spacing:0.0098em;">二、 异常问答 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:46.5909em; left:6.2935em;"><span class="stl_42 stl_09 stl_10" style="font-weight:bold;">2</span></div>
                <div class="stl_01 stl_27" style="top:46.5909em; left:7.1055em;"><span class="stl_42 stl_09 stl_10" style="font-weight:bold; word-spacing:0em;">.1 </span><span class="stl_29 stl_16 stl_10" style="font-weight:bold; word-spacing:0em;">知识图谱中找不到相关内容 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:49.3772em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:51.2531em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：得了乙肝吃什么药？ &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:53.1914em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">答：知识图谱中未查找到以下内容：乙肝的用药。 &nbsp;</span></div>
              </div>
            </div>
          </div>
          <div class="stl_02">
            <div class="view">
              <div class="stl_05 stl_06">
                <div class="stl_01 stl_27" style="top:2.1952em; left:6.2935em;"><span class="stl_44 stl_09 stl_10" style="font-weight:bold; word-spacing:0em;">2.2 </span><span class="stl_29 stl_16 stl_10" style="font-weight:bold; word-spacing:0em;">多种问题混合 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:4.9816em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:6.8574em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：什么人会患乙肝？要去检查什么？ &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:8.7958em; left:6.2935em;"><span class="stl_32 stl_16 stl_45">答：乙肝，发病人群有所有人群、青少年。乙肝需要检查以下项目：乙肝病毒学指标、凝血酶原时间、 &nbsp;</span></div>
                <div class="stl_01 stl_38" style="top:10.0377em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">乙肝两对半、血清白蛋白与球蛋白比值、血清</span><span class="stl_46 stl_09 stl_10">HBsAg</span><span class="stl_32 stl_16 stl_10">免疫复合物、血清前</span><span class="stl_46 stl_09 stl_10">S1</span><span class="stl_32 stl_16 stl_10">蛋白、血清前</span><span class="stl_46 stl_09 stl_10">S2</span><span class="stl_32 stl_16 stl_10">蛋白、血清 &nbsp;</span></div>
                <div class="stl_01 stl_38" style="top:11.2883em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">抗前</span><span class="stl_46 stl_09 stl_10">S2</span><span class="stl_32 stl_16 stl_10">蛋白、血清免疫球蛋白</span><span class="stl_46 stl_09 stl_10">M</span><span class="stl_32 stl_16 stl_10">、血清乙肝表面抗体。 &nbsp;</span></div>
                <div class="stl_01 stl_27" style="top:39.8377em; left:6.2935em;"><span class="stl_44 stl_09 stl_33" style="font-weight:bold;">2.3</span><span class="stl_29 stl_16 stl_33" style="font-weight:bold;">问题无法识别 &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:42.6241em; left:6.2935em;"><span class="stl_31 stl_16 stl_10" style="font-weight:bold;">示例： &nbsp;</span></div>
                <div class="stl_01 stl_30" style="top:44.5625em; left:6.2935em;"><span class="stl_32 stl_16 stl_10">问：你在干嘛？ &nbsp;</span></div>
                <div class="stl_01 stl_12" style="top:46.4383em; left:6.2935em;"><span class="stl_32 stl_16 stl_47">答：我不是太听得懂。。。 &nbsp;</span></div>
              </div>
            </div>
          </div>
        </div>
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
