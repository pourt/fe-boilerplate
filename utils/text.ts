export const ucwords = (str: string) => {
  return str.toLowerCase().replace(/\b[a-z]/g, function (letter: string) {
    return letter.toUpperCase();
  });
};

export const formatABN = (abn = '') => {
  if (!abn) return '';

  if (abn.length === 14) return abn;

  const s1 = abn.slice(0, 2);
  const s2 = abn.slice(2, 5);
  const s3 = abn.slice(5, 8);
  const s4 = abn.slice(8);

  return `${s1} ${s2} ${s3} ${s4}`;
};

export const formatACN = (acn = '') => {
  if (!acn) return '';

  if (acn.length === 11) return acn;

  const s1 = acn.slice(0, 3);
  const s2 = acn.slice(3, 6);
  const s3 = acn.slice(6);

  return `${s1} ${s2} ${s3}`;
};

export const ratingFormat = (average: any) => {
  return parseFloat(average || 0).toFixed(2);
};

export const numberFormat = (number = '0', decimal = 2) => {
  return parseFloat(number).toFixed(decimal);
};

export const fileExtension = (filename: string) => {
  return filename.split('.').pop();
};

export const removeSpaces = (value: string) => {
  return value && value != '' ? value.trim().replace(/\s/g, '') : '';
};

export const acronym = (string: string, string2 = '') => {
  return typeof string !== 'undefined'
    ? string
        .split(/\s/)
        .reduce((accumulator, word) => accumulator + word.charAt(0), '')
        .toUpperCase()
    : '';
};

export const formatMobile = (mobile: string) => {
  mobile = mobile ? mobile.trim().replace(' ', '') : '';

  if (!mobile) return '';

  const s1 = mobile.slice(0, 4);
  const s2 = mobile.slice(4, 7);
  const s3 = mobile.slice(7);

  return `${s1} ${s2} ${s3}`;
};

export const isNumber = (evt: KeyboardEvent) => {
  const keysAllowed: string[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  const keyPressed: string = evt.key;

  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault();
  }
};

export const formatFileSize = (value: any, decimals = 2) => {
  const bytes = parseFloat(value);

  if (bytes == 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default {
  ucwords,
  acronym,
  formatABN,
  formatACN,
  ratingFormat,
  numberFormat,
  fileExtension,
  removeSpaces,
  formatMobile,
  isNumber,
  formatFileSize,
};
