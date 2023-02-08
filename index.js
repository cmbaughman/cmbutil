export default class CMBUtil {
    static isNullOrEmpty(tmp) {
      return (!tmp || 0 === tmp.length);
    }

    static isUndefined(tmp) {
      return (typeof(tmp) === 'undefined');
    }

    static isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static getFromStore(name) {
      if (typeof(Storage) !== 'undefined') {
        return sessionStorage.getItem(name);
      }
    }

    // Parameter obj is a name/value object
    static writeToStore(obj) {
      if (typeof(Storage) !== 'undefined') {
        sessionStorage.setItem(obj.name, obj.value);
      }
    }

    static removeFromStore(name) {
      if (typeof(Storage) !== 'undefined') {
        sessionStorage.removeItem(name);
      }
    }

    // Find closest selector for referenced element
    static closest(refEl, findSelector) {
      if (refEl.closest) {
        return refEl.closest(findSelector);
      }

      var matches = Element.prototype.matches ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector,
      currentEl = refEl;

      while (currentEl) {
        if (matches.call(currentEl, findSelector)) {
          return currentEl;
        }
        currentEl = currentEl.parentElement;
      }
      return null;
    }

    /**
     * Get the largest value from an array
     * @param narray integer
    **/
    static getMaxFromArray(narray) {
        return Math.max.apply(null, narray);
    }

    static isIE() {
      if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        return true;
      }
      else {
        return false;
      }
    }

    static viewportWidth() {
      let e = window;
      let a = 'inner';
      if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
      }
      return e[ a+'Width' ];
    }

    static hasClass(elem, tstClass) {
          return elem.className.indexOf(tstClass) !== -1;
    }

    static loaded(fn) {
      if (document.readyState !== 'loading') {
        fn();
      }
      else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }

    static resize(fn) {
      window.addEventListener('resize', fn);
    }

    static addEvent(element, evt, cb) {
      let previousEventCallback = element['on' + evt];
      element['on' + evt] = function(e) {
        let output = cb(e);

        if (output === false) return false;

        if (typeof(previousEventCallback) === 'function') {
          output = previousEventCallback(e);

          if (output === false) return false;
        }
      }
    }

    static getQueryParam(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    static getMonthName(month) {
      let m = parseFloat(month);
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthNames[m];
    }

    static getDateString(v) {
      if (this.isNullOrEmpty(v)) {
        return `${new Date().toLocaleDateString('en-us', { year: 'numeric'})}-${new Date().toLocaleDateString('en-us', { month: '2-digit'})}-${new Date().toLocaleDateString('en-us', { day: '2-digit'})}`;
      }

      return `${new Date(v).toLocaleDateString('en-us', { year: 'numeric'})}-${new Date(v).toLocaleDateString('en-us', { month: '2-digit'})}-${new Date(v).toLocaleDateString('en-us', { day: '2-digit'})}`;
    }

    static getDate(v) {
      if (this.isNullOrEmpty(v)) return null;
      let yr, mo, dy;

      switch (typeof(v)) {
        case 'number':
          let tmp = v.toString();
          yr = tmp.slice(0, 4);
          dy = tmp.slice(6, 8);
          moTmp = parseInt(tmp.slice(4, 6), 10);
          mo = `${moTmp}`;
          return new Date(yr, mo, dy);
        case 'string':
          if (!v.indexOf('-') && !v.indexOf('/')) {
            yr = v.slice(0, 4);
            mo = v.slice(4, 6);
            dy = v.slice(6, 8);
            return new Date(yr, mo, dy);
          }
          break;
      }

      return new Date(v);
    }

    static getYears() {
      const current = new Date().getFullYear();
      const base = current - 4;
      const years = [];

      for (let indx = base; indx <= current; indx++) {
        years.push(indx);
      }

      return years;
    }

    static getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    static setCookie(name, value, options = {}) {
      options = {
        path: '/',
        // add other defaults here if necessary
        ...options
      };

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    }

    static properCase(d) {
      return d.charAt(0).toUpperCase() + d.slice(1);
    }
}
