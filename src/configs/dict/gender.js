const genderOpts = [{
  label: '先生',
  value: '1'
}, {
  label: '女士',
  value: '2'
}, {
  label: '其他',
  value: '3'
}];

export default value => {
  if (value) {
    let arr = genderOpts.filter(item => {
      return value === item.value;
    });
    if (arr.length > 0) {
      return arr[0]
    } else {
      return null;
    }
  } else {
    return genderOpts;
  }
}
