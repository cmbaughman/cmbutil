'use strict';

/** Converts BigInt properties of an object to string. Made to use in a bugfix for prisma.io */
const sanitize = (obj) => {
    const safe = JSON.stringify(obj, (_key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
    return JSON.parse(safe);
};
/** Escape a string using Salesforce SOSL syntax. */
const escapeSoslStr = (str) => {
    const entityMap = {
        '?': '\\?',
        '&': '\\&',
        '!': '\\!',
        '^': '\\^',
        '~': '\\~',
        '-': '\\-'
    };
    return String(str).replace(/[?&!^~-]/g, (s) => {
        return entityMap[s];
    });
};
/**
* Test if var is null of empty.
* @param {*} tmp
* @returns {boolean}
*/
const isNullOrEmpty = (tmp) => {
    return (!tmp || 0 === tmp.length);
};
/**
* Test if var is undefined.
* @param {*} tmp
* @returns {boolean}
*/
const isUndefined = (tmp) => {
    return (typeof (tmp) === 'undefined');
};
/**
* Test if variable is numeric.
* @param {*} n
* @returns {boolean}
*/
const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
/**
* Merge arrays.
* @param {Array} a
* @param {Array} b
* @param {string} property (Can be empty string)
* @returns {Array}
*/
const mergeArrays = (a, b, prop) => {
    let reduced = a.filter(aitem => !b.find(bitem => aitem[prop] === bitem[prop]));
    return reduced.concat(b);
};
/**
* Return value of a URL's query string parameter
* @param {string} name
* @param {string|URL} url string or URL object
* @returns {*} value of name
*/
const getQueryParam = (name, url) => {
    if (isNullOrEmpty(url))
        return null;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};
/**
* Return month name
* @param {number} month
* @returns {string}
*/
const getMonthName = (month) => {
    const dd = new Date();
    dd.setMonth(month - 1);
    return dd.toLocaleString([], { month: 'long' });
};
/**
* Return an array of all the month names.
* @returns {Array}
*/
const getAllMonthNames = () => {
    const dd = new Date();
    let tmp = [];
    for (let index = 1; index <= 12; index++) {
        dd.setMonth(index - 1);
        tmp.push(dd.toLocaleString([], { month: 'long' }));
    }
    return tmp;
};
/**
*
* @param {*} v String representing date, Date object
* @returns {string} yyyy-mm-dd formatted date string.
*/
const getDateString = (v) => {
    if (isNullOrEmpty(v)) {
        const today = new Date();
        return `${today.toLocaleDateString('en-us', { year: 'numeric' })}-${today.toLocaleDateString('en-us', { month: '2-digit' })}-${today.toLocaleDateString('en-us', { day: '2-digit' })}`;
    }
    const dateObj = getDate(v); // Use getDate to convert to Date object
    return `${dateObj.toLocaleDateString('en-us', { year: 'numeric' })}-${dateObj.toLocaleDateString('en-us', { month: '2-digit' })}-${dateObj.toLocaleDateString('en-us', { day: '2-digit' })}`;
};
/**
* Improved version of Date.parse. Takes string or number.
* @param {*} v representation of date
* @returns {Date} object
*/
const getDate = (v) => {
    let yr, mo, dy;
    switch (typeof (v)) {
        case 'number':
            let tmp = v.toString();
            yr = parseInt(tmp.slice(0, 4), 10);
            dy = parseInt(tmp.slice(6, 8), 10);
            mo = parseInt(tmp.slice(4, 6), 10) - 1;
            return new Date(yr, mo, dy);
        case 'string':
            if ((v.indexOf('-') < 0) && (v.indexOf('/') < 0)) {
                yr = parseInt(v.slice(0, 4), 10);
                mo = parseInt(v.slice(4, 6), 10) - 1;
                dy = parseInt(v.slice(6, 8), 10);
                return new Date(yr, mo, dy);
            }
    }
    // If input is a date string or number, this will handle it.
    // If not, it will return an "invalid date" object.
    return new Date(v);
};
/**
* Get an array of the last 5 years, including the current.
* @returns {Array}
*/
const getYears = () => {
    const current = new Date().getFullYear();
    const base = current - 4;
    const years = [];
    for (let indx = base; indx <= current; indx++) {
        years.push(indx);
    }
    return years;
};
/**
* Make first letter of string propper case.
* @param {string} d
* @returns {string}
*/
const properCase = (d) => {
    return d.charAt(0).toUpperCase() + d.slice(1);
};
/**
* Take ISO-8601 formatted date and return yyyy-mm-dd
* @param {string} v date string formatted as ISO-8601
* @returns {string}
*/
const getSf2JsDate = (v) => {
    if (isNullOrEmpty(v)) {
        return null;
    }
    let dte = Date.parse(v);
    return new Date(dte).toISOString().split('T')[0];
};
/**
* Removes non-alphabet characters.
* @param {string} str
* @returns {string}
*/
const stripNonAlpha = (str) => {
    return str.replace(/[^a-zA-Z ]/g, '');
};
const cmbutil = {
    sanitize,
    escapeSoslStr,
    isNullOrEmpty,
    isUndefined,
    isNumeric,
    mergeArrays,
    getQueryParam,
    getMonthName,
    getAllMonthNames,
    getDateString,
    getDate,
    getYears,
    properCase,
    getSf2JsDate,
    stripNonAlpha
};

module.exports = cmbutil;
//# sourceMappingURL=index.js.map
