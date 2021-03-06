import axios from 'axios'
import qs from 'qs'
import {
  UAID,
  CHANNEL
} from './config'
import {a} from './api_config'


import {
  getSign,
  getTime
} from 'common/js/util'

// 悬赏具体类别(抖音粉丝...)
export function pub_task(service_group_id) {
  const url = `${a}/pub_task`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    service_group_id
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 登录
export function login(wx_login_code, super_code, channel) {
  const url = `${a}/login`
  let data = {
    uaid: UAID,
    wx_login_code,
    timestamp: getTime(),
    user_channel: channel || '老用户'
  }
  if (super_code) {
    Object.assign(data, {
      super_code
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 用户更新
export function update_user_info(username) {
  const url = `${a}/update_user_info`
  let data = {
    uaid: UAID,
    username,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 发布任务
export function pay_and_pub_task(id, title, task_url, num, single_price, price, score, username) {
  const url = `${a}/pay_and_pub_task`
  let data = {
    id,
    title,
    task_url,
    num,
    single_price,
    price,
    score,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 主页
export function home_page(page, num) {
  const url = `${a}/home_page`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    page,
    num
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 任务详情
export function task_detail(id, username) {
  const url = `${a}/task_detail`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    id,
    username
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 发布列表
export function release_management(username, page, num) {
  const url = `${a}/release_management`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    username,
    page,
    num
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 商品列表
export function goods() {
  const url = `${a}/goods`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 报名
export function sign_up(id, username) {
  const url = `${a}/sign_up`
  let data = {
    id,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 七牛云token
export function up_token() {
  const url = `${a}/up_token`
  let data = {
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 提交任务或者申请仲裁
export function sub_or_arb(username, id, sub_type, task_image, appeal_user_image, appeal_user_explain, task_nickname, task_image2) {
  const url = `${a}/sub_or_arb`
  let data = {
    id,
    username,
    sub_type,
    uaid: UAID,
    timestamp: getTime(),
  }
  if (task_image) {
    Object.assign(data, {
      task_image
    })
  }
  if (appeal_user_image) {
    Object.assign(data, {
      appeal_user_image,
      appeal_user_explain
    })
  }
  if (task_nickname) {
    Object.assign(data, {
      task_nickname
    })
  }
  if (task_image2) {
    Object.assign(data, {
      task_image2
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 任务大厅
export function task_hall(service_group_id, page, num) {
  const url = `${a}/task_hall`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    page,
    num,
  }
  if (service_group_id) {
    Object.assign(data, {
      service_group_id
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 单个任务的列表-----
export function task_audit(id, username, types, page, num) {
  const url = `${a}/task_audit`
  let data = {
    id,
    types,
    page,
    num,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 通过不通过
export function pass_or_fail_task(id, task_id, username, click_type, task_message) {
  const url = `${a}/pass_or_fail_task`
  let data = {
    id,
    task_id,
    username,
    click_type,
    uaid: UAID,
    timestamp: getTime(),
  }
  if (task_message) {
    Object.assign(data, {
      task_message
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 我的任务
export function my_task(task_type, username, page, num) {
  const url = `${a}/my_task`
  let data = {
    task_type,
    page,
    num,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 举报维权列表
export function rights_protection(rp_type, username, page, num) {
  const url = `${a}/rights_protection`
  let data = {
    rp_type,
    page,
    num,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 提交辩诉
export function sub_of_plea(id, username, plea_user_image, plea_user_explain) {
  const url = `${a}/sub_of_plea`
  let data = {
    id,
    plea_user_image,
    plea_user_explain,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 订单列表
export function orders(username, page, num) {
  const url = `${a}/orders`
  let data = {
    username,
    uaid: UAID,
    page,
    num,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 提现列表
export function withdraw_list(username, page, num) {
  const url = `${a}/withdraw_list`
  let data = {
    username,
    uaid: UAID,
    page,
    num,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 下单
export function order(id, username, price, score, pay_type) {
  const url = `${a}/order`
  let data = {
    id,
    price,
    score,
    username,
    pay_type,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 提现商品列表
export function withdraw_good(username) {
  const url = `${a}/withdraw_good`
  let data = {
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 批量审核
export function pass_task(username, task_id) {
  const url = `${a}/batch/pass/task`
  let data = {
    username,
    task_id,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 提现
export function withdraw(id, username, price) {
  const url = `${a}/withdraw`
  let data = {
    id,
    username,
    price,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 置顶
export function set_top_task(id, username, top_score) {
  const url = `${a}/set_top_task`
  let data = {
    id,
    username,
    top_score,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


export function bind_phone(code, phone, username) {
  const url = `${a}/bind_phone`
  let data = {
    code,
    phone,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 发生验证码
export function send_verify(phone) {
  const url = `${a}/send_verify`
  let data = {
    phone,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 取消任务
export function cancel_publication(id, username) {
  const url = `${a}/cancel_publication`
  let data = {
    id,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 查看团队
export function see_team(username) {
  const url = `${a}/see_team`
  let data = {
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

//jsapi_code
export function jsapi_code(js_url) {
  const url = `${a}/jsapi_code`
  let data = {
    url: js_url,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

//跑马灯
export function with_draw() {
  const url = `${a}/message/with/draw`
  let data = {
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

//支付查看地址
export function notify_web(code) {
  const url = `${a}/notify/web`
  let data = {
    code,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


//防封地址
export function anti_seal(username) {
  const url = `http://42428851.si56w.cn//dwz.php?longurl=http://dz1.ruooming.com/?username=${username}`
  return axios.get(url).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


//验证码登录
export function code_login(code, phone, super_code) {
  const url = `${a}/web/login`
  let data = {
    phone,
    code,
    user_channel: '老用户',
    uaid: UAID,
    timestamp: getTime()
  }
  if (super_code) {
    Object.assign(data, {
      super_code
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

//web手机版updateuserinfo
export function getUserInfo(username) {
  const url = `${a}/web/update_user_info`
  let data = {
    username,
    uaid: UAID,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

//app_info
export function getAppInfo() {
  const url = `${a}/app/info`
  let data = {
    uaid: UAID,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


//放弃任务
export function mission(id, username) {
  const url = `${a}/abort/mission`
  let data = {
    id,
    username,
    uaid: UAID,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 黑名单
export function blackList(page, num) {
  const url = `${a}/black/list`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    page,
    num
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 提现排名
export function rankList(username, page, num) {
  const url = `${a}/rank/list`
  let data = {
    username,
    uaid: UAID,
    timestamp: getTime(),
    page,
    num
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 信誉每日签到
export function signIn(username) {
  const url = `${a}/sign/in`
  let data = {
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 信誉记录
export function creditList(username, types, page, num) {
  const url = `${a}/credit/list`
  let data = {
    types,
    username,
    uaid: UAID,
    page,
    num,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}
