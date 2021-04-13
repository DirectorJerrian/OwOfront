<template>
  <div class="chartEdit">
    <div id="headMenu">
      <el-menu
        :default-active="headActiveIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select=""
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">知识图谱处理</el-menu-item>
        <el-menu-item index="2" >我的知识图谱</el-menu-item>
        <el-menu-item index="3" disabled>我的信息</el-menu-item>
      </el-menu>
    </div>
    <div id="sideMenu">
      <el-menu default-active="1" class="el-menu-vertical-demo" >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">实体</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="createNodeClick()">增加实体</el-menu-item>
            <el-menu-item index="1-2" @click="searchNodeClick()">实体信息搜索</el-menu-item>
            <el-menu-item index="1-2" @click="cancelNodeHighlight()">取消实体高亮</el-menu-item>
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
            <el-menu-item index="1-2" @click="cancelLinkHighlight()">取消关系高亮</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">图谱</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="statisticsClick()">信息统计</el-menu-item>
            <el-menu-item index="3-2" @click="">排版模式</el-menu-item>
            <el-menu-item index="3-3" @click="">力导图模式</el-menu-item>
            <el-menu-item index="3-4" @click="fixChartClick()" v-if="!isChartFixed">图谱固定</el-menu-item>
            <el-menu-item index="3-4" @click="flexibleChartClick()" v-else>取消图谱固定</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">保存</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="saveChartClick()">保存到我的图谱</el-menu-item>
            <el-menu-item index="4-2" @click="chartXMLDownloadClick()">图谱XML导出</el-menu-item>
            <el-menu-item index="4-3" @click="chartImgDownloadClick()">图谱图片导出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">拓展功能</span>
        </el-menu-item>
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
        <el-form ref="form" :model="nodeForm" label-width="80px" v-if="this.isNodeCreate">
          <el-form-item label="实体名称" >
            <el-input v-model="nodeForm.name" :placeholder="nodeName"></el-input>
          </el-form-item>
          <el-form-item label="实体描述" >
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
          <el-form-item label="实体大小" >
            <el-slider v-model="nodeForm.symbolSize"></el-slider>
          </el-form-item>
          <el-form-item label="实体颜色">
            <el-color-picker v-model="nodeForm.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="实体种类" >
            <el-input v-model="nodeForm.category" :placeholder="nodeCategory"></el-input>
          </el-form-item>
          <el-form-item label="文字大小">
            <el-slider v-model="nodeForm.fontSize"></el-slider>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="linkForm" label-width="80px" v-if="this.isLinkCreate">
          <el-form-item label="关系名称" >
            <el-input v-model="linkForm.name" :placeholder="'linkName'"></el-input>
          </el-form-item>
          <el-form-item label="起点实体" >
            <el-input v-model="linkForm.source" :placeholder="'linkSource'" disabled></el-input>
          </el-form-item>
          <el-form-item label="终点实体" >
            <el-input v-model="linkForm.target" :placeholder="'linkTarget'" disabled></el-input>
          </el-form-item>
          <el-form-item label="关系描述" >
            <el-input v-model="linkForm.des" :placeholder="'linkDes'"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
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
          <el-form-item label="实体名称" >
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
          <el-form-item label="实体描述" >
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
          <el-form-item label="实体种类" >
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
          <el-button type="primary"  @click="confirmSearchNode()">标记目标</el-button>
          <el-button @click="isSearchNodeVisible= false">取消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="关系搜索"
        :visible.sync="isSearchLinkVisible"
        width="50%"
      >
        <el-form ref="form" :model="searchLinkForm" label-width="80px">
          <el-form-item label="关系名称" >
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
          <el-form-item label="关系描述" >
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
          <el-form-item label="起点实体" >
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
          <el-form-item label="终点实体" >
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
          <el-button type="primary"  @click="confirmSearchLink()">标记目标</el-button>
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
  </div>
</template>

<script>
  import $ from 'jquery'
    export default {
      name: "ChartEdit",
      data () {
        return {
          headActiveIndex: '1',
          nodes:[{
            name: 'node01',
            des: 'nodedes01',
            symbol: 'triangle',
            symbolSize: 70,
            itemStyle: {
              color: '#5470c6',
            },
            label: {
              fontSize: 12,
            },
            category: 0,
          }, {
            name: 'node06',
            des: 'nodedes06',
            symbol: 'triangle',
            symbolSize: 70,
            itemStyle: {
              color: '#5470c6',
            },
            label: {
              fontSize: 12,
            },
            category: 0,
          },{
            name: 'node02',
            des: 'nodedes02',
            symbol: 'circle',
            symbolSize: 50,
            itemStyle: {
              color: '#91CC75',
            },
            label: {
              fontSize: 12,
            },
            category: 1,
          }, {
            name: 'node03',
            des: 'nodedes3',
            symbol: 'circle',
            symbolSize: 50,
            itemStyle: {
              color: '#91CC75',
            },
            label: {
              fontSize: 12,
            },
            category: 1,
          }, {
            name: 'node04',
            des: 'nodedes04',
            symbol: 'circle',
            symbolSize: 50,
            itemStyle: {
              color: '#641585',
            },
            label: {
              fontSize: 12,
            },
            category: 1,
          }, {
            name: 'node05',
            des: 'nodedes05',
            symbol: 'circle',
            symbolSize: 50,
            itemStyle: {
              color: '#91CC75',
            },
            label: {
              fontSize: 12,
            },
            category: 1,
          }],
          links:[{
            source: 'node01',
            target: 'node02',
            name: 'link01',
            des: 'link01des',
          },{
            source: 'node02',
            target: 'node01',
            name: 'link00',
            des: 'reverse',
          },{
            source: 'node01',
            target: ' ',
            name: 'link02',
            des: 'myself',
          },{
            source: ' ',
            target: 'node01',
            name: '',
            des: 'myself',
          },{
            source: 'node01',
            target: 'node03',
            name: 'link02',
            des: 'link02des'
          }, {
            source: 'node01',
            target: 'node04',
            name: 'link03',
            des: 'link03des'
          }, {
            source: 'node01',
            target: 'node05',
            name: 'link04',
            des: 'link05des'
          }],
          categories: [{name:'01 class'},{name:'02 class'}],
          option :{
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
            // 工具箱
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
              // selectedMode: 'single',
              data:[]
            }],
            series: [{
              type: 'graph', // 类型:关系图
              layout: 'force', //图的布局，类型为力导图
              symbolSize: 40, // 调整节点的大小
              roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [2,10],
              force: {
                repulsion: 100,
                gravity:0.01,
                edgeLength:200
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
                show:true,
              },
              //itemStyle: ,

              // 数据
              nodes: [],
              links: [],
              categories: [],
            }]
          },
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
          isChartSearchVisible:false,
          isChartInfoEditVisible:false,
          isNodeEdit:false,
          isLinkEdit:false,
          isNodeCreate:false,
          isLinkCreate:false,
          isSearchNodeVisible:false,
          isSearchLinkVisible:false,
          isStatisticVisible:false,
          isChartFixed:false,

        }
      },
      computed:{

      },
      mounted() {
        this.drawChart();
        this.chart.on('click',this.chartClick);
        this.chart.on('mouseup',this.chartDrag);
      },
      methods:{
        handleClose(done) {
          this.$confirm('确定要提交表单吗？')
            .then(_ => {
              var isFinish = false;
              console.log(this.isNodeCreate);
              if(this.isNodeCreate){
                isFinish=this.changeNode(this.nodeForm);
              }else{
                isFinish=this.changeLink(this.linkForm);
              }
              if(isFinish) this.isChartInfoEditVisible=false;
            })
            .catch(_ => {});
        },
        cancelForm() {
          this.loading = false;
          this.isChartInfoEditVisible = false;
          if(this.isNodeCreate){
            this.isNodeCreate = false;
          }
          else{
            this.isLinkCreate = false;
          }
          clearTimeout(this.timer);
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
        showChart(){
          this.setChart();
          console.log(this.option.series[0].nodes);
          this.chart.setOption(this.option);
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        //更改实体信息
        changeNode(nodeForm) {
          var nodeIndex=this.findNodeIndex(this.nodeName);
          console.log(nodeForm);
          console.log(this.nodes[nodeIndex]);
          if(this.nodes[nodeIndex].name===nodeForm.name &&
            this.nodes[nodeIndex].category===this.getCategoryIndex(nodeForm.category) &&
            this.nodes[nodeIndex].des===nodeForm.des &&
            this.nodes[nodeIndex].symbol===nodeForm.symbol &&
            this.nodes[nodeIndex].symbolSize===nodeForm.symbolSize &&
            this.nodes[nodeIndex].itemStyle.color===nodeForm.color &&
            this.nodes[nodeIndex].label.fontSize===nodeForm.fontSize){
            this.messageNotice("未作任何修改");
            return false;
          }
          //实体名字重复，但可以和自己一样
          var isOverlap=false;
          for(var i=0;i<this.nodes.length;i++){
            if(i===nodeIndex) continue;
            else if(this.nodes[i].name===nodeForm.name){
                isOverlap=true;
                break;
            }
          }
          if(isOverlap){
            this.warningNotice("实体名称重复，请重新修改！");
            return false;
          }
          this.nodes[nodeIndex].name=nodeForm.name;
          this.nodes[nodeIndex].des=nodeForm.des;
          this.nodes[nodeIndex].symbol=nodeForm.symbol;
          this.nodes[nodeIndex].symbolSize=parseInt(nodeForm.symbolSize);
          this.nodes[nodeIndex].itemStyle.color=nodeForm.color;
          this.nodes[nodeIndex].label.fontSize=parseInt(nodeForm.fontSize);
          //这边要做额外修改，先不动
          this.nodes[nodeIndex].category=this.getCategoryIndex(nodeForm.category);
          //将关系中的实体同样做修改
          for(var i=0;i<this.links.length;i++){
            if(this.links[i].source===name)this.links[i].source=nodeForm.name;
            if(this.links[i].target===name)this.links[i].target=nodeForm.name;
          }
          this.showChart();
          this.successNotice("修改成功");
          return true;
        },
        //寻找该node名字的下标
        findNodeIndex(name){
          for(var i=0;i<this.nodes.length;i++){
            if(this.nodes[i].name===name){
              return i;
            }
          }
        },
        getCategoryIndex(name){
          for(var i=0;i<this.categories.length;i++){
            if(name==this.categories[i].name){
              return i;
            }
          }
          return -1;
        },
        createNodeClick(){
          if(this.isChartInfoEditVisible){
            console.log("close");
            this.isNodeCreate = false;
            this.isChartInfoEditVisible = false;
          }
          console.log("open");
          this.isNodeCreate = true;
          this.isChartInfoEditVisible = true;
        },
        createLinkClick(){
          if(this.isChartInfoEditVisible){
            console.log("close");
            this.isLinkCreate = false;
            this.isChartInfoEditVisible = false;
          }
          console.log("open");
          this.isLinkCreate = true;
          this.isChartInfoEditVisible = true;
        },
        ///////////////////////////////////////////////////////////
        //搜索//////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        searchNodeClick(){
          this.isSearchNodeVisible=true;
        },
        searchNode(){
          //存访搜索历史
          if(this.searchNodeForm.name==='' && this.searchNodeForm.category==='' && this.searchNodeForm.des===''){
            this.warningNotice("搜索内容为空，请至少输入一个选项！");
            return;
          }
          if($.inArray(this.searchNodeForm.name,this.searchNodeHistory.name)===-1){
            this.searchNodeHistory.name.push(this.searchNodeForm.name);
          }
          if($.inArray(this.searchNodeForm.des,this.searchNodeHistory.des)===-1){
            this.searchNodeHistory.des.push(this.searchNodeForm.des);
          }
          if($.inArray(this.searchNodeForm.category,this.searchNodeHistory.category)===-1){
            this.searchNodeHistory.category.push(this.searchNodeForm.category);
          }
          //搜索节点,存放到数组中
          this.searchNodeResult=[];
          for(var i=0;i<this.nodes.length;i++){
            if(this.searchNodeForm.name!==''&&!this.isMatch(this.searchNodeForm.name,this.nodes[i].name))continue;
            if(this.searchNodeForm.des!==''&&!this.isMatch(this.searchNodeForm.des,this.nodes[i].des))continue;
            if(this.searchNodeForm.category!==''&&!this.isMatch(this.searchNodeForm.category.toString(),this.nodes[i].category.toString()))continue;
            let res={
              name:this.nodes[i].name,
              des:this.nodes[i].des,
              category:this.nodes[i].category,
              index:i,
            };
            this.searchNodeResult.push(res);
          }
        },
        selectSearchNodeName(obj){
          this.searchNodeForm.name=obj.name;
        },
        selectSearchNodeDes(obj){
          this.searchNodeForm.des=obj.des;
        },
        selectSearchNodeCategory(obj){
          this.searchNodeForm.category=obj.category;
        },
        getSearchNodeNameHistory(str,cb){
          var res=[];
          for(var i=0;i<this.searchNodeHistory.name.length;i++){
            res.push({name:this.searchNodeHistory.name[i]});
          }
          cb(res);
        },
        getSearchNodeDesHistory(str,cb){
          var res=[];
          for(var i=0;i<this.searchNodeHistory.des.length;i++){
            res.push({des:this.searchNodeHistory.des[i]});
          }
          cb(res);
        },
        getSearchNodeCategoryHistory(str,cb){
          var res=[];
          for(var i=0;i<this.searchNodeHistory.category.length;i++){
            res.push({category:this.searchNodeHistory.category[i]});
          }
          cb(res);
        },
        setSearchNodeResultChosen(val){
          this.searchNodeResultChosen=val;
        },
        confirmSearchNode(){
          if(this.searchNodeResultChosen.length==0){
            this.warningNotice("未选中任何实体");
            return;
          }
          const highlightColor='#FF0000'
          //标红
          var option=this.chart.getOption();
          for(var i=0;i<this.searchNodeResultChosen.length;i++){
            option.series[0].nodes[this.searchNodeResultChosen[i].index].itemStyle.color=highlightColor;
          }
          this.chart.setOption(option);
          this.isSearchNodeVisible=false;
        },
        searchLinkClick(){
          this.isSearchLinkVisible=true;
        },
        searchLink(){
          if(this.searchLinkForm.name=='' && this.searchLinkForm.des==''
            && this.searchLinkForm.source=='' && this.searchLinkForm.target==''){
            this.warningNotice("搜索内容为空，请至少输入一个选项！");
            return;
          }
          if($.inArray(this.searchLinkForm.name,this.searchLinkHistory.name)===-1){
            this.searchLinkHistory.name.push(this.searchLinkForm.name);
          }
          if($.inArray(this.searchLinkForm.des,this.searchLinkHistory.des)===-1){
            this.searchLinkHistory.des.push(this.searchLinkForm.des);
          }
          if($.inArray(this.searchLinkForm.source,this.searchLinkHistory.source)===-1){
            this.searchLinkHistory.source.push(this.searchLinkForm.source);
          }
          if($.inArray(this.searchLinkForm.target,this.searchLinkHistory.target)===-1){
            this.searchLinkHistory.target.push(this.searchLinkForm.target);
          }
          this.searchLinkResult=[];
          for(var i=0;i<this.links.length;i++){
            if(this.searchLinkForm.name!==''&&!this.isMatch(this.searchLinkForm.name,this.links[i].name))continue;
            if(this.searchLinkForm.des!==''&&!this.isMatch(this.searchLinkForm.des,this.links[i].des))continue;
            if(this.searchLinkForm.source!==''&&!this.isMatch(this.searchLinkForm.source,this.links[i].source))continue;
            if(this.searchLinkForm.target!==''&&!this.isMatch(this.searchLinkForm.target,this.links[i].target))continue;
            let res={
              name:this.links[i].name,
              des:this.links[i].des,
              source:this.links[i].source,
              target:this.links[i].target,
              index:i,
            };
            this.searchLinkResult.push(res);
          }
        },
        selectSearchLinkName(obj){
          this.searchLinkForm.name=obj.name;
        },
        selectSearchLinkDes(obj){
          this.searchLinkForm.des=obj.des;
        },
        selectSearchLinkSource(obj){
          this.searchLinkForm.source=obj.source;
        },
        selectSearchLinkTarget(obj){
          this.searchLinkForm.target=obj.target;
        },
        getSearchLinkNameHistory(str,cb){
          var res=[];
          for(var i=0;i<this.searchLinkHistory.name.length;i++){
            res.push({name:this.searchLinkHistory.name[i]});
          }
          cb(res);
        },
        getSearchLinkDesHistory(str,cb){
          var res=[];
          for(var i=0;i<this.searchLinkHistory.des.length;i++){
            res.push({des:this.searchLinkHistory.des[i]});
          }
          cb(res);
        },
        getSearchLinkSourceHistory(str,cb){
          var res=[];
          for(var i=0;i<this.searchLinkHistory.source.length;i++){
            res.push({source:this.searchLinkHistory.source[i]});
          }
          cb(res);
        },
        getSearchLinkTargetHistory(str,cb){
          var res=[];
          for(var i=0;i<this.searchLinkHistory.target.length;i++){
            res.push({target:this.searchLinkHistory.target[i]});
          }
          cb(res);
        },
        setSearchLinkResultChosen(val){
          this.searchLinkResultChosen=val;
        },
        isMatch(searchStr,str){
          let index = -1, flag = false;
          for(var i = 0, arr = searchStr.split(""); i < arr.length; i++ ){
            //有一个关键字都没匹配到，则没有匹配到数据
            if(str.indexOf(arr[i]) < 0){
              break;
            }else{
              let match = str.matchAll(arr[i]);
              let next = match.next();
              while (!next.done){
                if(next.value.index > index){
                  index = next.value.index;
                  if(i === arr.length - 1){
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
        confirmSearchLink(){
          if(this.searchLinkResultChosen.length==0){
            this.warningNotice("未选中任何关系");
            return;
          }
          const highlightColor='#FF0000'
          //标红
          var option=this.chart.getOption();
          for(var i=0;i<this.searchLinkResultChosen.length;i++){
            option.series[0].links[this.searchLinkResultChosen[i].index].lineStyle={};
            option.series[0].links[this.searchLinkResultChosen[i].index].lineStyle.color=highlightColor;
          }
          this.chart.setOption(option);
          this.isSearchLinkVisible=false;
        },
        cancelNodeHighlight(){
          var option=this.chart.getOption();
          for(var i=0;i<this.searchNodeResultChosen.length;i++){
            option.series[0].nodes[this.searchNodeResultChosen[i].index].itemStyle.color=this.nodes[i].itemStyle.color;
          }
          this.chart.setOption(option);
        },
        cancelLinkHighlight(){
          var option=this.chart.getOption();
          const defaultColor='#4b565b'
          for(var i=0;i<this.searchLinkResultChosen.length;i++){
            option.series[0].links[this.searchLinkResultChosen[i].index].lineStyle={};
            option.series[0].links[this.searchLinkResultChosen[i].index].lineStyle.color=defaultColor;
          }
          this.chart.setOption(option);
        },
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        /////图表变换////////////////////////////////////////////////
        fixChart(){
          var option=this.chart.getOption();
          for(var i=0;i<this.nodes.length;i++){
            option.series[0].nodes[i].fixed=true;
          }
          this.chart.setOption(option);
          this.isChartFixed=true;
        },
        flexibleChart(){
          var option=this.chart.getOption();
          for(var i=0;i<this.nodes.length;i++){
            option.series[0].nodes[i].fixed=false;
          }
          this.chart.setOption(option);
          this.isChartFixed=false;
        },
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        //数据库保存
        getNodePosition(){
          var positionArray=this.chart._chartsViews[0]._symbolDraw._data._itemLayouts;
          return positionArray;
        },
        getChartPosition(){
          var option=this.chart.getOption();
          var position=[];
          for(var i=0;i<option.series[0].nodes.length;i++){
            var pos={x:0,y:0};
            pos.x=this.getNodePosition()[i][0];
            pos.y=this.getNodePosition()[i][1];
            position.push(pos);
          }
          return position;
        },
        saveChartClick(){
          var chartToBeSaved={
            nodes:[],
            links:[],
            isChartFixed:false,
          };
          chartToBeSaved.isChartFixed=this.isChartFixed;
          chartToBeSaved.nodes=this.nodes;
          chartToBeSaved.links=this.links;
          if(this.isChartFixed){
            chartToBeSaved.position=this.getChartPosition();
          }
          //TODO 数据库保存
          if(this.isChartFixed){
            this.successNotice("保存成功!（已经保存布局）")
          }else{
            this.successNotice("保存成功!（未保存布局）")
          }

        },
        //点击事件
        chartClick(param){
          if(param.dataType=='edge'){
            this.chosenType='link';
            this.isLinkCreate = true;
            this.linkForm.name=param.data.name;
            this.linkForm.des=param.data.des;
            this.linkForm.source=param.data.source;
            this.linkForm.target=param.data.target;
            this.linkName=param.data.name;
            this.linkDes=param.data.des;
            this.linkSource=param.data.source;
            this.linkTarget=param.data.target;
          }else if(param.dataType=='node'){
            this.chosenType='node';
            this.isNodeCreate = true;
            this.nodeForm.name=param.data.name;
            this.nodeForm.des=param.data.des;
            this.nodeForm.symbol=param.data.symbol;
            this.nodeForm.symbolSize=param.data.symbolSize;
            this.nodeForm.fontSize=param.data.label.fontSize;
            this.nodeForm.color=param.color;
            this.nodeForm.category=this.categories[param.data.category].name;
            this.nodeName=param.data.name;
            this.nodeDes=param.data.des;
            this.nodeSymbol=param.data.symbol;
            this.nodeSymbolSize=param.data.symbolSize;
            this.nodeColor=param.color;
            this.nodeFontSize=param.data.label.fontSize;
            this.nodeCategory=this.categories[param.data.category].name;
          }
          this.isChartInfoEditVisible=true;
        },
        //拖拽事件
        chartDrag(params){
          if(this.isChartFixed){
            var option=this.chart.getOption();
            option.series[0].nodes[params.dataIndex].x=params.event.offsetX;
            option.series[0].nodes[params.dataIndex].y=params.event.offsetY;
            option.series[0].nodes[params.dataIndex].fixed=true;
            this.chart.setOption(option);
          }

        },
        //TODO 由于node节点内容修改，需要重写
        chartXMLDownloadClick(){
          const XMLText=charToText();
          const ele = document.createElement('a');// 创建下载链接
          ele.download ="MyChart.xml"
          ele.style.display = 'none';// 隐藏的可下载链接
          const blob = new Blob([XMLText]);
          ele.href = URL.createObjectURL(blob);
          document.body.appendChild(ele);
          ele.click();
          document.body.removeChild(ele);
        },
        charToText(){
          var res='<?xml version="1.0" encoding="utf-8" standalone="no"?>';
          res+="<chart>";
          ////////////////////
          //添加实体
          res+="<data>";
          for(var i=0;i<data.length;i++){
            res+="<node>";
            res+="<name>"+data[i].name+"</name>";
            res+="<des>"+data[i].des+"</des>";
            res+="<symbolSize>"+data[i].symbolSize+"</symbolSize>";
            res+="<category>"+data[i].category+"</category>";
            res+="</node>";
          }
          res+="</data>";
          ///////////////////
          res+="<links>";
          for(var i=0;i<links.length;i++){
            res+="<link>";
            res+="<source>"+links[i].source+"</source>";
            res+="<target>"+links[i].target+"</target>";
            res+="<name>"+links[i].name+"</name>>";
            res+="<des>"+links[i].des+"</des>";
            res+="</link>";
          }
          res+="</links>";
          //添加关系
          //////////////////
          res+="</chart>";
          return res;
        },
        chartImgDownloadClick(){
          var canvas = $("#"+"chart").find("canvas").first()[0];
          var ctx = canvas.getContext('2d');
          var url=canvas.toDataURL();
          var link = document.createElement('a');
          link.href = url;
          link.download = this.option.title.text+".png";
          link.click();
        },
        //信息统计
        statisticsClick(){
          this.statisticChart = this.$echarts.init(document.getElementById('statistic'));
          var numOfNodes = this.option.series[0].nodes.length;
          var numOfLinks = this.option.series[0].links.length
          var numOfCategory =this.option.series[0].categories.length;
          var statisticOption={
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            legend:{
              data:['个数']
            },
            xAxis: {
              data: ['节点个数','关系个数','种类个数']
            },
            yAxis: {},
            series: [{
              name:'个数',
              type:'bar',
              data:[numOfNodes,numOfLinks,numOfCategory]
            }]
          }
          this.statisticChart.setOption(statisticOption)
          this.isStatisticVisible=true;
        },
        fixChartClick(){
          this.fixChart();
        },
        flexibleChartClick(){
          this.flexibleChart();
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


      }
    }
</script>

<style scoped>
  #headMenu{
    width: 1500px;
  }
  #sideMenu{
    width: 200px;
    height:650px;
    float:left;
    display:flex;
  }
  #chart{
    float:left;
    display: flex;
    width:1300px;
    height:650px;
    overflow: hidden;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  #chartInfoEdit{
    float: left;
    display: flex;
    width: 300px;
    height: 650px;
    overflow: hidden;
  }

</style>
