const cheerio = require('cheerio')
const rp = require('request-promise')
const cookieParser = require('set-cookie-parser')
const url = require('url')
const querystring = require('querystring')
const _ = require('lodash')
const request = require('request')
const https = require('https')

var curl = require('curlrequest');



const MAIN_SITE_URL = 'https://www.douban.com/'
const LOGIN_URL = 'https://accounts.douban.com/login'
function getBookUrl(bookId) {
  return `https://book.douban.com/j/subject/${bookId}/interest`
}
const commonRequestOptions = {
  headers: {
    Host: 'www.douban.com',
    Origin: 'https://www.douban.com',
    'User-Agent': 'Chrome/56.0.2924.87',
    Referer: 'https://www.douban.com',
  }
}

function getCaptcha() {
  return rp.get(LOGIN_URL)
    .then((body) => {
      const $ = cheerio.load(body)
      return $('#captcha_image').attr('src')
    })
    .then((captchaImageUrl) => {
      if (!captchaImageUrl) return {}

      const captchaId = querystring.parse(url.parse(captchaImageUrl).query).id
      console.log('captchaImageUrl', captchaImageUrl)
      console.log('captchaId', captchaId)
      return {
        captchaImageUrl,
        captchaId
      }
    })
    .catch((err) => {
      console.log('err', err)
    })
}

function login(userInfo, captcha) {
  let formData = {
    form_email: userInfo.email,
    form_password: userInfo.password,
    remember: 'on'
  }

  if (captcha) {
    formData = Object.assign({}, formData, {
      'captcha-solution': captcha.solution,
      'captcha-id': captcha.id,
    })
  }

  return rp.post(Object.assign({}, commonRequestOptions, {
    url: LOGIN_URL,
    formData,
    simple: false,
    resolveWithFullResponse: true
  }))
  .then((res) => {
    const cookieValue = cookieParser.parse(res).filter((cookie) => {
      return cookie.name === 'dbcl2'
    })[0].value

    return cookieValue
  })
  .then((loginCookie) => {
    return getMainSiteCookie(loginCookie).then((mainSiteCookie) => {
      return {
        dbcl2: loginCookie,
        ck: mainSiteCookie
      }
    })
  })
  .catch((err) => {
    console.log('err', err)
  });
}

function getMainSiteCookie(loginCookie) {
  return new Promise((resolve, reject) => {
    curl.request({
      url: MAIN_SITE_URL,
      include: true,
      headers: {
        Cookie: `dbcl2=${loginCookie}`
      },
    }, (err, res, meta) => {
      const cookie = /ck=(.*?;)/.exec(res)[1]
      resolve(cookie.split(';')[0])
    })
  })

}

function markBookAsRead(bookId, cookies) {
  const formData = {
    ck: cookies.ck
  }

  rp.post(Object.assign({}, commonRequestOptions, {
      headers: {
        Cookie: `dbcl2="${cookies.dbcl2}"`
      },
      url: getBookUrl(bookId),
      formData
    }))
    .then((body) => {
      console.log('body', body)
    })
    .catch((err) => {
      console.log('err', err)
    })
}


// getCaptcha()

login({
  email: '',
  password: ''
}, {
  id: '',
  solution: ''
})


// markBookAsRead(26906797, {
//   ck: '',
//   dbcl2: ''
// })

module.exports = {
  getCaptcha,
  login,
  markBookAsRead
}
