const util = require('cmbutil');

test('should return a sanatized string for given BigInt', () => {
  const bigNum = BigInt(9007199254740991);
  expect(util.sanitize(bigNum)).toBe('9007199254740991');
});

test('Should return true for isNullOrEmpty', () => {
  let tt = '';
  expect(util.isNullOrEmpty(tt)).toBe(true);
});

test('Should return false for isNullOrEmpty', () => {
  tt = 'test';
  expect(util.isNullOrEmpty(tt)).toBe(false);
});

test('isUndefined should return true', () => {
  let stuff;
  expect(util.isUndefined(stuff)).toBe(true);
});

test('isNumeric should return true/false', () => {
  let stuff1 = 'aaa';
  let stuff2 = 69;

  expect(util.isNumeric(stuff1)).toBe(false);
  expect(util.isNumeric(stuff2)).toBe(true);
  expect(util.isNumeric('123456')).toBe(true);
});

test('Should return a month name', () => {
  let mo = 5;
  expect(util.getMonthName(5)).toBe('May');
});

test('Receive a valid date', () => {
  let tt = '20221010';
  expect(util.getDate(tt) instanceof Date).toBe(true);

  tt = '2023-11-11';
  expect(util.getDate(tt) instanceof Date).toBe(true);

  tt = '';
  expect(util.getDate(tt) instanceof Date).toBe(true);

  tt = 20221010;
  expect(util.getDate(tt) instanceof Date).toBe(true);

  tt = null;
  expect(util.getDate(tt) instanceof Date).toBe(true);
});

test('should return the id value from the example url', () => {
  // NOTE: No conversion is performed. These values will always be strings.
  expect(util.getQueryParam('id', 'http://example.com?s=5&id=10')).toBe('10');

  let site = 'https://example.com?s=5';
  const url = new URL(site);
  expect(util.getQueryParam('s', url)).toBe('5');

  expect(util.getQueryParam('s', 'https://test.com/')).toBeNull();

  expect(util.getQueryParam('s', null)).toBeNull();
});

test('should return the 2 arrays below merged', () => {
  const arr = util.mergeArrays([{'test1': 'test2'}], [{'test1': 'test3'}], 'test1');
  expect(arr.length).toBe(2);
});

test('should return object filtered from bigints', () => {
  const qp = util.sanitize({
    id: 100,
    name: 'test'
  });
  expect(qp.id).toBe(100);
});

test('should return friendly formatted date', () => {
  const ny = Date.parse('2023-02-02'); // 1672531200000
  const dateStr = util.getDateString(ny);
  // Format date
  expect(dateStr).toBe('2023-02-01');

  // Empty
  expect(util.getDateString()).not.toBeNull();
});

test('should return a string with a proper name capitalized', () => {
  let name = 'testname';
  expect(util.properCase(name)).toBe('Testname');
});

test('should remove the non-letter characters', () => {
  let name = 'Test1';
  expect(util.stripNonAlpha(name)).toBe('Test');
});

test('should return a string with invalid characters removed for Salesforce SOSL', () => {
  let str = 'Test?!';
  expect(util.escapeSoslStr(str)).toBe('Test\\?\\!');
});

test('should return an array of years starting 4 years before now.', () => {
  expect(util.getYears().length).toBe(5);
});

test('should return a standard date string from a crazy Salesforce ISO-8601 formatted date.', () => {
  let datStr = '2023-05-23T14:00:00.000Z';
  expect(util.getSf2JsDate(datStr)).toBe('2023-05-23');

  datStr = '';
  expect(util.getSf2JsDate(datStr)).toBeNull();
});
