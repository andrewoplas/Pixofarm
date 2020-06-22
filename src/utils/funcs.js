import moment from 'moment'
import qs from 'query-string'
import {
  DATE_FORMAT_ISO,
  INITIAL_FILTERS
} from './constants'
import languages from '../languages'
import base64 from 'react-native-base64'

export function getBrowserLocale() {
  const browserLanguage = (() => {
    if (
      Array.isArray(navigator.languages) &&
      navigator.languages.length > 0 &&
      navigator.languages[0]
    ) {
      return navigator.languages[0]
    } else if (navigator.language) {
      return navigator.language
    } else if (navigator.browserLanguage) {
      return navigator.browserLanguage
    } else if (navigator.userLanguage) {
      return navigator.userLanguage
    }

    return 'en-US'
  })()

  return browserLanguage.startsWith('de') ? 'de' : 'en'
}
export const validateEmail = (email) => {
  if (typeof email !== 'string') return false
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

export const validateBirthdate = (birthdate) => {
  const limitDate = moment()
  const birthday = moment(birthdate)

  if (!birthday.isValid()) {
    return false
  } else if (limitDate.isAfter(birthday)) {
    return true
  }
  return false
}

export const validatePhone = (phone) => {
  const re = /^\+?[1-9]\d{1,14}$/
  return re.test(phone.toLowerCase())
}

export const validateUrl = (url) => {
  // eslint-disable-next-line no-useless-escape
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  return re.test(url.toLowerCase())
}

export const generateTempId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

  return `${s4()}${s4()}-${s4()}`
}

export function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function fullAddress(address) {
  if (!address) return ''
  const {
    street, city, country, postal_code,
  } = address
  return `${street}, ${city}, ${postal_code}, ${country}`
}

export function toTimeString(amount, unit, format = 'HH:mm') {
  return moment().startOf('day').add(amount, unit).format(format)
}

export function timeToMinutes(timeStr) {
  const timeTokens = timeStr.split(':')
  const timeMinutes = (parseInt(timeTokens[0], 10) * 60) + parseInt(timeTokens[1], 10)

  return timeMinutes
}

export function weekdayShortLabels() {
  const weekdays = moment.weekdaysShort()

  if (moment.localeData().firstDayOfWeek() === 1) {
    const sunday = weekdays.shift()
    weekdays.push(sunday)
  }

  return weekdays
}

export function weekdayLabels() {
  const weekdays = moment.weekdays()

  if (moment.localeData().firstDayOfWeek() === 1) {
    const sunday = weekdays.shift()
    weekdays.push(sunday)
  }

  return weekdays
}

export function isSameDate(moment1, moment2) {
  return moment1.format('YYYY-MM-DD') === moment2.format('YYYY-MM-DD')
}

export function minutesFromDate(date = moment()) {
  return date.diff(moment().startOf('day'), 'minutes')
}

export function getLocalizedPath(path, locale) {
  let components = path.split('/').filter(c => c.length > 0)

  const {
    routers,
  } = languages[locale]

  const keys = Object.keys(routers)

  components = components.map(component => (keys.indexOf(component) > -1 ? routers[component] : component))
  return components.reduce((acc, component) => (`${acc}/${component}`), `/${locale}`)
}

export function convertURL(str) {
  if (!str) return null
  const regx = /[.!*‘();:@&=+$,/?%#[\]]/gi

  return str
    .replace(/\s/g, '-')
    .replace(/ö/gi, 'oe')
    .replace(/ä/gi, 'ae')
    .replace(/ü/gi, 'ue')
    .replace(/ß/gi, 'ss')
    .replace(regx, '')
    .toLowerCase()
}

export function filtersToQuery(filters) {
  // Only the filters that differ from the default filters
  const filterDiff = {}
  Object.keys(filters).forEach((key) => {
    if (!(key in INITIAL_FILTERS) || filters[key] !== INITIAL_FILTERS[key]) {
      if (key === 'date' && filters[key] instanceof moment) {
        filterDiff[key] = filters[key].format(DATE_FORMAT_ISO)
      } else {
        filterDiff[key] = filters[key]
      }
    }
  })
  return qs.stringify(filterDiff)
}


export function buildImageSrc(image) {
  let imgString = ''

  if (image.content_type) {
    imgString += 'data:' + image.content_type + ';base64, ';
    if (image && image.image_chunk) {
      imgString += base64.decode(image.image_chunk.data)
    }
  }

  return imgString;
}

export function setCookie(cname, cvalue, exdays, exhours, exminutes, domain) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * exhours * exminutes * 60 * 1000));
  const expires = "expires=" + d.toUTCString();

  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=" + domain
}
export function urlserialize(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var p_nonnumber = isNaN(parseInt(p)) ? p : ''
      var k = prefix ? prefix + "[" + p_nonnumber + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        urlserialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
export function getParamsAsObject(query) {
  query = query.substring(query.indexOf('?') + 1);

  var re = /([^&=]+)=?([^&]*)/g;
  var decodeRE = /\+/g;

  var decode = function (str) {
    return decodeURIComponent(str.replace(decodeRE, " "));
  };

  var params = {}, e;
  while (e = re.exec(query)) {
    var k = decode(e[1]), v = decode(e[2]);
    if (k.substring(k.length - 2) === '[]') {
      k = k.substring(0, k.length - 2);
      (params[k] || (params[k] = [])).push(v);
    }
    else params[k] = v;
  }

  var assign = function (obj, keyPath, value) {
    var lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
      var key = keyPath[i];
      if (!(key in obj))
        obj[key] = {}
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  }

  for (var prop in params) {
    var structure = prop.split('[');
    if (structure.length > 1) {
      var levels = [];
      structure.forEach(function (item, i) {
        var key = item.replace(/[?[\]\\ ]/g, '');
        levels.push(key);
      });
      assign(params, levels, params[prop]);
      delete (params[prop]);
    }
  }
  return params;
};

export const isAdmin = () => {
  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
  
  if (!currentUser || !currentUser.data) {
    return false
  }
  
  const {
    user_role,
  } = currentUser.data
  
  return user_role ? user_role.typeName === 'Admin' : false
};

export const isAssociation = () => {
  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
  
  if (!currentUser || !currentUser.data) {
    return false
  }
  
  const {
    user_role,
  } = currentUser.data
  
  return user_role.typeName === 'Association'
}