<template>
  <transition name="list">
    <div class="detail-body scroll-top">
      <back ref="back" @back="_setNull"></back>
      <div class="task-info flex fw js">
        <div class="submit-job-header flex line-back old-line-back">
          {{detail_info.title.slice(0,8)}}
          <div class="min-title">{{detail_info.min_title}}</div>
        </div>
        <div class="normal-title flex">{{detail_info.task_message ? `未通过原因: ${detail_info.task_message}` :
          '请按示例截图并上传提交给悬赏人审核'}}
        </div>
        <div class="upload-warp magnifier" @click="_setEnlargeImage(detail_info.complete_image)"
             :style="`background: #f8f8f8 url(${detail_info.complete_image}) no-repeat center center; background-size: 100% 100%;`">
          <div class="complete-image">
            <img :src="detail_info.complete_image"/>
          </div>
        </div>
        <div class="upload-warp magnifier"
             :style="`background: #f8f8f8 url(${detail_info.task_image}) no-repeat center center; background-size: 100% 100%;`"
             v-if="(detail_info.task_image && detail_info.status !== 3) || detail_info.audit"
             @click="_setEnlargeImage(detail_info.task_image)">
          <downwx ref="downwx" :url="detail_info.task_image" :index="0" @load="_setWxUrl"
                  v-if="detail_info && ((detail_info.task_image && detail_info.status !== 3) || detail_info.audit)"
                  :config="config"></downwx>
        </div>
        <div class="upload-warp" v-else>
          <div class="upload-inner flex" @click="_choseImg">
            <div class="process-warp flex fw" v-show="process && process < 100">
              {{process}}%
              <span class="flex">正在上传,请耐心等待...</span>
            </div>
            <upload ref="upload" @view="_setUrl" @setprocess="_setProcess" @err="_err" @success="_success"
                    v-if="!showZC"></upload>
            <img ref="previewImg"/>
          </div>
        </div>
        <div v-if="detail_info.complete_image2" class="flex js">
          <div class="upload-warp magnifier" @click="_setEnlargeImage(detail_info.complete_image2)"
               :style="`background: #f8f8f8 url(${detail_info.complete_image2}) no-repeat center center; background-size: 100% 100%;`">
            <div class="complete-image">
              <img :src="detail_info.complete_image2"/>
            </div>
          </div>
          <div class="upload-warp magnifier"
               :style="`background: #f8f8f8 url(${detail_info.task_image2}) no-repeat center center; background-size: 100% 100%;`"
               v-if="(detail_info.task_image2 && detail_info.status !== 3) || detail_info.audit"
               @click="_setEnlargeImage(detail_info.task_image2)">
            <downwx ref="downwx" :url="detail_info.task_image2" :index="0" @load="_setWxUrl"
                    v-if="detail_info && ((detail_info.task_image2 && detail_info.status !== 3) || detail_info.audit)"
                    :config="config"></downwx>
          </div>
          <div class="upload-warp" v-else>
            <div class="upload-inner flex" @click="_choseImg2">
              <div class="process-warp flex fw" v-show="process2 && process2 < 100">
                {{process2}}%
                <span class="flex">正在上传,请耐心等待...</span>
              </div>
              <upload ref="upload2" @view="_setUrl2" @setprocess="_setProcess2" @err="_err2" @success="_success2"
              v-if="!showZC"></upload>
              <img ref="previewImg2"/>
            </div>
          </div>
        </div>
        <div class="flex success" v-if="!detail_info.audit && detail_info.status === 2">
          <img src="../../assets/img/manage4.png"/>
          您的任务已审核通过，赏金已进入您的收益。
        </div>
        <div class="flex task-input-warp"
             v-if="!detail_info.audit && (!detail_info.status || detail_info.status === 3)">
          <div class="tiw-left flex tiw-left-new">{{type}}名字<span class="min-name-tips">(非{{type}}号)</span></div>
          <div class="tiw-mid">
            <input type="text" name="抖音名字" :placeholder="'请输入你的'+type+'名字'" class="index-input disScroll"
                   v-model="dy_name"/>
          </div>
          <div class="tiw-right"></div>
        </div>
        <!--task_nickname-->
        <div v-if="detail_info.audit && detail_info.status" class="flex dy-id">
          {{type}}名称:{{detail_info.task_nickname}}
        </div>
      </div>

      <interlayer ref="interlayer"></interlayer>
      <popup ref="nopass">
        <div class="popup-report">
          <h1 class="flex pop-title">审核不通过</h1>
          <span class="describe">告知提交人不通过原因</span>
          <div class="pop-text-text flex nopass-text">
            <textarea v-model="nopass" placeholder="不通过理由" maxlength="120" class="disScroll"></textarea>
          </div>
          <div class="pop-btn-warp flex">
            <div class="flex pop-btn back-f8" @click="_close">取消</div>
            <div class="flex pop-btn line-back" @click="_noPass">确定</div>
          </div>
        </div>
      </popup>
      <popup ref="popup">
        <div class="popup-report flex fw js">
          <h1 class="flex pop-title">举报维权</h1>
          <span class="describe">请上传您真实任务完成截图，对您仲裁结果成功率更高哦！</span>
          <div class="upload-warp" @click="_choseImgZC">
            <div class="upload-inner flex">
              <div class="process-warp flex fw" v-show="processZC && processZC < 100">
                {{processZC}}%
                <span class="flex">正在上传...</span>
              </div>
              <upload ref="uploadZC" @view="_setUrlZC" @setprocess="_setProcessZC" @err="_errZC"
                      @success="_successZC" key="processZC" v-if="showZC"></upload>
              <img ref="previewImgZC"/>
            </div>
          </div>
          <div class="upload-warp">
            <span class="reSay-waro ell">等待对方回复</span>
          </div>
          <div class="pop-text-text flex">
            <textarea v-model="textarea" placeholder="辩诉说明" maxlength="120" class="disScroll"></textarea>
          </div>
          <div class="pop-btn-warp flex">
            <div class="flex pop-btn back-f8" @click="_close">取消</div>
            <div class="flex pop-btn line-back" @click="_submitZC">确定</div>
          </div>
        </div>
      </popup>
      <enlarge :image="enlarge_image" @close="_setEnlargeImage()"></enlarge>
      <div class="task-btn flex line-back" @click="_submit" v-if="!detail_info.audit && !detail_info.status">完成任务</div>
      <div class="task-btn flex disable-btn" v-if="!detail_info.audit && detail_info.status === 1">审核中</div>
      <div class="task-btn flex red-btn" @click="_submit" v-if="!detail_info.audit && detail_info.status === 3">提交修改
      </div>
      <div class="task-btn flex gre-btn" v-if="!detail_info.audit && detail_info.status === 3" @click="_showModel">
        申请仲裁
      </div>
      <div class="task-btn flex disable-btn" v-if="detail_info.status > 3">仲裁中</div>
      <!--审核-->
      <div class="task-btn flex disable-btn" v-if="detail_info.audit && detail_info.status === 2">已审核通过</div>
      <div class="task-btn flex red-btn" v-if="detail_info.audit && detail_info.status === 1" @click="_showNoPasss">
        不通过
      </div>
      <div class="task-btn flex gre-btn" v-if="detail_info.audit && detail_info.status === 1" @click="_pass(1)">通过</div>
      <div style="height: 35px"></div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import upload from 'base/upload/upload'
  import {sub_or_arb, pass_or_fail_task} from 'api/index'
  import interlayer from 'base/interlayer/interlayer'
  import popup from 'base/popup/popup'
  import enlarge from 'components/enlarge/enlarge'
  import downwx from 'base/upload/down_wx_image'
  import {jsapi_code} from 'api/index'

  export default {
    name: 'submitJob',
    data() {
      return {
        showZC: null,
        process: 0,
        process2:0,
        processZC: 0,
        detail_info: {
          id: null,
          min_title: '抖音粉丝',
          title: ''
        },
        res_info: null,
        res_info2: null,
        res_info_ZC: null,
        textarea: '',
        nopass: '',
        dy_name: '',
        enlarge_image: null,
        config: null,
        type: '抖音'
      }
    },
    created() {
      this._getJsapiCode()
    },
    mounted() {
      document.querySelectorAll('.disScroll').forEach((item) => {
        item.addEventListener('blur', () => {
          try {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
          } catch (e) {
            console.log(e)
          }
        })
      })
    },
    methods: {
      _init() {
        this.detail_info = this.$route.params.info
        this.type = this.detail_info.service_group_id === 2 ? '快手' : '抖音'
        this.$root.eventHub.$on(`submitJob`, (info) => {
          this.detail_info = this.$route.params.info
          this.type = this.detail_info.service_group_id === 2 ? '快手' : '抖音'
          try {
            if (this.detail_info.task_image) {
              this.$refs.downwx._loadUrl(this.detail_info.task_image)
            }
          } catch (e) {
            console.log(e)
          }
        })
        try {
          this.dy_name = localStorage.getItem('douyinID') || ''
        } catch (e) {
          console.log(e)
        }
      },
      async _getJsapiCode() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await jsapi_code((window.location.href.split('#')[0]))
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          console.log('配置jsapi')
          this.config = ret.data.data
          this._init()
        } else {
          this.$root.eventHub.$emit('titps', ret)
        }
      },
      _setEnlargeImage(image) {
        if (!image) {
          this.enlarge_image = null
        } else {
          this.enlarge_image = image
        }
      },
      _noPass() {
        if (!this.nopass) {
          this.$root.eventHub.$emit('titps', `请输入不通过的理由`)
          return false
        }
        if (this.nopass.length < 6) {
          this.$root.eventHub.$emit('titps', `请至少输入5个字符`)
          return false
        }
        this._pass(2, this.nopass)
      },
      async _pass(type, task_message) {
        if (!this.detail_info.task_id && this.detail_info.task_id !== 0) {
          this.$root.eventHub.$emit('titps', `请刷新页面后重试`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await pass_or_fail_task(this.detail_info.id, this.detail_info.task_id, this.$root.user.username, type, task_message)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.nopass = ''
          this.$root.eventHub.$emit('audit', this.detail_info.task_id)
          this.$root.eventHub.$emit('taskDetail', this.detail_info.page_id)
          this.$root.eventHub.$emit('titps', `提交成功~`)
          this._setNull()
          this.$refs.back._back()
        }
        if (ret === 442) {
          this.$root.eventHub.$emit('audit', this.detail_info.task_id)
          this.$root.eventHub.$emit('titps', `该任务已完成`)
        }
        if (ret === 403) {
          this.$root.eventHub.$emit('titps', `网络开了小差~`)
          return false
        }
        if (ret === 404) {
          this.$root.eventHub.$emit('titps', `好像出错啦~`)
          return false
        }
      },
      _setNull() {
        try {
          this.processZC = 0
          this.process = 0
          this.process2 = 0
          this._close()
          if (this.$refs.uploadZC) {
            this.$refs.uploadZC._clear()
          }
          if (this.$refs.upload) {
            this.$refs.upload._clear()
          }
          if (this.$refs.upload2) {
            this.$refs.upload2._clear()
          }
        } catch (e) {
          console.log(e)
        }
      },
      _close() {
        this.showZC = null
        this.$refs.interlayer._hiddenLayer()
        this.$refs.popup._hiddenPopup()
        this.$refs.nopass._hiddenPopup()
      },
      _err() {
        this.process = 0
        this.$refs.previewImg.src = null
        this.$root.eventHub.$emit('titps', `上传出错啦,请查询选择图片~`)
      },
      _err2() {
        this.process2 = 0
        this.$refs.previewImg2.src = null
        this.$root.eventHub.$emit('titps', `上传出错啦,请查询选择图片~`)
      },
      _setUrl(url) {
        this.process = 0.1
        this.$refs.previewImg.src = url || ''
      },
      _setUrl2(url) {
        this.process2 = 0.1
        this.$refs.previewImg2.src = url || ''
      },
      _setProcess(res) {
        try {
          if (!res || !res.total) {
            this.process = 0
          } else {
            this.process = res.total.percent.toFixed(2)
          }
        } catch (e) {
          this.process = 0
          console.log(e)
        }
      },
      _setProcess2(res) {
        try {
          if (!res || !res.total) {
            this.process2 = 0
          } else {
            this.process2 = res.total.percent.toFixed(2)
          }
        } catch (e) {
          this.process2 = 0
          console.log(e)
        }
      },
      _showModel() {
        this.showZC = true
        this.$refs.interlayer._showLayer()
        this.$refs.popup._showPopup()
      },
      _showNoPasss() {
        this.$refs.interlayer._showLayer()
        this.$refs.nopass._showPopup()
      },
      _errZC() {
        this.processZC = 0
        this.$refs.previewImgZC.src = null
        this.$root.eventHub.$emit('titps', `上传出错啦,请查询选择图片~`)
      },
      _setUrlZC(url) {
        // console.log('seurlzc')
        this.processZC = 0.1
        this.$refs.previewImgZC.src = url || ''
        // this.$refs.previewImgZC.style.opacity = 1
      },
      _setProcessZC(res) {
        try {
          if (!res || !res.total) {
            this.processZC = 0
          } else {
            this.processZC = res.total.percent.toFixed(2)
          }
        } catch (e) {
          this.processZC = 0
          console.log(e)
        }
      },
      _successZC(res) {
        this.res_info_ZC = res
      },
      _choseImgZC() {
        if (this.processZC && this.processZC < 100) {
          console.log(this.processZC)
          return false
        }
        this.$refs.uploadZC._imitateClick()
      },
      _choseImg() {
        if (this.process && this.process < 100) {
          // console.log(this.process)
          return false
        }
        if (this.detail_info.status === -1) {
          this.$root.eventHub.$emit('titps', `任务已到期,无法提交~`)
          return false
        }
        this.$refs.upload._imitateClick()
      },
      _choseImg2() {
        if (this.process2 && this.process2 < 100) {
          return false
        }
        if (this.detail_info.status === -1) {
          this.$root.eventHub.$emit('titps', `任务已到期,无法提交~`)
          return false
        }
        this.$refs.upload2._imitateClick()
      },
      _success(res) {
        this.res_info = res
      },
      _success2(res) {
        this.res_info2 = res
      },
      async _submitZC() {
        if (!this.textarea) {
          this.$root.eventHub.$emit('titps', `请先填写您的申诉理由~`)
          return false
        }
        if (!this.processZC) {
          this.$root.eventHub.$emit('titps', `请先上传您完成的截图~`)
          return false
        }
        if (this.processZC < 100) {
          this.$root.eventHub.$emit('titps', `请等待上传完成`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        // sub_or_arb(username, id, sub_type, task_image, appeal_user_image, appeal_user_explain) {
        const ret = await sub_or_arb(this.$root.user.username, this.detail_info.id, 2, null, this.res_info_ZC.key, this.textarea)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('updateMyTask')
          this.$root.eventHub.$emit('taskDetail', this.detail_info.page_id)
          this.$root.eventHub.$emit('titps', `提交成功~`)
          this._setNull()
          this.$router.back(-1)
          return false
        }
        if (ret === 403) {
          this.$root.eventHub.$emit('titps', `您已经提交过了~`)
        }
      },
      _setWxUrl(arg) {
        this.detail_info.task_image = arg.url
      },
      async _submit() {
        if (!this.process) {
          this.$root.eventHub.$emit('titps', `请先上传您完成的截图~`)
          return false
        }
        if (this.process < 100) {
          this.$root.eventHub.$emit('titps', `请等待上传完成`)
          return false
        }
        if (!this.dy_name) {
          this.$root.eventHub.$emit('titps', `请填写${this.type}名称`)
          return false
        }
        if (!this.res_info || !this.res_info.key) {
          this.$root.eventHub.$emit('titps', `请等待上传完成`)
          return false
        }
        if (this.detail_info.complete_image2 && this.process2 < 100) {
          this.$root.eventHub.$emit('titps', `请等待上传完成`)
          return false
        }
        if (this.detail_info.complete_image2 && (!this.res_info2 || !this.res_info2.key)) {
          this.$root.eventHub.$emit('titps', `请上传两张截图`)
          return false
        }
        try {
          this.$root.eventHub.$emit('loading', true)
          const ret = await sub_or_arb(this.$root.user.username, this.detail_info.id, 1, this.res_info.key, null, null, this.dy_name, this.res_info2 ? this.res_info2.key: null)
          this.$root.eventHub.$emit('loading', null)
          if (ret.status === 200 && ret.data.code === 200) {
            if (this.detail_info.status && this.detail_info.status === 3) {
              this.$root.eventHub.$emit('updateMyTask')
              this.$root.eventHub.$emit('taskDetail', this.detail_info.page_id)
              this.$root.eventHub.$emit('titps', `修改成功~`)
              this._setNull()
              this.$router.back(-1)
            } else {
              this.$root.eventHub.$emit('titps', `提交成功~`)
              this.$root.eventHub.$emit('updateMyTask')
              this.$root.eventHub.$emit('taskDetail', this.detail_info.page_id)
              this._setNull()
              this.$router.back(-1)
            }
            localStorage.setItem('douyinID', this.dy_name)
            return false
          }
          if (ret === 404) {
            this.$root.eventHub.$emit('titps', `任务信息错误~`)
          }
          if (ret === 403) {
            this.$root.eventHub.$emit('titps', `提交任务的人数过多,请稍后提交~`)
          }
        } catch (e) {
          this.$root.eventHub.$emit('titps', `网络错误,请刷新页面后重试`)
          return false
        }
      },
    },
    components: {
      back,
      upload,
      popup,
      enlarge,
      downwx,
      interlayer
    },
  }
</script>

<style scoped>
  .normal-title {
    width: 92%;
    flex-shrink: 0;
    min-height: 40px;
    height: auto;
    line-height: 20px;
    word-break: break-all;
    padding: 10px 4%;
  }

  .detail-body {
    z-index: 9999;
  }

  .task-info {
    align-items: flex-start;
    align-content: flex-start;
    padding: 0;
    overflow: hidden;
  }

  .submit-job-header {
    color: #fff;
    font-weight: 600;
    justify-content: flex-start;
    height: 50px;
    /*text-indent: 20px;*/
    padding: 0 20px;
  }

  .min-title {
    background: #E3DEFF;
    color: #6B41E1;
    width: auto;
    padding: 4px 6px;
    border-radius: 5px;
    font-size: 10px;
    font-weight: 400;
    margin: 0 20px;
  }

  .upload-warp {
    width: 44%;
    margin: 10px 0 10px 4%;
    flex-grow: 0;
    height: 0;
    padding-top: 70%;
    background: #F8F8F8;
    /*margin: 12px;*/
    position: relative;
  }

  .upload-inner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url("../../assets/img/phone.png") no-repeat center center;
    background-size: 55px auto;
    overflow: hidden;
    align-items: flex-start;
    border: 1px solid #f8f8f8;
  }

  .upload-inner img {
    width: 100%;
    height: auto;
  }

  .process-warp {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .55);
    color: #aee4ac;
    font-weight: 600;
    font-size: 20px;
  }

  .process-warp span {
    color: #fff;
    font-weight: 600;
    font-size: 13px;
    margin-top: 15px;
  }

  .disable-btn {
    background: #dfdfdf;
    color: rgba(0, 0, 0, .3);
  }

  .success {
    width: 90%;
    padding: 0 2%;
    height: 90px;
    border-radius: 10px;
    background: #f8f8f8;
    color: #444;
    margin: 0 auto 20px;
    line-height: 20px;
  }

  .success img {
    width: 40px;
    height: auto;
    margin: 0 10px 0 0;
  }

  .task-btn {
    margin: 30px auto -15px;
  }

  .red-btn {
    background: #FF3939;
  }

  .gre-btn {
    background: #33C945;
  }

  .popup-report {
    width: 80%;
    padding: 4% 4% 70px 4%;
    min-height: 160px;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
  }

  .pop-title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
  }

  .describe {
    display: block;
    width: 90%;
    line-height: 20px;
    margin: 0 auto;
    color: #444;
  }

  .pop-text-text {
    width: 94%;
    height: 80px;
    background: #f8f8f8;
    border-radius: 4px;
    overflow: hidden;
    margin: 0 auto;
  }

  .pop-text-text textarea {
    width: 90%;
    height: 80%;
    border: none;
    outline: none;
    background: #f8f8f8;
    text-indent: 10px;
    color: #444;
  }

  .index-input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /*color: rgba(255, 255, 255, .7);*/
    color: #CCCCCC;
  }

  .pop-btn-warp {
    /*height: 50px;*/
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /*background: red;*/
    height: 50px;
    /*border-radius: 8px;*/
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow: hidden;
  }

  .pop-btn {
    height: 100%;
    color: #fff;
  }

  .back-f8 {
    background: #f8f8f8;
    color: #333;
  }

  .nopass-text {
    margin: 20px auto -10px;
  }

  .task-input-warp {
    width: 90%;
    height: 42px;
    background: #F8F8F8;
    border-radius: 6px;
    margin: 6px auto 25px;
    overflow: hidden;
  }

  .max-task-input-warp {
    height: 85px;
    background: none;
  }

  .max-task-input-warp .tiw-mid {
    background: #F8F8F8;
  }

  .tiw-left {
    height: 100%;
    width: 30%;
    flex-shrink: 0;
    color: #333;
    justify-content: flex-start;
    white-space: nowrap;
    text-indent: 10px;
  }

  .tiw-left-new {
    width: 40%;
  }

  .tiw-mid {
    width: 0;
    flex-grow: 1;
    height: 100%;
  }

  .tiw-right {
    width: auto;
    height: 100%;
    /*margin-right: 10px;*/
  }

  .light-color {
    color: #999999;
  }

  .index-input {
    width: 100%;
    height: 100%;
    text-indent: 20px;
    color: #333;
    background: none;
    user-select: text !important;
  }

  .index-input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #CCCCCC;
  }

  .dy-id {
    width: 92%;
    color: #444;
    padding: 10px 0;
    margin: 20px auto;
    justify-content: flex-start;
    white-space: nowrap;
    text-indent: 20px;
    text-overflow: ellipsis;
    background: #f8f8f8;
    border-radius: 6px;
  }

  .line-back {
    background: #F74BCA;
  }

  .old-line-back {
    background: linear-gradient(-45deg, #6D32FB, #F74CCA);
    background: -webkit-gradient(linear, right bottom, left top, from(#6D32FB), to(#F74CCA));
  }

  .min-name-tips {
    font-size: 10px;
    color: #f74bca;
    transform: scale(.9, .9);
  }

  .complete-image {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .complete-image img {
    width: 100%;
    height: 100%;
  }
</style>
