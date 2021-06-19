<template>
  <div class="chartEdit">
    <el-header style="padding: 0px">
      <Header></Header>
    </el-header>
    <div id="sideMenu">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">实体</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="createNodeClick()">增加实体</el-menu-item>
            <el-menu-item index="1-2" @click="searchNodeClick()">实体信息搜索</el-menu-item>
            <el-menu-item index="1-3" @click="cancelNodeHighlight()" v-if="isNodeHighlight">取消实体高亮</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">关系</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="createLinkClick()">增加关系</el-menu-item>
            <el-menu-item index="2-2" @click="searchLinkClick()">关系信息搜索</el-menu-item>
            <el-menu-item index="2-3" @click="cancelLinkHighlight()" v-if="isLinkHighlight">取消关系高亮</el-menu-item>
            <el-menu-item index="2-4" @click="cancelLabelShow()" v-if="isLinksLabelVisible">不显示关系标签</el-menu-item>
            <el-menu-item index="2-4" @click="cancelLabelShow()" v-else>显示关系标签</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">图谱</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-7" @click="changeChartNameClick()">名称修改</el-menu-item>
            <el-menu-item index="3-6" @click="showChart()">重置图谱</el-menu-item>
            <el-menu-item index="3-1" @click="statisticsClick()">信息统计</el-menu-item>
            <el-menu-item index="3-2" @click="showArrangementChart()">排版模式</el-menu-item>
            <el-menu-item index="3-3" @click="showChart()">力导图模式</el-menu-item>
            <el-menu-item index="3-4" @click="fixChartClick()" v-if="!isChartFixed">图谱固定</el-menu-item>
            <el-menu-item index="3-5" @click="flexibleChartClick()" v-else>取消图谱固定</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">保存</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="saveChartClick(false)">保存到我的图谱</el-menu-item>
            <el-menu-item index="4-2" @click="saveChartClick(true)" v-if="isChartAlreadySaved">保存为新的图谱</el-menu-item>
            <el-menu-item index="4-3" @click="chartXMLDownloadClick()">图谱XML导出</el-menu-item>
            <el-menu-item index="4-4" @click="chartImgDownloadClick()">图谱图片导出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">拓展功能</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="openChatBox()">问答机器人</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div id="chart"></div>
    <!--图谱编辑-->
    <el-drawer
      title="节点编辑"
      :visible.sync="isChartInfoEditVisible"
      :before-close="handleClose"
      destroy-on-close
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="form" :model="nodeForm" label-width="80px" v-if="this.isNodeCreate || this.isNodeEdit">
          <el-form-item label="实体名称">
            <el-input v-model="nodeForm.name" :placeholder="nodeName"></el-input>
          </el-form-item>
          <el-form-item label="实体描述">
            <el-input v-model="nodeForm.des" :placeholder="nodeDes"></el-input>
          </el-form-item>
          <el-form-item label="实体形状">
            <el-select v-model="nodeForm.symbol" :placeholder="nodeSymbol">
              <el-option
                v-for="item in this.shapes"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实体大小">
            <el-slider v-model="nodeForm.symbolSize"></el-slider>
          </el-form-item>
          <el-form-item label="实体颜色">
            <el-color-picker v-model="nodeForm.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="实体种类">
            <el-input v-model="nodeForm.category" :placeholder="nodeCategory"></el-input>
          </el-form-item>
          <el-form-item label="文字大小">
            <el-slider v-model="nodeForm.fontSize"></el-slider>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="linkForm" label-width="80px" v-if="this.isLinkCreate || this.isLinkEdit">
          <el-form-item label="关系名称">
            <el-input v-model="linkForm.name" :placeholder="'linkName'"></el-input>
          </el-form-item>
          <el-form-item label="起点实体">
            <el-input v-model="linkForm.source" :placeholder="'linkSource'"></el-input>
          </el-form-item>
          <el-form-item label="终点实体">
            <el-input v-model="linkForm.target" :placeholder="'linkTarget'"></el-input>
          </el-form-item>
          <el-form-item label="关系描述">
            <el-input v-model="linkForm.des" :placeholder="'linkDes'"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button style="margin-left: 100px" @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          <el-button type="danger" v-if="this.isNodeEdit" @click="deleteNode(nodeForm.name)">删 除</el-button>
          <el-button type="danger" v-if="this.isLinkEdit" @click="deleteLink(linkForm)">删 除</el-button>
        </div>
      </div>
    </el-drawer>
    <!--    图谱信息搜索-->
    <div id="chartSearch">
      <el-dialog
        title="实体搜索"
        :visible.sync="isSearchNodeVisible"
        width="50%"
      >
        <el-form ref="form" :model="searchNodeForm" label-width="80px">
          <el-form-item label="实体名称">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="searchNodeForm.name"
              :fetch-suggestions="getSearchNodeNameHistory"
              placeholder="请输入实体名称"
              @select="selectSearchNodeName"
              style="width: 80%">
              <template slot-scope="{item}">
                <div class="name">{{item.name}}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="实体描述">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="searchNodeForm.des"
              :fetch-suggestions="getSearchNodeDesHistory"
              placeholder="请输入实体描述"
              @select="selectSearchNodeDes"
              style="width: 80%">
              <template slot-scope="{item}">
                <div class="name">{{item.des}}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="实体种类">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="searchNodeForm.category"
              :fetch-suggestions="getSearchNodeCategoryHistory"
              placeholder="请输入实体种类"
              @select="selectSearchNodeCategory"
              style="width: 80%">
              <template slot-scope="{item}">
                <div class="name">{{item.category}}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-form>
        <el-button @click="isSearchNodeVisible= false" style="float:right;margin-left:20px ">取消</el-button>
        <el-button type="primary" style="float:right" @click="searchNode()">搜索</el-button>
        <el-table
          @selection-change="setSearchNodeResultChosen"
          :data="searchNodeResult"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="des"
            label="描述"
            width="200">
          </el-table-column>
          <el-table-column
            prop="category"
            label="类型"
            width="200">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmSearchNode()">标记目标</el-button>
          <el-button @click="isSearchNodeVisible= false">取消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="关系搜索"
        :visible.sync="isSearchLinkVisible"
        width="50%"
      >
        <el-form ref="form" :model="searchLinkForm" label-width="80px">
          <el-form-item label="关系名称">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="searchLinkForm.name"
              :fetch-suggestions="getSearchLinkNameHistory"
              placeholder="请输入关系名称"
              @select="selectSearchLinkName"
              style="width: 80%">
              <template slot-scope="{item}">
                <div class="name">{{item.name}}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="关系描述">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="searchLinkForm.des"
              :fetch-suggestions="getSearchLinkDesHistory"
              placeholder="请输入关系描述"
              @select="selectSearchLinkDes"
              style="width: 80%">
              <template slot-scope="{item}">
                <div class="name">{{item.des}}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="起点实体">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="searchLinkForm.source"
              :fetch-suggestions="getSearchLinkSourceHistory"
              placeholder="请输入起点实体名称"
              @select="selectSearchLinkSource"
              style="width: 80%">
              <template slot-scope="{item}">
                <div class="name">{{item.source}}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="终点实体">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="searchLinkForm.target"
              :fetch-suggestions="getSearchLinkTargetHistory"
              placeholder="请输入终点实体名称"
              @select="selectSearchLinkTarget"
              style="width: 80%">
              <template slot-scope="{item}">
                <div class="name">{{item.target}}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-form>
        <el-button @click="isSearchLinkVisible= false" style="float:right;margin-left:20px ">取消</el-button>
        <el-button type="primary" style="float:right" @click="searchLink()">搜索</el-button>
        <el-table
          @selection-change="setSearchLinkResultChosen"
          :data="searchLinkResult"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="des"
            label="描述"
            width="150">
          </el-table-column>
          <el-table-column
            prop="source"
            label="起点实体"
            width="150">
          </el-table-column>
          <el-table-column
            prop="target"
            label="终点实体"
            width="150">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmSearchLink()">标记目标</el-button>
          <el-button @click="isSearchLinkVisible= false">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <!--    数据统计-->
    <div id="chartStatistic">
      <el-dialog
        title="图谱信息统计"
        :visible.sync="isStatisticVisible"
        width="50%"
      >
        <div slot="footer" class="dialog-footer">
          <div id="statistic" style="width: 700px;height: 400px;margin-top: 2%;"></div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isStatisticVisible= false">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <!--图谱名称修改-->
    <div id="chartNameChange">
      <el-dialog
        title="图谱名称修改"
        :visible.sync="isChartNameChangeVisible"
        width="25%"
      >
        <el-input v-model="chartName" :placeholder="option.title.text" clearable></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmChangeChartName()">确认修改</el-button>
          <el-button @click="cancelChangeChartName()">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <div id="chatBox">
      <chat-box ref="chatBox"></chat-box>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/header";
  import chatBox from "@/components/chatBox";
  import $ from 'jquery'
  import router from '@/router'
  import {mapActions, mapGetters} from "vuex";
  import ChatBox from "../components/chatBox";

  export default {
    name: "ChartEdit",
    components: {
      chatBox,
      Header,
    },
    data() {
      return {
        headActiveIndex: '1',
        chartName:'',
        nodes: [],
        links: [],
        // nodes:[{
        //   name: 'node01',
        //   des: 'nodedes01',
        //   symbol: 'triangle',
        //   symbolSize: 70,
        //   type:'highlight',
        //   itemStyle: {
        //     color: '#5470c6',
        //   },
        //   label: {
        //     fontSize: 12,
        //   },
        //   category: 0,
        // },
        //   {
        //   name: 'node06',
        //   des: 'nodedes06',
        //   symbol: 'triangle',
        //   symbolSize: 70,
        //   itemStyle: {
        //     color: '#5470c6',
        //   },
        //   label: {
        //     fontSize: 12,
        //   },
        //   category: 0,
        // },
        //   {
        //   name: 'node02',
        //   des: 'nodedes02',
        //   symbol: 'circle',
        //   symbolSize: 50,
        //   itemStyle: {
        //     color: '#91CC75',
        //   },
        //   label: {
        //     fontSize: 12,
        //   },
        //   category: 1,
        // },
        //   {
        //   name: 'node03',
        //   des: 'nodedes3',
        //   symbol: 'circle',
        //   symbolSize: 50,
        //   itemStyle: {
        //     color: '#91CC75',
        //   },
        //   label: {
        //     fontSize: 12,
        //   },
        //   category: 1,
        // },
        //   {
        //   name: 'node04',
        //   des: 'nodedes04',
        //   symbol: 'circle',
        //   symbolSize: 50,
        //   itemStyle: {
        //     color: '#641585',
        //   },
        //   label: {
        //     fontSize: 12,
        //   },
        //   category: 1,
        // },
        //   {
        //   name: 'node05',
        //   des: 'nodedes05',
        //   symbol: 'circle',
        //   symbolSize: 50,
        //   itemStyle: {
        //     color: '#91CC75',
        //   },
        //   label: {
        //     fontSize: 12,
        //   },
        //   category: 1,
        // },
        //   {
        //   name: 'node10',
        //   des: 'nodedes01',
        //   symbol: 'triangle',
        //   symbolSize: 70,
        //   type:'highlight',
        //   itemStyle: {
        //     color: '#5470c6',
        //   },
        //   label: {
        //     fontSize: 12,
        //   },
        //   category: 0,
        // },
        //   {
        //   name: 'node11',
        //   des: 'nodedes01',
        //   symbol: 'triangle',
        //   symbolSize: 70,
        //   type:'highlight',
        //   itemStyle: {
        //     color: '#5470c6',
        //   },
        //   label: {
        //     fontSize: 12,
        //   },
        //   category: 0,
        // },
        //   {
        //   name: 'node12',
        //   des: 'nodedes01',
        //   symbol: 'triangle',
        //   symbolSize: 70,
        //   type:'highlight',
        //   itemStyle: {
        //     color: '#5470c6',
        //   },
        //   label: {
        //     fontSize: 12,
        //   },
        //   category: 0,
        // }],
        // links:[{
        //   source: 'node01',
        //   target: 'node02',
        //   name: 'link01',
        //   des: 'link01des',
        // },{
        //   source: 'node02',
        //   target: 'node01',
        //   name: 'link00',
        //   des: 'reverse',
        // },{
        //   source: 'node01',
        //   target: 'node03',
        //   name: 'link02',
        //   des: 'myself',
        // },{
        //   source: 'node02',
        //   target: 'node01',
        //   name: '124124',
        //   des: 'myself',
        // },{
        //   source: 'node01',
        //   target: 'node03',
        //   name: 'link02',
        //   des: 'link02des'
        // }, {
        //   source: 'node01',
        //   target: 'node04',
        //   name: 'link03',
        //   des: 'link03des'
        // }, {
        //   source: 'node01',
        //   target: 'node05',
        //   name: 'link04',
        //   des: 'link05des'
        // },{
        //   source: 'node02',
        //   target: 'node11',
        //   name: 'link02',
        //   des: 'myself',
        // },{
        //   source: 'node11',
        //   target: 'node12',
        //   name: 'link02',
        //   des: 'myself',
        // },{
        //   source: 'node12',
        //   target: 'node11',
        //   name: 'link02',
        //   des: 'myself',
        // },{
        //   source: 'node03',
        //   target: 'node04',
        //   name: 'link02',
        //   des: 'myself',
        // }],
        categories: [{name: '01 class'}, {name: '02 class'}],
        option: {
          // 图的标题
          title: {
            text: '知识图谱'
          },
          // 提示框的配置
          tooltip: {
            formatter: function (x) {
              return x.data.des;
            }
          },
          toolbox: {
            // 显示工具箱
            show: true,
            feature: {
              mark: {
                show: true
              },
              // 还原
              restore: {
                show: false
              },
              // 保存为图片
              saveAsImage: {
                show: false
              }
            }
          },
          legend: [{
            data: []
          }],
          series: [{
            type: 'graph', // 类型:关系图
            layout: 'force', //图的布局，类型为力导图
            symbolSize: 40, // 调整节点的大小
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            zoom: 1,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 10],
            emphasis: {
              itemStyle: {
                color: "#f4ff73",
                borderColor: "#74ffeb",
                borderWidth: 3
              },
              lineStyle: {
                color: "#ff0000",
              }
            },
            force: {
              repulsion: 100,
              gravity: 0.01,
              edgeLength: 200
            },
            autoCurveness: 0.1,
            draggable: true,
            lineStyle: {
              width: 2,
              color: '#4b565b',
            },
            edgeLabel: {
              position: "middle",
              fontSize: 20,
              show: true,
              formatter: function (x) {
                return x.data.name;
              }
            },
            label: {
              show: true,
            },
            //itemStyle: ,

              // 数据
              nodes: [],
              links: [],
              categories: [],
            }]
          },
        isChartAlreadySaved:false,
        chartId:'',
        chart:{},
        statisticChart:{},
        //click event
        chosenType:'',
        nodeName:'',
        nodeDes:'',
        nodeSymbol:'',
        nodeSymbolSize:'',
        nodeCategory:'',
        nodeFontSize:'',
        linkName:'',
        linkDes:'',
        linkSource:'',
        linkTarget:'',
        //chart edit
        loading: false,
        timer: null,
        nodeForm:{
          name:'',
          des:'',
          color:'',
          symbol:'',
          symbolSize:'',
          category:'',
          fontSize:'',
        },
        linkForm:{
          name:'',
          des:'',
          source:'',
          target:'',
        },
        shapes: [{
          value: 'circle',
          label: '圆形'
        }, {
          value: 'roundRect',
          label: '矩形'
        }, {
          value: 'triangle',
          label: '三角形'
        }, {
          value: 'diamond',
          label: '菱形'
        }],
        nodeColor: '#409EFF',
        //search
        searchNodeForm:{
          name:'',
          des:'',
          category:'',
        },
        searchNodeHistory:{
          name:[],
          des:[],
          category:[],
        },
        searchNodeResult:[],
        searchNodeResultChosen:[],
        searchLinkForm:{
          name:'',
          source:'',
          target:'',
          des:'',
        },
        searchLinkHistory:{
          name:[],
          source:[],
          target:[],
          des:[],
        },
        searchLinkResult:[],
        searchLinkResultChosen:[],
        highlightNodeList:[],
        highlightLinkList:[],
        isChartSearchVisible:false,
        isChartInfoEditVisible:false,
        isNodeEdit:false,
        isLinkEdit:false,
        isNodeCreate:false,
        isLinkCreate:false,
        isSearchNodeVisible:false,
        isSearchLinkVisible:false,
        isNodeHighlight:false,
        isLinkHighlight:false,
        isStatisticVisible:false,
        isChartNameChangeVisible:false,
        isChartFixed:false,
        //当前是否为力导图模式
        isForceChart:true,
        //是否显示关系标签
        isLinksLabelVisible:true,
        //当前是否为排版模式
        isArrangementChart:false,
        }
      },
      computed:{
        ...mapGetters([
          'chartData'
        ]),
      },
      mounted() {
        if(this.chartData==null){
          this.warningNotice("未读入任何图谱信息,请导入图谱信息后编辑！");
          router.push('/myChart');
          return;
        }
        this.processChartData();
        this.drawChart();
        this.chart.on('click',this.chartClick);
        this.chart.on('mouseup',this.chartDrag);
      },
      methods:{
        ...mapActions([
          'addChart'
        ]),
        //页面打开处理图谱信息
        processChartData(){
          console.log(this.chartData);
          if(this.chartData.isChartAlreadySaved!=undefined){
            this.isChartAlreadySaved=this.chartData.isChartAlreadySaved;
          }
          if(this.isChartAlreadySaved)this.chartId=this.chartData.chartId;
          this.nodes=this.chartData.nodes;
          this.links=this.chartData.links;
          //获取categories
          var myCategories=[];
          var maxCategory=0;
          for(var i=0;i<this.chartData.nodes.length;i++){
            if(myCategories.indexOf(this.chartData.nodes[i].category)>-1)
              continue;
            else{
              myCategories.push(this.chartData.nodes[i].category);
              if(this.chartData.nodes[i].category>maxCategory)
                maxCategory=this.chartData.nodes[i].category;
            }
          }
          this.categories=[];
          for(var i=0;i<maxCategory+1;i++){
            this.categories.push({ name: "" });
          }
          for(var i=0;i<this.chartData.nodes.length;i++){
            this.categories[this.chartData.nodes[i].category].name=this.chartData.nodes[i].category+" class";
          }
          this.option.title.text=this.chartData.title;
          this.chartName=this.option.title.text;
          this.isChartFixed=this.chartData.isChartFixed;
          if(this.isChartFixed){
            this.positions=this.chartData.positions;
            for(var i=0;i<this.nodes.length;i++){
              this.nodes[i].x=this.positions[i].x;
              this.nodes[i].y=this.positions[i].y;
              this.nodes[i].fixed=true;
            }
          }
        },
        //编辑函数
        handleClose(done) {
          this.$confirm('确定要提交表单吗？')
            .then(_ => {
              var isFinish = false;
              if(this.isNodeEdit){
                isFinish=this.changeNode(this.nodeForm);
                this.isNodeEdit = false;
              }
              else if(this.isLinkEdit){
                isFinish=this.changeLink(this.linkForm);
                this.isLinkEdit = false;
              }
              else if(this.isNodeCreate){
                isFinish=this.createNode(this.nodeForm);
              }
              else{
                isFinish=this.createLink(this.linkForm);
              }
              if(isFinish) this.isChartInfoEditVisible=false;
            })
            .catch(_ => {});
        },
        cancelForm() {
          this.loading = false;
          this.isChartInfoEditVisible = false;
          if(this.isNodeEdit){
            this.isNodeEdit = false;
          }
          else{
            this.isLinkEdit = false;
          }
          if(this.isNodeCreate){
            this.isNodeCreate = false;
          }
          else{
            this.isLinkCreate = false;
          }
          clearTimeout(this.timer);
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        /////////////图谱展示///////////////////////////
        //////////////////////////////////////////////
        changeChartNameClick(){
          this.isChartNameChangeVisible=true;
        },
        confirmChangeChartName(){
          this.option.title.text=this.chartName;
          var option=this.chart.getOption();
          option.title[0].text=this.chartName;
          this.chart.setOption(option);
          this.isChartNameChangeVisible=false;
        },
        cancelChangeChartName(){
          this.chartName=this.option.title.text;
          this.isChartNameChangeVisible= false;
        },
        drawChart(){
          this.chart = this.$echarts.init(document.getElementById('chart'));
          this.showChart();
        },
        setChart(){
          this.option.series[0].nodes=this.nodes;
          this.option.series[0].links=this.links;
          this.option.series[0].categories=this.categories;
          this.option.legend[0].data=this.categories.map(function (a) {
            return a.name;
          });
        },
        //展示力导图
        showChart(){
          if(this.isArrangementChart){
            this.chart.clear();
          }
          this.isArrangementChart=false;
          this.setChart();
          this.chart.setOption(this.option);
        },
        ////////////////////////////////////////////////
        //排版模式算法////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        //展示排版图
        showArrangementChart(){
          this.isArrangementChart=true
          this.setArrangementChartPosition();
          this.fixChart();
        },
        setArrangementChartPosition(){
          var positionData=this.getArrangementChartPosition();
          var option=this.chart.getOption();
          var nodes=option.series[0].nodes;
          for(var i=0;i<this.nodes.length;i++){
            nodes[i].x=positionData[i].x;
            nodes[i].y=positionData[i].y;
            nodes[i].symbolSize=15;
            nodes[i].fixed=true;
            nodes[i].label.fontSize=10;
          }
          this.chart.clear();
          this.chart.setOption(option)
        },
        cancelLabelShow(){
          this.option = this.chart.getOption();
          if(this.isLinksLabelVisible){
            this.isLinksLabelVisible = false;
            this.option.series[0].edgeLabel.show = false;
          }
          else{
            this.isLinksLabelVisible = true;
            this.option.series[0].edgeLabel.show = true;
          }
          this.chart.setOption(this.option);
        },
        createNode(nodeForm){
          var name=nodeForm.name;
          var des=nodeForm.des;
          var symbolSize=parseInt(nodeForm.symbolSize);
          var category=this.getCategoryIndex(nodeForm.category);
          var symbol=nodeForm.symbol;
          var color=nodeForm.color;
          var fontSize=parseInt(nodeForm.fontSize);
          if(this.isNodeExist(name)){
            this.warningNotice("实体名称重复，请重新命名！");
            return false;
          }
          var node={
            name:name,
            des:des,
            symbol:symbol,
            symbolSize:symbolSize,
            itemStyle:{
              color:color,
            },
            label:{
              fontSize:fontSize,
            },
            category:category,
          };
          const index=this.categories.length;
          if(category===-1){
            this.categories.push({ name: "" });
            this.categories[index].name=nodeForm.category+" class";
            node.category=index;
          }
          this.nodes.push(node);
          this.showChart();
          this.successNotice("创建成功");
          this.isNodeCreate = false;
          return true;
        },
        createLink(linkForm){
          console.log(linkForm);
          var name=linkForm.name;
          var des=linkForm.des;
          var source=linkForm.source;
          var target=linkForm.target;
          var nodeNotExistMessage='';
          if(!this.isNodeExist(source)){
            nodeNotExistMessage += "起点实体不存在!\n";
          }
          if(!this.isNodeExist(target)){
            nodeNotExistMessage += '目标实体不存在!';
          }
          if(nodeNotExistMessage!==''){
            this.warningNotice(nodeNotExistMessage);
            return false;
          }
          var link={
            name:name,
            des:des,
            source:source,
            target:target
          };
          this.links.push(link);
          this.showChart();
          this.successNotice("创建成功");
          this.isLinkCreate = false;
          return true;
        },
        //寻找是否存该名字的实体
        isNodeExist(name) {
          for(var i=0;i<this.nodes.length;i++){
            if(this.nodes[i].name===name){
              return true;
            }
          }
          return false;
        },
        deleteNode(name) {
          //删除data中的实体
          var nodeIndex = this.findNodeIndex(name);
          this.nodes.splice(nodeIndex, 1);
          //删除links中包含此实体的关系
          var newLinks = [];
          for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].source !== name && this.links[i].target !== name) {
              newLinks.push(this.links[i]);
            }
          }
          this.links = newLinks;
          this.isChartInfoEditVisible = false;
          this.isNodeEdit = false;
          this.showChart();
          this.successNotice("删除成功");
          return true;
        },
        deleteLink(form){
          //删除关系
          var linkIndex=this.findLinkIndex(form);
          if(linkIndex===-1){
            this.warningNotice("未找到目标关系！");
            return;
          }
          this.links.splice(linkIndex,1);
          this.isChartInfoEditVisible = false;
          this.isLinkEdit = false;
          this.showChart();
          this.successNotice("删除成功！");
          return true;
        },
        //获取简化的图谱信息
        getNodeIndex(nodes,name){
          for(var i=0;i<nodes.length;i++){
            if(nodes[i].name===name)return i;
          }
        },
        getArrangementChartData(){
          var data={nodes:[],links:[]}
          for(var i=0;i<this.nodes.length;i++){
            data.nodes.push({name:this.nodes[i].name,times:0,level_x:0,level_y:0,isArranged:false});
          }
          for(var i=0;i<this.links.length;i++){
            if(this.links[i].source===this.links[i].target) continue;
            data.links.push({source:data.nodes[this.getNodeIndex(data.nodes,this.links[i].source)],target:data.nodes[this.getNodeIndex(data.nodes,this.links[i].target)]});
          }
          return data;
        },
        getLevelData(data){
          var nodes=data.nodes;
          var res={
            x_count:0,
            y_count:0,
          }
          for(var i=0;i<nodes.length;i++){
            if(nodes[i].level_x>res.x_count)res.x_count=nodes[i].level_x;
            if(nodes[i].level_y>res.y_count)res.y_count=nodes[i].level_y
          }
          res.x_count++;
          res.y_count++;
          return res;
        },
        getArrangementChartPosition(){
          var level_y=0;
          var data=this.getArrangementChartData();
          while(true){
            this.countSourceTimes(data);
            var node=this.getTopTimesNode(data);
            //所有节点都被安排位置则退出
            if(node==null)break;
            this.setNode(node,0,level_y,data);
            this.clearTimes(data);
            level_y++;
          }
          //根据层级信息，设置具体的位置
          const start_x=0;
          const start_y=0;
          const pace_x=1000;
          const pace_y=100;
          const levelData=this.getLevelData(data);
          const x_count=levelData.x_count;
          const y_count=levelData.y_count;
          var positionArray=Array(x_count).fill(0);
          var nodes=data.nodes;
          for(var y=0;y<y_count;y++){
            for(var i=0;i<nodes.length;i++){
              if(nodes[i].level_y===y){
                nodes[i].x=nodes[i].level_x*pace_x+start_x;
                nodes[i].y=positionArray[nodes[i].level_x]*pace_y+start_y;
                positionArray[nodes[i].level_x]++;
              }
            }
          }
          return nodes;
        },
        countSourceTimes(data){
          var links=data.links;
          for(var i=0;i<links.length;i++){
            if(!links[i].source.isArranged)
            links[i].source.times++;
        }
      },
        clearTimes(data) {
          var nodes = data.nodes;
          for (var i = 0; i < nodes.length; i++) {
            nodes[i].times = 0;
          }
        },
        getTopTimesNode(data) {
          var nodes = data.nodes;
          var firstNotArrangedIndex = -1;
          //找到第一个没有被安排位置的节点
          for (var i = 0; i < nodes.length; i++) {
            if (!nodes[i].isArranged) {
              firstNotArrangedIndex = i;
              break;
            }
          }
          //若所有节点都被安排位置，则返回null
          if (firstNotArrangedIndex === -1) return null;
          //寻找出度最大的没有被安排位置的节点
          var resIndex = firstNotArrangedIndex;
          for (var i = resIndex + 1; i < nodes.length; i++) {
            if (!nodes[i].isArranged && nodes[i].times > nodes[resIndex].times) {
              resIndex = i;
            }
          }
          return nodes[resIndex];
        },
        setNode(node, level_x, level_y, data) {
          node.level_x = level_x;
          node.level_y = level_y;
          node.isArranged = true;
          var links = data.links;
          for (var i = 0; i < links.length; i++) {
            if (links[i].source === node && !links[i].target.isArranged) {
              this.setNode(links[i].target, level_x + 1, level_y, data);
            }
          }

        },
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        //更改关系信息
        changeLink(linkForm) {
          var linkIndex = this.findLinkIndex(linkForm.name);
          if (this.links[linkIndex].name === linkForm.name && this.links[linkIndex].des === linkForm.des) {
            this.messageNotice("未作任何修改");
            return false;
          }
          this.links[linkIndex].name = linkForm.name;
          this.links[linkIndex].des = linkForm.des;
          this.showChart();
          this.successNotice("修改成功");
          return true;
        },
        //更改实体信息
        changeNode(nodeForm) {
          var nodeIndex = this.findNodeIndex(this.nodeName);
          if (this.nodes[nodeIndex].name === nodeForm.name &&
            this.nodes[nodeIndex].category === this.getCategoryIndex(nodeForm.category) &&
            this.nodes[nodeIndex].des === nodeForm.des &&
            this.nodes[nodeIndex].symbol === nodeForm.symbol &&
            this.nodes[nodeIndex].symbolSize === nodeForm.symbolSize &&
            this.nodes[nodeIndex].itemStyle.color === nodeForm.color &&
            this.nodes[nodeIndex].label.fontSize === nodeForm.fontSize) {
            this.messageNotice("未作任何修改");
            return false;
          }
          //实体名字重复，但可以和自己一样
          var isOverlap = false;
          for (var i = 0; i < this.nodes.length; i++) {
            if (i === nodeIndex) continue;
            else if (this.nodes[i].name === nodeForm.name) {
              isOverlap = true;
              break;
            }
          }
          if (isOverlap) {
            this.warningNotice("实体名称重复，请重新修改！");
            return false;
          }
          this.nodes[nodeIndex].name = nodeForm.name;
          this.nodes[nodeIndex].des = nodeForm.des;
          this.nodes[nodeIndex].symbol = nodeForm.symbol;
          this.nodes[nodeIndex].symbolSize = parseInt(nodeForm.symbolSize);
          this.nodes[nodeIndex].itemStyle.color = nodeForm.color;
          this.nodes[nodeIndex].label.fontSize = parseInt(nodeForm.fontSize);
          //这边要做额外修改，先不动
          const categoryIndex=this.getCategoryIndex(nodeForm.category);
          if(categoryIndex===-1){
            const index=this.categories.length;
            this.categories.push({ name: "" });
            this.categories[index].name=nodeForm.category+"class";
            this.nodes[nodeIndex].category=index;
          }else{
            this.nodes[nodeIndex].category = this.getCategoryIndex(nodeForm.category);
          }

          //将关系中的实体同样做修改
          for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].source === name) this.links[i].source = nodeForm.name;
            if (this.links[i].target === name) this.links[i].target = nodeForm.name;
          }
          this.showChart();
          this.successNotice("修改成功");
          return true;
        },
        //寻找该node名字的下标
        findNodeIndex(name) {
          for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].name === name) {
              return i;
            }
          }
        },
        //寻找该link名字的下标
        findLinkIndex(form) {
          for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].name === form&& this.links[i].source===form.source
              &&this.links[i].target===form.target&&this.links[i].des===form.des) {
              return i;
            }
          }
          return -1;
        },
        getCategoryIndex(name) {
          for (var i = 0; i < this.categories.length; i++) {
            if (name == this.categories[i].name) {
              return i;
            }
          }
          return -1;
        },
        createNodeClick() {
          if (this.isChartInfoEditVisible) {
            console.log("close");
            this.isNodeCreate = false;
            this.isChartInfoEditVisible = false;
          }
          console.log("open");
          this.isNodeCreate = true;
          this.isChartInfoEditVisible = true;
          this.clearObj(this.nodeForm);
        },
        clearObj(obj){
          for(let key in obj){
            obj[key]='';
          }
        },
        createLinkClick() {
          if (this.isChartInfoEditVisible) {
            this.isLinkCreate = false;
            this.isChartInfoEditVisible = false;
          }
          this.isLinkCreate = true;
          this.isChartInfoEditVisible = true;
          this.clearObj(this.linkForm);
        },
        ///////////////////////////////////////////////////////////
        //搜索//////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        searchNodeClick() {
          this.isSearchNodeVisible = true;
        },
        searchNode() {
          //存访搜索历史
          if (this.searchNodeForm.name === '' && this.searchNodeForm.category === '' && this.searchNodeForm.des === '') {
            this.warningNotice("搜索内容为空，请至少输入一个选项！");
            return;
          }
          if ($.inArray(this.searchNodeForm.name, this.searchNodeHistory.name) === -1) {
            this.searchNodeHistory.name.push(this.searchNodeForm.name);
          }
          if ($.inArray(this.searchNodeForm.des, this.searchNodeHistory.des) === -1) {
            this.searchNodeHistory.des.push(this.searchNodeForm.des);
          }
          if ($.inArray(this.searchNodeForm.category, this.searchNodeHistory.category) === -1) {
            this.searchNodeHistory.category.push(this.searchNodeForm.category);
          }
          //搜索节点,存放到数组中
          this.searchNodeResult = [];
          for (var i = 0; i < this.nodes.length; i++) {
            if (this.searchNodeForm.name !== '' && !this.isMatch(this.searchNodeForm.name, this.nodes[i].name)) continue;
            if (this.searchNodeForm.des !== '' && !this.isMatch(this.searchNodeForm.des, this.nodes[i].des)) continue;
            if (this.searchNodeForm.category !== '' && !this.isMatch(this.searchNodeForm.category.toString(), this.nodes[i].category.toString())) continue;
            let res = {
              name: this.nodes[i].name,
              des: this.nodes[i].des,
              category: this.nodes[i].category,
              index: i,
            };
            this.searchNodeResult.push(res);
          }
        },
        selectSearchNodeName(obj) {
          this.searchNodeForm.name = obj.name;
        },
        selectSearchNodeDes(obj) {
          this.searchNodeForm.des = obj.des;
        },
        selectSearchNodeCategory(obj) {
          this.searchNodeForm.category = obj.category;
        },
        getSearchNodeNameHistory(str, cb) {
          var res = [];
          for (var i = 0; i < this.searchNodeHistory.name.length; i++) {
            res.push({name: this.searchNodeHistory.name[i]});
          }
          cb(res);
        },
        getSearchNodeDesHistory(str, cb) {
          var res = [];
          for (var i = 0; i < this.searchNodeHistory.des.length; i++) {
            res.push({des: this.searchNodeHistory.des[i]});
          }
          cb(res);
        },
        getSearchNodeCategoryHistory(str, cb) {
          var res = [];
          for (var i = 0; i < this.searchNodeHistory.category.length; i++) {
            res.push({category: this.searchNodeHistory.category[i]});
          }
          cb(res);
        },
        setSearchNodeResultChosen(val) {
          this.searchNodeResultChosen = val;
        },
        confirmSearchNode() {
          if (this.searchNodeResultChosen.length == 0) {
            this.warningNotice("未选中任何实体");
            return;
          }
          const highlightNodeColor = '#f4ff73';
          const highlightBorderColor = "#74ffeb";
          //标红
          var option = this.chart.getOption();
          for (var i = 0; i < this.searchNodeResultChosen.length; i++) {
            option.series[0].nodes[this.searchNodeResultChosen[i].index].itemStyle.color = highlightNodeColor;
            option.series[0].nodes[this.searchNodeResultChosen[i].index].itemStyle.borderColor = highlightBorderColor;
          }
          this.highlightNodeList = this.searchNodeResult.concat(this.searchNodeResultChosen);
          this.chart.setOption(option);
          this.isSearchNodeVisible = false;
          this.isNodeHighlight=true;
        },
        searchLinkClick() {
          this.isSearchLinkVisible = true;
        },
        searchLink() {
          if (this.searchLinkForm.name == '' && this.searchLinkForm.des == ''
            && this.searchLinkForm.source == '' && this.searchLinkForm.target == '') {
            this.warningNotice("搜索内容为空，请至少输入一个选项！");
            return;
          }
          if ($.inArray(this.searchLinkForm.name, this.searchLinkHistory.name) === -1) {
            this.searchLinkHistory.name.push(this.searchLinkForm.name);
          }
          if ($.inArray(this.searchLinkForm.des, this.searchLinkHistory.des) === -1) {
            this.searchLinkHistory.des.push(this.searchLinkForm.des);
          }
          if ($.inArray(this.searchLinkForm.source, this.searchLinkHistory.source) === -1) {
            this.searchLinkHistory.source.push(this.searchLinkForm.source);
          }
          if ($.inArray(this.searchLinkForm.target, this.searchLinkHistory.target) === -1) {
            this.searchLinkHistory.target.push(this.searchLinkForm.target);
          }
          this.searchLinkResult = [];
          for (var i = 0; i < this.links.length; i++) {
            if (this.searchLinkForm.name !== '' && !this.isMatch(this.searchLinkForm.name, this.links[i].name)) continue;
            if (this.searchLinkForm.des !== '' && !this.isMatch(this.searchLinkForm.des, this.links[i].des)) continue;
            if (this.searchLinkForm.source !== '' && !this.isMatch(this.searchLinkForm.source, this.links[i].source)) continue;
            if (this.searchLinkForm.target !== '' && !this.isMatch(this.searchLinkForm.target, this.links[i].target)) continue;
            let res = {
              name: this.links[i].name,
              des: this.links[i].des,
              source: this.links[i].source,
              target: this.links[i].target,
              index: i,
            };
            this.searchLinkResult.push(res);
          }
        },
        selectSearchLinkName(obj) {
          this.searchLinkForm.name = obj.name;
        },
        selectSearchLinkDes(obj) {
          this.searchLinkForm.des = obj.des;
        },
        selectSearchLinkSource(obj) {
          this.searchLinkForm.source = obj.source;
        },
        selectSearchLinkTarget(obj) {
          this.searchLinkForm.target = obj.target;
        },
        getSearchLinkNameHistory(str, cb) {
          var res = [];
          for (var i = 0; i < this.searchLinkHistory.name.length; i++) {
            res.push({name: this.searchLinkHistory.name[i]});
          }
          cb(res);
        },
        getSearchLinkDesHistory(str, cb) {
          var res = [];
          for (var i = 0; i < this.searchLinkHistory.des.length; i++) {
            res.push({des: this.searchLinkHistory.des[i]});
          }
          cb(res);
        },
        getSearchLinkSourceHistory(str, cb) {
          var res = [];
          for (var i = 0; i < this.searchLinkHistory.source.length; i++) {
            res.push({source: this.searchLinkHistory.source[i]});
          }
          cb(res);
        },
        getSearchLinkTargetHistory(str, cb) {
          var res = [];
          for (var i = 0; i < this.searchLinkHistory.target.length; i++) {
            res.push({target: this.searchLinkHistory.target[i]});
          }
          cb(res);
        },
        setSearchLinkResultChosen(val) {
          this.searchLinkResultChosen = val;
        },
        isMatch(searchStr, str) {
          let index = -1, flag = false;
          for (var i = 0, arr = searchStr.split(""); i < arr.length; i++) {
            //有一个关键字都没匹配到，则没有匹配到数据
            if (str.indexOf(arr[i]) < 0) {
              break;
            } else {
              let match = str.matchAll(arr[i]);
              let next = match.next();
              while (!next.done) {
                if (next.value.index > index) {
                  index = next.value.index;
                  if (i === arr.length - 1) {
                    flag = true
                  }
                  break;
                }
                next = match.next();
              }

            }
          }
          return flag;
        },
        confirmSearchLink() {
          if (this.searchLinkResultChosen.length == 0) {
            this.warningNotice("未选中任何关系");
            return;
          }
          const highlightColor = '#FF0000'
          //标红
          var option = this.chart.getOption();
          for (var i = 0; i < this.searchLinkResultChosen.length; i++) {
            option.series[0].links[this.searchLinkResultChosen[i].index].lineStyle = {};
            option.series[0].links[this.searchLinkResultChosen[i].index].lineStyle.color = highlightColor;
          }
          this.highlightLinkList = this.highlightLinkList.concat(this.searchLinkResultChosen);
          this.chart.setOption(option);
          this.isSearchLinkVisible = false;
          this.isLinkHighlight=true;
        },
        cancelNodeHighlight() {
          var option = this.chart.getOption();
          for (var i = 0; i < this.highlightNodeList.length; i++) {
            option.series[0].nodes[this.highlightNodeList[i].index].itemStyle = {color: this.nodes[i].itemStyle.color};

          }
          this.highlightNodeList = [];
          this.chart.setOption(option);
          this.isNodeHighlight=false;
        },
        cancelLinkHighlight() {
          var option = this.chart.getOption();
          const defaultColor = '#4b565b';
          for (var i = 0; i < this.searchLinkResultChosen.length; i++) {
            option.series[0].links[this.searchLinkResultChosen[i].index].lineStyle = {};
            option.series[0].links[this.searchLinkResultChosen[i].index].lineStyle.color = defaultColor;
          }
          this.highlightLinkList = [];
          this.chart.setOption(option);
          this.isLinkHighlight=false;
        },
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        /////图表变换////////////////////////////////////////////////
        fixChartClick() {
          this.fixChart();
        },
        flexibleChartClick() {
          this.flexibleChart();
        },
        fixChart() {
          var option = this.chart.getOption();
          for (var i = 0; i < this.nodes.length; i++) {
            option.series[0].nodes[i].fixed = true;
          }
          this.chart.setOption(option);
          this.isChartFixed = true;
        },
        flexibleChart() {
          this.showChart();
          // var option = this.chart.getOption();
          // for (var i = 0; i < this.nodes.length; i++) {
          //   option.series[0].nodes[i].fixed = false;
          // }
          // this.chart.setOption(option);
          this.isChartFixed = false;
        },
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        //数据库保存
        getNodePosition() {
          var positionArray = this.chart._chartsViews[0]._symbolDraw._data._itemLayouts;
          return positionArray;
        },
        getChartPosition() {
          var option = this.chart.getOption();
          var position = [];
          for (var i = 0; i < option.series[0].nodes.length; i++) {
            var pos = {x: 0, y: 0};
            pos.x = this.getNodePosition()[i][0];
            pos.y = this.getNodePosition()[i][1];
            position.push(pos);
          }
          return position;
        },
        getChartData() {
          var chartToBeSaved = {
            title: this.option.title.text,
            nodes: [],
            links: [],
            isChartFixed: false,
            positions: [],
          };
          chartToBeSaved.isChartFixed = this.isChartFixed;
          chartToBeSaved.nodes = this.nodes;
          chartToBeSaved.links = this.links;
          if (this.isChartFixed) {
            chartToBeSaved.positions = this.getChartPosition();
          }
          return chartToBeSaved;
        },
        async saveChartClick(isCreateNewFile) {
          var chartToBeSaved = this.getChartData();
          //测试json文件生成
          var jsonData = JSON.stringify(chartToBeSaved, undefined, 4);
          const jsonFile = new Blob([jsonData], {type: 'text/json'});
          const imgFile = this.getChartImgFile();
          // var e = document.createEvent('MouseEvents');
          // var a = document.createElement('a')
          // a.download = "chart.json";
          // a.href = window.URL.createObjectURL(blob)
          // a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
          // e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
          // a.dispatchEvent(e);
          //TODO 数据库保存
          const tempName = this.option.title.text;
          const data = {
            jsonFile: jsonFile,
            imgFile: imgFile,
            name: tempName,
            isChartAlreadySaved:this.isChartAlreadySaved,
            chartId:this.chartId,
          };
          if(isCreateNewFile){
            data.isChartAlreadySaved=false;
          }
          console.log(data);
          if (await this.addChart(data)) {
            if (this.isChartFixed) {
              this.successNotice("保存成功!（已经保存布局）")
            } else {
              this.successNotice("保存成功!（未保存布局）")
            }
          } else {
            this.warningNotice("保存失败！")
          }
        },
        //点击事件
        chartClick(param) {
          if(this.isArrangementChart){
            this.messageNotice("只有在力导图模式下才能修改信息哦！");
            return;
          }
          if (param.dataType == 'edge') {
            this.chosenType = 'link';
            this.isLinkEdit = true;
            this.linkForm.name = param.data.name;
            this.linkForm.des = param.data.des;
            this.linkForm.source = param.data.source;
            this.linkForm.target = param.data.target;
            this.linkName = param.data.name;
            this.linkDes = param.data.des;
            this.linkSource = param.data.source;
            this.linkTarget = param.data.target;
          } else if (param.dataType == 'node') {
            console.log(param.data);
            this.chosenType = 'node';
            this.isNodeEdit = true;
            this.nodeForm.name = param.data.name;
            this.nodeForm.des = param.data.des;
            this.nodeForm.symbol = param.data.symbol;
            this.nodeForm.symbolSize = param.data.symbolSize;
            this.nodeForm.fontSize = param.data.label.fontSize;
            this.nodeForm.color = param.color;
            this.nodeForm.category = this.categories[param.data.category].name;
            this.nodeName = param.data.name;
            this.nodeDes = param.data.des;
            this.nodeSymbol = param.data.symbol;
            this.nodeSymbolSize = param.data.symbolSize;
            this.nodeColor = param.color;
            this.nodeFontSize = param.data.label.fontSize;
            this.nodeCategory = this.categories[param.data.category].name;
          }
          this.isChartInfoEditVisible = true;
        },
        //拖拽事件
        chartDrag(params) {
          if (this.isChartFixed) {
            var option = this.chart.getOption();
            option.series[0].nodes[params.dataIndex].x = params.event.offsetX;
            option.series[0].nodes[params.dataIndex].y = params.event.offsetY;
            option.series[0].nodes[params.dataIndex].fixed = true;
            option.series[0].nodes[params.dataIndex].fixX = true;
            option.series[0].nodes[params.dataIndex].fixY = true;
            this.chart.setOption(option);
          }
        },
        //文件导出函数
        canvasDataURLtoFile(dataurl, filename = 'file') {
          let arr = dataurl.split(',')
          let mime = arr[0].match(/:(.*?);/)[1]
          let bstr = atob(arr[1])
          let n = bstr.length
          let u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          var file = new File([u8arr], filename, {type: mime});
          console.log(file);
          return file;
        },
        getCanvasDataUrl() {
          var canvas = $("#" + "chart").find("canvas").first()[0];
          return canvas.toDataURL();
        },
        chartXMLDownloadClick() {
          const XMLText = '<?xml version="1.0" encoding="UTF-8"?>' + '<chart>' + this.objectToXMLStr(this.getChartData()) + '</chart>';
          const ele = document.createElement('a');// 创建下载链接
          ele.download = "MyChart.xml"
          ele.style.display = 'none';// 隐藏的可下载链接
          const blob = new Blob([XMLText]);
          ele.href = URL.createObjectURL(blob);
          document.body.appendChild(ele);
          ele.click();
          document.body.removeChild(ele);
        },
        objectToXMLStr(data, sig) {
          var xmldata = '';
          var str = '';
          for (var i in data) {
            if (data.constructor == Array) {
              if (sig.length <= 0) {
                str = 'data';
              } else {
                str = sig;
                str = str.substring(0, str.length - 1);
              }
            } else {
              str = i.toString();
            }
            xmldata += '<' + str + '>';
            if (typeof data[i] == 'object') {
              if (data[i].constructor == Array) {
                xmldata += this.objectToXMLStr(data[i], i.toString());
              } else {
                xmldata += this.objectToXMLStr(data[i], '');
              }
            } else {
              xmldata += data[i];
            }
            xmldata += '</' + str + '>';
          }
          return xmldata;
        },
        chartImgDownloadClick() {
          var url = this.getCanvasDataUrl();
          var link = document.createElement('a');
          link.href = url;
          link.download = this.option.title.text + ".png";
          link.click();
        },
        getChartImgFile() {
          var url = this.getCanvasDataUrl();
          return this.canvasDataURLtoFile(url);
        },
        //信息统计
        statisticsClick() {
          this.statisticChart = this.$echarts.init(document.getElementById('statistic'));
          var numOfNodes = this.option.series[0].nodes.length;
          var numOfLinks = this.option.series[0].links.length
          var numOfCategory = this.option.series[0].categories.length;
          var statisticOption = {
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['数目']
            },
            xAxis: {
              data: ['实体数目', '关系数目', '种类数目']
            },
            yAxis: {},
            series: [{
              name: '数目',
              type: 'bar',
              data: [numOfNodes, numOfLinks, numOfCategory]
            }]
          }
          this.statisticChart.setOption(statisticOption)
          this.isStatisticVisible = true;
        },
        warningNotice(info) {
          this.$notify({
            title: '警告',
            message: info,
            type: 'warning'
          });
        },
        successNotice(info) {
          this.$notify({
            title: '成功',
            message: info,
            type: 'success'
          });
        },
        messageNotice(info) {
          this.$notify.info({
            title: '消息',
            message: info,
          });
        },
        openChatBox(){
            this.$refs.chatBox.isChatOpen=true;
        }

    }
  }
</script>

<style scoped>
  #headMenu {
    width: 1500px;
  }

  #sideMenu {
    width: 200px;
    height: 650px;
    float: left;
    display: flex;
  }

  #chart {
    float: left;
    display: flex;
    width: 1488px;
    height: 650px;
    overflow: hidden;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  #chartInfoEdit {
    float: left;
    display: flex;
    width: 300px;
    height: 650px;
    overflow: hidden;
  }

</style>
