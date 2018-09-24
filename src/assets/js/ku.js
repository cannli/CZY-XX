exports.install = function (Vue, options) {
  'use strict'
  Vue.prototype.ajaxDate = function (type, url, params, okCb, errCb) {
    if (typeof okCb === 'undefined' && typeof params === 'function') {
      errCb = okCb
      okCb = params
      params = {}
    }
    $.ajax({
      type: type,
      url: url,
      data: params,
      dataType: 'json',
      timeout: 30000,
      // async : true, //异步请求
      success: function (result) {
        var code = result.code
        if (code == '1') {
          if (result.page) {
            okCb && okCb(result)
          } else {
            okCb && okCb(result.data)
          }
        } else {
          errCb && errCb(result.msg)
        }
      },
      complete: function (XMLHttpRequest, status) {
        if (status == 'timeout' || status == 'error') { // 超时,status还有success,error等值的情况
          errCb && errCb()
        }
      }
    })
  }

  Vue.prototype.ajaxDateFile = function (url, data, okCb, progress, errCb) {
    if (typeof callback === 'undefined' && typeof params === 'function') {
      errCb = okCb
      okCb = params
      params = {}
    }
    var xhrOnProgress = function (fun) {
      xhrOnProgress.onprogress = fun     // 绑定监听
      // 使用闭包实现监听绑
      return function () {
        // 通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
        var xhr = $.ajaxSettings.xhr()
        // 判断监听函数是否为函数
        if (typeof xhrOnProgress.onprogress !== 'function')
          return xhr
        // 如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
        if (xhrOnProgress.onprogress && xhr.upload) {
          xhr.upload.onprogress = xhrOnProgress.onprogress
        }
        return xhr
      }
    }
    $.ajax({
      url: url,
      type: 'POST',
      cache: false,
      processData: false, // processData设置为false。因为data值是FormData对象，不需要对数据做处理。
      contentType: false,
      timeout: 120000,    // 2min超时
      data: data,
      success: function (result) {
        var code = result.code
        if (code == '200') {
          if (result.page) {
            okCbokCb && okCb(result)
          } else {
            okCb && okCb(result.data)
          }
        } else {
          errCb && errCb(result.msg)
        }
      },
      complete: function (XMLHttpRequest, status) {
        if (status == 'timeout') { // 超时,status还有success,error等值的情况
          errCb && errCb('校验超时')
        } else if (status == 'error') {
          errCb && errCb('校验失败')
        }
      },
      xhr: xhrOnProgress(function (e) {
        var percent = e.loaded / e.total  // 计算百分比
        progress && progress(percent)
      })
    })
  }

  Vue.prototype.fileDownload = function (url, params) {
    var paramsStr = '?'
    for (var n in params) {
      paramsStr += n + '=' + params[n] + '&'
    }
    var from = document.createElement('form')
    from.setAttribute('method', 'post')
    from.setAttribute('action', url + paramsStr)
    from.setAttribute('id', 'postFrom')
    document.body.appendChild(from)
    from.submit()
    document.body.removeChild(from)
    // $('<form method="post" action="' + url + paramsStr + '">
    // <input name= value= />
    // </form>').appendTo('body').submit().remove();
  }

  Vue.prototype.urlName = function (name) {
    var url = decodeURI(location.href)
    var str = url.split('?')[1]
    if (typeof (str) != 'undefined') {
      var param = str.split('&')
      for (var i = 0; param != null && i < param.length; i++) {
        var para = param[i].split('=')
        if (para[0] == name) {
          return para[1]
        }
      }
    }
    return null
  }


  // rate 传1就会保留2位小数
  Vue.prototype.isNull = function (str, rate) {
    var isRate = rate == 1 ? true : false
    if (str == null || str == undefined || str == '') {
      return (isRate ? '0.00' : '-')
    } else {
      if (isRate) {
        return (str * 1).toFixed(2)
      } else {
        return str
      }
    }
  }

  // 今天时间
  Vue.prototype.getNowFormatDate = function () {
    var date = new Date()
    var seperator1 = '-'
    var seperator2 = ':'
    var MM = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) // yue
    var dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()                  // 日
    var hh = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    var mm = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    var ss = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()

    var currentdate = date.getFullYear() + seperator1 + MM + seperator1 + dd +
      ' ' + hh + seperator2 + mm +
      seperator2 + ss
    return currentdate
  }

  // 今天日期
  Vue.prototype.getNowFormatDate1 = function () {
    var date = new Date()
    var seperator1 = '-'
    var seperator2 = ':'
    var MM = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) // yue
    var dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()                  // 日


    var currentdate = date.getFullYear() + seperator1 + MM + seperator1 + dd
    return currentdate
  }

  // 毫秒转日期  一天的毫秒86400000
  Vue.prototype.getNowFormatDateV2 = function (T) {
    if (!T) {
      return null
    }
    var date = new Date(parseInt(T))
    var seperator1 = '-'
    var seperator2 = ':'
    var MM = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    var dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    var hh = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    var mm = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    var ss = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()

    var currentdate = ''
    currentdate = date.getFullYear() + seperator1 + MM + seperator1 + dd + ' ' + hh + seperator2 + mm + seperator2 + ss
    return currentdate
  }

  // 毫秒转日期
  Vue.prototype.getNowFormatDateV3 = function (num) {
    let haoMiao = new Date().getTime()
    let dayHaoMiaoNum = 86400000 * num
    haoMiao = haoMiao - dayHaoMiaoNum
    var date = new Date(parseInt(haoMiao))
    var seperator1 = '-'
    var seperator2 = ':'
    var MM = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    var dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()

    var currentdate = ''
    currentdate = date.getFullYear() + seperator1 + MM + seperator1 + dd
    return currentdate
  }

  // 数字三位一份 Money传1就会保留2位小数
  Vue.prototype.formatNum = function (str, Money) {
    var isMoney = Money == 1 ? true : false
    var newStr = ''
    var islose = false
    var count = 0
    if (str == null || str == undefined || str == '' || isNaN(str)) { // 算术运算（如求负数的平方根）的结果不是数字 无穷与非数值
      return isMoney ? '0.00' : '0'
    }
    str = Money ? (str * 1).toFixed(2) : str
    str = str.toString()
    if (str[0] == '-') {
      islose = true
      str = str.substring(1, str.length)
    }
    if (str.indexOf('.') == -1) { //无小数点后面数字
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + ',' + newStr
        } else {
          newStr = str.charAt(i) + newStr
        }
        count++
      }
      str = newStr + (isMoney ? '.00' : '') // 自动补小数点后两位

    } else {
      for (var i = str.indexOf('.') - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + ',' + newStr
        } else {
          newStr = str.charAt(i) + newStr // 逐个字符相接起来
        }
        count++
      }

      if (isMoney) { // 若是金额 需先判断小数位数
        var lastStr = str.substring(str.indexOf('.') + 1, str.length)
        if (lastStr.length == 2) { //两位小数 输出
          str = newStr + '.' + lastStr
        } else if (lastStr.length == 1) { //一位小数 补零输出
          str = newStr + '.' + lastStr + (lastStr * 1 < 10 ? '0' : '')
        } else { // 多位小数 四舍五入输出
          str = parseFloat(str).toFixed(2)
        }
      } else {
        str = newStr + (str).substr((str).indexOf('.'), 3)
      }
    }

    // return str;
    return (islose ? '-' + str : str)
  }

  var enumConfigStorage = {}

  Vue.prototype.storageEnumConfig = function (val) {
    enumConfigStorage = val
  }

  Vue.prototype.handleStorageEnumConfig = function (val) {
    return enumConfigStorage[val]
  }

  Vue.prototype.valueType = function (name, val) {
    if (val == null || val == undefined) {
      return '无'
    }
    for (var n in enumConfigStorage[name]) {
      if (enumConfigStorage[name][n].val == val) {
        return enumConfigStorage[name][n].name
      }
    }
    return '无'
  }

  //删除数组中某一个元素
  Vue.prototype.removeArrByValue = function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1)
        break
      }
    }
  }

  //判断字符串中是否含有特殊字符
  Vue.prototype.isContainSpecial = function (str) {
    var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/)
    return (containSpecial.test(str))
  }
  //判断字符串中有没有数字跟特殊符号
  Vue.prototype.isContainSpecialNum = function (str) {
    var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)(0-9)]+/)
    return (containSpecial.test(str))
  }

  /**
   * 根据长度要求分割字符串(汉字算2字符，其他1字符)
   * @param {string} str 待计算的字符串
   * @param {number} len 指定长度
   * @returns {string} 分割之后的字符串
   * */
  Vue.prototype.reSubstring = function (str, len) {
    if (str == null || str == undefined || str == '') {
      return ''
    }
    var r = /[^\x00-\xff]/g
    if (str.replace(r, 'mm').length <= len) {
      return str
    }
    var m = Math.floor(len / 2)
    for (var i = m; i < str.length; i++) {
      var subStr = str.substr(0, i)
      if (subStr.replace(r, 'mm').length >= len) {
        return subStr + '...'
      }
    }
    return str
  }

  // 是否是数字
  Vue.prototype.isNumber = function (obj) {
    var number = obj * 1
    return number === +number
  }
  // 不能是有小数的数字
  Vue.prototype.isPositiveNum = function (num) {
    var reg = /^[0-9]*[1-9][0-9]*$/
    return reg.test(num)
  }
  // 有1~2位小数的正实数
  Vue.prototype.isNumberV2 = function (num) {
    var reg = /^[0-9]+(\.[0-9]{1,2})?$/
    return reg.test(num)
  }
  // 有1~2位小数的正实数, 只有小数点的时候也可以
  Vue.prototype.isNumberV3 = function (num) {
    var reg = /^[0-9]+(\.[0-9]{0,2})?$/
    return reg.test(num)
  }
  // 有1~2位小数的正实数且大于0的数字
  Vue.prototype.isNumberThan0 = function (num) {
    var reg = /^[0-9]+(\.[0-9]{1,2})?$/
    if (reg.test(num) && num > 0) {
      return true
    } else {
      return false
    }
  }
  // 把为null或为undefined的值变成0
  Vue.prototype.isNullMakeData = function (val) {
    if (val == null || val == 'undefined' || val == '') {
      return val = 0
    }
  }
  // 把为null或为undefined的值变成''
  Vue.prototype.isNullMakeVal = function (val) {
    if (val == null || val == 'undefined' || val == '') {
      return val = ''
    }
  }

  // 字符串为空或null或undfined换成---
  Vue.prototype.isString = function (str) {
    if (str === null || str === 'undefined' || str === '') {
      return str = '---'
    }
    return str
  }
  // 获取#后面的字符串
  Vue.prototype.getHashStr = function () {
    let hashStr = window.location.hash
    if (hashStr) {
      return hashStr = hashStr.split('#')[1]
    } else {
      return false
    }
  }

  // 获取?后面的字符串
  Vue.prototype.getQueryStr = function () {
    let queryStr = this.getHashStr()
    if (queryStr) {
      return queryStr = queryStr.split('?')[1]
    } else {
      return false
    }
  }
  // 在判断输入框的长度时，后台返回的空值可能是null或undefined,是不能判断length的，要先转成字符串
  Vue.prototype.isNullUnToStr = function (val) {
    if (val == null || val == 'undefined') {
      val = ''
    }
    return val
  }
  // 把字符串按照XX,split分割成数组，再把数组渲染出来
  Vue.prototype.strToArrRend = function (str, flag) {
    if (str) {
      var strS = ''
      let strArr = str.split(flag)
      for (var x in strArr) {
        strS += '<p>&nbsp;&nbsp;' + strArr[x] + '</p>'
      }
      return '<div>' + strS + '</div>'
    }
  }
  /**
   *  [{name:'xxx',val:'xxx'}],根据val得出name
   */
  Vue.prototype.arrValToName = function (arr, val) {
    let nameCh = ''
    if (val == '' || val == null) {
      nameCh = ''
      return
    }
    if (arr) {
      for (let x in arr) {
        if (arr[x].val == val) {
          nameCh = arr[x].name
          // console.log(nameCh)
          return nameCh
        }
      }
    }
  }

  /**
   *  [{name:'xxx',val:'xxx'}],name得出val
   */
  Vue.prototype.arrNameToVal = function (arr, name) {
    var nameCh = ''
    if (arr) {
      for (let x in arr) {
        if (arr[x].name == name) {
          nameCh = arr[x].name
          // console.log(nameCh)
          return nameCh
        }
      }
    }
  }

  Vue.prototype.diffDays = function (strDateStart, strDateEnd) {
    var strSeparator = '-' // 日期分隔符
    var oDate1
    var oDate2
    var iDays
    oDate1 = this.getNowFormatDateV3(Date.parse(strDateStart)).split(strSeparator)
    oDate2 = this.getNowFormatDateV3(Date.parse(strDateEnd)).split(strSeparator)
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2])
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2])
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24) // 把相差的毫秒数转换为天数
    return iDays
  }

  Vue.prototype.strPlate = function (str) {
    if (str && str.length > 13) {
      return str.slice(0, 13) + '...'
    } else {
      return str
    }
  }
}



