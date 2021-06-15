<template>
  <div class="chatBox">
    <beautiful-chat
      :participants="participants"
      :onMessageWasSent="onMessageWasSent"
      :titleImageUrl="titleImageUrl"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :icons="icons"
      :open="openChat"
      :showDeletion="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      @onType="handleOnType"
      @edit="editMessage" />

  </div>
</template>

<script>
  import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
  import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
  import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
  import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'
  import {mapActions} from "vuex"
    export default {
      name: "chatBox",
      data() {
        return {
          icons:{
            open:{
              img: OpenIcon,
              name: 'default',
            },
            close:{
              img: CloseIcon,
              name: 'default',
            },
            file:{
              img: FileIcon,
              name: 'default',
            },
            closeSvg:{
              img: CloseIconSvg,
              name: 'default',
            },
          },
          titleImageUrl: 'https://umlpicture.oss-cn-shanghai.aliyuncs.com/%E8%BD%AF%E5%B7%A53/%E9%97%AE%E7%AD%94.png',
          participants: [
            {
              id: 'user1',
              name: 'OwO Robot',
              imageUrl: 'https://umlpicture.oss-cn-shanghai.aliyuncs.com/%E8%BD%AF%E5%B7%A53/%E6%9C%BA%E5%99%A8%E4%BA%BA.png'
            }
          ],
          messageList: [
            { type: 'text', author: `user1`, data: { text: `您可以向我询问关于该知识图谱的相关问题哦！` } }
          ],
          newMessagesCount: 0,
          isChatOpen: false,
          showTypingIndicator: '',
          colors: {
            header: {
              bg: '#70cdff',
              text: '#ffffff'
            },
            launcher: {
              bg: '#4e8cff'
            },
            messageList: {
              bg: '#ffffff'
            },
            sentMessage: {
              bg: '#4e8cff',
              text: '#ffffff'
            },
            receivedMessage: {
              bg: '#eaeaea',
              text: '#222222'
            },
            userInput: {
              bg: '#f4f7f9',
              text: '#565867'
            }
          }, // 指定组件的配色方案
          alwaysScrollToBottom: true, // 当设置为true时，当有新事件发生时(新消息，用户开始输入…)，总是将聊天滚动到底部。
          messageStyling: true // 启用*bold* /emph/ _underline_等(更多信息请访问github.com/mattezza/msgdown)
        }
      },
      methods: {
        ...mapActions([
          'getAnswer'
        ]),
        onMessageWasSent (message) {
          // 当用户发送消息时调用
          this.messageList = [ ...this.messageList, message ]
          this.msgProcess(message.data.text);

        },
        async msgProcess(msg) {
          var data = {
            dataString: JSON.stringify(this.$parent.getChartData()),
            nextData: msg,
          }
          console.log(data);
          const res = await this.getAnswer(data);
          this.messageList.push({author: 'user1', type: 'text', data: {text: res}})
        },
        openChat () {
          // 当用户单击fab按钮打开聊天时调用
          this.isChatOpen = true
          this.newMessagesCount = 0
        },
        closeChat () {
          // 当用户单击按钮关闭聊天时调用
          this.isChatOpen = false
        },
        handleScrollToTop () {
          // 当用户将消息列表滚动到顶部时调用
          // 利用分页来加载另一个消息页面
        },
        handleOnType () {
          console.log('Emit typing event')
        },
        editMessage(message){
          const m = this.messageList.find(m=>m.id === message.id);
          m.isEdited = true;
          m.data.text = message.data.text;
        }
      }

    }
</script>

<style scoped>

</style>
