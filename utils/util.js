function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showMsg(msg){
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 2000
  })
}

function showLoading(msg){
  wx.showLoading({
    title: msg||'加载中',
  })
}

function hideLoading(){
  wx.hideLoading();
}

module.exports = {
  formatTime: formatTime,
  showMsg:showMsg,
  showLoading:showLoading,
  hideLoading:hideLoading,
}
