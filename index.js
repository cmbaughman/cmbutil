module.exports = {
  /** Converts BigInt properties of an object to string. Made to use in a bugfix for prisma.io */
  sanitize(obj) {
      const safe = JSON.stringify(obj, (_key, value) => {
        return typeof value === 'bigint' ? value = value.toString() : value;
      });
      return JSON.parse(safe);
  },

  /** Escape a string using Salesforce SOSL syntax. */
  escapeSoslStr(str) {
    const entityMap = {
      '?': '?',
      '&': '&',
      '!': '!',
      '^': '^',
      '~': '~',
      '-': '-'
    };

    return String(str).replace(/[?&!^~-]/g, (s) => {
      return '\\' + entityMap[s];
    });
  },

  /**
   * Test if var is null of empty.
   * @param {*} tmp
   * @returns {boolean}
   */
  isNullOrEmpty(tmp) {
    return (!tmp || 0 === tmp.length);
  },

  /**
   * Test if var is undefined.
   * @param {*} tmp
   * @returns {boolean}
   */
  isUndefined(tmp) {
    return (typeof(tmp) === 'undefined');
  },

  /**
   * Test if variable is numeric.
   * @param {*} n
   * @returns {boolean}
   */
  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  /**
   * Merge arrays.
   * @param {Array} a
   * @param {Array} b
   * @param {string} property (Can be empty string)
   * @returns {Array}
   */
  mergeArrays(a, b, prop) {
    let reduced = a.filter(aitem => !b.find(bitem => aitem[prop] === bitem[prop]));
    return reduced.concat(b);
  },

  /**
   * Return value of a URL's query string parameter
   * @param {string} name
   * @param {string|URL} url string or URL object
   * @returns {*} value of name
   */
  getQueryParam(name, url) {
    if (this.isNullOrEmpty(url)) return null;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  /**
   * Return month name
   * @param {number} month
   * @returns {string}
   */
  getMonthName(month) {
    const dd = new Date();
    dd.setMonth(month-1);
    return dd.toLocaleString([], { month: 'long' });
  },

  /**
   * Return an array of all the month names.
   * @returns {Array}
   */
  getAllMonthNames() {
    const dd = new Date();
    let tmp = [];
    for (let index = 1; index <= 12; index++) {
      dd.setMonth(index-1);
      tmp.push(dd.toLocaleString([], { month: 'long' }));
    }
    return tmp;
  },

  /**
   *
   * @param {*} v String representing date, Date object
   * @returns {string} YYYY-mm-dd formatted date string.
   */
  getDateString(v) {
    if (this.isNullOrEmpty(v)) {
      return `${new Date().toLocaleDateString('en-us', { year: 'numeric'})}-${new Date().toLocaleDateString('en-us', { month: '2-digit'})}-${new Date().toLocaleDateString('en-us', { day: '2-digit'})}`;
    }

    return `${new Date(v).toLocaleDateString('en-us', { year: 'numeric'})}-${new Date(v).toLocaleDateString('en-us', { month: '2-digit'})}-${new Date(v).toLocaleDateString('en-us', { day: '2-digit'})}`;
  },

  /**
   * Improved version of Date.parse. Takes string or number.
   * @param {*} v representation of date
   * @returns {Date} object
   */
  getDate(v) {
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
        if ((v.indexOf('-') < 0) && (v.indexOf('/') < 0)) {
          yr = v.slice(0, 4);
          mo = v.slice(4, 6);
          dy = v.slice(6, 8);
          return new Date(yr, mo, dy);
        }
    }

    return new Date(v);
  },

  /**
   * Get an array of the last 5 years, including the current.
   * @returns {Array}
   */
  getYears() {
    const current = new Date().getFullYear();
    const base = current - 4;
    const years = [];

    for (let indx = base; indx <= current; indx++) {
      years.push(indx);
    }

    return years;
  },

  /**
   * Make first letter of string propper case.
   * @param {string} d
   * @returns {string}
   */
  properCase(d) {
    return d.charAt(0).toUpperCase() + d.slice(1);
  },

  /**
   * Take ISO-8601 formatted date and return YYYY-mm-dd
   * @param {string} v date string formatted as ISO-8601
   * @returns {string}
   */
  getSf2JsDate(v) {
    if (this.isNullOrEmpty(v)) {
      return null;
    }

    let dte = Date.parse(v);
    return new Date(dte).toISOString().split('T')[0];
  },

  /**
   * Removes non-alphabet characters.
   * @param {string} str
   * @returns {string}
   */
  stripNonAlpha(str) {
    return str.replace(/[^a-zA-Z ]/g, '');
  }
};
