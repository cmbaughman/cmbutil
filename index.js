module.exports = {
  sanitize(obj) {
      const safe = JSON.stringify(obj, (_key, value) => {
        return typeof value === 'bigint' ? value = value.toString() : value;
      });
      return JSON.parse(safe);
  },

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

  isNullOrEmpty(tmp) {
    return (!tmp || 0 === tmp.length);
  },

  isUndefined(tmp) {
    return (typeof(tmp) === 'undefined');
  },

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  mergeArrays(a, b, prop) {
    let reduced = a.filter(aitem => !b.find(bitem => aitem[prop] === bitem[prop]));
    return reduced.concat(b);
  },

  getQueryParam(name, url) {
    if (this.isNullOrEmpty(url)) return null;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  getMonthName(month) {
    let m = parseFloat(month)-1;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[m];
  },

  getDateString(v) {
    if (this.isNullOrEmpty(v)) {
      return `${new Date().toLocaleDateString('en-us', { year: 'numeric'})}-${new Date().toLocaleDateString('en-us', { month: '2-digit'})}-${new Date().toLocaleDateString('en-us', { day: '2-digit'})}`;
    }

    return `${new Date(v).toLocaleDateString('en-us', { year: 'numeric'})}-${new Date(v).toLocaleDateString('en-us', { month: '2-digit'})}-${new Date(v).toLocaleDateString('en-us', { day: '2-digit'})}`;
  },

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

  getYears() {
    const current = new Date().getFullYear();
    const base = current - 4;
    const years = [];

    for (let indx = base; indx <= current; indx++) {
      years.push(indx);
    }

    return years;
  },

  properCase(d) {
    return d.charAt(0).toUpperCase() + d.slice(1);
  },

  getSf2JsDate(v) {
    if (this.isNullOrEmpty(v)) {
      return null;
    }

    let dte = Date.parse(v);
    return new Date(dte).toISOString().split('T')[0];
  },

  stripNonAlpha(str) {
    return str.replace(/[^a-zA-Z ]/g, '');
  }
};
