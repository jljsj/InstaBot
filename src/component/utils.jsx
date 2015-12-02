export function toMoney(num) {
  num = Math.round(num);
  if (num.length <= 3) {
    return num;
  }
  if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
    alert('wrong!');
    return num;
  }
  const a = RegExp.$1;
  let b = RegExp.$2;
  const c = RegExp.$3;
  const re = new RegExp();
  re.compile('(\\d)(\\d{3})(,|$)');
  while (re.test(b)) {
    b = b.replace(re, '$1,$2$3');
  }
  return a + '' + b + '' + c;
}